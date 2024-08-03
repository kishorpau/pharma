"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const PaymentPage = () => {
  const router = useRouter();

  const handleSubscription = (months: number) => {
    // Handle subscription logic here
    console.log(`Subscribing for ${months} months`);
    // Redirect to a payment processing page or confirmation page
    router.push("/payment/confirmation");
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8">
      <h1 className="text-3xl font-bold text-center mb-4">CHOOSE YOUR PLAN</h1>
      <p className="text-center text-gray-600 mb-10">
        Highest value for 12 months plan
        <br />
        There is an offer for 6 months plan.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 3 Months Subscription Card */}
        <div className="border border-gray-200 rounded-lg p-8 bg-white shadow-lg">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/startup.png"
              alt="Start-Up Icon"
              width={45}
              height={45}
            />
          </div>
          <h2 className="text-xl font-bold mb-2 text-blue-600">3 Months</h2>
          <p className="text-4xl font-bold mb-4">1000 NPR</p>
          <p className="text-gray-600 mb-6">Enjoy all these features:</p>
          <ul className="text-left text-gray-600 mb-6 space-y-2">
            <li>• Unlimited Downloads</li>
            <li>• Email Support</li>
            <li>• 3 Months Access</li>
          </ul>
          <Button
            onClick={() => handleSubscription(3)}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Choose
          </Button>
        </div>
        {/* 6 Months Subscription Card */}
        <div className="border border-gray-200 rounded-lg p-8 bg-white shadow-lg transform scale-105">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/pro.png"
              alt="Pro Icon"
              height={45}
              width={45}
            />
          </div>
          <h2 className="text-xl font-bold mb-2 text-green-600">6 Months</h2>
          <p className="text-4xl font-bold mb-4">3000 NPR</p>
          <p className="text-gray-600 mb-6">Everything in 3 Months, plus:</p>
          <ul className="text-left text-gray-600 mb-6 space-y-2">
            <li>• Up to 10 Users</li>
            <li>• Email Support</li>
            <li>• 6 Months Access</li>
          </ul>
          <Button
            onClick={() => handleSubscription(6)}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Choose
          </Button>
        </div>
        {/* 12 Months Subscription Card */}
        <div className="border border-gray-200 rounded-lg p-8 bg-white shadow-lg">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/enterprise.png"
              alt="Enterprise Icon"
              width={45}
              height={45}
            />
          </div>
          <h2 className="text-xl font-bold mb-2 text-red-600">12 Months</h2>
          <p className="text-4xl font-bold mb-4">6000 NPR</p>
          <p className="text-gray-600 mb-6">Everything in 6 Months, plus:</p>
          <ul className="text-left text-gray-600 mb-6 space-y-2">
            <li>• Unlimited Access</li>
            <li>• Premium Support</li>
            <li>• Lifetime Access</li>
          </ul>
          <Button
            onClick={() => handleSubscription(12)}
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Choose
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
