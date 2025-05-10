import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Login from "@/components/login";
import Register from "@/components/register";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            <Link href="/">APK Policy Checker</Link>
          </h1>
        </div>

        {/* Centered Navigation (hidden on mobile) */}
        <div className="hidden md:flex space-x-6 items-center flex-grow justify-center">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About Us" },
            { href: "/price", label: "Pricing" },
            { href: "/contact", label: "Contact Us" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-gray-700 font-medium hover:text-primary transition-colors">
              {label}
            </Link>
          ))}
          <Button variant="default" size="sm" className="text-sm">
            <Link href="/history">📜 Scan History</Link>
          </Button>
        </div>

        {/* Right-Aligned Buttons (Login/ Register) */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-sm text-blue-600 hover:bg-blue-100">
            <Link href="/login">Login</Link>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            className="text-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-600 hover:to-blue-500"
          >
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>
      </motion.nav>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <motion.div
          className="fixed top-16 left-0 w-full bg-white shadow-md py-6 px-6 flex flex-col space-y-4 z-40"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About Us" },
            { href: "/price", label: "Pricing" },
            { href: "/contact", label: "Contact Us" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-gray-700 font-medium hover:text-primary transition-colors">
              {label}
            </Link>
          ))}

          <Button variant="default" className="text-sm">
            <Link href="/history">📜 Scan History</Link>
          </Button>

          <Button variant="ghost" className="text-sm text-gray-600 hover:bg-blue">
            <Link href="/login">Login</Link>
          </Button>

          <Button
            variant="secondary"
            className="text-sm text-white bg-gradient-to-r from-gray-600 to-blue-300 hover:from-gray-700 hover:to-blue-600"
          >
            <Link href="/register">Register</Link>
          </Button>
        </motion.div>
      )}
    </>
  );
}
