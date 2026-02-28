import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Mouse parallax effect for interactive background
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };

      gsap.to(".hero-bg", {
        x: mouseRef.current.x * 20,
        y: mouseRef.current.y * 20,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    let ctx = gsap.context(() => {
      gsap.from(".hero-bg", {
        scale: 1.1,
        duration: 2,
        ease: "power2.out",
      });
      gsap.from(".hero-element", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.3,
      });
    }, containerRef);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative h-[100dvh] w-full flex items-end justify-start overflow-hidden bg-dark"
    >
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542456075-bd74b3d7decd?q=80&w=2000&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent pointer-events-none" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32 flex flex-col items-start w-[90%] lg:w-[70%]">
        <p className="hero-element font-data text-primary/70 text-sm md:text-base tracking-widest uppercase mb-6">
          DevOps Engineer · Mumbai, India · 2+ Years Experience
        </p>
        <h1 className="flex flex-col gap-2 mb-10 leading-[0.9]">
          <span className="hero-element font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-primary tracking-tighter">
            Automate the
          </span>
          <span className="hero-element font-drama italic text-6xl md:text-8xl lg:text-[10rem] text-accent">
            Infrastructure.
          </span>
        </h1>
        <button
          onClick={() => {
            document
              .getElementById("work")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="hero-element group px-8 py-4 rounded-[2rem] bg-accent text-primary font-heading font-semibold text-lg overflow-hidden relative transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03]"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
            View My Work
          </span>
          <div className="absolute inset-0 bg-dark transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 z-0" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
