
'use client';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="flex flex-col items-center px-6 pt-32 pb-20 min-h-screen text-center bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-br from-purple-100 via-white to-blue-100 border-b border-purple-200 shadow-sm">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 py-3 flex justify-center sm:justify-start items-center">
          <img src="/Safe Swipe.png" alt="Safe Swipe Logo" className="h-10 object-contain" />
        </div>
      </header>

      <section className="max-w-3xl w-full space-y-6 text-left mt-10">
        <h1 className="text-4xl font-bold text-purple-800 text-center mb-4">Terms of Service</h1>
        <p className="text-gray-700">By using SafeSwipe, you agree to use the platform for lawful purposes only. You must not use the service to harass, harm, or impersonate others.</p>
        <p className="text-gray-700">All reports are generated based on public data and are for informational purposes. We do not guarantee absolute accuracy and recommend using our results as one component of your verification process.</p>
        <p className="text-gray-700">We reserve the right to suspend or terminate access for misuse or abuse of our system.</p>
      </section>

      <footer className="text-center text-sm text-gray-500 mt-20 border-t pt-6">
        <p>© 2025 SafeSwipe Pty Ltd. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/about" className="underline">About</Link>
          <Link href="/privacy" className="underline">Privacy</Link>
          <Link href="/terms" className="underline">Terms</Link>
          <Link href="/contact" className="underline">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
