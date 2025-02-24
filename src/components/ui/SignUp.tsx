'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react';

const SignUp = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      setLoading(true);
      setError(null);
          try {
            const response = await fetch('http://127.0.0.1:8000/api/signup/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name ,email, password }),
            });
      
            if (!response.ok) {
              const data = await response.json();
              console.log(data.error);
              throw new Error(data.error || 'Signup failed!');
              // throw new Error('Signup failed!');
            }

            const data = await response.json();
            console.log('Signup successful:', data);
            router.push('/login');
          } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
          } finally {
            setLoading(false);
          }
        };
  return (
    <div className="flex flex-col items-center w-full text-black justify-center min-h-screen  dark:bg-slate-900 bg-slate-400">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-96"
    >
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          placeholder='Enter your name'
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          placeholder='Your email'
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          placeholder='Password (e.g. Abc%77jRc)'
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
    <Link className='text-white' href="/login">Already have account? Signin here</Link>
  </div>
  )
}

export default SignUp
