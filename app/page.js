'use client';

import Link from 'next/link';
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
            <h1 className="text-9xl font-bold font-breath text-white text-shadow-lg">WHEELGEN</h1>
            <p className="mt-4 text-3xl text-white text-shadow-lg">Your ultimate wheel browser and car imagery tool.</p>
          </div>
        </div>
      </div>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto bg-gradient-to-br from-[#a8cfa0] to-[#d9efcf] container-wide bg-white/0 p-8 shadow-xl md:max-w-4xl">
          <h2 className="text-3xl font-bold mb-4 text-slate-950">ABOUT</h2>
          <p className="text-lg text-slate-900 leading-8">
            WheelGen is your ultimate wheel browser and car imagery tool. Where you can browse and discover the latest wheel designs and car images. We host a community of shared interests in automotive wheels and design, where you can upload to our public Gallery, or login and create your own Garage!
          </p>
        </div>
      </section>

      <section className="bg-neutral-900 px-6 py-16">
        <div className="mx-auto container-wide md:max-w-4xl">
          <div className="md:ml-auto md:max-w-2xl">
            <h2 className="text-3xl font-bold mb-4 text-white text-right">EXPLORE</h2>
            <p className="text-lg text-slate-200 leading-8 text-right">
              Discover new styles and build your dream setup with WheelGen. Create your own Garage to store your favorite wheels, compare setups, and keep everything organized in one place.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
