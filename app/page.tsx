'use client';
import { useState } from "react";
import './globals.css';

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const isPaid = typeof window !== 'undefined' && window.location.search.includes('paid=true');

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

        {/* Scan Form */}
        <form className="bg-white shadow-lg rounded-2xl p-6 space-y-4 text-left mt-10" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-purple-800 font-semibold text-lg">Upload a Photo or Enter a Username:</label>
          <input type="file" accept="image/*" className="w-full px-4 py-2 border rounded-md" id="imageInput" />
          <input type="text" placeholder="Or enter a username, email, or phone number" className="w-full px-4 py-2 border rounded-md" />
          <button id="scanButton" type="button" className="w-full py-3 text-lg font-medium rounded-md shadow-md text-white bg-purple-600 hover:bg-purple-700" onClick={handleScan}>Scan Now</button>

          {/* Scan Result */}
          {(showResult || isPaid) && (
            <div className='mt-6 w-full bg-white border border-purple-300 rounded-md shadow-md p-6 space-y-4'>
              <h3 className="text-xl font-bold text-purple-800">Match Results</h3>
              <div className={`space-y-4 ${isPaid ? '' : 'blur-sm'}`}>
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

      {/* What You Could Discover */}
      <section className="space-y-12 max-w-5xl">
        <h2 className="text-3xl font-bold text-purple-800">What You Could Discover</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              title: "Multiple Dating Profiles",
              desc: "Find out if they’re using different names and photos on other apps like Bumble, Tinder, or Facebook Dating."
            },
            {
              title: "Hidden Social Media Accounts",
              desc: "Uncover Instagram or Facebook profiles not linked to their real identity."
            },
            {
              title: "Fake Photos or Catfishing",
              desc: "Use reverse image to check if their photos are stolen or used in multiple fake profiles."
            },
            {
              title: "Phone/Email Scams",
              desc: "Reveal whether a phone number or email is tied to past scams or suspicious activity."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-md text-left">
              <h4 className="text-lg font-semibold text-purple-700 mb-2">{item.title}</h4>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
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
            <a href="https://buy.stripe.com/aEU9BL4wEep9fXGeUX" target="_blank" rel="noopener noreferrer">
              <button className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded">Unlock Unlimited – $19.99</button>
            </a>
            <a href="https://buy.stripe.com/7sIeW5bZ6ch18ve4gi" target="_blank" rel="noopener noreferrer">
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
