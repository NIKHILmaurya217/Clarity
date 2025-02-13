"use client"
import Card from "./components/ui/Card";
import { initializeAppTask } from '@/utils/firebase';

export default function Home() {
  const user = localStorage.getItem('user')
  return (
    <>
    <div className="h-100 overflow-y-auto w-[100vw]">
      <Card user={user}/>
    </div>
    </>
  );
}
