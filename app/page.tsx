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
    }, 6000);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(inputValue.trim());
  const isPhone = /^\d{6,}$/.test(inputValue.trim());
  const isUsername = !isEmail && !isPhone && inputValue.trim() !== '';

  return (
    <div className="flex flex-col items-center px-6 pt-32 pb-20 min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 text-center space-y-20">
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-br from-purple-100 via-white to-blue-100 border-b border-purple-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex justify-center sm:justify-start items-center">
          <img src="/Safe Swipe.png" alt="SafeSwipe Logo" className="h-10 object-contain" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-2xl w-full space-y-6">
        <h1 className="text-5xl font-extrabold text-purple-800 leading-tight">Reverse Phone Lookup & Identity Checks</h1>
        <p className="text-xl text-gray-700">Search phone numbers instantly and uncover public records and linked profiles.</p>
        <div className="space-x-4">
          <a href="https://buy.stripe.com/aEU9BL4wEep9fXGeUX?plan=unlimited" target="_blank" rel="noopener noreferrer">
            <button className="text-lg px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded">
              Unlimited Access – $19.99
            </button>
          </a>
          <a href="https://buy.stripe.com/7sIeW5bZ6ch18ve4gi?plan=onetime" target="_blank" rel="noopener noreferrer">
            <button className="text-lg px-6 py-4 text-purple-700 border border-purple-500 rounded">
              One-Time Report – $9.99
            </button>
          </a>
        </div>
      </section>

      {/* Upload Section */}
      <section className="max-w-3xl w-full">
        <form className="bg-white shadow-lg rounded-2xl p-6 space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-purple-800 font-semibold text-lg">Enter a Phone Number:</label>
          <input
            type="text"
            placeholder="e.g. 0412345678"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              localStorage.setItem('safeswipe_input', e.target.value);
            }}
            className="w-full px-4 py-2 border rounded-md"
          />
          <div className="flex gap-4">
            <button id="scanButton" type="button" onClick={handleScan} disabled={loading} className={`w-full py-3 text-lg font-medium rounded-md shadow-md text-white ${loading ? "bg-purple-500 animate-pulse" : "bg-purple-600 hover:bg-purple-700"}`}>
              {loading ? "Scanning..." : "Scan Now"}
            </button>
            <button type="button" onClick={handleClearSearch} className="w-full py-3 text-lg font-medium rounded-md shadow bg-gray-200 hover:bg-gray-300">
              Clear Search
            </button>
          </div>
        </form>
      </section>

      {/* Fake Report */}
      {showResult && (
        <section className="w-full max-w-4xl space-y-8 bg-white border rounded-2xl shadow-md p-8 text-left">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Scan Report</h2>
          <p className="text-gray-700"><strong>Phone Number:</strong> {inputValue}</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-5xl">👤</span>
            </div>
            <div className="space-y-2">
              <p><strong>Public Safety Score:</strong> 9.2/10 (SAFE ✅)</p>
              <p><strong>Carrier:</strong> Telstra</p>
              <p><strong>Type:</strong> Mobile</p>
            </div>
          </div>
          <hr className="my-6" />

          {/* Sections */}
          <div className="space-y-4">
            <p><strong>Possible Owners:</strong> Not Identified</p>
            <p><strong>Associated Usernames:</strong> Not Identified</p>
            <p><strong>Associated Emails:</strong> Not Identified</p>
            <p><strong>Associated Locations:</strong> Not Identified</p>
            <p><strong>Potential Date of Birth:</strong> Not Identified</p>
            <p><strong>Sex Offender Check:</strong> No Records Found</p>
            <p><strong>Public Info Sources:</strong> Not Found</p>
            <p><strong>Other Registered Platforms:</strong> None Found</p>
            <p><strong>Data Breaches:</strong> No Breaches Detected</p>
            <p><strong>Vehicle Records:</strong> None Found</p>
            <p><strong>Relationships:</strong> None Found</p>
            <p><strong>Professional Summary:</strong> None Found</p>
            <p><strong>Education History:</strong> None Found</p>
          </div>
        </section>
      )}

      {/* What You'll Discover */}
      <section className="max-w-6xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800 text-center">What You’ll Discover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {[
            { title: "Phone Ownership", desc: "Identify who may be behind the phone number." },
            { title: "Linked Profiles", desc: "See any associated accounts across major platforms." },
            { title: "Fraud Risk Alerts", desc: "Flagged numbers reported by others." },
            { title: "Location Insights", desc: "General location of carrier registration." },
            { title: "Social Media Clues", desc: "Discover social handles linked to the number." },
            { title: "Data Breach Alerts", desc: "Check if number was exposed in hacks." }
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
        <h2 className="text-3xl font-bold text-purple-800 text-center">Trusted by Thousands</h2>
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

      {/* Trust Badges */}
      <section className="w-full max-w-5xl text-center">
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <div className="bg-white border rounded-xl shadow p-4 w-64">
            <img src="/trustpilot.png" alt="Trustpilot" className="h-24 mx-auto mb-3" />
            <p className="text-yellow-400 text-2xl">★★★★★</p>
            <p className="text-sm text-gray-500">4.8 rating (2,541 reviews)</p>
          </div>
          <div className="bg-white border rounded-xl shadow p-4 w-64">
            <img src="/google-review.png" alt="Google" className="h-24 mx-auto mb-3" />
            <p className="text-yellow-400 text-2xl">★★★★★</p>
            <p className="text-sm text-gray-500">4.9 rating (1,934 reviews)</p>
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
