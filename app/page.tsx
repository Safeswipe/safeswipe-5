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