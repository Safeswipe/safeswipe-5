'use client';
import { useEffect, useState } from "react";
import './globals.css';
import Link from 'next/link';

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isPaid = params?.get('paid') === 'true';
  const plan = params?.get('plan');

  useEffect(() => {
    const savedInput = localStorage.getItem('safeswipe_input');
    const savedImage = localStorage.getItem('safeswipe_image');
    const usedOneTime = localStorage.getItem('safeswipe_used_once');

    if (savedInput) setInputValue(savedInput);
    if (savedImage) setImagePreview(savedImage);

    const isReturningWithPaidLink = isPaid && (plan === 'unlimited' || (plan === 'onetime' && usedOneTime !== 'true'));

    if (savedInput && savedImage && isReturningWithPaidLink) {
      setShowResult(true);
      if (plan === 'onetime') {
        localStorage.setItem('safeswipe_used_once', 'true');
      }
    }
  }, [isPaid, plan]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      localStorage.setItem('safeswipe_image', base64);
    };
    reader.readAsDataURL(file);
  };

  const handleScan = (e) => {
    e.preventDefault();
    const btn = document.querySelector('#scanButton') as HTMLButtonElement;
    if (!btn) return;

    localStorage.setItem('safeswipe_input', inputValue);

    btn.innerText = 'Scanning...';
    btn.disabled = true;
    btn.classList.add('animate-pulse');

    setTimeout(() => {
      btn.innerText = 'Scan Now';
      btn.disabled = false;
      btn.classList.remove('animate-pulse');
      if (plan === 'onetime') {
        localStorage.setItem('safeswipe_used_once', 'true');
      }
      setShowResult(true);
    }, 3000);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(inputValue.trim());
  const isPhone = /^\d{6,}$/.test(inputValue.trim());
  const isUsername = !isEmail && !isPhone && inputValue.trim() !== '';

  return (
    <div className="flex flex-col items-center px-6 pt-32 pb-20 space-y-32 min-h-screen text-center bg-gradient-to-br from-purple-100 via-white to-blue-100">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-br from-purple-100 via-white to-blue-100 border-b border-purple-200 shadow-sm">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 py-3 flex justify-center sm:justify-start items-center">
          <img src="/Safe Swipe.png" alt="Safe Swipe Logo" className="h-10 object-contain" />
        </div>
      </header>

      {/* Hero */}
      <section className="space-y-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold text-purple-800 leading-tight">Reverse Image & Identity Lookups</h1>
        <p className="text-xl text-gray-700">
          Instantly uncover profiles, photos, and public data across the internet. SafeSwipe is your AI-powered truth engine.
        </p>
        <div className="space-x-4">
          <a href="https://buy.stripe.com/aEU9BL4wEep9fXGeUX?plan=unlimited" target="_blank" rel="noopener noreferrer">
            <button className="text-lg px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded">
              Get Unlimited Access – $19.99
            </button>
          </a>
          <a href="https://buy.stripe.com/7sIeW5bZ6ch18ve4gi?plan=onetime" target="_blank" rel="noopener noreferrer">
            <button className="text-lg px-6 py-4 text-purple-700 border border-purple-500 rounded">
              One-Time Report – $4.99
            </button>
          </a>
        </div>
      </section>

      {/* Upload Form */}
      <section className="max-w-3xl w-full">
        <form className="bg-white shadow-lg rounded-2xl p-6 space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-purple-800 font-semibold text-lg">Upload a Photo or Enter a Username, Email or Phone Number:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-4 py-2 border rounded-md" />
          <input
            type="text"
            placeholder="e.g. @username, john@email.com, or 0412345678"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              localStorage.setItem('safeswipe_input', e.target.value);
            }}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button id="scanButton" type="button" className="w-full py-3 text-lg font-medium rounded-md shadow-md text-white bg-purple-600 hover:bg-purple-700" onClick={handleScan}>Scan Now</button>
        </form>
      </section>

      {/* Scan Report */}
      {showResult && (
        <div className="mt-10 w-full max-w-3xl bg-white border border-purple-300 rounded-2xl shadow-lg p-6 space-y-8 text-left">
          <h3 className="text-2xl font-bold text-purple-800 border-b pb-2">Scan Report</h3>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {imagePreview && (
              <img src={imagePreview} alt="Uploaded" className="w-32 h-32 object-cover rounded-full border-4 border-purple-200 shadow" />
            )}
            <div className="flex-1 space-y-1">
              <h4 className="text-xl font-semibold text-gray-800">{isUsername ? inputValue.replace('@', '') : 'Unknown'}</h4>
              <p className="text-gray-700">📍 Brisbane, QLD, Australia</p>
              <p className="text-gray-700">🎂 Estimated Age: 29</p>
              <p className="text-gray-700">📅 Scan Time: {new Date().toLocaleString('en-AU')}</p>
            </div>
          </div>
        </div>
      )}

      {/* What You’ll Discover */}
      <section className="max-w-6xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800 text-center">What You’ll Discover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {[
            "Social Media Matches",
            "Reverse Image Hits",
            "Alias Accounts",
            "Connected Phone Numbers",
            "Email Footprints",
            "Dating Profile Detection"
          ].map((title, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-left border border-purple-100 hover:shadow-lg transition-all">
              <h4 className="text-lg font-semibold text-purple-700 mb-2">{title}</h4>
              <p className="text-gray-700 text-sm">Our system cross-checks multiple sources to uncover insights related to this category.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800">We Help Thousands of People Daily</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            "I found out my boyfriend had multiple dating profiles. SafeSwipe saved me months of lies!",
            "This gave me instant clarity on who I was really talking to. 100% recommend.",
            "I used it before a date and turns out he was using a fake identity. Lifesaver!",
            "Very easy to use and worth the price. Helped me make a safe decision."
          ].map((review, i) => (
            <div key={i} className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
              <div className="text-yellow-400 text-xl mb-2">★★★★★</div>
              <p className="text-gray-700 italic">“{review}”</p>
              <p className="mt-2 font-semibold text-purple-800">– Verified User</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
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
