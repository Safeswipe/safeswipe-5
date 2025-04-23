
'use client';

import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center px-6 pt-32 pb-20 min-h-screen text-center bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-br from-purple-100 via-white to-blue-100 border-b border-purple-200 shadow-sm">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 py-3 flex justify-center sm:justify-start items-center">
          <img src="/Safe Swipe.png" alt="Safe Swipe Logo" className="h-10 object-contain" />
        </div>
      </header>

      <section className="max-w-3xl w-full space-y-6 text-left mt-10">
        <h1 className="text-4xl font-bold text-purple-800 mb-4 text-center">Contact Us</h1>
        <p className="text-gray-700">Have a question, feedback, or support request? We're here to help. Fill out the form below or contact us via email. Our team typically responds within 1 business day.</p>

        <form className="bg-white shadow-lg rounded-xl p-6 space-y-4">
          <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-md" />
          <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded-md" />
          <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-2 border rounded-md"></textarea>
          <button type="submit" className="w-full py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-md font-medium">Send Message</button>
        </form>

        <div className="text-gray-700 pt-6">
          <p>Email: <a href="mailto:support@safeswipe.com.au" className="text-purple-700 underline">support@safeswipe.com.au</a></p>
          <p>Business Hours: Monday - Friday, 9AM - 5PM AEST</p>
        </div>
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
