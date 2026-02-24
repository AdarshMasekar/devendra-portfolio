import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-6 w-full z-[100] flex justify-center pointer-events-none px-4">
      <div
        ref={navRef}
        className={`pointer-events-auto transition-colors duration-500 rounded-[2rem] px-6 py-4 flex items-center justify-between gap-6 md:gap-16 w-full md:w-max ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border border-dark/10 shadow-lg text-dark"
            : "bg-transparent text-primary"
        }`}
      >
        <div
          className="font-heading font-bold text-xl tracking-tight cursor-pointer"
          onClick={() => scrollTo("top")}
        >
          DEVENDRA LAMANI
        </div>

        <nav className="hidden md:flex items-center gap-8 font-data text-sm tracking-wider uppercase">
          <button
            onClick={() => scrollTo("about")}
            className="hover:-translate-y-[1px] transition-transform"
          >
            About
          </button>
          <button
            onClick={() => scrollTo("work")}
            className="hover:-translate-y-[1px] transition-transform"
          >
            Work
          </button>
          <button
            onClick={() => scrollTo("skills")}
            className="hover:-translate-y-[1px] transition-transform"
          >
            Skills
          </button>
        </nav>

        <button
          onClick={() => scrollTo("contact")}
          className={`px-6 py-2.5 rounded-[2rem] font-heading font-semibold text-sm transition-all duration-300 transform hover:scale-[1.03] overflow-hidden relative group ${
            isScrolled ? "bg-accent text-primary" : "bg-primary text-dark"
          }`}
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
            Let's Talk
          </span>
          <div className="absolute inset-0 bg-dark transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-x-100 z-0"></div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
