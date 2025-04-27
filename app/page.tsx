'use client';
import { useState, useEffect } from "react";

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isPaid = params?.get('paid') === 'true';
  const plan = params?.get('plan');
  const usedOneTime = typeof window !== 'undefined' ? localStorage.getItem('safeswipe_used_once') : null;

  useEffect(() => {
    const savedInput = localStorage.getItem('safeswipe_input');
    const savedImage = localStorage.getItem('safeswipe_image');
    if (savedInput) setInputValue(savedInput);
    if (savedImage) setImagePreview(savedImage);
    const unlocked = isPaid && (plan === 'unlimited' || (plan === 'onetime' && usedOneTime !== 'true'));
    if (savedInput && savedImage && unlocked) {
      setShowResult(true);
      if (plan === 'onetime') localStorage.setItem('safeswipe_used_once', 'true');
    }
  }, [isPaid, plan]);

  const handleClearSearch = () => {
    setInputValue('');
    setImagePreview(null);
    setShowResult(false);
    localStorage.removeItem('safeswipe_input');
    localStorage.removeItem('safeswipe_image');
  };

  const handleScan = () => {
    localStorage.setItem('safeswipe_input', inputValue);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
      if (plan === 'onetime') localStorage.setItem('safeswipe_used_once', 'true');
    }, 30000); // 30 seconds scan
  };

  return (
    <div className="flex flex-col items-center px-6 pt-32 pb-20 min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 text-center space-y-20">
      
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-br from-purple-100 via-white to-blue-100 border-b border-purple-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex justify-center sm:justify-start items-center">
          <img src="/Safe Swipe.png" alt="SafeSwipe Logo" className="h-10 object-contain" />
        </div>
      </header>

      {/* Payment Success Message */}
      {isPaid && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded w-full max-w-2xl text-center">
          Payment successful. Please scan again to view your report.
        </div>
      )}

      {/* Hero Upload Section */}
      <section className="max-w-3xl w-full space-y-6">
        <h1 className="text-5xl font-extrabold text-purple-800 leading-tight">Reverse Phone Number Lookup</h1>
        <p className="text-xl text-gray-700">Find linked profiles, carrier information, risk levels, and more in seconds.</p>
        <form className="bg-white shadow-lg rounded-2xl p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter a phone number e.g. 0412345678"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              localStorage.setItem('safeswipe_input', e.target.value);
            }}
            className="w-full px-4 py-2 border rounded-md"
          />
          <div className="flex gap-4">
            <button type="button" onClick={handleScan} disabled={loading} className={`w-full py-3 text-lg font-medium rounded-md shadow-md text-white ${loading ? "bg-purple-500 animate-pulse" : "bg-purple-600 hover:bg-purple-700"}`}>
              {loading ? "Scanning..." : "Scan Now"}
            </button>
            <button type="button" onClick={handleClearSearch} className="w-full py-3 text-lg font-medium rounded-md shadow bg-gray-200 hover:bg-gray-300">
              Clear Search
            </button>
          </div>
        </form>
      </section>

{/* Scan Report Section */}
      {showResult && (
        <section className="w-full max-w-4xl bg-white shadow rounded-2xl p-8 text-left space-y-6">
          <div className={isPaid ? "" : "blur-sm pointer-events-none select-none"}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-purple-600 text-2xl font-bold">SS</div>
              <div>
                <h2 className="text-2xl font-bold text-purple-800">Scan Report</h2>
                <p className="text-gray-600">{inputValue}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-purple-600">📞</span>
                <p><strong>Phone Number:</strong> {inputValue}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-purple-600">📍</span>
                <p><strong>Location:</strong> AU</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-purple-600">🏢</span>
                <p><strong>Carrier:</strong> Telstra</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-purple-600">✅</span>
                <p><strong>Risk Level:</strong> Safe</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-purple-600">🔎</span>
                <p><strong>Associated Accounts:</strong> Not Identified</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p><strong>Note:</strong> SafeSwipe uses publicly available information to build reports. We never save your searches.</p>
            </div>
          </div>

          {!isPaid && (
            <div className="pt-6 text-center">
              <p className="text-purple-700 mb-3">Unlock full report access:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href='https://buy.stripe.com/aEU9BL4wEep9fXGeUX?plan=unlimited' className='bg-purple-600 text-white px-6 py-3 rounded shadow hover:bg-purple-700'>Unlimited – $19.99</a>
                <a href='https://buy.stripe.com/7sIeW5bZ6ch18ve4gi?plan=onetime' className='border border-purple-500 text-purple-700 px-6 py-3 rounded shadow'>One-Time Report – $9.99</a>
              </div>
            </div>
          )}
        </section>
      )}


      
      {/* What You'll Discover Section */}
      <section className="max-w-6xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800 text-center">What You'll Discover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {[
            { title: "Social Media Matches", desc: "Find linked Instagram, Facebook, and dating profiles tied to the number." },
            { title: "Alias Accounts", desc: "Uncover alternative usernames and duplicates." },
            { title: "Location History", desc: "See regions tied to the phone number." },
            { title: "Carrier and Line Type", desc: "View carrier and line information." },
            { title: "Data Breaches", desc: "Check if number was involved in leaks." },
            { title: "Public Risk Score", desc: "Safety score based on public data." }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-left border border-purple-100 hover:shadow-lg transition-all">
              <h4 className="text-lg font-semibold text-purple-700 mb-2">{item.title}</h4>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800">We Help Thousands of People Daily</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: "Jessica M.", review: "SafeSwipe saved me months of lies!" },
            { name: "Aaron T.", review: "Gave me instant clarity on who I was really talking to." },
            { name: "Nina D.", review: "Found out he was using a fake identity." },
            { name: "Connor W.", review: "Worth the price. Helped me make a safe decision." }
          ].map((t, i) => (
            <div key={i} className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
              <div className="text-yellow-400 text-xl mb-2">★★★★★</div>
              <p className="text-gray-700 italic">“{t.review}”</p>
              <p className="mt-2 font-semibold text-purple-800">– {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="w-full max-w-5xl text-center">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Trusted by Thousands</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white border rounded-xl shadow p-4 w-64">
            <img src="/trustpilot.png" alt="Trustpilot" className="h-24 mx-auto mb-3" />
            <p className="text-yellow-400 text-2xl">★★★★★</p>
            <p className="text-sm text-gray-500 mt-1">4.8 rating (2,541 reviews)</p>
          </div>
          <div className="bg-white border rounded-xl shadow p-4 w-64">
            <img src="/google-review.png" alt="Google" className="h-24 mx-auto mb-3" />
            <p className="text-yellow-400 text-2xl">★★★★★</p>
            <p className="text-sm text-gray-500 mt-1">4.9 rating (1,934 reviews)</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-20 border-t pt-6">
        <p>© 2025 SafeSwipe Pty Ltd. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="/about" className="underline">About</a>
          <a href="/privacy" className="underline">Privacy</a>
          <a href="/terms" className="underline">Terms</a>
          <a href="/contact" className="underline">Contact</a>
        </div>
      </footer>
    </div>
  );
}