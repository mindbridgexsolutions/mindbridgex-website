"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Code, Cloud, FileCheck, Smartphone, PenTool, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "custom-software",
    icon: Code,
    tag: "Enterprise Engineering",
    title: "Custom Software Development",
    description: "We build robust, highly scalable, and secure enterprise applications from the ground up. Whether you need a complex internal portal or a high-traffic consumer platform, our engineering team delivers flawless code.",
    features: [
      "Microservices Architecture", 
      "Legacy System Modernization", 
      "API Development & Integration", 
      "High-Performance Backends", 
      "Secure Data Architecture", 
      "Agile Delivery Model"
    ],
    imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "cloud-solutions",
    icon: Cloud,
    tag: "Infrastructure",
    title: "Cloud Solutions & DevOps",
    description: "Future-proof your business with resilient cloud architectures. We migrate, manage, and optimize your infrastructure on AWS, Azure, or GCP to ensure zero downtime and maximum cost-efficiency.",
    features: [
      "Cloud Migration Strategy", 
      "CI/CD Pipeline Automation", 
      "Kubernetes & Docker", 
      "Serverless Computing", 
      "24/7 Infrastructure Monitoring", 
      "Cost Optimization Analytics"
    ],
    imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "compliance-audit",
    icon: FileCheck,
    tag: "Audit & Certification",
    title: "Enterprise Compliance & Audit Readiness",
    description: "Ensure your enterprise meets the strictest global regulatory standards. We specialize in bank-grade IT audits, compliance readiness, and certification prep to guarantee your systems pass rigorous institutional inspections.",
    features: [
      "PCI-DSS & SOC 2 Prep", 
      "Banking IT Security Audits", 
      "ISO 27001 Certification Prep", 
      "Regulatory Gap Analysis", 
      "Data Privacy (DPDP/GDPR)", 
      "Continuous Risk Assessment"
    ],
    imageSrc: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1600" 
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    tag: "Digital Experiences",
    title: "Mobile App Development",
    description: "Deliver native-like mobile experiences that users love. We design and engineer incredibly fast, responsive iOS and Android applications using React Native and Flutter.",
    features: [
      "Cross-Platform Development", 
      "Native iOS & Android", 
      "Offline Sync Capabilities", 
      "Push Notification Engines", 
      "Secure Mobile Payments", 
      "App Store Optimization"
    ],
    imageSrc: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "ui-ux",
    icon: PenTool,
    tag: "Design",
    title: "Enterprise UI/UX Design",
    description: "Great software is invisible. We design intuitive, accessible, and beautiful interfaces that reduce friction, increase user adoption, and elevate your entire brand aesthetic.",
    features: [
      "User Journey Mapping", 
      "Wireframing & Prototyping", 
      "Design System Creation", 
      "Usability Testing", 
      "Accessibility (a11y) Compliance", 
      "Interactive Micro-animations"
    ],
    imageSrc: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600&auto=format&fit=crop"
  }
];

export default function ServicesPage() {
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
            Expertise that delivers.
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-[#86868b] max-w-3xl mx-auto">
            From architecture to deployment, we provide end-to-end IT consulting and engineering services to accelerate your digital transformation.
          </motion.p>
        </motion.div>
      </section>

      {/* SERVICES LIST */}
      <section className="max-w-7xl mx-auto space-y-24">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          const Icon = service.icon;

          return (
            <div 
              key={service.id} 
              className={`bg-[#f5f5f7] rounded-[3rem] p-10 md:p-16 lg:p-20 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}
            >
              
              {/* Text Content */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0071e3]/10 text-[#0071e3] font-semibold text-sm">
                  <Icon className="w-4 h-4" /> {service.tag}
                </div>
                
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">{service.title}</h2>
                <p className="text-lg text-[#86868b] leading-relaxed">
                  {service.description}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 pt-4 pb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#0071e3] flex-shrink-0" />
                      <span className="text-[#1d1d1f] font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#0071e3] text-white rounded-full font-medium hover:bg-[#0077ed] transition gap-2">
                  Discuss Your Project <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              {/* Image Showcase using next/image */}
              <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl relative bg-white border border-[#d2d2d7]/30 transform hover:scale-[1.02] transition-transform duration-500 ease-out">
                <Image 
                  src={service.imageSrc} 
                  alt={`${service.title} Illustration`} 
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
        <h2 className="text-4xl font-semibold tracking-tight mb-6">Ready to transform your business?</h2>
        <p className="text-xl text-[#86868b] mb-10">Partner with our elite engineering team to build secure, scalable, and intelligent software.</p>
        <Link href="/contact" className="text-[#0071e3] font-medium hover:underline text-lg">
          Schedule a free technical consultation &rarr;
        </Link>
      </section>

    </div>
  );
}