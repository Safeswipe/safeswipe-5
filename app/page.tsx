'use client';
import { useState, useEffect } from "react";
import './globals.css';

export default function Home() {
  const [showResult, setShowResult] = useState(false);

  const handleScan = (e) => {
    e.preventDefault();
    const btn = document.querySelector('#scanButton') as HTMLButtonElement;
    if (!btn) return;

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

  const isPaid = typeof window !== 'undefined' && window.location.search.includes('paid=true');

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 py-20 space-y-32 min-h-screen text-center">
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

        <form className="bg-white shadow-lg rounded-2xl p-6 space-y-4 text-left mt-10" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-purple-800 font-semibold text-lg">Upload a Photo or Enter a Username:</label>
          <input type="file" accept="image/*" className="w-full px-4 py-2 border rounded-md" id="imageInput" />
          <input type="text" placeholder="Or enter a username, email, or phone number" className="w-full px-4 py-2 border rounded-md" />
          <button id="scanButton" type="button" className="w-full py-3 text-lg font-medium rounded-md shadow-md text-white bg-purple-600 hover:bg-purple-700" onClick={handleScan}>Scan Now</button>

          <div id="scanResult"></div>

          {(showResult || isPaid) && (
            <div className='mt-4 w-full bg-white border border-purple-300 rounded-md shadow-md p-4'>
              <div className={`w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded mb-4 ${isPaid ? '' : 'blur-sm'}`}></div>
              <p className="text-purple-800 font-medium mb-4">
                {isPaid
                  ? 'This person appears on 4+ dating platforms and may be using different names or photos.'
                  : 'Results found. Please unlock the full report to view details.'}
              </p>
              {!isPaid && (
                <div className='flex flex-col md:flex-row gap-4'>
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
