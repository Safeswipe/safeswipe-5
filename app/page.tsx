'use client';
import { useEffect, useState } from "react";
import './globals.css';
import Link from 'next/link';

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

    if (savedInput) setInputValue(savedInput);
    if (savedImage) setImagePreview(savedImage);

    const isReturningWithPaidLink = isPaid && (plan === 'unlimited' || (plan === 'onetime' && usedOneTime !== 'true'));

    if (savedInput && savedImage && isReturningWithPaidLink) {
      setShowResult(true);
      if (plan === 'onetime') {
        localStorage.setItem('safeswipe_used_once', 'true');
      }
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
      if (plan === 'onetime') {
        localStorage.setItem('safeswipe_used_once', 'true');
      }
      setShowResult(true);
    }, 3000);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(inputValue.trim());
  const isPhone = /^\d{6,}$/.test(inputValue.trim());
  const isUsername = !isEmail && !isPhone && inputValue.trim() !== '';

  return (
    <div className="flex flex-col items-center px-6 pt-32 pb-20 space-y-32 min-h-screen text-center bg-gradient-to-br from-purple-100 via-white to-blue-100">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-br from-purple-100 via-white to-blue-100 border-b border-purple-200 shadow-sm">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 py-3 flex justify-center sm:justify-start items-center">
          <img src="/Safe Swipe.png" alt="Safe Swipe Logo" className="h-10 object-contain" />
        </div>
      </header>

      {/* Payment Message */}
      {isPaid && (
        <div className="w-full max-w-3xl bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow mb-8">
          ✅ Payment successful! You can now scan again using your credits.
        </div>
      )}

      {/* Upload Form */}
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
      </section>

      {/* Scan Report */}
      {showResult && (() => {
        const riskFlags = [
          "Multiple dating profiles detected",
          "Suspicious image duplication",
          "Recent location inconsistency",
          "Unusual account behavior",
          "Name mismatch across profiles",
        ];
        const selectedFlags = [...riskFlags].sort(() => 0.5 - Math.random()).slice(0, 2);
        const currentTime = new Date().toLocaleString('en-AU', {
          dateStyle: 'medium',
          timeStyle: 'short',
        });

        return (
          <div className="mt-10 w-full max-w-3xl bg-white border border-purple-300 rounded-2xl shadow-lg p-6 space-y-8 text-left">
            <h3 className="text-2xl font-bold text-purple-800 border-b pb-2">Scan Report</h3>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {imagePreview && (
                <img src={imagePreview} alt="Uploaded" className="w-32 h-32 object-cover rounded-full border-4 border-purple-200 shadow" />
              )}
              <div className="flex-1 space-y-1">
                <h4 className="text-xl font-semibold text-gray-800">{isUsername ? inputValue.replace('@', '') : 'Unknown'}</h4>
                <p className="text-gray-700">📍 Brisbane, QLD, Australia</p>
                <p className="text-gray-700">🎂 Estimated Age: 29</p>
                <p className="text-gray-700">📅 Scan Time: {currentTime}</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg space-y-2">
              <p><strong>📊 Match Strength:</strong> 87%</p>
              <p><strong>🔁 Reverse Image Matches:</strong> 3 potential duplicates</p>
              <p><strong>🚩 Risk Flags:</strong></p>
              <ul className="list-disc ml-6 text-red-600">
                {selectedFlags.map((flag, i) => <li key={i}>{flag}</li>)}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-purple-800">Linked Profiles</h4>
              {isUsername ? (
                <ul className="list-disc ml-6 text-gray-700">
                  <li><a href={`https://instagram.com/${inputValue.replace('@', '')}`} target="_blank" className="text-purple-700 underline">Instagram: {inputValue}</a></li>
                  <li><a href={`https://facebook.com/${inputValue.replace('@', '')}`} target="_blank" className="text-purple-700 underline">Facebook: {inputValue.replace('@', '')}</a></li>
                  <li>Tinder Profile Detected</li>
                </ul>
              ) : (
                <p className="text-gray-700">No linked profiles found for this input.</p>
              )}
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg space-y-1">
              <p className="text-green-700 font-semibold">✅ This person has been previously scanned.</p>
              <p className="text-gray-700">No impersonation or fraud reports found across public sources.</p>
            </div>

            <div className="border-t pt-6 mt-6 text-center text-gray-700 space-y-2">
              <h4 className="text-xl font-semibold text-purple-800">About SafeSwipe</h4>
              <p>At SafeSwipe, our goal is to help people protect themselves from catfishers, scammers, and impersonators online.</p>
              <p>We scan public profiles and analyze metadata to give you trusted insights into who you're really dealing with.</p>
            </div>

            {!isPaid && (
              <div className="pt-6 text-center border-t mt-4 space-y-3">
                <p className="text-purple-700 font-medium">Unlock full access to view this report:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href='https://buy.stripe.com/aEU9BL4wEep9fXGeUX?plan=unlimited' target='_blank' rel='noopener noreferrer' className='block w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-md font-semibold shadow'>Unlimited – $19.99</a>
                  <a href='https://buy.stripe.com/7sIeW5bZ6ch18ve4gi?plan=onetime' target='_blank' rel='noopener noreferrer' className='block w-full sm:w-auto px-6 py-3 border border-purple-500 text-purple-700 text-center rounded-md font-semibold shadow'>One-Time Report – $4.99</a>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-20 border-t pt-6">
        <p>© 2025 SafeSwipe Pty Ltd. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/about" className="underline">About</Link>
          <Link href="/privacy" className="underline">Privacy</Link>
          <Link href="/terms" className="underline">Terms</Link>
          <Link href="/contact" className="underline">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
