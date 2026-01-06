"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import { usePathname } from "next/navigation"; 

export default function AutoPopupModal() {
  const pathname = usePathname(); 
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  
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

  // ⏰ TRIGGER LOGIC
  useEffect(() => {
    // SECURITY CHECK: If we are in Admin Panel, DO NOT OPEN
    if (pathname?.startsWith("/admin")) {
      return; 
    }

    // Normal logic for other pages
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000); 

    return () => clearTimeout(timer);
  }, [pathname]);

  // Double protection: If on admin, don't render anything
  if (pathname?.startsWith("/admin")) return null;
  if (!isOpen) return null;

  // WhatsApp Handler
  const handleWhatsApp = () => {
    const phone = "917081808180"; 
    const text = `Hi Elitairs, I am interested in *${formData.propertyType}* properties. Please assist me.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // Validation Logic
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (formData.name.length < 3) newErrors.name = "Name is too short";
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ REAL API SUBMISSION LOGIC
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot & Validation
    if (formData.honey) return; 
    if (!validateForm()) return; 
    if (!captchaToken) {
        alert("Please complete the CAPTCHA check.");
        return;
    }

    setStatus("submitting");

    try {
      // Send Data to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          captchaToken, // Verify human
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success State
        setStatus("success");
        
        // Close Modal & Reset after delay
        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
          setFormData({ name: "", email: "", phone: "", propertyType: "Residential", message: "", honey: "" });
          setCaptchaToken(null);
          if (recaptchaRef.current) recaptchaRef.current.reset();
        }, 2500);
      } else {
        // Error State
        alert("Error: " + (data.message || "Failed to submit"));
        setStatus("idle");
      }
    } catch (error) {
      console.error("Popup Submission Error:", error);
      alert("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500" onClick={() => setIsOpen(false)} />

      <div className="relative w-full max-w-md bg-white rounded-lg overflow-hidden shadow-2xl border border-[#FFC40C] animate-scale-in max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-[#050505] p-5 flex justify-between items-center border-b border-[#FFC40C]/30 sticky top-0 z-10">
          <div className="relative w-28 h-7">
             <Image src="/elitairs-logo2trans.png" alt="Elitairs" fill className="object-contain object-left" />
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-[#FFC40C] text-2xl transition-colors leading-none">&times;</button>
        </div>

        {/* Body */}
        <div className="p-6 bg-white">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4 text-[#FFC40C]">✓</div>
              <h3 className="text-xl font-bold mb-2 text-black">Request Received</h3>
              <p className="text-gray-500 text-sm">Our premium consultants will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold uppercase tracking-wide text-black">Enquire Now</h2>
                <p className="text-xs text-gray-400">Exclusive Property Consultation</p>
              </div>

              <input type="text" name="honey" value={formData.honey} onChange={handleChange} className="hidden" />

              <div className="space-y-4">
                <div>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className={`w-full bg-gray-50 border p-3 text-sm outline-none transition-colors text-black placeholder:text-gray-400 ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-[#FFC40C]'}`} />
                    {errors.name && <p className="text-red-500 text-[10px] mt-1 text-left">{errors.name}</p>}
                </div>
                <div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number (+91)" required maxLength={10} className={`w-full bg-gray-50 border p-3 text-sm outline-none transition-colors text-black placeholder:text-gray-400 ${errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-[#FFC40C]'}`} />
                    {errors.phone && <p className="text-red-500 text-[10px] mt-1 text-left">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 text-sm outline-none focus:border-[#FFC40C] text-black cursor-pointer">
                    <option value="Residential">Interested in Residential</option>
                    <option value="Commercial">Interested in Commercial</option>
                    <option value="Plots">Interested in Plots</option>
                    <option value="SCO">Interested in SCO</option>
                </select>
              </div>

              <textarea name="message" value={formData.message} onChange={handleChange} rows={2} placeholder="Any specific requirements? (Optional)" className="w-full bg-gray-50 border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#FFC40C] resize-none text-black placeholder:text-gray-400"></textarea>

              <div className="flex justify-center scale-90 origin-center">
                <ReCAPTCHA 
                    ref={recaptchaRef} 
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Lfb5EEsAAAAAKP7IhjNGBY974dUFvEvZ7-jD7yN"} 
                    onChange={(token) => setCaptchaToken(token)} 
                />
              </div>

              <div className="space-y-3 pt-2">
                <button type="submit" disabled={status === "submitting"} className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest text-xs hover:bg-[#FFC40C] hover:text-black transition-all shadow-lg disabled:opacity-70">
                  {status === "submitting" ? "Connecting..." : "Request Callback"}
                </button>
                
                <button type="button" onClick={handleWhatsApp} className="w-full py-3 bg-[#25D366] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#128C7E] transition-all shadow-md flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  Chat on WhatsApp
                </button>
              </div>

              <p className="text-[9px] text-center text-gray-400 mt-2 leading-tight">By submitting, you authorize Elitairs to contact you even if registered on DND.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}