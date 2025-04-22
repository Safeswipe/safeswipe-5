{showResult && (
  <div className="mt-10 w-full bg-white border border-purple-300 rounded-md shadow-md p-6 space-y-6 text-left">
    <h3 className="text-xl font-bold text-purple-800">Scan Results</h3>

    <div className={isPaid ? "space-y-6" : "space-y-6 blur-sm pointer-events-none select-none"}>
      {imagePreview && (
        <div className="flex justify-center">
          <img src={imagePreview} alt="Uploaded" className="max-w-xs rounded-xl border" />
        </div>
      )}

      <div className="text-left text-gray-700 space-y-3">
        <p><strong>0 matches</strong></p>
        <p>SafeSwipe searched over <strong>74.6 billion images</strong> but didn’t find any matches for your uploaded photo.</p>
        <p>That’s probably because we haven’t crawled any pages where this image appears yet. SafeSwipe is always expanding its scan database, so try again soon.</p>
        <p className="text-sm italic text-gray-500">Using SafeSwipe is private. We do not save your uploaded images.</p>
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

      {/* Our Mission embedded inside the report */}
      <div className="border-t pt-6 mt-4 text-center text-gray-700 space-y-2">
        <h4 className="text-xl font-semibold text-purple-800">About SafeSwipe</h4>
        <p>At SafeSwipe, our goal is to help everyday people protect themselves from catfishers, scammers, and online impersonators.</p>
        <p>We believe everyone deserves to know the truth before meeting someone, sending money, or falling for fake identities.</p>
        <p>Our tools help you run image and identity lookups quickly — putting online safety in your hands.</p>
      </div>
    </div>

    {!isPaid && (
      <div className="pt-6 text-center border-t mt-4">
        <p className="text-purple-700 font-medium mb-2">Unlock full access to view results:</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href='https://buy.stripe.com/aEU9BL4wEep9fXGeUX?plan=unlimited' target='_blank' rel='noopener noreferrer' className='block w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-md font-semibold shadow'>Unlimited – $19.99</a>
          <a href='https://buy.stripe.com/7sIeW5bZ6ch18ve4gi?plan=onetime' target='_blank' rel='noopener noreferrer' className='block w-full sm:w-auto px-6 py-3 border border-purple-500 text-purple-700 text-center rounded-md font-semibold shadow'>One-Time Report – $4.99</a>
        </div>
      </div>
    )}
  </div>
)}
