"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { handleLoginAction, handleLogoutAction, checkAuthStatus } from '@/app/login/route';

function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname == href;
  
  return (
    <Link
      href={href}
      className={`font-semibold px-4 py-2 rounded-full transition-colors ${
        isActive
          ? "bg-white text-slate-950 shadow-sm shadow-black/10 hover:bg-slate-100"
          : "text-white/90 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await checkAuthStatus();
        setIsLoggedIn(result.isLoggedIn);
      } catch {
        setIsLoggedIn(false);
        
      }
    };
    
    checkAuth();
  }, []);
  
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col text-white antialiased">
        <nav className="w-full py-3 bg-neutral-800 shadow-xl">
          <div className="mx-auto container-wide px-6 flex items-center gap-4">
            <div className="text-2xl font-bold">WHEELGEN</div>
            <div className="flex-1 flex justify-end">
              <div className="flex items-center gap-3 rounded-full bg-neutral-600 px-2 py-1.5">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/wheels">Wheels</NavLink>
                <NavLink href="/gallery">Gallery</NavLink>
                <NavLink href="/upload">Upload</NavLink>
                {isLoggedIn && (
                  <NavLink href="/garage">Garage</NavLink>
                )}
              </div>
              <div className="flex items-center gap-3 rounded-full ml-4 bg-neutral-600 px-2 py-1.5">
                
                {isLoggedIn ? (

                  <form action={handleLogoutAction}>
                    <button 
                      type="submit"
                      className="font-semibold px-4 py-2 rounded-full text-gray/100 hover:text-white hover:bg-red-400 transition-colors"
                    >
                      Logout
                    </button>
                  </form>
                ) : (

                  <form action={handleLoginAction}>
                    <button 
                      type="submit" 
                      className="font-semibold px-4 py-2 rounded-full text-white/90 hover:text-white hover:bg-neutral-400 transition-colors"
                    >
                      Login
                    </button>
                  </form>
                )}

              </div>
            </div>
          </div>
        </nav>
        <main className="flex-1 flex flex-col items-center px-6 w-full container-wide mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
