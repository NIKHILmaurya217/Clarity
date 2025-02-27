"use client";
import React, { useState, useEffect } from 'react';
import LogOutButton from '../ui/logout';
import Link from 'next/link';
import { initializeAppTask } from "@/utils/firebase"
import { onAuthStateChanged } from "firebase/auth";

type User = {};

const Header = () => {
  const auth = initializeAppTask();

  // const [isUserAuth, setIsUserAuth] = useState(false);
  function useAuth() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    useEffect(() => {
      const unsub = onAuthStateChanged(auth,(user) => setCurrentUser(user));
      return unsub;
    }, [])
    return currentUser;
  }
  const user = useAuth();
  return (
    <nav className="hidden sm:block sticky left-0 top-0 h-[100vh] w-[20vw] bg-gradient-to-br from-slate-700  to-slate-700">
      <h1 className="text-white cursor-pointer font-bold text-xl md:text-3xl md:px-4 py-1 px-2">Clarity</h1>
      <ul className="max-h-[100vh]  overflow-auto">
        <Link href="/">
          <li className=" bg-slate-500  text-white border-slate-500 text-sm md:px-6 py-1 px-2 hover:bg-slate-600 w-100">Home</li>
        </Link>
        <Link href="#">
          <li className=" bg-slate-500 text-white border-slate-500 text-sm md:px-6 py-1 px-2 hover:bg-slate-600 w-100">Dashboard</li>
        </Link>
        <Link href="#">
          <li className=" bg-slate-500 text-white border-slate-500 text-sm md:px-6 py-1 px-2 hover:bg-slate-600 w-100">About</li>
        </Link>
        {user ? (
          <li className=" bg-slate-500 text-white border-slate-500 text-sm md:px-6 py-1 px-2 hover:bg-slate-600 w-100">
            <LogOutButton />
          </li>)
          : (
            <div>
              <li className="flex flex-col lg:gap-2 lg:flex-row bg-slate-500 text-white text-md py-2 px-3 w-100">
                <Link className='bg-slate-900 text-center text-sm lg:p-2 mb-1' href="/login">
                  Sign in
                </Link>
                <Link className='bg-slate-900 text-center text-sm lg:p-2 mb-1' href="/signup">
                  Sign up
                </Link>
              </li>
            </div>
          )
        }
      </ul>
    </nav>
  )
}

export default Header;