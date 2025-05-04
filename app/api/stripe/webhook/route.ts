import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { buffer } from 'node:stream/consumers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const sig = headers().get('stripe-signature')!;
  const rawBody = await buffer(req.body as any);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const relevantEvents = new Set([
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
  ]);

  if (relevantEvents.has(event.type)) {
    const subscription =
      event.data.object as Stripe.Subscription | Stripe.Checkout.Session;

    const customerId =
      'customer' in subscription
        ? subscription.customer
        : subscription.customer_details?.customer;

    if (!customerId) return NextResponse.json({ received: true });

    const status =
      'status' in subscription ? subscription.status : 'active';

    const priceId =
      'items' in subscription
        ? subscription.items.data[0].price.id
        : subscription.metadata?.price_id;

    let currentPlan = null;

    if (priceId === process.env.STRIPE_BASIC_PRICE_ID) currentPlan = 'basic';
    if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) currentPlan = 'premium';

    const { error } = await supabase
      .from('users')
      .update({
        subscription_status: status,
        current_plan: currentPlan,
      })
      .eq('stripe_customer_id', customerId);

    if (error) {
      console.error('Supabase update error:', error.message);
    }
  }

  return NextResponse.json({ received: true });
}
