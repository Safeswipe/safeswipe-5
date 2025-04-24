
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

  const handleScan = () => {
    localStorage.setItem('safeswipe_input', inputValue);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
      if (plan === 'onetime') {
        localStorage.setItem('safeswipe_used_once', 'true');
      }
    }, 6000);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(inputValue.trim());
  const isPhone = /^\d{6,}$/.test(inputValue.trim());
  const isUsername = !isEmail && !isPhone && inputValue.trim() !== '';

  return (
    <div className="flex flex-col items-center px-6 pt-32 pb-20 min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 text-center space-y-20">

      {isPaid && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded w-full max-w-2xl text-center">
          Payment successful. Please scan again to view your report.
        </div>
      )}

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
          <button
            id="scanButton"
            type="button"
            onClick={handleScan}
            disabled={loading}
            className={`w-full py-3 text-lg font-medium rounded-md shadow-md text-white ${loading ? "bg-purple-500 animate-pulse" : "bg-purple-600 hover:bg-purple-700"}`}
          >
            {loading ? "Scanning..." : "Scan Now"}
          </button>
        </form>
      </section>

      {showResult && (
        <section className="w-full max-w-4xl space-y-6 border rounded-xl shadow-md p-6 bg-white">
          <div className={isPaid ? "" : "blur-sm pointer-events-none select-none"}>
            <h2 className="text-2xl font-bold text-purple-800">Scan Report</h2>
            {imagePreview && <img src={imagePreview} alt="Uploaded" className="mx-auto w-40 h-40 rounded-full border object-cover" />}
            <p className="text-gray-600 mt-4 text-left">Submitted: {new Date().toLocaleString()}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-left">
              <div>
                <h4 className="text-purple-700 font-bold mb-2">Identity Snapshot</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Name:</strong> Ashley T. (alias)</li>
                  <li><strong>Location:</strong> Melbourne, VIC</li>
                  <li><strong>Known Profiles:</strong> 3</li>
                  <li><strong>Risk Level:</strong> Moderate</li>
                </ul>
              </div>
              <div>
                <h4 className="text-purple-700 font-bold mb-2">Timeline Activity</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>🔍 Found on 2 dating apps in 48hrs</li>
                  <li>📷 Reverse image matched twice</li>
                  <li>📱 Phone number linked to 2 profiles</li>
                  <li>📧 Email has 1 flagged record</li>
                </ul>
              </div>
            </div>
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

          {isPaid && showResult && (
            <button
              onClick={() => {
                setImagePreview(null);
                setInputValue('');
                setShowResult(false);
                localStorage.removeItem('safeswipe_image');
                localStorage.removeItem('safeswipe_input');
              }}
              className="mt-6 bg-gray-100 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-200"
            >
              Clear Search
            </button>
          )}
        </section>
      )

    }
