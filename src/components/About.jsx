import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TypewriterCard = ({ skills }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [skillIndex, setSkillIndex] = useState(0);

  useEffect(() => {
    const currentSkill = skills[skillIndex];
    let timeout;

    if (isDeleting) {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 50);
      } else {
        setIsDeleting(false);
        setSkillIndex((prev) => (prev + 1) % skills.length);
      }
    } else {
      if (text.length < currentSkill.length) {
        timeout = setTimeout(
          () => setText(currentSkill.slice(0, text.length + 1)),
          100,
        );
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, skillIndex, skills]);

  return (
    <div className="bg-background rounded-[2rem] p-8 shadow-sm border border-dark/5 flex flex-col justify-between h-48">
      <div>
        <h3 className="font-heading font-bold text-dark text-lg">
          Top Skill Radar
        </h3>
        <p className="font-data text-xs text-dark/60 mt-1 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>{" "}
          Live Feed
        </p>
      </div>
      <div className="font-data text-accent text-xl flex items-center">
        <span>{text}</span>
        <span className="w-2 h-6 bg-accent animate-pulse ml-1 opacity-70"></span>
      </div>
    </div>
  );
};

const ShufflerCard = ({ count, companies }) => {
  const [items, setItems] = useState(companies);

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
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 shadow-sm border border-dark/5 flex flex-col justify-between h-48 overflow-hidden relative">
      <div>
        <h3 className="font-heading font-bold text-dark text-lg">Roles Held</h3>
      </div>
      <div className="flex items-end justify-between">
        <span className="font-heading font-bold text-6xl text-dark leading-none">
          {count}
        </span>
        <div className="relative h-[3rem] w-[150px] overflow-hidden">
          {items.map((item, i) => (
            <div
              key={item + i}
              className="absolute right-0 w-full text-right font-data text-sm text-dark/60 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                transform: `translateY(${i * 1.5}rem)`,
                opacity: i === 0 ? 1 : i === 1 ? 0.4 : 0,
              }}
            >
              @ {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CounterCard = ({ target }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(
            { val: 0 },
            {
              val: target,
              duration: 2,
              ease: "power3.out",
              onUpdate: function () {
                setCount(Math.floor(this.targets()[0].val));
              },
            },
          );
        },
        once: true,
      });
    }, cardRef);
    return () => ctx.revert();
  }, [target]);

  return (
    <div
      ref={cardRef}
      className="bg-background rounded-[2rem] p-8 shadow-sm border border-dark/5 flex flex-col justify-between h-48"
    >
      <div>
        <h3 className="font-heading font-bold text-dark text-lg">
          Years Active
        </h3>
      </div>
      <div>
        <span className="font-heading font-bold text-8xl text-accent leading-none">
          {count}+
        </span>
      </div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef(null);

  const summary1 = "2+ years shaping quality culture.";
  const summary2 =
    "DevOps Engineer with expertise in building scalable CI/CD pipelines, automating infrastructure, and managing Linux-based containerized environments. Passionate about enhancing deployment efficiency and system reliability.";

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade up words one by one
      gsap.from(".summary-word", {
        scrollTrigger: {
          trigger: ".summary-container",
          start: "top 70%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "power3.out",
      });

      // Cards stagger
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full py-32 px-6 md:px-12 bg-primary"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Column: Summary */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center summary-container">
          <h2 className="font-drama italic text-4xl md:text-5xl lg:text-6xl text-accent leading-tight mb-8">
            {summary1.split(" ").map((word, i) => (
              <span key={i} className="summary-word inline-block mr-3">
                {word}
              </span>
            ))}
          </h2>
          <p className="font-heading text-lg md:text-xl text-dark/80 leading-relaxed font-light text-balance">
            {summary2.split(" ").map((word, i) => (
              <span key={i} className="summary-word inline-block mr-2">
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Right Column: Stat Cards */}
        <div className="w-full lg:w-[40%] flex flex-col gap-6 stats-container">
          <div className="stat-card">
            <CounterCard target={2} />
          </div>
          <div className="stat-card">
            <ShufflerCard
              count={2}
              companies={["Larsen & Toubro", "Kodnest"]}
            />
          </div>
          <div className="stat-card">
            <TypewriterCard
              skills={["Linux", "Jenkins", "Git", "Docker", "Kubernetes"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
