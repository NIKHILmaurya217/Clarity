"use client";
import Card from "../components/ui/Card";
import Image from "next/image";
import BarChart from "../components/charts/BarChart";
import SquareBtn from "@/components/ui/SquareBtn";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  image: string;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.clear();
            router.push("/login");
          }
          return;
          // throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const items = [];
  for (let i = 0; i < 5; i++) {
    items.push(<li className="text-white/70 text-sm" key={i}>Example message for you {i}</li>);
  }
  return (
    <>
      <div className="h-100 overflow-y-auto w-[100vw]">
        <Card>
          <div className="flex flex-col items-center justify-center flex-auto">
            {loading &&
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            }
            <h1 className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-pink-600 to-red-600">{user?.name}</h1>
            <h1 className="text-sm lg:text-2xl text-white/30">{user?.email}</h1>
          </div>
          <div className="flex-1">
            <Image src="https://avatars.githubusercontent.com/u/80181799?s=96&v=4" className="rounded-full" unoptimized alt="user" width={100} height={100} />
          </div>
        </Card>
        <Card>
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-xl font-semibold text-white/60">Progress Chart</h1>
            <div>
              <BarChart />
            </div>
          </div>
        </Card>
        <Card>
          <div className="w-full">
            <h1 className="text-xl font-medium text-center mb-2 text-white/60">Suggestions for You !</h1>
            {items}
          </div>
        </Card>
        <div className="w-full sm:px-6 my-6 px-2 py-2 gap-2 flex justify-center flex-wrap">
          <SquareBtn>
            <div className="p-2">
              <h1>hello</h1>
              <h1>............................</h1>
            </div>
          </SquareBtn>
        </div>
      </div>
    </>
  );
}