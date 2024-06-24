// app/page.js
import Layout from "../components/Layout";
import "../app/globals.css";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <Layout>
        <div className="text-blue-900 flex justify-between">
          <h2>Hello, <b>{session?.user?.name}</b></h2>
          <div className="flex bg-gray-300 gap-2 text-black rounded-lg overflow-hidden">
            <img src={session?.user?.image} alt="Admin Image" className="w-8 h-8"/>
            <span className="py-1 px-2">{session?.user?.name}</span>
            
          </div>
        </div>
      </Layout>
    </div>
  );
}
