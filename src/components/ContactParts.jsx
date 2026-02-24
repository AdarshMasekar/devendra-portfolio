import React from "react";
import { ArrowUpRight } from "lucide-react";

export const SocialProof = () => {
  return (
    <section className="w-full py-24 bg-primary px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto border-t border-dark/10 pt-16">
        <h2 className="font-heading font-bold tracking-tighter text-4xl md:text-5xl text-dark mb-12">
          System Output Logs
        </h2>

        {/* Horizontal Carousel */}
        <div
          className="flex gap-6 overflow-x-auto pb-8 snap-x"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="min-w-[300px] md:min-w-[500px] max-w-2xl bg-accent/5 rounded-[2rem] p-8 md:p-12 border border-accent/10 snap-start transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 group">
            <svg
              className="w-8 h-8 md:w-12 md:h-12 text-accent/20 mb-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="font-drama italic text-2xl md:text-4xl text-dark leading-snug mb-8">
              "Devendra has a rare ability to untangle complex deployment
              bottlenecks. His work on our CI/CD pipelines fundamentally changed
              how fast we can ship."
            </p>
            <div>
              <p className="font-heading font-bold text-dark text-lg uppercase tracking-wide">
                Rahul Sharma
              </p>
              <p className="font-data text-sm text-dark/60 uppercase tracking-widest">
                Lead Architect
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Contact = () => {
  return (
    <section id="contact" className="w-full py-32 px-6 md:px-12 bg-primary">
      <div className="max-w-7xl mx-auto border border-dark/10 rounded-[3rem] p-8 md:p-16 lg:p-24 bg-dark text-primary relative overflow-hidden">
        {/* Subtle glowing grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#E8E4DD 1px, transparent 1px), linear-gradient(90deg, #E8E4DD 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="font-data text-accent text-sm tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            System Operational
          </p>
          <h2 className="font-heading font-bold tracking-tighter text-6xl md:text-8xl mb-6">
            Let's Collaborate.
          </h2>
          <p className="font-heading font-light text-xl md:text-2xl text-primary/70 mb-16 max-w-2xl">
            Open to new challenges in shaping quality culture and building
            scalable infrastructure.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full max-w-3xl">
            <a
              href="mailto:devendra.lamani@example.com"
              className="group relative overflow-hidden rounded-[2rem] bg-accent text-primary px-8 py-5 flex items-center gap-3 transition-transform duration-300 hover:scale-[1.03] w-full md:w-auto flex-1 justify-center"
            >
              <span className="relative z-10 font-data text-sm tracking-widest uppercase transition-colors duration-300 group-hover:text-dark">
                Email
              </span>
              <div className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-x-100 z-0"></div>
              <ArrowUpRight className="relative z-10 w-4 h-4 transition-colors duration-300 group-hover:text-dark" />
            </a>

            <a
              href="https://www.linkedin.com/in/devendra-lamani-914538322/"
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-[2rem] bg-primary/10 border border-primary/20 text-primary px-8 py-5 flex items-center justify-center gap-3 transition-transform duration-300 hover:scale-[1.03] w-full md:w-auto flex-1"
            >
              <span className="relative z-10 font-data text-sm tracking-widest uppercase transition-colors duration-300 group-hover:text-dark">
                LinkedIn
              </span>
              <div className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-x-100 z-0"></div>
              <ArrowUpRight className="relative z-10 w-4 h-4 transition-colors duration-300 group-hover:text-dark" />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-[2rem] bg-primary/10 border border-primary/20 text-primary px-8 py-5 flex items-center justify-center gap-3 transition-transform duration-300 hover:scale-[1.03] w-full md:w-auto flex-1"
            >
              <span className="relative z-10 font-data text-sm tracking-widest uppercase transition-colors duration-300 group-hover:text-dark">
                GitHub
              </span>
              <div className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-x-100 z-0"></div>
              <ArrowUpRight className="relative z-10 w-4 h-4 transition-colors duration-300 group-hover:text-dark" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full bg-dark text-primary py-12 px-6 md:px-12 rounded-t-[4rem] -mt-10 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h4 className="font-heading font-bold text-xl tracking-tight uppercase">
            Devendra Lamani
          </h4>
          <p className="font-data text-xs text-primary/50 mt-2 uppercase tracking-widest">
            DevOps Engineer
          </p>
        </div>

        <div className="flex items-center gap-4 font-data text-xs text-primary/50 uppercase tracking-widest">
          <span>&copy; {new Date().getFullYear()}</span>
          <span>|</span>
          <span>Last Updated: {new Date().toISOString().split("T")[0]}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="font-data text-xs text-primary/70 uppercase tracking-widest">
            System Operational
          </span>
        </div>
      </div>
    </footer>
  );
};
