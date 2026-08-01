"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code, ShieldCheck, Sparkles, Cloud } from "lucide-react";

export default function HomePage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-white text-[#1d1d1f] font-sans min-h-screen pt-40 pb-32 px-6 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto text-center mb-32">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] font-semibold text-sm mb-10">
            <Sparkles className="w-4 h-4" /> Welcome to MindBridgeX
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter mb-10 leading-[1.1]">
            Engineering <br className="hidden md:block" /> the future.
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-[#86868b] max-w-3xl mx-auto mb-16 leading-relaxed">
            We build scalable, secure, and intelligent enterprise software platforms. From legacy modernization to global cloud infrastructure, we deliver uncompromising technical excellence.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact" className="w-full sm:w-auto px-10 py-5 bg-[#0071e3] text-white rounded-full font-medium hover:bg-[#0077ed] transition text-lg">
              Start your project
            </Link>
            <Link href="/services" className="w-full sm:w-auto px-10 py-5 bg-[#f5f5f7] text-[#1d1d1f] rounded-full font-medium hover:bg-[#e8e8ed] transition text-lg flex items-center justify-center gap-2">
              Explore our services <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* HERO IMAGE */}
      <section className="max-w-7xl mx-auto mb-40">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[55vh] md:h-[75vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative bg-[#f5f5f7]"
        >
          <Image 
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=2000" 
            alt="MindBridgeX Engineering Team" 
            fill
            sizes="100vw"
            priority
            className="object-cover transform hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </motion.div>
      </section>

      {/* BENTO GRID */}
      <section className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          
          {/* Spotlight: VedaSetu */}
          <Link href="/products" className="md:col-span-2 group bg-[#f5f5f7] rounded-[3rem] p-12 md:p-16 lg:p-20 overflow-hidden relative flex flex-col justify-between min-h-[480px] hover:bg-[#e8e8ed] transition-colors">
            <div className="relative z-10 w-full md:w-2/3">
              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">MindBridgeX Spiritual Services</h3>
              <p className="text-xl text-[#86868b] mb-12 leading-relaxed">Discover VedaSetu, our flagship platform connecting devotees with verified local Pandits for seamless, transparent religious ceremonies.</p>
              <div className="inline-flex items-center gap-2 text-[#0071e3] font-medium text-lg group-hover:gap-4 transition-all">
                View Flagship Product <ArrowRight className="w-6 h-6" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-2/3 h-2/3 opacity-20 transform translate-x-1/4 translate-y-1/4 group-hover:scale-105 transition-transform duration-700">
               <Image src="https://omshivam.wordpress.com/wp-content/uploads/2011/09/sapta-rishi.jpg?w=800" alt="VedaSetu" fill sizes="50vw" className="object-cover rounded-tl-[3rem]" />
            </div>
          </Link>

          {/* Spotlight: Compliance */}
          <Link href="/services" className="md:col-span-1 group bg-[#1d1d1f] text-white rounded-[3rem] p-12 md:p-16 flex flex-col justify-between min-h-[480px] hover:bg-[#000000] transition-colors">
            <div>
              <ShieldCheck className="w-16 h-16 text-[#0071e3] mb-10" />
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 leading-tight">Bank-Grade Compliance.</h3>
              <p className="text-[#a1a1a6] text-xl leading-relaxed">ISO 27001, SOC 2, and GDPR audit readiness for enterprise networks.</p>
            </div>
            <div className="inline-flex items-center gap-2 text-[#0071e3] font-medium text-lg group-hover:gap-4 transition-all mt-12">
                Learn more <ArrowRight className="w-6 h-6" />
            </div>
          </Link>

          {/* Spotlight: Custom Software */}
          <Link href="/services" className="md:col-span-1 group bg-[#f5f5f7] rounded-[3rem] p-12 md:p-16 flex flex-col justify-between min-h-[400px] hover:bg-[#e8e8ed] transition-colors">
            <div>
              <Code className="w-14 h-14 text-[#0071e3] mb-8" />
              <h3 className="text-3xl font-semibold tracking-tight mb-6">Custom Software</h3>
              <p className="text-lg text-[#86868b] leading-relaxed">Bespoke architecture tailored precisely to your business needs.</p>
            </div>
          </Link>

          {/* Spotlight: Cloud Solutions */}
          <Link href="/services" className="md:col-span-2 group bg-[#f5f5f7] rounded-[3rem] p-12 md:p-16 flex flex-col justify-between min-h-[400px] hover:bg-[#e8e8ed] transition-colors overflow-hidden relative">
            <div className="relative z-10">
              <Cloud className="w-14 h-14 text-[#0071e3] mb-8" />
              <h3 className="text-3xl font-semibold tracking-tight mb-6">Cloud & DevOps</h3>
              <p className="text-lg text-[#86868b] max-w-md leading-relaxed">Resilient, scalable cloud infrastructure managed 24/7 to ensure zero downtime and maximum cost-efficiency.</p>
            </div>
             <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 transform group-hover:scale-105 transition-transform duration-700">
               <Image src="https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Cloud" fill sizes="50vw" className="object-cover" />
            </div>
          </Link>

        </div>
      </section>

    </div>
  );
}