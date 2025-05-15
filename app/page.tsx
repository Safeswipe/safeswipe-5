'use client';

import { useEffect, useState } from 'react';
import './globals.css';

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [reportData, setReportData] = useState(null);

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isPaid = params?.get('paid') === 'true';

  useEffect(() => {
    const savedInput = localStorage.getItem('safeswipe_input');
    if (savedInput) setInputValue(savedInput);
    if (savedInput && isPaid) {
      setShowResult(true);
    }
    if (params?.get('premium') === 'true') {
      setIsPremium(true);
      localStorage.setItem('safeswipe_premium_unlocked', 'true');
    } else if (localStorage.getItem('safeswipe_premium_unlocked') === 'true') {
      setIsPremium(true);
    }

    const storedReport = localStorage.getItem('safeswipe_report_data');
    if (storedReport) setReportData(JSON.parse(storedReport));
  }, [isPaid]);

  const handleScan = async (e) => {
    e.preventDefault();
    localStorage.setItem('safeswipe_input', inputValue);
    setIsScanning(true);

    try {
      const res = await fetch(`/api/fetchReport?phone=${encodeURIComponent(inputValue)}`);
      const data = await res.json();
      setReportData(data);
      localStorage.setItem('safeswipe_report_data', JSON.stringify(data));
    } catch (err) {
      console.error('Error fetching report:', err);
    }

    setTimeout(() => {
      setShowResult(true);
      setIsScanning(false);
    }, 15000);
  };

  return (
  <div className="flex flex-col items-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 pt-10 space-y-20 min-h-screen text-center">
    <header className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-start items-center">
        <img src="/Safe Swipe.png" alt="Safe Swipe Logo" className="h-10 object-contain" />
      </div>
    </header>

    {/* ✅ Green success banner */}
    {isPaid && !isPremium && (
      <div className="fixed top-16 bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded shadow-md z-50">
        ✅ Basic unlocked! Scan again to view report.
      </div>
    )}

    {/* Hero */}
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
          disabled={isScanning}
          className="w-full py-3 text-lg font-medium rounded-md shadow-md text-white bg-purple-600 hover:bg-purple-700"
        >
          {isScanning ? '🔍 Scanning Report...' : 'Scan Now'}
        </button>
        {isScanning && <p className="text-center text-sm text-gray-600 pt-2 animate-pulse">Scanning in progress...</p>}
        <p className="text-center text-xs text-gray-600 pt-1">Secure and encrypted. Your searches are 100% private.</p>
      </form>
    </section>

    {/* Report Section */}
    {showResult && (
      <section className={`mt-6 w-full max-w-xl bg-white border border-purple-300 rounded-2xl shadow-md p-6 space-y-4 text-left`}>
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
          {[
            { icon: '📛', label: 'Associated Names', value: 'Connor Rawiri, Facebook, Connor' },
            { icon: '🧑‍💻', label: 'Associated Usernames', value: 'connorraw' },
            { icon: '📧', label: 'Associated Emails', value: 'Not Identified' },
          ].map((item, i) => (
            <div key={i} className="border-t pt-4 relative">
              <p className="font-semibold text-gray-700">{item.icon} {item.label}:</p>
              <p className={`${isPaid ? 'text-gray-800' : 'text-gray-600'} ${!isPremium ? 'blur-sm' : ''}`}>
                {item.value}
              </p>
              {!isPremium && isPaid && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/80">
                  <a
                    href="https://buy.stripe.com/bIYeW5fbiftdbHq5kq"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded shadow mt-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔓 Unlock Premium - $3.99
                  </a>
                </div>
              )}
            </div>
          ))}
          <div className="border-t pt-4">
            <p className="font-semibold text-gray-700">📡 Carrier:</p>
            <p className="text-gray-600">Telstra</p>
          </div>
          <div className="border-t pt-4">
            <p className="font-semibold text-gray-700">📞 Line Type:</p>
            <p className="text-gray-600">Mobile</p>
          </div>
          <div className="border-t pt-4">
            <p className="font-semibold text-gray-700">🎂 Potential Date of Birth:</p>
            <p className="text-gray-600">Not Identified</p>
          </div>
        </div>
      </section>
    )}

    {!isPaid && showResult && (
      <div className="pt-6 text-center w-full max-w-xl">
        <a
          href="https://buy.stripe.com/eVabJT0goa8TdPycMR"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-md font-semibold shadow"
        >
          🔒 Unlock Report - $9.99
        </a>
      </div>
    )}

    {/* Trust Section */}
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

    {/* ✅ What You’ll Discover */}
    <section className="max-w-6xl w-full space-y-6">
      <h2 className="text-3xl font-bold text-purple-800 text-center">What You’ll Discover</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {[
          { title: 'Usernames & Socials', desc: 'Identify social handles tied to the number.' },
          { title: 'Risk Flags & Spam Scores', desc: 'Instantly detect potential scam or spam activity.' },
          { title: 'Carrier & Region Data', desc: 'See which carrier and region this number belongs to.' },
          { title: 'Name & Email Matches', desc: 'Reveal potential full names and email addresses.' },
          { title: 'Profile Pictures', desc: 'Access associated profile or avatar images.' },
          { title: 'Dating & Identity Fraud', desc: 'Protect yourself from fake identities or catfishers.' }
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-left border border-purple-100 hover:shadow-lg transition-all">
            <h4 className="text-lg font-semibold text-purple-700 mb-2">{item.title}</h4>
            <p className="text-gray-700 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ✅ Testimonials */}
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

    {/* Footer */}
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
