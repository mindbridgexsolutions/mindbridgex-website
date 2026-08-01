"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Sparkles, Building2, Users, Laptop, Stethoscope, Bot, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const liveProducts = [
  {
    id: "vedasetu",
    icon: Sparkles,
    tag: "Flagship Product",
    title: "MindBridgeX Spiritual Services (VedaSetu)",
    description: "A modern digital bridge connecting devotees with verified, highly experienced local Pandits. We eliminate the stress of arranging religious ceremonies by offering transparent pricing, authentic samagri kits, and hassle-free online booking.",
    features: [
      "Verified Local Pandits", 
      "Transparent Dakshina", 
      "Samagri Doorstep Delivery", 
      "Multi-language Support", 
      "Secure Digital Payments", 
      "Video Consultations"
    ],
    imageSrc: "https://omshivam.wordpress.com/wp-content/uploads/2011/09/sapta-rishi.jpg?w=800"
  },
  {
    id: "education-erp",
    icon: Building2,
    tag: "Live Product",
    title: "Education ERP Platform",
    description: "A comprehensive management system for schools and colleges to automate admissions, fees, and academics. Streamline administrative tasks and enhance the learning experience for students and educators alike.",
    features: [
      "Student & Parent Portal", 
      "Fee & Invoice Management", 
      "Attendance Tracking", 
      "Exam & Grading System", 
      "Timetable Generation", 
      "Bus Route Tracking"
    ],
    imageSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "hrms",
    icon: Users,
    tag: "Live Product",
    title: "HRMS Enterprise Suite",
    description: "Next-generation Human Resource Management System for seamless payroll, leave tracking, and recruitment. Empower your HR team with intelligent automation and deep organizational insights.",
    features: [
      "Automated Payroll", 
      "Performance Reviews", 
      "Employee Self-Service", 
      "Leave & Attendance", 
      "Recruitment Pipeline", 
      "Compliance Reporting"
    ],
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "business-automation",
    icon: Laptop,
    tag: "Live Product",
    title: "Business Flow Automation",
    description: "End-to-end workflow automation platform to eliminate manual data entry and streamline operations. Connect your existing tools and automate repetitive tasks at infinite scale.",
    features: [
      "Custom Workflows", 
      "API Integrations", 
      "Real-time Analytics", 
      "Document Processing", 
      "Approval Matrix", 
      "Audit Trails"
    ],
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "healthcare",
    icon: Stethoscope,
    tag: "Live Product",
    title: "Healthcare Clinic SaaS",
    description: "Secure, HIPAA-compliant clinic management software for patient records, appointments, and billing. Spend less time on paperwork and more time delivering quality patient care.",
    features: [
      "Electronic Health Records", 
      "Teleconsultation Integration", 
      "Billing Automation", 
      "Prescription Management", 
      "Patient Portal", 
      "Lab Integrations"
    ],
    imageSrc: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "ai-chatbot",
    icon: Bot,
    tag: "Live Product",
    title: "AI Chatbot Platform",
    description: "Intelligent customer support chatbots powered by natural language processing for 24/7 engagement. Resolve queries faster and improve customer satisfaction with generative AI.",
    features: [
      "Multilingual Support", 
      "CRM Integration", 
      "Sentiment Analysis", 
      "Seamless Human Handoff", 
      "Custom Knowledge Base", 
      "Analytics Dashboard"
    ],
    imageSrc: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1600&auto=format&fit=crop"
  }
];

export default function ProductsPage() {
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
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-semibold tracking-tighter mb-8">
            Software that scales.
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-[#86868b] max-w-3xl mx-auto">
            Scalable, secure, and intelligent platforms built to solve real-world problems. Discover our suite of live enterprise solutions.
          </motion.p>
        </motion.div>
      </section>

      {/* PRODUCTS LIST */}
      <section className="max-w-7xl mx-auto space-y-24">
        {liveProducts.map((product, index) => {
          const isEven = index % 2 === 0;
          const Icon = product.icon;

          return (
            <div 
              key={product.id} 
              className={`bg-[#f5f5f7] rounded-[3rem] p-10 md:p-16 lg:p-20 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}
            >
              
              {/* Text Content */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0071e3]/10 text-[#0071e3] font-semibold text-sm">
                  <Icon className="w-4 h-4" /> {product.tag}
                </div>
                
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">{product.title}</h2>
                <p className="text-lg text-[#86868b] leading-relaxed">
                  {product.description}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 pt-4 pb-6">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#0071e3] flex-shrink-0" />
                      <span className="text-[#1d1d1f] font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#0071e3] text-white rounded-full font-medium hover:bg-[#0077ed] transition gap-2">
                  Request a Demo <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              {/* Image Showcase using next/image */}
              <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl relative bg-white border border-[#d2d2d7]/30 transform hover:scale-[1.02] transition-transform duration-500 ease-out">
                <Image 
                  src={product.imageSrc} 
                  alt={`${product.title} Display`} 
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
        <h2 className="text-4xl font-semibold tracking-tight mb-6">Need a custom solution?</h2>
        <p className="text-xl text-[#86868b] mb-10">We don&apos;t just sell products; we engineer bespoke software tailored precisely to your business needs.</p>
        <Link href="/contact" className="text-[#0071e3] font-medium hover:underline text-lg">
          Talk to our engineering team &rarr;
        </Link>
      </section>

    </div>
  );
}