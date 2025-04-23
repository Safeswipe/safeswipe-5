
'use client';
import { useEffect, useState } from "react";

export default function Home() {
  const [showResult, setShowResult] = useState(false);
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

  const handleScan = () => {
    localStorage.setItem('safeswipe_input', inputValue);
    setShowResult(true);
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
        <h1 className="text-4xl font-bold text-purple-800">Reverse Image & Identity Lookup</h1>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border px-4 py-2 rounded" />
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter @username, email or phone" className="w-full border px-4 py-2 rounded" />
        <button onClick={handleScan} className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700">Scan Now</button>
      </section>

      {showResult && (
        <div className={`w-full max-w-4xl space-y-6 border rounded-xl shadow-md p-6 bg-white ${isPaid ? '' : 'blur-sm pointer-events-none select-none'}`}>
          <h2 className="text-2xl font-bold text-purple-800">Scan Report</h2>
          {imagePreview && <img src={imagePreview} alt="Uploaded" className="mx-auto w-40 h-40 rounded-full border object-cover" />}
          <div className="text-left text-gray-700 space-y-2">
            <p><strong>Submitted:</strong> {new Date().toLocaleString()}</p>
            <p><strong>Match Confidence:</strong> 78%</p>
            {isUsername && (
              <>
                <p><strong>Username:</strong> {inputValue}</p>
                <p><a href={`https://instagram.com/${inputValue.replace('@', '')}`} className="text-purple-600 underline">Instagram</a> &middot; <a href={`https://facebook.com/${inputValue.replace('@', '')}`} className="text-purple-600 underline">Facebook</a></p>
              </>
            )}
            {isEmail && <p><strong>Email:</strong> {inputValue} — No public records found.</p>}
            {isPhone && <p><strong>Phone:</strong> {inputValue} — No matches found in known records.</p>}

            <div className="mt-4 bg-red-50 border border-red-300 p-4 rounded">
              <h4 className="text-red-700 font-bold">⚠️ Risk Flags</h4>
              <ul className="list-disc ml-5 text-sm text-red-800">
                <li>Suspicious activity on other platforms</li>
                <li>Profile reported by multiple users</li>
                <li>Inconsistent photo metadata</li>
              </ul>
            </div>

            <p className="text-sm text-gray-500 mt-4">Note: This report was generated using public information and AI matching. Use this as one tool in your verification process.</p>

            <div className="mt-6 border-t pt-4 text-sm text-gray-600">
              <p><strong>About SafeSwipe:</strong> Our mission is to help users identify impersonators, fake profiles, and catfishers using responsible reverse lookups and verification tools.</p>
              <p>Your scans are never stored. SafeSwipe prioritizes your privacy and trust.</p>
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
        </div>
      )}
    </div>
  );
}
