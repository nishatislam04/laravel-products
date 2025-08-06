"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Head } from "@inertiajs/react";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Handle form submission logic
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Head title="Contact - Exclusive" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Contact Content */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Side - Contact Information */}
            <div className="space-y-8">
              {/* Call To Us Section */}
              <div>
                <div className="mb-8 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Call To Us</h2>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p>We are available 24/7, 7 days a week.</p>
                  <p>Phone: +88(01611)12222</p>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-300" />

              {/* Write To US Section */}
              <div>
                <div className="mb-8 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Write To US</h2>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p>Fill out our form and we will contact you within 24 hours.</p>
                  <p>Emails: customer@exclusive.com</p>
                  <p>Emails: support@exclusive.com</p>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Row - Name and Email */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="sr-only">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-sm border-0 bg-gray-100 py-6 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="sr-only">
                      Your Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-sm border-0 bg-gray-100 py-6 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>

                {/* Second Row - Phone and Address */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="sr-only">
                      Your Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Your Phone *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-sm border-0 bg-gray-100 py-6 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="sr-only">
                      Your Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Your Address (optional)"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full rounded-sm border-0 bg-gray-100 py-6 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="sr-only">
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="h-32 w-full resize-none rounded-sm border-0 bg-gray-100 py-6 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-red-500"
                    rows={10}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    size="lg"
                    type="submit"
                    className="rounded-md bg-red-500 px-8 py-3 font-medium text-white hover:bg-red-600"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
