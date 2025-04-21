'use client';
import { useEffect, useState } from "react";
import './globals.css';

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isPaid = params?.get('paid') === 'true';
  const plan = params?.get('plan');

  useEffect(() => {
    const savedInput = localStorage.getItem('safeswipe_input');
    const savedImage = localStorage.getItem('safeswipe_image');
    const usedOneTime = localStorage.getItem('safeswipe_used_once');

    if (savedInput && isPaid && plan === 'onetime' && usedOneTime !== 'true') {
      setInputValue(savedInput);
      setImagePreview(savedImage);
      setShowResult(true);
      localStorage.setItem('safeswipe_used_once', 'true');
    } else if (savedInput && isPaid && plan === 'unlimited') {
      setInputValue(savedInput);
      setImagePreview(savedImage);
      setShowResult(true);
    }
  }, []);

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

      const usedOneTime = localStorage.getItem('safeswipe_used_once');

      if (plan === 'onetime' && usedOneTime === 'true') {
        alert("You've already used your one-time report.");
      } else {
        if (plan === 'onetime') {
          localStorage.setItem('safeswipe_used_once', 'true');
        }
        setShowResult(true);
      }
    }, 3000);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(inputValue.trim());
  const isPhone = /^\d{6,}$/.test(inputValue.trim());
  const isUsername = !isEmail && !isPhone && inputValue.trim() !== '';

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 py-20 space-y-32 min-h-screen text-center">
      <section className="max-w-3xl w-full">
        <form className="bg-white shadow-lg rounded-2xl p-6 space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-purple-800 font-semibold text-lg">Upload a Photo or Enter a Username, Email or Phone Number:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-4 py-2 border rounded-md" />
          <input
            type="text"
            placeholder="e.g. @username, john@email.com, or 0412345678"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button id="scanButton" type="button" className="w-full py-3 text-lg font-medium rounded-md shadow-md text-white bg-purple-600 hover:bg-purple-700" onClick={handleScan}>Scan Now</button>
        </form>

        {showResult && (
          <div className="mt-10 w-full bg-white border border-purple-300 rounded-md shadow-md p-6 space-y-4 text-left">
            <h3 className="text-xl font-bold text-purple-800">Scan Results</h3>
            <div className={isPaid ? "space-y-4" : "space-y-4 blur-sm pointer-events-none select-none"}>
              {imagePreview && (
                <div className="flex justify-center">
                  <img src={imagePreview} alt="Uploaded" className="max-w-xs rounded-xl border" />
                </div>
              )}
              <div className="text-left text-gray-700 space-y-2">
                <p><strong>0 matches</strong></p>
                <p>
                  SafeSwipe searched over <strong>74.6 billion images</strong> but didn’t find any matches for your uploaded photo.
                </p>
                <p>
                  That’s probably because we haven’t crawled any pages where this image appears yet. SafeSwipe is always expanding its scan database, so try again soon.
                </p>
                <p className="text-sm italic text-gray-500">
                  Using SafeSwipe is private. We do not save your uploaded images.
                </p>
              </div>
              {isUsername && (
                <div className="pt-4">
                  <p className="text-gray-700">Username match: <strong>{inputValue}</strong></p>
                  <p><a className="text-purple-700 underline" href={`https://instagram.com/${inputValue.replace('@', '')}`} target="_blank">Instagram Profile</a></p>
                  <p><a className="text-purple-700 underline" href={`https://facebook.com/${inputValue.replace('@', '')}`} target="_blank">Facebook Profile</a></p>
                </div>
              )}
              {isEmail && (
                <p className="text-gray-700">No public data found for <strong>{inputValue}</strong>.</p>
              )}
              {isPhone && (
                <p className="text-gray-700">No public data found for phone number <strong>{inputValue}</strong>.</p>
              )}
            </div>
            {!isPaid && (
              <div className="pt-4 text-center">
                <p className="text-purple-700 font-medium mb-2">Unlock full access to view results:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href='https://buy.stripe.com/aEU9BL4wEep9fXGeUX?plan=unlimited' target='_blank' rel='noopener noreferrer' className='block w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-md font-semibold shadow'>Unlimited – $19.99</a>
                  <a href='https://buy.stripe.com/7sIeW5bZ6ch18ve4gi?plan=onetime' target='_blank' rel='noopener noreferrer' className='block w-full sm:w-auto px-6 py-3 border border-purple-500 text-purple-700 text-center rounded-md font-semibold shadow'>One-Time Report – $4.99</a>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
