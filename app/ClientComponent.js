// app/ClientComponent.js
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function ClientComponent() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn('google')}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return <div> Logged in {session.user.email}</div>;
}
