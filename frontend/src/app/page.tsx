import Image from "next/image";
import SignInButton from "@/components/auth/SignInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";


export default async function Home() {

  const session = await getServerSession(authOptions);  
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <SignInButton />
    </main>
  );
}
