'use client';
import { useState } from 'react';
import { initializeAppTask } from '../../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignIn = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const firebase_instanse = initializeAppTask()
    const handleSubmit = async (event: any) => { 
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(firebase_instanse, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            const userData = {
                "name":user.displayName,
                "email":user.email
            }
            const response = await fetch('http://127.0.0.1:8000/api/signin/', { 

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${idToken}`
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.error || 'SignIn failed!'); // Use backend error message

            }
            const data = await response.json();
            localStorage.setItem("user",JSON.stringify(userData))
            localStorage.setItem('token', idToken);
            router.push('/');
            
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
                <h2 className="text-2xl font-semibold mb-4">SignIn</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
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
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
            <Link className='text-white' href="/signup">Don't have account? Signup here</Link>
        </div>
    );
}

export default SignIn;
