'use client';
import { useEffect, useState } from "react";
import './globals.css';

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const isPaid = typeof window !== 'undefined' && window.location.search.includes('paid=true');

  // Restore input and image after payment redirect
  useEffect(() => {
    const savedInput = localStorage.getItem('safeswipe_input');
    const savedImage = localStorage.getItem('safeswipe_image');
    if (savedInput && isPaid) {
      setInputValue(savedInput);
      setShowResult(true);
    }
    if (savedImage && isPaid) {
      setImagePreview(savedImage);
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
      setShowResult(true);
    }, 3000);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(inputValue.trim());
  const isPhone = /^\d{6,}$/.test(inputValue.trim());
  const isUsername = !isEmail && !isPhone && inputValue.trim() !== '';

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 py-20 space-y-32 min-h-screen text-center">
      
      {/* Hero Section */}
      <section className="space-y-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold text-purple-800 leading-tight">Reverse Image & Identity Lookups</h1>
        <p className="text-xl text-gray-700">Instantly uncover profiles, photos, and public data across the internet. SafeSwipe is your AI-powered truth engine.</p>
        <div className="space-x-4">
          <a href="https://buy.stripe.com/aEU9BL4wEep9fXGeUX" target="_blank" rel="noopener noreferrer">
            <button className="text-lg px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded">Get Unlimited Access – $19.99</button>
          </a>
          <a href="https://buy.stripe.com/7sIeW5bZ6ch18ve4gi" target="_blank" rel="noopener noreferrer">
            <button className="text-lg px-6 py-4 text-purple-700 border border-purple-500 rounded">One-Time Report – $4.99</button>
          </a>
        </div>

        {/* Form */}
        <form className="bg-white shadow-lg rounded-2xl p-6 space-y-4 text-left mt-10" onSubmit={(e) => e.preventDefault()}>
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

          {(showResult || isPaid) && (
            <div className='mt-6 w-full bg-white border border-purple-300 rounded-md shadow-md p-6 space-y-4'>
              <h3 className="text-xl font-bold text-purple-800">Scan Results</h3>
              <div className={`space-y-4 ${isPaid ? '' : 'blur-sm'}`}>
                
                {/* Uploaded Image Preview */}
                {imagePreview && (
                  <div className="flex justify-center">
                    <img src={imagePreview} alt="Uploaded" className="max-w-xs rounded-xl border" />
                  </div>
                )}

                {/* Fake SafeSwipe Reverse Image Result */}
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

                {/* Optional: Username/Email/Phone logic (can be removed if needed) */}
                {isUsername && (
                  <div className="pt-4 text-left">
                    <p className="text-gray-700">Additional matches found tied to username <strong>{inputValue}</strong>:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Instagram: <a className="text-purple-700 underline" href={`https://instagram.com/${inputValue.replace('@', '')}`} target="_blank">@{inputValue.replace('@', '')}</a></li>
                      <li>Facebook: <a className="text-purple-700 underline" href={`https://facebook.com/${inputValue.replace('@', '')}`} target="_blank">{inputValue.replace('@', '')}</a></li>
                    </ul>
                  </div>
                )}
                {isEmail && (
                  <p className="text-gray-700">No additional public information found for <strong>{inputValue}</strong>.</p>
                )}
                {isPhone && (
                  <p className="text-gray-700">No public data linked to phone number <strong>{inputValue}</strong>.</p>
                )}
              </div>

              {!isPaid && (
                <div className='flex flex-col md:flex-row gap-4 pt-4'>
                  <a href='https://buy.stripe.com/aEU9BL4wEep9fXGeUX' target='_blank' rel='noopener noreferrer' className='block w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-md font-semibold shadow'>Unlock Unlimited – $19.99</a>
                  <a href='https://buy.stripe.com/7sIeW5bZ6ch18ve4gi' target='_blank' rel='noopener noreferrer' className='block w-full px-6 py-3 border border-purple-500 text-purple-700 text-center rounded-md font-semibold shadow'>One-Time Report – $4.99</a>
                </div>
              )}
            </div>
          )}
        </form>
      </section>
    </div>
  );
}
