'use client';
import React, { useEffect, useState } from 'react'
import { onIdTokenChanged, signOut } from 'firebase/auth';
import { initializeAppTask } from '@/utils/firebase';
import { redirect, useRouter } from 'next/navigation';

const LogOutButton = () => {
    const router = useRouter();
    const auth = initializeAppTask()
    const handleLogout = async () => {
        try { 
            const token = await auth.currentUser?.getIdToken();
            if (token) {
                const response = await fetch('http://127.0.0.1:8000/api/logout/', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Backend logout error:", errorData.error, "errorMessage:", errorData.message );
                    if (errorData == "Invalid ID token"){
                        redirect("/login")
                    }
                    new Error("Login failed");
                }
                signOut(auth).then(() => {
                    localStorage.clear();
                    router.push("/login")
                  }).catch((error) => {
                    console.error(error)
                  });
                return
            }

        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    return (
            <button
                className='bg-slate-900 p-1 text-center text-sm lg:p-2 mb-1'
                onClick={handleLogout}>
                LogOut
            </button>
    )
}

export default LogOutButton;
