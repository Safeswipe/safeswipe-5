'use client';
import { useEffect, useState } from "react";
import './globals.css';

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hasUsedOneTime, setHasUsedOneTime] = useState(false);

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
      setHasUsedOneTime(true);
      localStorage.setItem('safeswipe_used_once', 'true');
    } else if (savedInput && isPaid && plan === 'unlimited') {
      setInputValue(savedInput);
      setImagePreview(savedImage);
      setShowResult(true);
    }
  }, []);

  const handleImageUpload = (e) => {
    if (plan === 'onetime' && localStorage.getItem('safeswipe_used_once') === 'true') {
      alert("You've already used your one-time report. Please upgrade for unlimited access.");
      return;
    }

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

      if (plan === 'onetime' && hasUsedOneTime) {
        alert("You've already used your one-time report.");
      } else {
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

      {/* Hero & Scan Form */}
      <section className="space-y-6 max-w-3xl">
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
        </form>
      </section>

      {/* What You’ll Discover Section in Bubbles */}
      <section className="max-w-6xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800 text-center">What You’ll Discover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {[
            {
              title: "Social Media Matches",
              desc: "Find linked Instagram, Facebook, and dating profiles tied to a photo or name."
            },
            {
              title: "Reverse Image Hits",
              desc: "Detect if someone's photo appears elsewhere using our AI + database checks."
            },
            {
              title: "Alias Accounts",
              desc: "Uncover alternative usernames, email aliases, and suspicious duplicates."
            },
            {
              title: "Connected Phone Numbers",
              desc: "See what profiles and apps are tied to the number you searched."
            },
            {
              title: "Email Footprints",
              desc: "Check if an email is tied to known social or scam activity online."
            },
            {
              title: "Dating Profile Detection",
              desc: "Reveal hidden profiles on Tinder, Bumble, Hinge, and more."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-left border border-purple-100 hover:shadow-lg transition-all">
              <h4 className="text-lg font-semibold text-purple-700 mb-2">{item.title}</h4>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800">We Help Thousands of People Daily</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Jessica M.",
              review: "I found out my boyfriend had multiple dating profiles. SafeSwipe saved me months of lies!"
            },
            {
              name: "Aaron T.",
              review: "This gave me instant clarity on who I was really talking to. 100% recommend."
            },
            {
              name: "Nina D.",
              review: "I used it before a date and turns out he was using a fake identity. Lifesaver!"
            },
            {
              name: "Connor W.",
              review: "Very easy to use and worth the price. Helped me make a safe decision."
            }
          ].map((t, i) => (
            <div key={i} className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
              <div className="text-yellow-400 text-xl mb-2">★★★★★</div>
              <p className="text-gray-700 italic">“{t.review}”</p>
              <p className="mt-2 font-semibold text-purple-800">– {t.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
