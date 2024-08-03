import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Pill, BriefcaseMedical, HeartPulse } from "lucide-react";

export default function Home() {
  return (
    <div className=" h-[100vh] w-full flex flex-col items-center justify-center bg-gradient-to-r from-emerald-400 to-sky-500 text-white p-4">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">Pharmacy</h1>
        <p className="text-xl italic">"Your health, our priority."</p>
      </header>
      <div className="flex space-x-4 mb-8">
        <Pill className="text-6xl" />
        <BriefcaseMedical className="text-6xl" />
        <HeartPulse className="text-6xl" />
      </div>
      <div className="flex space-x-4">
        <SignUpButton mode="modal" fallbackRedirectUrl="/home">
          <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded shadow hover:bg-blue-100">
            Sign Up
          </button>
        </SignUpButton>
        <SignInButton mode="modal" fallbackRedirectUrl="/home">
          <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded shadow hover:bg-blue-100">
            Sign In
          </button>
        </SignInButton>
      </div>
      <br />
      <p className="text-lg italic text-gray-200">
        Join us to get the best health products at your doorstep!
      </p>
    </div>
  );
}
