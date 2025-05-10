import React from "react";
import Navbar from "@/components/Navbar";
import FaqSection from "@/components/faq";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

const Price = () => {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals starting out.",
      price: "Get Started FREE",
      features: ["5 free scans", "Ads included", "Scan Report Download"],
      missingFeatures: ["Help center access", "Phone support", "Community access"],
      primary: false,
    },
    {
      name: "Pro",
      description: "For growing teams and professionals.",
      price: "$30/month",
      features: ["unlimited scans", "Scan Report Download", "Help center access", "Community access"],
      missingFeatures: ["Ads included",],
      primary: true,
    },
  ];

  const faqItems = [
    {
      question: "What do I get with the Free Plan?",
      answer:
        "With the Free Plan, you can scan APKs, view reports online, and access limited history — all without paying a cent. It’s perfect for quick checks and small-scale usage.",
    },
    {
      question: "What makes the Premium Plan worth it?",
      answer:
        "The Premium Plan unlocks full report downloads (PDF), unlimited history, ad-free experience, priority support, and faster scans — ideal for professional developers and agencies.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel anytime. There are no long-term commitments — your plan will stay active until the end of your billing cycle.",
    },
    {
      question: "Do I need to enter payment info for the Free Plan?",
      answer:
        "Nope! You can use the Free Plan without adding any payment details. Only upgrade when you're ready.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Yes, we offer a 7-day money-back guarantee if you’re not satisfied with the Premium Plan. Just reach out to support.",
    },
    {
      question: "How secure is my data?",
      answer:
        "We follow strict security standards. Your uploaded APKs are processed securely and never stored longer than needed for analysis.",
    },
    {
      question: "Do you offer discounts for teams or startups?",
      answer:
        "Yes! We offer custom pricing for teams, agencies, and early-stage startups. Contact us to learn more.",
    },
    {
      question: "Will I get updates and new features in the Premium Plan?",
      answer:
        "Absolutely. Premium users get access to all upcoming features and improvements as we continue to enhance PlayPolicyChecker.",
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer:
        "Of course. You can switch between plans anytime directly from your dashboard settings.",
    },
  ];


  return (
    <div className="bg-gray-800 text-white">
      <Navbar />
      <div className="flex items-center justify-center py-20 px-6 mt-7">

        <div className="max-w-screen-xl mx-auto grid gap-10 sm:grid-cols-2">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl border shadow-lg p-8 transition-all duration-300 hover:shadow-2xl ${
                plan.primary ? "border-blue-500 bg-gradient-to-r from-blue-700 to-blue-900" : "border-gray-700 bg-gray-800"
              }`}
            >
              <h2 className="text-3xl font-bold">{plan.name}</h2>
              <p className="mt-2 text-gray-300">{plan.description}</p>
              <p className="mt-4 text-4xl font-extrabold">{plan.price}</p>
              <Button
                variant={plan.primary ? "default" : "outline"}
                className={`mt-6 w-full py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
                  plan.primary ? "bg-blue-500 hover:bg-blue-600" : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                }`}
              >
                Get Started
              </Button>
              <p className="mt-6 text-lg font-semibold">What's included:</p>
              <ul className="mt-4 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-200">
                    <CheckCircle className="text-green-400 w-5 h-5" />
                    {feature}
                  </li>
                ))}
                {plan.missingFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-400">
                    <XCircle className="text-red-500 w-5 h-5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-screen-lg mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
          <FaqSection items={faqItems} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Price;
