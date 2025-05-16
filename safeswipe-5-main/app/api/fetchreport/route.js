import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get('phone');

  const res = await fetch('https://api.peopledatalabs.com/v5/person/identify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-api-key': process.env.PDL_API_KEY
    },
    body: JSON.stringify({
      phone
    })
  });

  const data = await res.json();
  return NextResponse.json(data);
}
