'use client';
import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth';
import { initializeAppTask } from '@/utils/firebase';
import { useRouter } from 'next/navigation';

const LogOutButton = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const auth = initializeAppTask()

    useEffect(() => {
        const token =  localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []); 

    const handleLogout = async () => {
        handleLogout();
        console.log(isLoggedIn)
        try {
            // 1. (Optional) Call backend logout API *first* (if needed)
            const token = sessionStorage.getItem('token') || localStorage.getItem('token'); // Get token before removing it

            if (token) { // Only call the backend if a token exists
                const response = await fetch('http://127.0.0.1:8000/api/logout/', {  // Your Django logout endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}` // Include the token for backend logout
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Backend logout error:", errorData.error || "Logout failed");
                    return
                }
                signOut(auth).then(() => {
                    // Sign-out successful.
                    localStorage.clear();
                    router.push("/")
                  }).catch((error) => {
                    console.error(error)
                  });
            }

        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div>
            {isLoggedIn && (
                    <button
                    className='bg-blue-600 p-2'
                    onClick={async (e) => {
                        e.preventDefault();
                        await handleLogout();
                        router.refresh();
                        }}>
                    LogOut
                </button>
            )}
        </div>
    )
}

export default LogOutButton;
