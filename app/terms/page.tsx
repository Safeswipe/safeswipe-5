
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
        <p className="text-gray-700">By accessing or using SafeSwipe, you agree to use our services lawfully. You must be at least 18 years of age and must not use our service to harass, impersonate, or defraud others.</p>
        <p className="text-gray-700">All data presented is collected from publicly accessible sources and may not always be accurate or complete. Our tools are designed to assist with identity verification, not for employment, credit, housing, or insurance decisions.</p>
        <p className="text-gray-700">You agree not to redistribute, misuse, or attempt to exploit data retrieved from SafeSwipe. Reports are for personal, informational use only.</p>
        <p className="text-gray-700">SafeSwipe reserves the right to suspend or terminate your access if you violate these terms.</p>
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
