import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

const ContactUs = () => {
  return (
    <div className="bg-gray-700 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-10 pt-15 mt-5">
        {/* Contact Section */}
        <section className="bg-blue-50 py-16 w-full">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
              {/* Contact Info */}
              <div className="lg:col-span-2 lg:py-12">
                <h2 className="text-4xl font-extrabold text-blue-700">Let’s Connect</h2>
                <p className="mt-4 text-lg text-gray-700">
                  Got a question about policy compliance? Want to request a feature or just say hi?
                  We’d love to hear from you. Our team is ready to support you every step of the way.
                </p>
                <div className="mt-8 space-y-3">
                 {/* <p className="text-2xl font-bold text-blue-600">📞 +1 123 456 7890</p>*/}
                  <p className="text-gray-600">📧 peoplesglydlp@gmail.com</p>
                  <p className="text-gray-600">📍 282 Kevin Brook, Imogene Borough, CA 58517</p>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                  We typically respond within 24 hours. For urgent inquiries, please call us directly.
                </p>
              </div>

              {/* Contact Form */}
              <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
                <form action="#" className="space-y-4">
                  <div>
                    <label className="sr-only" htmlFor="name">Name</label>
                    <input className="w-full rounded-lg border border-gray-300 p-3 text-sm" placeholder="Your Name" type="text" id="name" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="email">Email</label>
                      <input className="w-full rounded-lg border border-gray-300 p-3 text-sm" placeholder="Your Email" type="email" id="email" />
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="phone">Phone</label>
                      <input className="w-full rounded-lg border border-gray-300 p-3 text-sm" placeholder="Your Phone" type="tel" id="phone" />
                    </div>
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="subject">Subject</label>
                    <input className="w-full rounded-lg border border-gray-300 p-3 text-sm" placeholder="Subject" type="text" id="subject" />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="message">Message</label>
                    <textarea className="w-full rounded-lg border border-gray-300 p-3 text-sm" placeholder="Write your message here..." rows={6} id="message"></textarea>
                  </div>
                  <div className="mt-4">
                    <button type="submit" className="w-full rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 sm:w-auto">
                       Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
