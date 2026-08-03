"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, Mail, Phone, MapPin, Send, Upload, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    if (file) {
      formData.append("resume", file);
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Network error. Please check your connection or backend configuration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-white text-[#1d1d1f] font-sans min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      
      {/* HEADER SECTION */}
      <section className="max-w-5xl mx-auto text-center mb-24">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0071e3]/10 text-[#0071e3] font-semibold text-sm mb-6">
            <Sparkles className="w-4 h-4" /> Get in Touch
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-semibold tracking-tighter mb-8">
            Let&apos;s build together.
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-[#86868b] max-w-3xl mx-auto">
            Whether you want to discuss a custom engineering project, explore our products, or submit your resume to join our team, we would love to hear from you.
          </motion.p>
        </motion.div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: Info with Address & Mobile Number */}
        <div className="lg:col-span-5 space-y-12 bg-[#f5f5f7] rounded-[3rem] p-10 md:p-14">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">Contact Information</h2>
            <p className="text-[#86868b] text-lg leading-relaxed">
              Reach out directly to our leadership or submit your application. All inquiries are routed straight to our team inbox.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm text-[#0071e3] flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Direct Email</h3>
                <a href="mailto:careers@mindbridgex.in" className="text-[#0071e3] font-medium hover:underline text-lg">
                  careers@mindbridgex.in
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm text-[#0071e3] flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Mobile Number</h3>
                <a href="tel:+919702100256" className="text-[#0071e3] font-medium hover:underline text-lg">
                  +91 9702100256
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm text-[#0071e3] flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Office Address</h3>
                <p className="text-[#86868b]">
                  MindBridgeX Solutions, Kandivali ,Mumbai-400101,Maharashtra 
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#d2d2d7]/40">
            <h4 className="font-semibold mb-2">Looking for a career?</h4>
            <p className="text-[#86868b] text-sm">
              Use the form to upload your resume. It will be delivered directly to careers@mindbridgex.in.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 bg-[#f5f5f7] rounded-[3rem] p-10 md:p-16">
          {submitted ? (
            <div className="text-center py-20 space-y-6">
              <div className="w-20 h-20 bg-[#0071e3]/10 text-[#0071e3] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-semibold">Message Sent Successfully!</h3>
              <p className="text-[#86868b] text-lg max-w-md mx-auto">
                Thank you for reaching out. Your message and attachments have been successfully dispatched to <span className="text-[#1d1d1f] font-medium">careers@mindbridgex.in</span>.
              </p>
              <button 
                onClick={() => { setSubmitted(false); setFile(null); }} 
                className="px-8 py-4 bg-[#0071e3] text-white rounded-full font-medium hover:bg-[#0077ed] transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight mb-8">Send us a message</h2>

              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-50 text-red-600 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{errorMessage}</span>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1d1d1f]">Your Name</label>
                  <input 
                    required 
                    name="name"
                    type="text" 
                    placeholder="Brijesh Singh" 
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-[#d2d2d7]/50 focus:outline-none focus:border-[#0071e3] transition text-[#1d1d1f]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1d1d1f]">Email Address</label>
                  <input 
                    required 
                    name="email"
                    type="email" 
                    placeholder="brijesh@example.com" 
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-[#d2d2d7]/50 focus:outline-none focus:border-[#0071e3] transition text-[#1d1d1f]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1d1d1f]">I am interested in</label>
                <select name="subject" className="w-full px-5 py-4 rounded-2xl bg-white border border-[#d2d2d7]/50 focus:outline-none focus:border-[#0071e3] transition text-[#1d1d1f]">
                  <option>Custom Software Development</option>
                  <option>Cloud Solutions & DevOps</option>
                  <option>Enterprise Compliance & Audit Readiness</option>
                  <option>MindBridgeX Spiritual Services (VedaSetu)</option>
                  <option>Career Application / Resume Submission</option>
                  <option>Other Partnership</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1d1d1f]">Message / Project Details</label>
                <textarea 
                  required 
                  name="message"
                  rows={4} 
                  placeholder="Tell us about your requirements or position you are applying for..." 
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-[#d2d2d7]/50 focus:outline-none focus:border-[#0071e3] transition text-[#1d1d1f] resize-none"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1d1d1f]">Upload Resume (Optional for Careers)</label>
                <div className="relative border-2 border-dashed border-[#d2d2d7] rounded-2xl p-6 text-center hover:border-[#0071e3] transition bg-white cursor-pointer">
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="w-6 h-6 text-[#0071e3]" />
                    <p className="text-sm font-medium text-[#1d1d1f]">
                      {file ? <span className="text-[#0071e3]">Selected: {file.name}</span> : "Click to upload resume (PDF, DOCX)"}
                    </p>
                    <p className="text-xs text-[#86868b]">Maximum file size: 10MB</p>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-[#0071e3] text-white rounded-full font-medium hover:bg-[#0077ed] transition flex items-center justify-center gap-2 text-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending to careers@mindbridgex.in...
                  </>
                ) : (
                  <>
                    Send Message & Resume <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </section>

    </div>
  );
}