'use client';

import { useEffect, useState } from 'react';
import './globals.css';

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isPaid = params?.get('paid') === 'true';
  const plan = params?.get('plan');

  useEffect(() => {
    const savedInput = localStorage.getItem('safeswipe_input');
    const usedOneTime = localStorage.getItem('safeswipe_used_once');

    if (savedInput) setInputValue(savedInput);

    const isReturningWithPaidLink = isPaid && plan === 'basic' && usedOneTime !== 'true';

    if (savedInput && isReturningWithPaidLink) {
      setShowResult(true);
      localStorage.setItem('safeswipe_used_once', 'true');
    }
  }, [isPaid, plan]);

  const handleScan = (e) => {
    e.preventDefault();
    localStorage.setItem('safeswipe_input', inputValue);
    setShowResult(true);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 pt-28 pb-20 min-h-screen text-center">

      {/* Hero Section */}
      <section className="space-y-4 max-w-2xl mb-10">
        <h1 className="text-4xl font-extrabold text-purple-800 leading-tight">Reverse Image & Identity Lookups</h1>
        <p className="text-lg text-gray-700">
          Instantly uncover profiles, photos, and public data across the internet. SafeSwipe is your AI-powered truth engine.
        </p>
      </section>

      {/* Scan Section */}
      <form onSubmit={handleScan} className="bg-white shadow-lg rounded-xl p-6 space-y-4 max-w-md w-full">
        <label className="block text-purple-800 font-semibold text-left">Enter a Phone Number:</label>
        <input
          type="tel"
          placeholder="e.g. +1 555 123 4567"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <button type="submit" className="w-full py-3 text-lg font-medium rounded-md shadow-md text-white bg-purple-600 hover:bg-purple-700">
          Scan Now
        </button>
      </form>

      {/* Blurred Report Section */}
      {showResult && (
        <div className="mt-10 w-full max-w-2xl bg-white border border-purple-300 rounded-md shadow-md p-6 space-y-4 text-left">
          <h3 className="text-xl font-bold text-purple-800">Scan Results</h3>
          <div className="space-y-2 blur-sm pointer-events-none select-none">
            <p><strong>Found 3 potential matches</strong></p>
            <p>Includes social profiles, dating activity, and more.</p>
            <p>Some results are hidden for privacy until unlocked.</p>
          </div>
          <div className="pt-4 text-center">
            <p className="text-purple-700 font-medium mb-2">Unlock full access to view results:</p>
            <a href='https://buy.stripe.com/test-basic-plan' target='_blank' rel='noopener noreferrer' className='inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-md font-semibold shadow'>Unlock – $9.99</a>
          </div>
        </div>
      )}
{/* Trust Badge Section */}
      <section className="w-full bg-white py-10 text-center shadow-inner">
  <p className="text-gray-800 font-bold text-lg">Trusted by Over 100,000 Americans</p>
  <div className="flex flex-wrap justify-center items-center gap-8 mt-6">
    <div className="flex flex-col items-center">
      <img src="/google-review.png" alt="Google Reviews" className="h-12" />
      <p className="text-sm text-gray-700 mt-1">4.8 ★ (8,435 reviews)</p>
    </div>
    <div className="flex flex-col items-center">
      <img src="/trustpilot.png" alt="Trustpilot Reviews" className="h-12" />
      <p className="text-sm text-gray-700 mt-1">4.9 ★ (3,912 reviews)</p>
    </div>
  </div>
</section>


      {/* What You’ll Discover */}
      <section className="max-w-6xl w-full space-y-6 mt-20">
        <h2 className="text-3xl font-bold text-purple-800 text-center">What You’ll Discover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {["Social Media Matches","Reverse Image Hits","Alias Accounts","Connected Phone Numbers","Email Footprints","Dating Profile Detection"].map((title, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-left border border-purple-100 hover:shadow-lg transition-all">
              <h4 className="text-lg font-semibold text-purple-700 mb-2">{title}</h4>
              <p className="text-gray-700 text-sm">Detailed insights depending on the data found during scan.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="w-full text-center py-10">
        <p className="text-gray-600 text-sm">Trusted by thousands | Private & Secure | No data stored</p>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800">What Others Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["I found out my boyfriend had multiple dating profiles.","Helped me uncover a fake LinkedIn account.","Worked fast and results were accurate.","Saved me before meeting a scammer."]
            .map((review, i) => (
              <div key={i} className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <div className="text-yellow-400 text-xl mb-2">★★★★★</div>
                <p className="text-gray-700 italic">“{review}”</p>
                <p className="mt-2 font-semibold text-purple-800">– Verified User</p>
              </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm pt-20">
        © {new Date().getFullYear()} SafeSwipe. All rights reserved.
      </footer>
    </div>
  );
}
