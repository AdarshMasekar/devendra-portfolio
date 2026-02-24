import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RotatingMotif = () => (
  <div
    className="w-16 h-16 relative flex items-center justify-center animate-spin-slow"
    style={{ animationDuration: "10s" }}
  >
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full stroke-accent fill-transparent stroke-[4]"
    >
      <path d="M50 10 L90 50 L50 90 L10 50 Z" />
      <circle cx="50" cy="50" r="20" className="stroke-dark/20" />
    </svg>
  </div>
);

const ScanningLaser = () => {
  const laserRef = useRef(null);
  useEffect(() => {
    gsap.to(laserRef.current, {
      y: 60,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "power1.inOut",
    });
  }, []);
  return (
    <div className="w-16 h-16 relative border border-dark/20 flex flex-col items-center">
      <div className="w-full h-full bg-[radial-gradient(circle_at_center,_transparent_10%,_#E8E4DD_80%)] grid grid-cols-4 grid-rows-4 gap-[1px]">
        {Array(16)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="bg-dark/10"></div>
          ))}
      </div>
      <div
        ref={laserRef}
        className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_8px_2px_rgba(230,59,46,0.6)] z-10"
      ></div>
    </div>
  );
};

const PulsingWaveform = () => {
  const pathRef = useRef(null);
  useEffect(() => {
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      repeat: -1,
      duration: 2,
      ease: "linear",
    });
  }, []);
  return (
    <div className="w-16 h-16 relative flex items-center overflow-hidden">
      <svg viewBox="0 0 100 50" className="w-full relative top-2">
        <path
          ref={pathRef}
          d="M0 25 L20 25 L30 5 L40 45 L50 25 L100 25"
          className="stroke-accent fill-transparent stroke-[3]"
          strokeDasharray="200"
          strokeDashoffset="200"
        />
      </svg>
    </div>
  );
};

const ExperienceCard = ({
  index,
  title,
  subtitle,
  bullets,
  GraphicComponent,
}) => {
  return (
    <div
      className="experience-card sticky top-[15vh] w-full max-w-4xl mx-auto h-[70vh] bg-background rounded-[3rem] p-10 md:p-16 border border-dark/10 shadow-xl flex flex-col justify-between origin-top"
      style={{ zIndex: index }}
    >
      <div className="flex justify-between items-start">
        <div className="font-data text-6xl text-dark/10 font-bold leading-none">
          0{index + 1}
        </div>
        <GraphicComponent />
      </div>
      <div>
        <h3 className="font-heading font-bold text-4xl md:text-5xl text-dark mb-4">
          {title}
        </h3>
        <p className="font-data text-accent tracking-wider uppercase mb-8 text-sm md:text-base">
          {subtitle}
        </p>
        <ul className="flex flex-col gap-4 max-w-2xl">
          {bullets.map((bullet, i) => (
            <li
              key={i}
              className="font-heading font-light text-lg text-dark/80 tracking-wide border-l-2 border-accent/30 pl-4"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".experience-card");
      if (cards.length > 0) {
        cards.forEach((card, index) => {
          if (index === cards.length - 1) return; // Last card doesn't scale down

          ScrollTrigger.create({
            trigger: card,
            start: "top 15vh",
            endTrigger: cards[index + 1],
            end: "top 15vh",
            scrub: true,
            animation: gsap.fromTo(
              card,
              { scale: 1, filter: "blur(0px)", opacity: 1 },
              { scale: 0.9, filter: "blur(20px)", opacity: 0.5, ease: "none" },
            ),
          });
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      title: "DevOps Engineer",
      subtitle: "Larsen & Toubro | 2022 - Present",
      bullets: [
        "Orchestrated automated CI/CD pipelines using Jenkins, reducing deployment times by 40%.",
        "Managed containerized deployments using Docker and Kubernetes to ensure high availability.",
        "Implemented infrastructure as code (IaC) using Terraform for predictable environments.",
      ],
      GraphicComponent: RotatingMotif,
    },
    {
      title: "Java Full Stack Intern",
      subtitle: "Kodnest | 2021 - 2022",
      bullets: [
        "Developed and maintained full-stack web applications using Java, Spring Boot, and React.",
        "Collaborated with cross-functional teams to design and implement RESTful APIs.",
        "Gained hands-on experience in database management and frontend integration.",
      ],
      GraphicComponent: ScanningLaser,
    },
    {
      title: "B.E. Computer Science",
      subtitle: "Visvesvaraya Technological University | 2019 - 2023",
      bullets: [
        "Graduated with a focus on Computer Science and Engineering principles.",
        "Completed comprehensive coursework in software engineering, databases, and algorithms.",
      ],
      GraphicComponent: PulsingWaveform,
    },
  ];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="w-full pb-32 pt-16 px-6 md:px-12 bg-primary relative min-h-[300vh]"
    >
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="font-heading font-bold tracking-tighter text-5xl md:text-7xl text-dark text-center">
          The Archive Stack
        </h2>
      </div>
      <div className="relative">
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={i}
            index={i}
            title={exp.title}
            subtitle={exp.subtitle}
            bullets={exp.bullets}
            GraphicComponent={exp.GraphicComponent}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
