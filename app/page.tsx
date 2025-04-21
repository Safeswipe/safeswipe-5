'use client';
import { useEffect, useState } from "react";
import './globals.css';

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isPaid = params.get('paid') === 'true';
    const plan = params.get('plan');
    const usedOneTime = localStorage.getItem('safeswipe_used_once');

    if (!isPaid) {
      localStorage.removeItem('safeswipe_input');
      localStorage.removeItem('safeswipe_image');
      sessionStorage.removeItem('safeswipe_input');
      sessionStorage.removeItem('safeswipe_image');
    }

    const savedInput = localStorage.getItem('safeswipe_input') || sessionStorage.getItem('safeswipe_input');
    const savedImage = localStorage.getItem('safeswipe_image') || sessionStorage.getItem('safeswipe_image');

    if (savedInput) setInputValue(savedInput);
    if (savedImage) setImagePreview(savedImage);

    const isReturningWithPaidLink = isPaid && (plan === 'unlimited' || (plan === 'onetime' && usedOneTime !== 'true'));

    if (savedInput && savedImage && isReturningWithPaidLink) {
      setShowResult(true);
      if (plan === 'onetime') {
        localStorage.setItem('safeswipe_used_once', 'true');
      }
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
      sessionStorage.setItem('safeswipe_image', base64);
    };
    reader.readAsDataURL(file);
  };

  const handleScan = (e) => {
    e.preventDefault();
    const btn = document.querySelector('#scanButton') as HTMLButtonElement;
    if (!btn) return;

    localStorage.setItem('safeswipe_input', inputValue);
    sessionStorage.setItem('safeswipe_input', inputValue);

    btn.innerText = 'Scanning...';
    btn.disabled = true;
    btn.classList.add('animate-pulse');

    setTimeout(() => {
      btn.innerText = 'Scan Now';
      btn.disabled = false;
      btn.classList.remove('animate-pulse');

      const plan = new URLSearchParams(window.location.search).get('plan');
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
      <h1 className="text-3xl font-bold text-purple-700">SafeSwipe is ready</h1>
      {/* You can paste your full layout JSX here again, or let me know and I’ll reinsert the full layout */}
    </div>
  );
 }