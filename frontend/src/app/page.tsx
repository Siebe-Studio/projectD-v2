import Image from "next/image";
import SignInButton from "@/app/components/auth/SignInButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <SignInButton />
    </main>
  );
}
