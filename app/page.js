'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [backgroundImage, setBackgroundImage] = useState('/images/cover/cover-art1.jpg');

  useEffect(() => {
    const selectedBackground = Math.floor(Math.random() * 2) + 1;
    setBackgroundImage(`/images/cover/cover-art${selectedBackground}.jpg`);
  }, []);

  return (
    <div className="relative w-screen">
      <div
        className="relative w-screen bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')`, backgroundSize: 'cover' }}
      >
        <img src={backgroundImage} alt="Cover" className="w-screen h-auto block" />
        <div className="absolute inset-0 flex items-center pl-12">
          <div>
            <h1 className="text-9xl font-bold text-white text-shadow-lg">WHEELGEN</h1>
            <p className="mt-4 text-3xl text-white text-shadow-lg">Your ultimate wheel browser and car imagery tool.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-8">
        <div
          className="rounded-2xl p-6 text-slate-800 shadow-md"
          style={{
            background: 'linear-gradient(45deg, #a8cfa0 0%, #d9efcf 100%)',
          }}
        >
          <h2 className="text-2xl font-bold mb-3">ABOUT</h2>
          <p>
            WheelGen is your ultimate wheel browser and car imagery tool. Where you can browse and discover the latest wheel designs and car images. We host a community of shared interests in automotive wheels and design, where you can upload to our public Gallery, or login and create your own Garage!
          </p>
        </div>

        <div
          className="rounded-2xl p-6 text-slate-800 shadow-md"
          style={{
            background: 'linear-gradient(45deg, #a8cfa0 0%, #d9efcf 100%)',
          }}
        >
          <h2 className="text-2xl font-bold mb-3">EXPLORE</h2>
          <p>
            Discover new styles, save favorites, and build your dream setup with a community centered around automotive design.
          </p>
        </div>
      </div>
    </div>
  );
}
