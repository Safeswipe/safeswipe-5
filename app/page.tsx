'use client';
import { useEffect, useState } from "react";
import './globals.css';

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const isPaid = typeof window !== 'undefined' && window.location.search.includes('paid=true');

  // 🧠 Restore input from localStorage after Stripe redirect
  useEffect(() => {
    const savedInput = localStorage.getItem('safeswipe_input');
    if (savedInput && window.location.search.includes('paid=true')) {
      setInputValue(savedInput);
      setShowResult(true);
    }
  }, []);

  const handleScan = (e) => {
    e.preventDefault();
    const btn = document.querySelector('#scanButton') as HTMLButtonElement;
    if (!btn) return;

    localStorage.setItem('safeswipe_input', inputValue); // 💾 Save input

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

  const isEmail = inputValue.includes('@');
  const isPhone = /^\d{6,}$/.test(inputValue);
  const isUsername = !isEmail && !isPhone && inputValue.trim() !== '';

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 py-20 space-y-32 min-h-screen text-center">
      
      {/* Hero */}
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
          <input type="file" accept="image/*" className="w-full px-4 py-2 border rounded-md" />
          <input
            type="text"
            placeholder="e.g. @username, john@email.com, or 0412345678"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button id="scanButton" type="button" className="w-full py-3 text-lg font-medium rounded-md shadow-md text-white bg-purple-600 hover:bg-purple-700" onClick={handleScan}>Scan Now</button>

          {/* Result */}
          {(showResult || isPaid) && (
            <div className='mt-6 w-full bg-white border border-purple-300 rounded-md shadow-md p-6 space-y-4'>
              <h3 className="text-xl font-bold text-purple-800">Scan Results</h3>
              <div className={`space-y-4 ${isPaid ? '' : 'blur-sm'}`}>
                {isUsername && (
                  <>
                    <p className="text-gray-700">We found multiple profiles tied to the username <strong>{inputValue}</strong>:</p>
                    <ul className="text-left text-gray-700 list-disc pl-6 space-y-1">
                      <li>Instagram: <a className="text-purple-700 underline" href={`https://instagram.com/${inputValue.replace('@', '')}`} target="_blank">@{inputValue.replace('@', '')}</a></li>
                      <li>Facebook: <a className="text-purple-700 underline" href={`https://facebook.com/${inputValue.replace('@', '')}`} target="_blank">{inputValue.replace('@', '')}</a></li>
                    </ul>
                  </>
                )}

                {isEmail && (
                  <p className="text-gray-700">No information was found tied to <strong>{inputValue}</strong>.</p>
                )}

                {isPhone && (
                  <p className="text-gray-700">No public data was found for phone number <strong>{inputValue}</strong>.</p>
                )}

                {!inputValue && (
                  <>
                    <ul className="text-left text-gray-700 list-disc pl-6 space-y-1">
                      <li><strong>Name:</strong> Ashley T.</li>
                      <li><strong>Known Aliases:</strong> ash_tinder, ashley.sydney</li>
                      <li><strong>Emails:</strong> ash.t123@gmail.com</li>
                      <li><strong>Phone Activity:</strong> Linked to WhatsApp and Telegram</li>
                      <li><strong>Profiles:</strong> Tinder, Bumble, Facebook Dating, Instagram</li>
                    </ul>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" className="rounded-xl border" />
                      <img src="https://randomuser.me/api/portraits/women/45.jpg" className="rounded-xl border" />
                    </div>
                  </>
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
