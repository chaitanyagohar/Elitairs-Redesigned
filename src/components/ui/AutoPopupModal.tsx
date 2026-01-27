"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import { usePathname } from "next/navigation"; 
import { motion, AnimatePresence } from "framer-motion";

export default function AutoPopupModal() {
  const pathname = usePathname(); 

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    propertyType: "Residential", 
    message: "", 
    honey: "" 
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  /* ---------------- Trigger Popup ---------------- */

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  /* ---------------- WhatsApp ---------------- */

  const handleWhatsApp = () => {
    const phone = "917081808180"; 

    const text = `Hi Elitairs, I am interested in *${formData.propertyType}* properties. Please assist me.`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  /* ---------------- Validation ---------------- */

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (formData.name.length < 3) newErrors.name = "Name is too short";

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Invalid number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honey) return;
    if (!validateForm()) return;

    if (!agreed) return alert("Accept consent first");
    if (!captchaToken) return alert("Complete CAPTCHA");

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          captchaToken,
          consent: agreed,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");

        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");

          setFormData({
            name: "",
            email: "",
            phone: "",
            propertyType: "Residential",
            message: "",
            honey: "",
          });

          setAgreed(false);
          setCaptchaToken(null);

          recaptchaRef.current?.reset();

        }, 2200);
      }

    } catch {
      alert("Something went wrong");
      setStatus("idle");
    }
  };

  /* ---------------- Input Change ---------------- */

  const handleChange = (
    e: React.ChangeEvent<any>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  /* ================================================= */

  return (
    <AnimatePresence>

      {isOpen && (

        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-white rounded-lg overflow-hidden shadow-2xl border border-[#FFC40C]"
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 30,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
          >

            {/* Header */}
            <div className="bg-[#050505] px-5 py-3 flex justify-between items-center border-b border-[#FFC40C]/30">

              <div className="relative w-24 h-6">
                <Image
                  src="/elitairs-logo2trans.png"
                  alt="Elitairs"
                  fill
                  className="object-contain"
                />
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-[#FFC40C] text-xl"
              >
                &times;
              </button>

            </div>

            {/* Body */}
            <div className="p-4">

              {status === "success" ? (

                <motion.div
                  className="text-center py-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >

                  <div className="text-4xl mb-2 text-[#FFC40C]">✓</div>

                  <h3 className="text-lg font-bold mb-1">
                    Request Received
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Our consultants will contact you shortly.
                  </p>

                </motion.div>

              ) : (

                <form
                  onSubmit={handleSubmit}
                  className="space-y-3"
                >

                  {/* Title */}
                  <div className="text-center mb-2">

                    <h2 className="text-black font-bold uppercase">
                      Enquire Now
                    </h2>

                    <p className="text-[11px] text-gray-400">
                      Exclusive Property Consultation
                    </p>

                  </div>

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="honey"
                    className="hidden"
                    value={formData.honey}
                    onChange={handleChange}
                  />

                  {/* Name */}
                  <input
                    name="name"
                    placeholder="Full Name"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border py-2 px-3 text-black outline-none focus:border-[#FFC40C]"
                  />

                  {/* Phone */}
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    autoComplete="tel"
                    maxLength={10}
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border py-2 px-3 text-black outline-none focus:border-[#FFC40C]"
                  />

                  {/* Property */}
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border py-2 px-3 text-black"
                  >
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Plots</option>
                    <option>SCO</option>
                  </select>

                  {/* Message */}
                  <textarea
                    name="message"
                    rows={2}
                    placeholder="Optional message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border py-2 px-3 text-black resize-none"
                  />

              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
  <div className="flex justify-center scale-85">
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      onChange={(token) => setCaptchaToken(token)}
    />
  </div>
)}


                  {/* Consent */}
                  <div className="flex gap-2 text-[9px] text-gray-600">

                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="accent-[#FFC40C]"
                    />

                     <p>
                  I agree to the{" "}
                  <a
                    href="/terms-conditions"
                    target="_blank"
                    className="text-[#FFC40C] underline"
                  >
                    terms & conditions
                  </a>{" "}
                  & to be contacted by team{" "}
                  <span className="font-semibold">Elitairs</span> via WhatsApp,
                  phone, SMS & e-mail.
                </p>

                  </div>

                  {/* Buttons */}
                  <div className="space-y-2">

                    <button
                      disabled={!agreed || status === "submitting"}
                      className="w-full py-3 bg-black text-white text-[11px] font-bold uppercase hover:bg-[#FFC40C] hover:text-black transition"
                    >
                      {status === "submitting"
                        ? "Connecting..."
                        : "Request Callback"}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full py-2.5 bg-[#25D366] text-white text-[11px] font-bold uppercase hover:bg-[#128C7E]"
                    >
                      Chat on WhatsApp
                    </button>

                  </div>

                </form>

              )}

            </div>
          </motion.div>
        </motion.div>

      )}

    </AnimatePresence>
  );
}
