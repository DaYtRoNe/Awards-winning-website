import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!textRef.current || !containerRef.current) return;

    // Parallax reveal effect for the footer
    gsap.from(containerRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // Animate the huge text when entering the footer
    gsap.from(textRef.current.children, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

  }, { scope: containerRef });

  const title = "KINETIC".split('');

  return (
    <footer 
      ref={containerRef} 
      id="contact" 
      className="relative min-h-screen bg-zinc-950 flex flex-col justify-between overflow-hidden border-t border-white/5 pt-20"
      style={{ zIndex: 10 }}
    >
      <div className="container mx-auto px-10 md:px-32 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-8">Let's create something extraordinary.</h3>
            <a href="mailto:hello@kinetic.com" className="inline-block text-2xl font-sans border-b-2 border-primary pb-2 hover:text-primary transition-colors">
              hello@kinetic.com
            </a>
          </div>
          
          <div className="flex flex-col md:items-end justify-center space-y-4">
            <p className="text-white/50 text-sm tracking-widest uppercase mb-4">Socials</p>
            <a href="#" className="text-xl hover:text-secondary transition-colors">Instagram</a>
            <a href="#" className="text-xl hover:text-secondary transition-colors">Twitter (X)</a>
            <a href="#" className="text-xl hover:text-secondary transition-colors">Awwwards</a>
            <a href="#" className="text-xl hover:text-secondary transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="w-full mt-20 relative overflow-hidden flex flex-col items-center justify-end">
        <h1 
          ref={textRef} 
          className="text-[20vw] font-display font-bold leading-[0.8] text-white/5 flex whitespace-nowrap select-none"
        >
          {title.map((char, i) => (
            <span key={i} className="inline-block">{char}</span>
          ))}
        </h1>
        
        <div className="absolute bottom-4 w-full flex justify-between px-10 text-white/30 text-sm font-sans">
          <p>© {new Date().getFullYear()} Kinetic. All rights reserved.</p>
          <p>Designed with passion.</p>
        </div>
      </div>
    </footer>
  );
};
