import { motion } from "framer-motion";
import { CardTitle, CardDescription } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { CheckCircle, Cpu, Users, Target, Rocket, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      <Navbar />

      {/* OUR MISSION */}
      <section className="w-full py-20 text-center px-6 mt-7">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Empowering Developers, One Scan at a Time
          </motion.h1>
          <p className="text-lg text-gray-300 mb-4">
            PlayPolicyChecker is built for developers who are tired of the endless trial-and-error when it comes to publishing apps on the Play Store.
            Our mission is to eliminate rejections, reduce stress, and speed up your time-to-market — all with the power of AI.
          </p>
          <p className="text-lg text-gray-300">
            We combine cutting-edge compliance checks with actionable insights, so you can build confidently and launch faster. Whether you're a solo indie dev or a large team, our platform adapts to your workflow and puts you in control of your app’s success.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "AI-Powered Compliance",
                description: "Scan your APK using smart AI that understands Google’s evolving policies.",
                icon: <ShieldCheck size={42} className="text-blue-500 drop-shadow-md" />,
              },
              {
                title: "Effortless Workflow",
                description: "No need to decode complex policies — we guide you through every step clearly.",
                icon: <Target size={42} className="text-green-500 drop-shadow-md" />,
              },
              {
                title: "Faster Approvals",
                description: "Avoid rejections, save time, and launch with confidence — every time.",
                icon: <Rocket size={42} className="text-yellow-500 drop-shadow-md" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="bg-gray-800 p-4 rounded-full inline-flex items-center justify-center">
                  {item.icon}
                </div>
                <CardTitle className="text-xl font-bold mt-4">{item.title}</CardTitle>
                <CardDescription className="text-gray-400 mt-2">{item.description}</CardDescription>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full py-20 bg-gray-900 text-center px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-10 text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Scanning",
                description: "Upload your APK and let our AI engine detect hidden compliance issues instantly.",
                icon: <Cpu size={42} className="text-blue-500 drop-shadow-md" />,
              },
              {
                title: "In-Depth Reports",
                description: "Receive easy-to-understand reports highlighting violations and fixes.",
                icon: <CheckCircle size={42} className="text-green-500 drop-shadow-md" />,
              },
              {
                title: "Smarter Decisions",
                description: "Get clear recommendations so you can act fast and avoid rejections.",
                icon: <Users size={42} className="text-yellow-500 drop-shadow-md" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="bg-gray-700 p-4 rounded-full inline-flex items-center justify-center">
                  {item.icon}
                </div>
                <CardTitle className="text-xl font-bold mt-4">{item.title}</CardTitle>
                <CardDescription className="text-gray-400 mt-2">{item.description}</CardDescription>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 bg-blue-600 text-white text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Publish with Confidence?</h2>
          <p className="text-lg text-blue-100 mt-2">
            Join developers worldwide simplifying their release process with PlayPolicyChecker.
          </p>
          <Button
            variant="outline"
            className="mt-6 text-lg text-black  border-white "
            asChild
          >
            <Link href="/">Start Scanning Now</Link>
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
