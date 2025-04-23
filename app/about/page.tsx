
'use client';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center px-6 pt-32 pb-20 min-h-screen text-center bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-br from-purple-100 via-white to-blue-100 border-b border-purple-200 shadow-sm">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 py-3 flex justify-center sm:justify-start items-center">
          <img src="/Safe Swipe.png" alt="Safe Swipe Logo" className="h-10 object-contain" />
        </div>
      </header>
      <section className="max-w-3xl w-full space-y-6 text-left mt-10">
        <h1 className="text-4xl font-bold text-purple-800 text-center mb-4">About SafeSwipe</h1>
        <p className="text-gray-700">SafeSwipe is a tool built to help people verify online identities, detect catfishing, and make informed digital decisions. We offer reverse image and identifier lookups using public data and AI tools.</p>
        <p className="text-gray-700">Our mission is to create a safer digital space—one where you can engage with confidence, transparency, and clarity. We believe every user deserves the truth behind the screen.</p>
        <p className="text-gray-700">We're proudly Australian and committed to privacy-first technology.</p>
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
