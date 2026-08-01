"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Briefcase, Code, Cpu, Phone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

const careerSections = [
  {
    id: "culture",
    icon: Briefcase,
    tag: "Life at MindBridgeX",
    title: "Build the future with world-class engineers.",
    description: "We are a team of passionate backend architects, full-stack builders, and cloud innovators. We foster a culture of deep technical ownership, continuous learning, and uncompromising code quality.",
    features: [
      "Competitive Compensation & Equity",
      "Flexible Remote & Hybrid Work",
      "Continuous Learning & Certifications",
      "Cutting-Edge Tech Stack (Java, Python, Next.js)",
      "Collaborative & Autonomous Teams",
      "Direct Impact on Global Products"
    ],
    imageSrc: "https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: "engineering",
    icon: Code,
    tag: "Engineering Excellence",
    title: "Solve hard problems at infinite scale.",
    description: "From building high-throughput backend services and secure financial compliance pipelines to scaling our flagship platform VedaSetu, our engineers tackle complex architectural challenges every single day.",
    features: [
      "Microservices & Event-Driven Systems",
      "Advanced CI/CD Pipeline Automation",
      "High-Performance Cloud Infrastructure",
      "Bank-Grade Security & Compliance",
      "Rigorous Code Reviews & Pair Programming",
      "Clean Architecture & SOLID Principles"
    ],
    imageSrc: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: "growth",
    icon: Cpu,
    tag: "Career Growth",
    title: "Accelerate your engineering journey.",
    description: "We believe in nurturing top talent. Whether you want to master system design, lead enterprise cloud migrations, or architect resilient cloud applications, we provide the mentorship and runway you need.",
    features: [
      "Mentorship from Principal Architects",
      "Clear Promotion & Career Pathways",
      "Sponsorship for Tech Conferences",
      "Internal Tech Talks & Workshops",
      "Cross-Functional Project Exposure",
      "Ownership of Core Products"
    ],
    imageSrc: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1600"
  }
];

export default function CareersPage() {
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
            <Sparkles className="w-4 h-4" /> Careers at MindBridgeX
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-semibold tracking-tighter mb-8">
            Join our elite engineering team.
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-[#86868b] max-w-3xl mx-auto">
            We are always looking for exceptional software engineers, backend experts, and cloud architects who want to build software that scales.
          </motion.p>
        </motion.div>
      </section>

      {/* STAGGERED CONTENT BLOCKS */}
      <section className="max-w-7xl mx-auto space-y-24">
        {careerSections.map((section, index) => {
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
                  Apply Now <ArrowRight className="w-5 h-5" />
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

      {/* RECRUITMENT CONTACT CARD */}
      <section className="max-w-4xl mx-auto mt-32 bg-[#f5f5f7] rounded-[3rem] p-10 md:p-14 text-center space-y-8 border border-[#d2d2d7]/40 shadow-sm">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Direct Recruitment Inquiry</h2>
        <p className="text-lg text-[#86868b] max-w-xl mx-auto">
          Candidates can reach out directly via phone or email for immediate career inquiries and interview coordination.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4">
          <a href="tel:9702100256" className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm text-[#1d1d1f] hover:text-[#0071e3] transition font-medium text-lg">
            <div className="w-10 h-10 rounded-xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            +91 9702100256
          </a>
          
          <a href="mailto:mindbridgexsolutions@gmail.com" className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm text-[#1d1d1f] hover:text-[#0071e3] transition font-medium text-lg">
            <div className="w-10 h-10 rounded-xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            mindbridgexsolutions@gmail.com
          </a>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-4xl mx-auto text-center mt-20">
        <h2 className="text-4xl font-semibold tracking-tight mb-6">Ready to take the next step?</h2>
        <p className="text-xl text-[#86868b] mb-10">Upload your resume through our contact portal to connect with our recruitment team.</p>
        <Link href="/contact" className="text-[#0071e3] font-medium hover:underline text-lg">
          Go to Contact & Application Form &rarr;
        </Link>
      </section>

    </div>
  );
}