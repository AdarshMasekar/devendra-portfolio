import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ShufflerProjCard = ({ project }) => {
  const [items, setItems] = useState(project.features);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [project.features]);

  return (
    <div className="proj-card bg-background rounded-[2rem] p-8 md:p-10 shadow-xl border border-dark/10 flex flex-col justify-between h-[450px] relative overflow-hidden group">
      <div>
        <h3 className="font-heading font-bold text-3xl text-dark mb-2">
          {project.name}
        </h3>
        <p className="font-heading font-light text-dark/70 mb-6">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-dark/5 rounded-full font-data text-xs uppercase tracking-wider"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="relative h-[120px] w-full mt-8">
        {items.map((item, i) => (
          <div
            key={item + i}
            className="absolute left-0 w-full bg-primary rounded-xl p-4 font-heading text-sm text-dark border border-dark/5 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              transform: `translateY(${i * 1.5}rem) scale(${1 - i * 0.05})`,
              opacity: i === 0 ? 1 : i === 1 ? 0.6 : 0,
              zIndex: 10 - i,
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="absolute top-8 right-8 w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
        </a>
      )}
    </div>
  );
};

const TypewriterProjCard = ({ project }) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        onEnter: () => setIsTyping(true),
        once: true,
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isTyping) return;
    let timeout;
    if (text.length < project.fullDesc.length) {
      timeout = setTimeout(() => {
        setText(project.fullDesc.slice(0, text.length + 1));
      }, 40);
    }
    return () => clearTimeout(timeout);
  }, [text, isTyping, project.fullDesc]);

  return (
    <div
      ref={cardRef}
      className="proj-card bg-background rounded-[2rem] p-8 md:p-10 shadow-xl border border-dark/10 flex flex-col justify-between h-[450px] relative group"
    >
      <div>
        <h3 className="font-heading font-bold text-3xl text-dark mb-2">
          {project.name}
        </h3>
        <p className="font-heading font-light text-dark/70 mb-6">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-dark/5 rounded-full font-data text-xs uppercase tracking-wider"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-dark p-6 rounded-2xl h-[160px] overflow-hidden relative">
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-accent/80"></div>
          <div className="w-3 h-3 rounded-full bg-primary/20"></div>
          <div className="w-3 h-3 rounded-full bg-primary/20"></div>
        </div>
        <div className="font-data text-xs text-primary/80 leading-relaxed">
          {text}
          <span className="inline-block w-2 h-3 bg-accent ml-1 animate-pulse"></span>
        </div>
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="absolute top-8 right-8 w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
        </a>
      )}
    </div>
  );
};

const SchedulerProjCard = ({ project }) => {
  const [activeDay, setActiveDay] = useState(-1);
  const cursorRef = useRef(null);
  const cardRef = useRef(null);
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 70%",
        onEnter: () => {
          const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
          tl.set(cursorRef.current, { x: 0, y: 0, opacity: 0 })
            .to(cursorRef.current, { opacity: 1, duration: 0.3 })
            .to(cursorRef.current, {
              x: 120,
              y: 20,
              duration: 1,
              ease: "power2.out",
            })
            .to(cursorRef.current, {
              scale: 0.8,
              duration: 0.1,
              onComplete: () => setActiveDay(3),
            })
            .to(cursorRef.current, { scale: 1, duration: 0.1 })
            .to(cursorRef.current, {
              x: 200,
              y: 70,
              duration: 0.8,
              ease: "power2.inOut",
              delay: 0.5,
            })
            .to(cursorRef.current, {
              scale: 0.8,
              duration: 0.1,
              onComplete: () => {
                const btn = document.getElementById("save-btn");
                if (btn)
                  gsap.to(btn, {
                    backgroundColor: "#E63B2E",
                    color: "#F5F3EE",
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                  });
              },
            })
            .to(cursorRef.current, { scale: 1, duration: 0.1 })
            .to(cursorRef.current, {
              opacity: 0,
              duration: 0.3,
              delay: 0.5,
              onComplete: () => setActiveDay(-1),
            });
        },
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="proj-card bg-background rounded-[2rem] p-8 md:p-10 shadow-xl border border-dark/10 flex flex-col justify-between h-[450px] relative group overflow-hidden"
    >
      <div>
        <h3 className="font-heading font-bold text-3xl text-dark mb-2">
          {project.name}
        </h3>
        <p className="font-heading font-light text-dark/70 mb-6">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-dark/5 rounded-full font-data text-xs uppercase tracking-wider"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 relative h-[160px] bg-primary/30 rounded-2xl p-6 border border-dark/5">
        <div className="flex justify-between mb-6">
          {days.map((d, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-heading text-sm transition-colors duration-300 ${activeDay === i ? "bg-accent text-primary" : "bg-dark/5 text-dark/40"}`}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            id="save-btn"
            className="px-6 py-2 rounded-full border border-dark/20 font-data text-xs tracking-widest uppercase"
          >
            Save Config
          </button>
        </div>

        {/* Custom SVG Cursor */}
        <div
          ref={cursorRef}
          className="absolute top-4 left-4 z-20 pointer-events-none opacity-0"
          style={{ transformOrigin: "top left" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.32195 2.15858C3.89953 1.70889 3.25 2.05204 3.25 2.67323V21.3268C3.25 21.948 3.89953 22.2911 4.32195 21.8414L9.81427 15.9959C10.0381 15.7577 10.3533 15.6176 10.686 15.609L18.9113 15.3967C19.5318 15.3807 19.8392 14.6185 19.3805 14.2323L4.32195 2.15858Z"
              fill="#111111"
              stroke="#F5F3EE"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="absolute top-8 right-8 w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
        </a>
      )}
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".proj-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const projects = [
    {
      name: "Microservices CI/CD",
      desc: "End-to-end pipeline automation.",
      tags: ["Jenkins", "Docker", "GitOps"],
      features: [
        "Zero-downtime deployments",
        "Automated rollbacks",
        "Security scanning in CI",
      ],
      link: "https://github.com",
    },
    {
      name: "K8s cluster Provisioning",
      desc: "Highly available AWS clusters.",
      tags: ["Terraform", "AWS", "EKS"],
      fullDesc:
        "Automated the provisioning of highly available Kubernetes clusters on AWS using Terraform and Ansible. Reduced manual infrastructure setup time from 3 days to 45 minutes, enforcing security group compliance and standardized networking layers.",
      link: "https://github.com",
    },
    {
      name: "Continuous Monitoring",
      desc: "Real-time health observability.",
      tags: ["Prometheus", "Grafana", "ELK"],
      link: "https://github.com",
    },
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="w-full py-32 px-6 md:px-12 bg-primary"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading font-bold tracking-tighter text-5xl md:text-7xl text-dark text-left mb-16 uppercase border-b-2 border-dark pb-6">
          Interactive Functional Artifacts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ShufflerProjCard project={projects[0]} />
          <TypewriterProjCard project={projects[1]} />
          <SchedulerProjCard project={projects[2]} />
        </div>
      </div>
    </section>
  );
};

export default Projects;
