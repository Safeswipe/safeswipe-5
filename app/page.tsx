'use client';

import { useEffect, useState } from 'react';
import './globals.css';

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isPaid = params?.get('paid') === 'true';

  useEffect(() => {
    const savedInput = localStorage.getItem('safeswipe_input');
    if (savedInput) setInputValue(savedInput);
    if (savedInput && isPaid) {
      setShowResult(true);
    }
  }, [isPaid]);

  const handleScan = (e) => {
    e.preventDefault();
    localStorage.setItem('safeswipe_input', inputValue);
    setShowResult(true);
  };

  const whatYouDiscover = [
    { title: "Phone Reputation Score", desc: "Get an instant credibility rating for any number based on behavior patterns." },
    { title: "Connected Social Profiles", desc: "Reveal linked Facebook, Instagram, LinkedIn, and other accounts." },
    { title: "Dating App Presence", desc: "Check if the number is tied to profiles on Tinder, Bumble, or Hinge." },
    { title: "Scam History Lookup", desc: "Identify if the number has been flagged for scams, spam, or fraud." },
    { title: "Carrier and Line Type", desc: "Know if it's a mobile or landline and who the telecom provider is." },
    { title: "Location & Timezone", desc: "See the general area and timezone associated with the number." }
  ];

  const faqs = [
    { q: "Is SafeSwipe free to use?", a: "You can scan for free, but unlocking full reports requires a subscription." },
    { q: "Do you store my search data?", a: "No. All searches are encrypted and not stored on our servers." },
    { q: "Can I cancel anytime?", a: "Yes. Subscriptions are cancelable at any time through your account." },
    { q: "What countries are supported?", a: "Currently, we only support U.S. phone numbers." }
  ];

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 pt-10 space-y-20 min-h-screen text-center">
      <header className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-start items-center">
          <img src="/Safe Swipe.png" alt="Safe Swipe Logo" className="h-10 object-contain" />
        </div>
      </header>

      <section className="pt-24 max-w-md w-full space-y-6">
        <h1 className="text-5xl font-extrabold text-purple-800 leading-tight">Reverse Phone Lookups</h1>
        <p className="text-lg text-gray-700">Instantly scan and uncover social profiles, risk scores, and carrier data.</p>
        <form className="bg-white shadow-lg rounded-2xl p-6 space-y-4 text-left" onSubmit={handleScan}>
          <label className="block text-purple-800 font-semibold text-lg">Enter a Mobile or Landline Number:</label>
          <input
            type="tel"
            placeholder="+1 555 123 4567"
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
          <p className="text-center text-xs text-gray-600 pt-2">Secure and encrypted. Your searches are 100% private.</p>
        </form>
      </section>

      {showResult && (
        <section className="mt-6 w-full max-w-xl bg-white border border-purple-300 rounded-2xl shadow-md p-6 space-y-4 text-left">
          <h3 className="text-2xl font-bold text-purple-800 mb-4">Match Report</h3>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">👤</div>
            <div>
              <p className="text-sm text-gray-500">Matches found for:</p>
              <p className="text-xl font-semibold text-gray-800">{inputValue}</p>
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-700">Possible Owners:</p>
                <p className="text-gray-600">Connor Rawiri, Facebook, Connor</p>
              </div>
              <span className="text-sm text-pink-600 font-bold">Score: 8.5</span>
            </div>
            <div className="border-t pt-4">
              <p className="font-semibold text-gray-700">Associated Usernames:</p>
              <p className="text-gray-600">connorraw</p>
            </div>
            <div className="border-t pt-4">
              <p className="font-semibold text-gray-700">Associated Emails:</p>
              <p className="text-gray-600">Not Identified</p>
            </div>
            <div className="border-t pt-4">
              <p className="font-semibold text-gray-700">Associated Locations:</p>
              <p className="text-gray-600">🇦🇺 AU</p>
            </div>
            <div className="border-t pt-4">
              <p className="font-semibold text-gray-700">Potential Date of Birth:</p>
              <p className="text-gray-600">Not Identified</p>
            </div>
          </div>
          {!isPaid && (
            <div className="pt-6 text-center">
              <a
                href="https://buy.stripe.com/YOUR_NEW_ONE_TIME_LINK"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-md font-semibold shadow"
              >
                🔒 Unlock Report - $9.99
              </a>
            </div>
          )}
        </section>
      )}

      <section className="w-full py-10 text-center">
        <h2 className="text-3xl font-bold text-purple-800 mb-6">Trusted by Over 100,000 Americans</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md w-64">
            <img src="/google-review.png" alt="Google Reviews" className="h-14 mx-auto mb-2" />
            <p className="text-yellow-500 font-bold text-lg">★★★★☆</p>
            <p className="text-gray-700 text-sm">4.8 based on 8,435 reviews</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md w-64">
            <img src="/trustpilot.png" alt="Trustpilot Reviews" className="h-14 mx-auto mb-2" />
            <p className="text-yellow-500 font-bold text-lg">★★★★★</p>
            <p className="text-gray-700 text-sm">4.9 based on 3,912 reviews</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800 text-center">What You’ll Discover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {whatYouDiscover.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-left border border-purple-100 hover:shadow-lg transition-all">
              <h4 className="text-lg font-semibold text-purple-700 mb-2">{item.title}</h4>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl w-full py-12 space-y-6">
        <h2 className="text-3xl font-bold text-purple-800 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-4 rounded-md shadow border border-purple-100">
              <p className="font-semibold text-purple-700">Q: {faq.q}</p>
              <p className="text-gray-700">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800 text-center">We Help Thousands of People Daily</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
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

      <footer className="w-full text-center text-sm text-gray-600 py-10 space-y-2">
        <p>© {new Date().getFullYear()} SafeSwipe. All rights reserved.</p>
        <div className="space-x-4">
          <a href="/terms" className="text-purple-600 hover:underline">Terms</a>
          <a href="/privacy" className="text-purple-600 hover:underline">Privacy</a>
          <a href="/contact" className="text-purple-600 hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  );
}
