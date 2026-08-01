"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Target, Users, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const aboutSections = [
  {
    id: "mission",
    icon: Target,
    tag: "Our Mission",
    title: "Engineering software with uncompromising standards.",
    description: "At MindBridgeX, we believe technology should be both powerful and effortless. We bridge the gap between complex enterprise requirements and intuitive, high-performance software solutions.",
    features: [
      "Scalable Cloud Architecture",
      "Rigorous Security Standards",
      "User-Centric Design Philosophy",
      "Agile & Transparent Delivery",
      "Dedicated Engineering Team",
      "Long-term Technical Partnership"
    ],
    imageSrc: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: "leadership",
    icon: Users,
    tag: "Who We Are",
    title: "Built by engineers, driven by excellence.",
    description: "Founded by seasoned software architects and engineers, MindBridgeX brings decades of combined expertise in backend systems, cloud infrastructure, AI platforms, and enterprise compliance.",
    features: [
      "Expert Backend Specialists",
      "Full-Stack Mastery (Java, Python, Next.js)",
      "DevOps & CI/CD Specialists",
      "UI/UX Design Thinkers",
      "Compliance & Audit Experts",
      "Client-First Mindset"
    ],
    imageSrc: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: "values",
    icon: ShieldCheck,
    tag: "Our Core Values",
    title: "Security, trust, and absolute scale.",
    description: "Every product we ship and service we deliver is anchored in rigorous engineering practices. From bank-grade compliance readiness to lightning-fast execution, we build software you can trust.",
    features: [
      "Bank-Grade Security Protocols",
      "ISO & SOC 2 Audit Preparedness",
      "Zero Downtime Architecture",
      "Clean, Maintainable Codebases",
      "Continuous Innovation",
      "Uncompromising Quality Control"
    ],
    imageSrc: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600"
  }
];

export default function AboutPage() {
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
            <Sparkles className="w-4 h-4" /> About MindBridgeX
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-semibold tracking-tighter mb-8">
            Built for scale. Driven by purpose.
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-[#86868b] max-w-3xl mx-auto">
            We are an elite software engineering and consulting firm dedicated to building secure, intelligent, and transformative digital platforms.
          </motion.p>
        </motion.div>
      </section>

      {/* STAGGERED CONTENT BLOCKS */}
      <section className="max-w-7xl mx-auto space-y-24">
        {aboutSections.map((section, index) => {
          const isEven = index % 2 === 0;
          const Icon = section.icon;

          return (
            <div 
              key={section.id} 
              className={`bg-[#f5f5f7] rounded-[3rem] p-10 md:p-16 lg:p-20 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}
            >
              
              {/* Text Content */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0071e3]/10 text-[#0071e3] font-semibold text-sm">
                  <Icon className="w-4 h-4" /> {section.tag}
                </div>
                
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">{section.title}</h2>
                <p className="text-lg text-[#86868b] leading-relaxed">
                  {section.description}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 pt-4 pb-6">
                  {section.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#0071e3] flex-shrink-0" />
                      <span className="text-[#1d1d1f] font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#0071e3] text-white rounded-full font-medium hover:bg-[#0077ed] transition gap-2">
                  Work With Us <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              {/* Image Showcase using next/image */}
              <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl relative bg-white border border-[#d2d2d7]/30 transform hover:scale-[1.02] transition-transform duration-500 ease-out">
                <Image 
                  src={section.imageSrc} 
                  alt={`${section.title} Visual`} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

            </div>
          );
        })}
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-4xl mx-auto text-center mt-32">
        <h2 className="text-4xl font-semibold tracking-tight mb-6">Let&apos;s build something exceptional together.</h2>
        <p className="text-xl text-[#86868b] mb-10">Get in touch with our engineering leadership to discuss your vision.</p>
        <Link href="/contact" className="text-[#0071e3] font-medium hover:underline text-lg">
          Contact our team &rarr;
        </Link>
      </section>

    </div>
  );
}