import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Shield, Github, Twitter, Menu, X } from "lucide-react";

export default function Footer (){

    return(

        <footer className="bg-gradient-to-r from-blue-50 to-blue-100 dark:bg-gray-900">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-start lg:gap-8">
              <div className="text-teal-600 dark:text-teal-300">
                 <Shield className="w-8 h-8 text-primary" />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
                <div className="col-span-2">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Stay Ahead with the Latest Updates!
                    </h2>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                      Get exclusive insights, security alerts, and expert recommendations delivered straight to your inbox
                    </p>
                  </div>
                </div>


                <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
                  <form className="w-full">
                    <label htmlFor="UserEmail" className="sr-only"> Email </label>

                    <div className="border border-gray-100 p-2 focus-within:ring-3 sm:flex sm:items-center sm:gap-4 dark:border-gray-800">
                      <input
                        type="email"
                        id="UserEmail"
                        placeholder="john@rhcp.com"
                        className="w-full border-none bg-transparent text-black placeholder-gray-400 outline-none focus:ring-0 focus:outline-none sm:text-sm dark:bg-gray-900 dark:text-white"
                      />

                      <button
                        className="mt-1 w-full bg-blue-500 px-6 py-3 text-sm font-bold tracking-wide text-white uppercase transition-none hover:bg-blue-600 sm:mt-0 sm:w-auto sm:shrink-0"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>


                <div className="col-span-2 sm:col-span-1">
                  <p className="font-medium text-gray-900 dark:text-white">Services</p>

                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        APK Compliance Checks
                      </a>
                    </li>

                    <li>
                      <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Security & Malware Scanning
                      </a>
                    </li>

                    <li>
                      <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Policy Violation Reports
                      </a>
                    </li>

                    <li>
                      <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        GDPR & Play Store Compliance
                      </a>
                    </li>

                    <li>
                      <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        API & Permissions Analysis
                      </a>
                    </li>
                  </ul>
                </div>


                <div className="col-span-2 sm:col-span-1">
                  <p className="font-medium text-gray-900 dark:text-white">Company</p>

                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <a href="/about" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        About Us
                      </a>
                    </li>

                    <li>
                      <a href="/about" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Meet the Team
                      </a>
                    </li>

                    <li>
                      <a href="/about" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="/about" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        career
                      </a>
                    </li>
                                      </ul>
                </div>


                <div className="col-span-2 sm:col-span-1">
                  <p className="font-medium text-gray-900 dark:text-white">Helpful Links</p>

                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <a href="/contact" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a href="/" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        FAQs
                      </a>
                    </li>
                    <li>
                      <a href="/price" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Pricing & Plans
                      </a>
                    </li>
                    <li>
                      <a href="/" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        How It Works
                      </a>
                    </li>
                    <li>
                      <a href="/" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Google Play Compliance
                      </a>
                    </li>
                  </ul>
                </div>


                <div className="col-span-2 sm:col-span-1">
                  <p className="font-medium text-gray-900 dark:text-white">Legal</p>
                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <a href="/terms" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a href="/privacy" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="/cookies" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Cookie Policy
                      </a>
                    </li>
                    <li>
                      <a href="/refunds" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Refund Policy
                      </a>
                    </li>
                    <li>
                      <a href="/security" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Security Policy
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <p className="font-medium text-gray-900 dark:text-white">Downloads</p>

                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Download Sample Report
                      </a>
                    </li>

                    <li>
                      <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        APK Security Best Practices Guide
                      </a>
                    </li>

                    <li>
                      <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Privacy Policy Template for Apps
                      </a>
                    </li>

                    <li>
                      <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        Google Play Compliance Checklist
                      </a>
                    </li>
                  </ul>
                </div>

               <ul className="col-span-2 flex justify-start gap-4 lg:col-span-5 lg:justify-end">
                 {[
                   { name: "Facebook", href: "#", icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z", color: "text-[#1877F2]" },
                   { name: "X", href: "#", icon: "M22.94 2H19.5l-7.73 9.48L5.5 2H.94L9.45 12 .94 22H4.5l7.27-9.06L18.5 22h4.44L13.47 12 22.94 2z", color: "text-black" },
                   { name: "LinkedIn", href: "#", icon: "M20.447 20.452h-3.555v-5.569c0-1.327-.026-3.036-1.847-3.036-1.849 0-2.132 1.445-2.132 2.941v5.664h-3.555V9.168h3.412v1.54h.048c.476-.902 1.637-1.847 3.37-1.847 3.603 0 4.268 2.37 4.268 5.451v6.14zM4.531 7.433a2.065 2.065 0 110-4.13 2.065 2.065 0 010 4.13zM6.179 20.452H2.885V9.168h3.294v11.284zM22 0H2C.895 0 0 .895 0 2v20c0 1.105.895 2 2 2h20c1.105 0 2-.895 2-2V2c0-1.105-.895-2-2-2z", color: "text-[#0077B5]" },
                   { name: "GitHub", href: "#", icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z", color: "text-[#181717]" },
                 ].map((item) => (
                   <li key={item.name}>
                     <a
                       href={item.href}
                       rel="noreferrer"
                       target="_blank"
                       className="group transition transform hover:scale-110"
                     >
                       <span className="sr-only">{item.name}</span>
                       <svg className={`size-6 ${item.color} group-hover:opacity-80`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                         <path fillRule="evenodd" d={item.icon} clipRule="evenodd" />
                       </svg>
                     </a>
                   </li>
                 ))}
               </ul>



              </div>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-800">
              <div className="sm:flex sm:justify-between">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  &copy; 2022. Company Name. All rights reserved.
                </p>

                <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
                  <li>
                    <a href="#" className="text-gray-500 transition hover:opacity-75 dark:text-gray-400">
                      Terms & Conditions
                    </a>
                  </li>

                  <li>
                    <a href="#" className="text-gray-500 transition hover:opacity-75 dark:text-gray-400">
                      Privacy Policy
                    </a>
                  </li>

                  <li>
                    <a href="#" className="text-gray-500 transition hover:opacity-75 dark:text-gray-400">
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        );
    }