'use client';
import { useEffect, useState } from "react";
import './globals.css';

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<'none' | 'basic' | 'premium'>('none');

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isPaid = params?.get('paid') === 'true';
  const plan = params?.get('plan');

  useEffect(() => {
    const savedInput = localStorage.getItem('safeswipe_input');
    const savedImage = localStorage.getItem('safeswipe_image');

    if (savedInput) setInputValue(savedInput);
    if (savedImage) setImagePreview(savedImage);

    if (isPaid && (plan === 'basic' || plan === 'premium')) {
      setCurrentPlan(plan);
      setShowResult(true);
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
      setShowResult(true);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 py-20 space-y-32 min-h-screen text-center">
      <header className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-start items-center">
          <img src="/Safe Swipe.png" alt="Safe Swipe Logo" className="h-10 object-contain" />
        </div>
      </header>

      <section className="space-y-6 max-w-3xl mb-10 pt-24">
        <h1 className="text-5xl font-extrabold text-purple-800 leading-tight">Reverse Image & Identity Lookups</h1>
        <p className="text-xl text-gray-700">Instantly uncover profiles, photos, and public data across the internet.</p>
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
          <button id="scanButton" type="button" className="w-full py-3 text-lg font-medium rounded-md shadow-md text-white bg-purple-600 hover:bg-purple-700" onClick={handleScan}>Scan Now</button>
        </form>

        {showResult && (
          <div className="mt-10 w-full bg-white border border-purple-300 rounded-md shadow-md p-6 space-y-4 text-left">
            <h3 className="text-xl font-bold text-purple-800">Scan Results</h3>
            <div className={currentPlan === 'none' ? "blur-sm select-none pointer-events-none" : ""}>
              {imagePreview && (
                <div className="flex justify-center">
                  <img src={imagePreview} alt="Uploaded" className="max-w-xs rounded-xl border" />
                </div>
              )}
              <div className="text-gray-700 space-y-2 pt-4">
                <p><strong>0 matches</strong></p>
                <p>No public data found for <strong>{inputValue}</strong>.</p>
              </div>
              {currentPlan === 'basic' && (
                <div className="pt-4 text-center">
                  <p className="text-purple-700 font-medium mb-2">Unlock premium details:</p>
                  <a href="https://buy.stripe.com/aEU9BL4wEep9fXGeUX?plan=premium" className="block px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md shadow">Unlock Premium – 19.99</a>
                </div>
              )}
            </div>
            {currentPlan === 'none' && (
              <div className="pt-4 text-center">
                <p className="text-purple-700 font-medium mb-2">Unlock to view full results:</p>
                <a href="https://buy.stripe.com/7sIeW5bZ6ch18ve4gi?plan=basic" className="block px-6 py-3 bg-purple-600 text-white font-semibold rounded-md shadow">Unlock for $9.99</a>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
