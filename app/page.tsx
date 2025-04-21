'use client';

import { useState, useEffect } from "react";
import './globals.css';

export default function Home() {
  const handleScan = (e) => {
    e.preventDefault();
    const btn = document.querySelector('#scanButton') as HTMLButtonElement;
    const result = document.querySelector('#scanResult') as HTMLElement;
    if (!btn || !result) return;

    btn.innerText = 'Scanning...';
    btn.disabled = true;
    btn.classList.add('animate-pulse');

    setTimeout(() => {
      btn.innerText = 'Scan Now';
      btn.disabled = false;
      btn.classList.remove('animate-pulse');

      const params = new URLSearchParams(window.location.search);
      const paid = params.get('paid') === 'true';

      result.innerHTML = `
        <div class='mt-4 w-full bg-white border border-purple-300 rounded-md shadow-md p-4'>
          <div class='w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded mb-4 ${paid ? '' : 'blur-sm'}'></div>
          <p class='text-purple-800 font-medium mb-4'>${paid ? 'This person appears on 4+ dating platforms and may be using different names or photos.' : 'Results found. Please unlock the full report to view details.'}</p>
          ${!paid ? `
          <div class='flex flex-col md:flex-row gap-4'>
           <a href="https://buy.stripe.com/aEU9BL4wEep9fXGeUX" target="_blank" rel="noopener noreferrer">
  <button className="text-lg px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded">
    Get Unlimited Access – $19.99
  </button>
</a>
            <a href="https://buy.stripe.com/your-new-onetime-link" target="_blank" rel="noopener noreferrer">
  <button className="text-lg px-6 py-4 text-purple-700 border border-purple-500 rounded">
    One-Time Report – $4.99
  </button>
</a>
          </div>` : ''}
        </div>`;
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 py-20 space-y-16 min-h-screen text-center">
      <section className="space-y-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold text-purple-800 leading-tight">Reverse Image & Identity Lookups</h1>
        <p className="text-xl text-gray-700">Instantly uncover profiles, photos, and public data across the internet. SafeSwipe is your AI-powered truth engine.</p>
        <div className="space-x-4">
          <a href="https://buy.stripe.com/test_28o7vobPJ4nld1u7ss" target="_blank" rel="noopener noreferrer">
            <button className="text-lg px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded">Get Unlimited Access – $19.99</button>
          </a>
          <a href="https://buy.stripe.com/test_7sIeXQaLFcTR7Ha4gh" target="_blank" rel="noopener noreferrer">
            <button className="text-lg px-6 py-4 text-purple-700 border border-purple-500 rounded">One-Time Report – $4.99</button>
          </a>
        </div>
        <form className="bg-white shadow-lg rounded-2xl p-6 space-y-4 text-left mt-10" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-purple-800 font-semibold text-lg">Upload a Photo or Enter a Username:</label>
          <input type="file" accept="image/*" className="w-full px-4 py-2 border rounded-md" id="imageInput" />
          <input type="text" placeholder="Or enter a username, email, or phone number" className="w-full px-4 py-2 border rounded-md" />
          <button id="scanButton" type="button" className="w-full py-3 text-lg font-medium rounded-md shadow-md text-white bg-purple-600 hover:bg-purple-700" onClick={handleScan}>Scan Now</button>
          <div id="scanResult"></div>
        </form>
      </section>
{/* What You Could Discover */}
<section className="space-y-12 max-w-5xl">
  <h2 className="text-3xl font-bold text-purple-800">What You Could Discover</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    <div className="bg-white p-6 rounded-2xl shadow-md text-left">
      <h4 className="text-lg font-semibold text-purple-700 mb-2">Multiple Dating Profiles</h4>
      <p className="text-gray-700">Find out if they’re using different names and photos on other apps like Bumble, Tinder, or Facebook Dating.</p>
    </div>
    <div className="bg-white p-6 rounded-2xl shadow-md text-left">
      <h4 className="text-lg font-semibold text-purple-700 mb-2">Hidden Social Media Accounts</h4>
      <p className="text-gray-700">Uncover Instagram or Facebook profiles not linked to their real identity.</p>
    </div>
    <div className="bg-white p-6 rounded-2xl shadow-md text-left">
      <h4 className="text-lg font-semibold text-purple-700 mb-2">Fake Photos or Catfishing</h4>
      <p className="text-gray-700">Use reverse image to check if their photos are stolen or used in multiple fake profiles.</p>
    </div>
    <div className="bg-white p-6 rounded-2xl shadow-md text-left">
      <h4 className="text-lg font-semibold text-purple-700 mb-2">Phone/Email Scams</h4>
      <p className="text-gray-700">Reveal whether a phone number or email is tied to past scams or suspicious activity.</p>
    </div>
  </div>
</section>

{/* Testimonials */}
<section className="space-y-10 max-w-6xl">
  <h2 className="text-3xl font-bold text-purple-800">We Help Thousands of People Daily</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {[
      {
        name: "Taylor, NSW",
        text: "It felt like magic. I uploaded a photo and instantly found all their hidden profiles. Worth every cent."
      },
      {
        name: "Leah, QLD",
        text: "SafeSwipe helped me confirm my suspicions and move on. It’s like digital closure."
      },
      {
        name: "Josh, VIC",
        text: "Saw a number on my partner’s phone I didn’t recognize. One lookup showed me everything. Wild."
      },
      {
        name: "Emily, WA",
        text: "Honestly saved me from getting catfished. Found their real Facebook account instantly."
      }
    ].map((t, i) => (
      <div key={i} className="bg-white p-6 rounded-2xl shadow-lg text-left">
        <div className="flex mb-2 text-yellow-400">{'★★★★★'.split('').map((_, j) => <span key={j}>★</span>)}</div>
        <p className="text-gray-700 italic mb-2">“{t.text}”</p>
        <p className="text-sm text-gray-600 font-semibold">– {t.name}</p>
      </div>
    ))}
  </div>
</section>

{/* Final CTA */}
<section className="space-y-8 max-w-2xl">
  <div className="bg-white shadow-lg rounded-2xl p-6 text-left">
    <h3 className="text-xl font-bold text-purple-800 mb-4">🔒 Your Results Are Locked</h3>
    <p className="text-gray-700 mb-4">We’ve found matching results tied to your input. To view your full report, please unlock it below.</p>
    <div className="flex flex-col md:flex-row gap-4">
      <a href="https://buy.stripe.com/test_28o7vobPJ4nld1u7ss" target="_blank" rel="noopener noreferrer">
        <button className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded">Unlock Unlimited – $19.99</button>
      </a>
      <a href="https://buy.stripe.com/test_7sIeXQaLFcTR7Ha4gh" target="_blank" rel="noopener noreferrer">
        <button className="w-full px-6 py-3 text-purple-700 border border-purple-500 shadow-md rounded">One-Time Report – $4.99</button>
      </a>
    </div>
  </div>
  <h2 className="text-2xl font-bold text-purple-800">No Account Needed. Search Now.</h2>
  <button className="px-10 py-4 text-lg bg-purple-600 hover:bg-purple-700 text-white shadow-lg rounded">Start a Lookup</button>
</section>
    </div>
  );
}
