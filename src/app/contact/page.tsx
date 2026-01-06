"use client";
import React, { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReCAPTCHA from "react-google-recaptcha"; 

export default function ContactPage() {
  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honey: "" // Hidden field for bots
  });

  // UI States
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // CAPTCHA State
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // 1. Validation Logic
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    if (formData.name.length < 3) newErrors.name = "Name is too short";
    
    // Strict Indian Phone Validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 2. Handle Final Submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot Check
    if (formData.honey) return;

    // Validation Check
    if (!validateForm()) return;

    // CAPTCHA Check
    if (!captchaToken) {
      alert("Please verify that you are not a robot.");
      return;
    }

    setStatus("submitting");

    console.log("Submitting with Captcha Token:", captchaToken);

    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "", honey: "" });
      setCaptchaToken(null);
      recaptchaRef.current?.reset(); 
    }, 1500);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="bg-white text-black font-sans selection:bg-[#C5A059] selection:text-white">
      <Navbar />

      <section className="relative h-[50vh] flex flex-col justify-center items-center text-center text-white px-6">
         <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=2671&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Contact Hero" 
            />
            <div className="absolute inset-0 bg-black/60 z-10" />
         </div>
         <div className="relative z-20">
            <p className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-bold mb-4">Get in Touch</p>
            <h1 className="text-5xl md:text-7xl font-serif font-medium">
              Start the <span className="italic text-gray-300">Conversation.</span>
            </h1>
         </div>
      </section>

      <section className="py-24 px-6 container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
         
         {/* LEFT COLUMN: Contact Info + MAP */}
         <div className="flex flex-col">
            <h2 className="text-4xl font-bold mb-8">Contact Information</h2>
            <p className="text-gray-500 mb-12 text-lg">
              Our consultants are ready to assist you.
            </p>
            
            <div className="space-y-8 text-lg font-light text-black mb-12">
               <div className="border-l-4 border-[#C5A059] pl-6">
                  <p className="uppercase text-xs font-bold text-gray-400 mb-1">Visit</p>
                  <p className="font-medium">2nd floor, Cross Point Mall, 307, Opposite Galleria Market, Sector 28, DLF Phase IV, Gurugram, Haryana 122009</p>
               </div>
               <div className="border-l-4 border-gray-200 pl-6">
                  <p className="uppercase text-xs font-bold text-gray-400 mb-1">Call</p>
                  <p className="font-medium hover:text-[#C5A059] cursor-pointer">+91 70818 08180</p>
               </div>
               <div className="border-l-4 border-gray-200 pl-6">
                  <p className="uppercase text-xs font-bold text-gray-400 mb-1">Email</p>
                  <p className="font-medium hover:text-[#C5A059] cursor-pointer">info@elitairs.com</p>
               </div>
            </div>

            {/* ✅ GOOGLE MAP ADDED HERE */}
            <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg border border-gray-100 relative group">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.4112281189273!2d77.07922007528266!3d28.467159775755448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d191751850aad%3A0xea9c107b7288b8f4!2sElitairs!5e0!3m2!1sen!2sin!4v1767016799849!5m2!1sen!2sin"
          className="absolute inset-0 w-full h-full border-0"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                ></iframe>
                 {/* Hover Overlay Hint */}
                 <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:bg-transparent transition-colors" />
            </div>

         </div>

         {/* RIGHT COLUMN: Form */}
         <div className="bg-gray-50 p-8 lg:p-12 border border-gray-100 shadow-xl rounded-sm h-fit">
            {status === "success" ? (
               <div className="text-center py-20">
                  <div className="text-6xl mb-6 text-[#C5A059]">✓</div>
                  <h3 className="text-3xl font-bold mb-2">Message Sent</h3>
                  <p className="text-gray-500">We will contact you shortly.</p>
                  <button onClick={() => setStatus("idle")} className="mt-8 underline text-sm">Send another</button>
               </div>
            ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="text" name="honey" value={formData.honey} onChange={handleChange} className="hidden" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white border border-gray-200 p-4 text-black focus:outline-none focus:border-[#C5A059]" placeholder="John Doe" required />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white border border-gray-200 p-4 text-black focus:outline-none focus:border-[#C5A059]" placeholder="john@example.com" required />
                    </div>
                  </div>

                  <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} maxLength={10} className="w-full bg-white border border-gray-200 p-4 text-black focus:outline-none focus:border-[#C5A059]" placeholder="9876543210" required />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Message</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full bg-white border border-gray-200 p-4 text-black focus:outline-none focus:border-[#C5A059] resize-none" placeholder="I am interested in..." required></textarea>
                  </div>

                  {/* RECAPTCHA WIDGET */}
                  <div className="flex justify-center md:justify-start">
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6Lfb5EEsAAAAAKP7IhjNGBY974dUFvEvZ7-jD7yN" // Replace this!
                        onChange={(token) => setCaptchaToken(token)}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === "submitting"} 
                    className="w-full px-12 py-5 bg-black text-white font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-black transition-all disabled:opacity-70"
                  >
                      {status === "submitting" ? "Sending..." : "Send Message"}
                  </button>
               </form>
            )}
         </div>
      </section>

      <Footer />
    </div>
  );
}