'use client';
import Script from 'next/script'; // Make sure this is at the top of your file
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
    }, 20000); // 20 seconds scan
  };

  return (
    <div className="flex flex-col items-center px-6 pt-32 pb-20 min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 text-center space-y-20">
import { useEffect } from 'react';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-17037482508'); // Replace with your tag ID
  }, []);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17037482508"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-br from-purple-100 via-white to-blue-100 border-b border-purple-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex justify-center sm:justify-start items-center">
          <img src="/Safe Swipe.png" alt="SafeSwipe Logo" className="h-10 object-contain" />
        </div>
      </header>

      {/* Hero & Upload Section */}
      <section className="max-w-3xl w-full space-y-6">
        <h1 className="text-5xl font-extrabold text-purple-800 leading-tight">Reverse Phone Lookups</h1>
        <p className="text-xl text-gray-700">Instantly scan and uncover social profiles, risk scores, and carrier data.</p>
{isPaid && (
  <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded w-full max-w-2xl text-center mt-6">
    Payment successful! Please scan now to unlock your report.
  </div>
  {isPaid && (
  <Script id="gtag-conversion" strategy="afterInteractive">
    {`
      gtag('event', 'conversion', {
        send_to: 'AW-17037482508/rintCKmXl74aEIy0jbw_',
        value: 9.99,
        currency: 'AUD',
        transaction_id: ''
      });
    `}
  </Script>
)}

)}
        <form className="bg-white shadow-lg rounded-2xl p-6 space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-purple-800 font-semibold text-lg">Enter a Mobile or Landline Number:</label>
          <input
            type="text"
            placeholder="e.g. 0412345678"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              localStorage.setItem('safeswipe_input', e.target.value);
            }}
            className="w-full px-4 py-2 border rounded-md"
          />
          <div className="flex gap-4">
            <button type="button" onClick={handleScan} disabled={loading} className={`w-full py-3 text-lg font-medium rounded-md shadow-md text-white ${loading ? "bg-purple-500 animate-pulse" : "bg-purple-600 hover:bg-purple-700"}`}>
              {loading ? "Scanning..." : "Scan Now"}
            </button>
            <button type="button" onClick={handleClearSearch} className="w-full py-3 text-lg font-medium rounded-md shadow bg-gray-200 hover:bg-gray-300">
              Clear Search
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Secure and encrypted. Your searches are 100% private.</p>
        </form>
      </section>

      {/* Report Section */}
{showResult && (
  <section className="w-full max-w-3xl bg-white shadow rounded-2xl p-8 text-left space-y-6">
    <div className={isPaid ? "" : "blur-sm pointer-events-none select-none"}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl text-gray-600">🔍</div>
        <div>
          <h2 className="text-2xl font-bold text-purple-800">Phone Report</h2>
          <p className="text-gray-600">{inputValue}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="flex items-center gap-2 text-gray-700 font-semibold">
            <span>📞</span> Phone Number:
          </p>
          <p className="ml-8 text-gray-600">{inputValue}</p>
          <hr className="my-2 border-gray-200" />
        </div>

        <div>
          <p className="flex items-center gap-2 text-gray-700 font-semibold">
            <span>🧑</span> Possible Owner:
          </p>
          <p className="ml-8 text-gray-600">Not Identified</p>
          <hr className="my-2 border-gray-200" />
        </div>

        <div>
          <p className="flex items-center gap-2 text-gray-700 font-semibold">
            <span>📍</span> Location:
          </p>
          <p className="ml-8 text-gray-600">Australia</p>
          <hr className="my-2 border-gray-200" />
        </div>

        <div>
          <p className="flex items-center gap-2 text-gray-700 font-semibold">
            <span>🏢</span> Carrier:
          </p>
          <p className="ml-8 text-gray-600">Telstra</p>
          <hr className="my-2 border-gray-200" />
        </div>

        <div>
          <p className="flex items-center gap-2 text-gray-700 font-semibold">
            <span>⚠️</span> Risk Score:
          </p>
          <p className="ml-8 text-green-600 font-bold">Safe</p>
        </div>
      </div>
    </div>

    {!isPaid && (
      <div className="pt-6 text-center">
        <p className="text-purple-700 mb-3 font-semibold">Unlock full report access:</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://buy.stripe.com/aEU9BL4wEep9fXGeUX?plan=unlimited" className="bg-purple-600 text-white px-6 py-3 rounded shadow hover:bg-purple-700">Unlimited – $19.99</a>
          <a href="https://buy.stripe.com/14k8xH5AI1Cn4eYfZ2?plan=onetime" className="border border-purple-500 text-purple-700 px-6 py-3 rounded shadow">One-Time Report – $9.99</a>
        </div>
      </div>
    )}
  </section>
)}

{/* Trust Badges Section */}
      <section className="w-full max-w-5xl text-center space-y-4">
        <h2 className="text-2xl font-bold text-purple-800">Trusted by over 25,000+ Australians</h2>
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

      {/* What You'll Discover Section */}
      <section className="max-w-6xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-purple-800 text-center">What You'll Discover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {[
            { title: "Social Media Matches", desc: "Find linked Instagram, Facebook, and dating profiles tied to the number." },
            { title: "Alias Accounts", desc: "Uncover alternative usernames and duplicates." },
            { title: "Location History", desc: "See regions tied to the phone number." },
            { title: "Carrier and Line Type", desc: "View phone carrier and number type." },
            { title: "Data Breaches", desc: "Check if number or emails were leaked." },
            { title: "Public Risk Score", desc: "Get an online safety rating for the number." }
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
            { name: "Jessica M.", review: "SafeSwipe saved me months of lies!" },
            { name: "Aaron T.", review: "Gave me instant clarity on who I was really talking to." },
            { name: "Nina D.", review: "Found out he was using a fake identity." },
            { name: "Connor W.", review: "Worth the price. Helped me make a safe decision." }
          ].map((t, i) => (
            <div key={i} className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
              <div className="text-yellow-400 text-xl mb-2">★★★★★</div>
              <p className="text-gray-700 italic">“{t.review}”</p>
              <p className="mt-2 font-semibold text-purple-800">– {t.name}</p>
            </div>
          ))}
        </div>
      </section>
{/* FAQ Section */}
<section className="max-w-4xl w-full text-left mt-16">
  <h2 className="text-3xl font-bold text-purple-800 text-center mb-8">Frequently Asked Questions</h2>
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-purple-700">Is SafeSwipe private?</h3>
      <p className="text-gray-700 mt-2">Yes. All searches are encrypted and not stored. Your information remains completely confidential.</p>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-purple-700">Can I get a refund?</h3>
      <p className="text-gray-700 mt-2">Due to the nature of digital reports being instantly accessible, we do not offer refunds. Please review your purchase carefully.</p>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-purple-700">Will SafeSwipe always find information?</h3>
      <p className="text-gray-700 mt-2">While we scan millions of public records, not all searches will result in matches depending on availability of public data.</p>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-purple-700">How often is the database updated?</h3>
      <p className="text-gray-700 mt-2">We continuously update our database to provide the most accurate results possible.</p>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-20 border-t pt-6">
        <p>© 2025 SafeSwipe Pty Ltd. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="/about" className="underline">About</a>
          <a href="/privacy" className="underline">Privacy</a>
          <a href="/terms" className="underline">Terms</a>
          <a href="/contact" className="underline">Contact</a>
        </div>
      </footer>
    </div>
  );
}
