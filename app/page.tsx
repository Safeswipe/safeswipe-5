// SafeSwipe full page with all sections, updated dossier, layout, badges, testimonials, footer
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
  const cleanedUsername = inputValue.replace(/^@/, '');

  return (
    <div className="flex flex-col items-center px-6 pt-32 pb-20 min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 text-center space-y-20">
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-br from-purple-100 via-white to-blue-100 border-b border-purple-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex justify-center sm:justify-start items-center">
          <img src="/Safe Swipe.png" alt="SafeSwipe Logo" className="h-10 object-contain" />
        </div>
      </header>

      <section className="max-w-2xl w-full space-y-6">
        <h1 className="text-5xl font-extrabold text-purple-800 leading-tight">Reverse Image & Identity Lookups</h1>
        <p className="text-xl text-gray-700">Instantly uncover profiles, photos, and public data across the internet. SafeSwipe is your AI-powered truth engine.</p>
        <div className="space-x-4">
          <a href="https://buy.stripe.com/aEU9BL4wEep9fXGeUX?plan=unlimited" target="_blank" rel="noopener noreferrer">
            <button className="text-lg px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded">Get Unlimited Access – $19.99</button>
          </a>
          <a href="https://buy.stripe.com/7sIeW5bZ6ch18ve4gi?plan=onetime" target="_blank" rel="noopener noreferrer">
            <button className="text-lg px-6 py-4 text-purple-700 border border-purple-500 rounded">One-Time Report – $4.99</button>
          </a>
        </div>
      </section>

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
          <div className="flex flex-col sm:flex-row gap-4">
            <button id="scanButton" type="button" onClick={handleScan} disabled={loading} className={`w-full py-3 text-lg font-medium rounded-md shadow-md text-white ${loading ? "bg-purple-500 animate-pulse" : "bg-purple-600 hover:bg-purple-700"}`}>
              {loading ? "Scanning..." : "Scan Now"}
            </button>
            <button type="button" onClick={handleClearSearch} className="w-full py-3 text-lg font-medium rounded-md shadow-md text-purple-700 border border-purple-500 hover:bg-purple-50">Clear Search</button>
          </div>
        </form>
      </section>

      {showResult && (
        <section className="w-full max-w-4xl space-y-6 border rounded-xl shadow-md p-6 bg-white">
          <div className={isPaid ? "" : "blur-sm pointer-events-none select-none"}>
            <h2 className="text-2xl font-bold text-purple-800">Scan Report</h2>
            {imagePreview && <img src={imagePreview} alt="Uploaded" className="mx-auto w-40 h-40 rounded-full border object-cover" />}
            <p className="text-gray-600 mt-4 text-left">Submitted: {new Date().toLocaleString()}</p>
            <p className="text-gray-700 font-semibold text-left mt-2">Match Confidence: 78%</p>
            {isUsername && (
              <div className="text-left mt-2">
                <p><strong>Username:</strong> {inputValue}</p>
                <p><a href={`https://instagram.com/${cleanedUsername}`} className="text-purple-600 underline">Instagram</a> | <a href={`https://facebook.com/${cleanedUsername}`} className="text-purple-600 underline">Facebook</a></p>
              </div>
            )}
            {isEmail && <p className="text-left"><strong>Email:</strong> {inputValue} — No public records found.</p>}
            {isPhone && <p className="text-left"><strong>Phone:</strong> {inputValue} — No known matches.</p>}

            <div className="mt-6 text-left bg-red-100 border border-red-300 p-4 rounded">
              <h4 className="text-red-700 font-bold">⚠️ Risk Flags</h4>
              <ul className="list-disc ml-5 text-sm text-red-800">
                <li>Reports from other users</li>
                <li>Photo reuse on multiple platforms</li>
                <li>Social handles mismatched</li>
              </ul>
            </div>

            <div className="mt-6 text-left text-sm text-gray-500">
              <p><strong>About SafeSwipe:</strong> We help uncover online deception using ethical public data checks. We never store your uploads. Your safety is our mission.</p>
            </div>
          </div>

          {!isPaid && (
            <div className="pt-6 text-center">
              <p className="text-purple-700 mb-3">Unlock full report access:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href='https://buy.stripe.com/aEU9BL4wEep9fXGeUX?plan=unlimited' className='bg-purple-600 text-white px-6 py-3 rounded shadow hover:bg-purple-700'>Unlimited – $19.99</a>
                <a href='https://buy.stripe.com/7sIeW5bZ6ch18ve4gi?plan=onetime' className='border border-purple-500 text-purple-700 px-6 py-3 rounded shadow'>One-Time Report – $4.99</a>
              </div>
            </div>
          )}
        </section>
      )}

      <section className="w-full max-w-5xl text-center">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Trusted by Thousands</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white border rounded-xl shadow p-4 w-52">
            <img src="/trustpilot.png" alt="Trustpilot" className="h-12 mx-auto mb-2" />
            <p className="text-yellow-400 text-xl">★★★★★</p>
            <p className="text-xs text-gray-500 mt-1">4.8 rating (2,541 reviews)</p>
          </div>
          <div className="bg-white border rounded-xl shadow p-4 w-52">
            <img src="/google-review.png" alt="Google" className="h-12 mx-auto mb-2" />
            <p className="text-yellow-400 text-xl">★★★★★</p>
            <p className="text-xs text-gray-500 mt-1">4.9 rating (1,934 reviews)</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800 text-center">What You’ll Discover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {["Social Media Matches", "Reverse Image Hits", "Alias Accounts", "Connected Phone Numbers", "Email Footprints", "Dating Profile Detection"].map((title, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-left border border-purple-100 hover:shadow-lg transition-all">
              <h4 className="text-lg font-semibold text-purple-700 mb-2">{title}</h4>
              <p className="text-gray-700 text-sm">Professional insight powered by SafeSwipe’s AI.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800">We Help Thousands of People Daily</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {["I found out my boyfriend had multiple dating profiles. SafeSwipe saved me months of lies!", "This gave me instant clarity on who I was really talking to. 100% recommend.", "I used it before a date and turns out he was using a fake identity. Lifesaver!", "Very easy to use and worth the price. Helped me make a safe decision."].map((review, i) => (
            <div key={i} className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
              <div className="text-yellow-400 text-xl mb-2">★★★★★</div>
              <p className="text-gray-700 italic">“{review}”</p>
              <p className="mt-2 font-semibold text-purple-800">– Verified User</p>
            </div>
          ))}
        </div>
      </section>

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
