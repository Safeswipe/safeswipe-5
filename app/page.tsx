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
    if (!/\+1\s?\d{3}\s?\d{3}\s?\d{4}/.test(inputValue.trim())) {
      alert('Please enter a valid US phone number in the format +1 555 123 4567');
      return;
    }

    localStorage.setItem('safeswipe_input', inputValue);
    setShowResult(true);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 py-10 space-y-20 min-h-screen text-center">

      <header className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-start items-center">
          <img
            src="/Safe Swipe.png"
            alt="Safe Swipe Logo"
            className="h-10 object-contain"
          />
        </div>
      </header>

      <section className="pt-24 max-w-xl w-full">
        <form className="bg-white shadow-lg rounded-2xl p-6 space-y-4 text-left" onSubmit={handleScan}>
          <label className="block text-purple-800 font-semibold text-lg">Enter a US Mobile Number:</label>
          <input
            type="tel"
            placeholder="e.g. +1 555 123 4567"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full py-3 text-lg font-medium rounded-md shadow-md text-white bg-purple-600 hover:bg-purple-700"
          >
            Scan Now
          </button>
          <p className="text-xs text-gray-600 text-center pt-2 font-medium">
            Trusted by thousands | Private & Secure | No data stored
          </p>
        </form>

        {showResult && (
          <div className="mt-10 w-full bg-white border border-purple-300 rounded-md shadow-md p-6 space-y-4 text-left">
            <h3 className="text-xl font-bold text-purple-800">Scan Results</h3>
            <div className="blur-sm select-none pointer-events-none space-y-2">
              <p>Public profiles, connected emails, phone traces, and social links detected...</p>
              <p className="text-gray-600 italic text-sm">Unlock full results below.</p>
            </div>
            <div className="pt-4 text-center">
              <a
                href='https://buy.stripe.com/test_9.99_plan_url'
                target='_blank'
                rel='noopener noreferrer'
                className='block w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-md font-semibold shadow'
              >
                $9.99
              </a>
            </div>
          </div>
        )}
      </section>

      <section className="w-full py-10 text-center shadow-inner">
        <p className="text-gray-800 font-bold text-lg mb-6">Trusted by Over 100,000 Americans</p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md w-60">
            <img src="/google-review.png" alt="Google Reviews" className="h-14 mx-auto mb-2" />
            <p className="text-yellow-500 font-bold text-lg">★★★★☆</p>
            <p className="text-gray-700 text-sm">4.8 based on 8,435 reviews</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md w-60">
            <img src="/trustpilot.png" alt="Trustpilot Reviews" className="h-14 mx-auto mb-2" />
            <p className="text-yellow-500 font-bold text-lg">★★★★★</p>
            <p className="text-gray-700 text-sm">4.9 based on 3,912 reviews</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800 text-center">What You’ll Discover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {[...
            { title: "Social Media Matches", desc: "Find linked Instagram, Facebook, and dating profiles tied to a photo or name." },
            { title: "Reverse Image Hits", desc: "Detect if someone's photo appears elsewhere using our AI + database checks." },
            { title: "Alias Accounts", desc: "Uncover alternative usernames, email aliases, and suspicious duplicates." },
            { title: "Connected Phone Numbers", desc: "See what profiles and apps are tied to the number you searched." },
            { title: "Email Footprints", desc: "Check if an email is tied to known social or scam activity online." },
            { title: "Dating Profile Detection", desc: "Reveal hidden profiles on Tinder, Bumble, Hinge, and more." }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-left border border-purple-100 hover:shadow-lg transition-all">
              <h4 className="text-lg font-semibold text-purple-700 mb-2">{item.title}</h4>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800 text-center">We Help Thousands of People Daily</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...
            { name: "Jessica M.", review: "I found out my boyfriend had multiple dating profiles. SafeSwipe saved me months of lies!" },
            { name: "Aaron T.", review: "This gave me instant clarity on who I was really talking to. 100% recommend." },
            { name: "Nina D.", review: "I used it before a date and turns out he was using a fake identity. Lifesaver!" },
            { name: "Connor W.", review: "Very easy to use and worth the price. Helped me make a safe decision." }
          ].map((t, i) => (
            <div key={i} className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
              <div className="text-yellow-400 text-xl mb-2">★★★★★</div>
              <p className="text-gray-700 italic">“{t.review}”</p>
              <p className="mt-2 font-semibold text-purple-800">– {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="w-full text-center text-sm text-gray-600 py-10">
        <p>© {new Date().getFullYear()} SafeSwipe. All rights reserved.</p>
      </footer>
    </div>
  );
}
