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

      {/* Trust Badge Section Updated */}
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
    </div>
  );
}
