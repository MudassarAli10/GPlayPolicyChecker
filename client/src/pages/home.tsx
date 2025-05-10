import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import UploadDropZone from "@/components/upload-drop-zone";
import ScanResults from "@/components/scan-results";
import { type Scan } from "@shared/schema";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import FaqSection from "@/components/faq";
import Testimonial from "@/components/testimonial";
import { CheckCircle, UploadCloud, FileSearch, Download, ShieldCheck } from "lucide-react";

export default function Home() {
  const faqItem = [
    {
      question: "What is PlayPolicyChecker?",
      answer: "PlayPolicyChecker is a smart APK analyzer that scans your Android apps for potential Google Play policy violations — helping you stay compliant and avoid bans.",
    },
    {
      question: "How does the APK scanning work?",
      answer: "We use AI-powered analysis to inspect your APK for permission misuse, data privacy issues, policy red flags, and much more — all in seconds.",
    },
    {
      question: "Do I need to upload my source code?",
      answer: "Nope! Just upload your compiled APK file — no source code required. It’s quick, simple, and secure.",
    },
    {
      question: "What types of issues can you detect?",
      answer: "We flag potential violations related to data collection, permissions, background activity, Play Store metadata, and other key compliance areas.",
    },
    {
      question: "Is my APK or data stored anywhere?",
      answer: "Absolutely not. Your APK is scanned securely and temporarily — we do not store your files or any sensitive data after the scan completes.",
    },
    {
      question: "What happens if violations are found?",
      answer: "You’ll get a detailed report highlighting the issues along with clear suggestions on how to fix them before submission to the Play Store.",
    },
    {
      question: "Can this help me avoid app rejections or suspensions?",
      answer: "Yes! Many developers get suspended due to hidden policy issues. Our tool helps you catch and fix them early — before Google does.",
    },
    {
      question: "Is there a free plan available?",
      answer: "Yes, we offer a free plan with essential checks. For advanced scans, history, and downloadable reports, upgrade to our premium plan anytime.",
    },
    {
      question: "Who should use PlayPolicyChecker?",
      answer: "App developers, agencies, and indie creators — anyone who wants to publish apps with confidence and stay safe from Play Store penalties.",
    },
  ];


  const [currentScan, setCurrentScan] = useState<Scan | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Navbar />

        {/* MAIN CONTENT */}
        <div className="flex-grow flex items-center justify-center p-6 pt-20">
          <div className="max-w-4xl w-full space-y-10">
            <motion.div
              className="flex flex-col items-center text-center space-y-4 mt-7"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                Ensure Your App Meets Compliance Standards
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl">
                Upload your Android application to instantly check for compliance with Google Play Store policies.
              </p>
            </motion.div>

            <motion.div
              className="w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border border-gray-700 shadow-xl rounded-xl bg-gray-900">
                <CardContent className="p-8">
                  {!currentScan ? (
                    <UploadDropZone onScanComplete={setCurrentScan} />
                  ) : (
                    <ScanResults scan={currentScan} onReset={() => setCurrentScan(null)} />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* HOW IT WORKS SECTION */}
        <section className="w-full my-16 px-6">
          <h1 className="text-4xl font-bold mb-12 text-center">How It Works</h1>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Upload APK", description: "Drag & drop your APK file into our upload zone, and we’ll start the compliance check instantly.", icon: <UploadCloud size={40} className="text-blue-500" /> },
              { title: "Automated Analysis", description: "Our system scans your APK against Google Play policies using AI-powered algorithms.", icon: <FileSearch size={40} className="text-green-500" /> },
              { title: "Get Results", description: "Receive a detailed compliance report highlighting any issues and recommended fixes.", icon: <CheckCircle size={40} className="text-yellow-500" /> },
              { title: "Download Report", description: "Easily download your compliance report for further review and action.", icon: <Download size={40} className="text-purple-500" /> },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative group overflow-hidden rounded-lg bg-gray-800 text-white shadow-lg p-6 flex flex-col items-center text-center space-y-4 border border-gray-700 transition-transform transform hover:scale-105 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="bg-gray-900 p-3 rounded-full">{item.icon}</div>
                <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                <CardDescription className="text-gray-400">{item.description}</CardDescription>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section className="w-full py-20 bg-gray-900 text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-8">Why Choose Us?</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: "AI-Powered Analysis", icon: <ShieldCheck size={40} className="text-blue-500" /> },
                { title: "Fast & Accurate", icon: <CheckCircle size={40} className="text-green-500" /> },
                { title: "Detailed Reports", icon: <FileSearch size={40} className="text-yellow-500" /> },
                { title: "Save Time & Avoid Rejections", icon: <Download size={40} className="text-purple-500" /> },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-700 bg-gray-800 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="bg-gray-900 p-3 rounded-full">{item.icon}</div>
                  <CardTitle className="text-xl font-bold mt-4">{item.title}</CardTitle>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <Testimonial />

        {/* FAQ Section */}
        <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="max-w-screen-lg mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
            <FaqSection items={faqItem} />
          </div>
        </section>
        <Footer />
      </div>
    );
}
