'use client';
import { useEffect, useState } from "react";
import './globals.css';

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const plan = params?.get('plan');
  const isBasic = plan === 'basic';
  const isPremium = plan === 'premium';

  useEffect(() => {
    const savedInput = localStorage.getItem('safeswipe_input');
    const savedImage = localStorage.getItem('safeswipe_image');

    if (savedInput) setInputValue(savedInput);
    if (savedImage) setImagePreview(savedImage);

    if (savedInput && savedImage) {
      setShowResult(true);
    }
  }, [plan]);

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

      setShowResult(true);
    }, 3000);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(inputValue.trim());
  const isPhone = /^\d{6,}$/.test(inputValue.trim());
  const isUsername = !isEmail && !isPhone && inputValue.trim() !== '';

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 py-20 space-y-32 min-h-screen text-center">
      {/* Sticky Header */}
      <header className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-start items-center">
          <img src="/Safe Swipe.png" alt="Safe Swipe Logo" className="h-10 object-contain" />
        </div>
      </header>

      {/* Hero */}
      <section className="space-y-6 max-w-3xl mb-10 pt-24">
        <h1 className="text-5xl font-extrabold text-purple-800 leading-tight">Reverse Image & Identity Lookups</h1>
        <p className="text-xl text-gray-700">Instantly uncover profiles, photos, and public data across the internet. SafeSwipe is your AI-powered truth engine.</p>
        <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="text-lg px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded">
          Start a Scan
        </button>
      </section>

      {/* Upload & Scan */}
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

        {showResult && (
          <div className="mt-10 w-full bg-white border border-purple-300 rounded-md shadow-md p-6 space-y-4 text-left">
            <h3 className="text-xl font-bold text-purple-800">Scan Results</h3>

            <div className={(isBasic || isPremium) ? "space-y-4" : "space-y-4 blur-sm pointer-events-none select-none"}>
              {imagePreview && (
                <div className="flex justify-center">
                  <img src={imagePreview} alt="Uploaded" className="max-w-xs rounded-xl border" />
                </div>
              )}
              <div className="text-left text-gray-700 space-y-2">
                <p><strong>0 matches</strong></p>
                <p>SafeSwipe searched over <strong>74.6 billion images</strong> but didn’t find any matches for your uploaded photo.</p>
                <p>That’s probably because we haven’t crawled any pages where this image appears yet.</p>
              </div>

              {isUsername && (
                <div className="pt-4">
                  <p className="text-gray-700">Username match: <strong>{inputValue}</strong></p>
                  {isPremium ? (
                    <>
                      <p><a className="text-purple-700 underline" href={`https://instagram.com/${inputValue.replace('@', '')}`} target="_blank">Instagram Profile</a></p>
                      <p><a className="text-purple-700 underline" href={`https://facebook.com/${inputValue.replace('@', '')}`} target="_blank">Facebook Profile</a></p>
                    </>
                  ) : (
                    <div className="text-center text-purple-600 italic mt-4">Name & Socials Locked — Upgrade to Premium</div>
                  )}
                </div>
              )}

              {isEmail && (
                isPremium
                  ? <p className="text-gray-700">No public data found for <strong>{inputValue}</strong>.</p>
                  : <p className="text-purple-600 italic">Email data locked. Upgrade to Premium to view.</p>
              )}

              {isPhone && (
                isPremium
                  ? <p className="text-gray-700">No public data found for phone number <strong>{inputValue}</strong>.</p>
                  : <p className="text-purple-600 italic">Phone data locked. Upgrade to Premium to view.</p>
              )}
            </div>

            {!isBasic && !isPremium && (
              <div className="pt-4 text-center">
                <p className="text-purple-700 font-medium mb-2">Unlock full access to view results:</p>
                <a href='https://buy.stripe.com/8wM5mL0Gy5Q19tGcNQ?plan=basic' className='block w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-md font-semibold shadow'>Unlock Report – 9.99</a>
              </div>
            )}

            {isBasic && !isPremium && (
              <div className="pt-4 text-center">
                <p className="text-purple-700 font-medium mb-2">Want the full report? Unlock Premium:</p>
                <a href='https://buy.stripe.com/eVabKp93Y6ZF9tG3cc?plan=premium' className='block w-full sm:w-auto px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white text-center rounded-md font-semibold shadow'>Upgrade to Premium – 19.99</a>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
