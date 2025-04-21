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
      
      {/* Sticky Header */}
     <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-white via-purple-50 to-blue-50 shadow-lg">
  <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 py-3 flex justify-center sm:justify-start items-center">
    <img
      src="/Safe Swipe.png"
      alt="Safe Swipe Logo"
      className="h-10 object-contain"
    />
  </div>
</header>

      {/* Hero Section */}
      <section className="space-y-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold text-purple-800 leading-tight">Reverse Image & Identity Lookups</h1>
        <p className="text-xl text-gray-700">
          Instantly uncover profiles, photos, and public data across the internet. SafeSwipe is your AI-powered truth engine.
        </p>
        <div className="space-x-4">
          <a href="https://buy.stripe.com/aEU9BL4wEep9fXGeUX?plan=unlimited" target="_blank" rel="noopener noreferrer">
            <button className="text-lg px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded">
              Get Unlimited Access – $19.99
            </button>
          </a>
          <a href="https://buy.stripe.com/7sIeW5bZ6ch18ve4gi?plan=onetime" target="_blank" rel="noopener noreferrer">
            <button className="text-lg px-6 py-4 text-purple-700 border border-purple-500 rounded">
              One-Time Report – $4.99
            </button>
          </a>
        </div>
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

      {/* What You’ll Discover Section */}
      <section className="max-w-6xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800 text-center">What You’ll Discover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {[
            { title: "Social Media Matches", desc: "Find linked Instagram, Facebook, and dating profiles tied to a photo or name." },
            { title: "Reverse Image Hits", desc: "Detect if someone's photo appears elsewhere using our AI + database checks." },
            { title: "Alias Accounts", desc: "Uncover alternative usernames, email aliases, and suspicious duplicates." },
            { title: "Connected Phone Numbers", desc: "See what profiles and apps are tied to the number you searched." },
            { title: "Email Footprints", desc: "Check if an email is tied to known social or scam activity online." },
            { title: "Dating Profile Detection", desc: "Reveal hidden profiles on Tinder, Bumble, Hinge, and more." }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-left border border-purple-100 hover:shadow-lg transition-all">
              <h4 className="text-lg font-semibold text-purple-700 mb-2">{item.title}</h4>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-4xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800">We Help Thousands of People Daily</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: "Jessica M.", review: "I found out my boyfriend had multiple dating profiles. SafeSwipe saved me months of lies!" },
            { name: "Aaron T.", review: "This gave me instant clarity on who I was really talking to. 100% recommend." },
            { name: "Nina D.", review: "I used it before a date and turns out he was using a fake identity. Lifesaver!" },
            { name: "Connor W.", review: "Very easy to use and worth the price. Helped me make a safe decision." }
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
