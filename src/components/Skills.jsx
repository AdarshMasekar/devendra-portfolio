import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SkillTicker = ({ title, skills, reverse }) => {
  return (
    <div className="mb-16 relative">
      <div className="flex items-center gap-4 mb-6 px-6 md:px-12">
        <h3 className="font-heading font-bold text-primary/90 text-xl tracking-wide">
          {title}
        </h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/20 to-transparent"></div>
      </div>
      <div className="w-full relative overflow-hidden flex whitespace-nowrap mask-edges">
        <div
          className={`flex gap-6 px-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        >
          {[...skills, ...skills, ...skills, ...skills].map((skill, idx) => (
            <div
              key={`${skill}-${idx}`}
              className="group relative px-8 py-4 rounded-2xl border border-primary/10 bg-primary/5 backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-accent/5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 font-data text-primary text-base md:text-lg tracking-wider font-light group-hover:text-accent transition-colors duration-300">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".phil-line-1", {
        scrollTrigger: { trigger: ".phil-container", start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".phil-line-2", {
        scrollTrigger: { trigger: ".phil-container", start: "top 70%" },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full bg-dark relative pb-32 pt-32 overflow-hidden"
    >
      {/* Background Visual Enhancements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-accent/20 rounded-full blur-[120px] opacity-20 mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-10%] w-[60%] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 flex items-center justify-between">
          <div>
            <p className="font-data text-accent text-sm tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-accent rotate-45"></span>
              The Toolset
            </p>
            <h2 className="font-heading font-bold tracking-tighter text-5xl md:text-7xl text-primary">
              What I Build With
            </h2>
          </div>
        </div>

        <div className="flex flex-col mb-40">
          <SkillTicker
            title="Infrastructure & Cloud"
            skills={["AWS", "Terraform", "Linux", "EC2", "S3", "VPC"]}
            reverse={false}
          />
          <SkillTicker
            title="Containerization"
            skills={["Docker", "Kubernetes", "Helm", "Docker Compose"]}
            reverse={true}
          />
          <SkillTicker
            title="CI/CD & Automation"
            skills={[
              "Jenkins",
              "GitOps",
              "GitHub Actions",
              "ArgoCD",
              "Ansible",
            ]}
            reverse={false}
          />
          <SkillTicker
            title="Scripting & Development"
            skills={[
              "Python",
              "Bash",
              "Java",
              "Spring Boot",
              "React",
              "JavaScript",
            ]}
            reverse={true}
          />
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-12 phil-container pb-16">
          <p className="phil-line-1 font-heading font-light text-2xl md:text-4xl text-primary/60 mb-8 max-w-3xl leading-relaxed">
            Most infrastructure engineering focuses on{" "}
            <span className="text-primary italic border-b border-primary/30 pb-1">
              fragile manual configurations
            </span>
            .
          </p>
          <p className="phil-line-2 font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-primary leading-[0.95] tracking-tight">
            I focus on <br className="hidden md:block" />
            <span className="font-drama italic text-accent font-normal leading-tight">
              declarative, resilient automation.
            </span>
          </p>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 45s linear infinite; }
        .mask-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `,
        }}
      />
    </section>
  );
};

export default Skills;
