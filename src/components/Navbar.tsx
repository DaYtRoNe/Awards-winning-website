import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hide/Show navbar on scroll down/up
    const showAnim = gsap.from(navRef.current, {
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: "power2.out"
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        // Scroll progress bar
        if (progressRef.current) {
          gsap.set(progressRef.current, { scaleX: self.progress });
        }
        
        // Hide on scroll down, show on scroll up
        if (self.direction === -1) {
          showAnim.play();
        } else if (self.direction === 1 && self.scrollY > 50) {
          showAnim.reverse();
        }
      }
    });
  }, []);

  return (
    <header 
      ref={navRef} 
      className="fixed top-0 left-0 w-full z-50 glass"
    >
      {/* Scroll Progress Indicator */}
      <div 
        ref={progressRef}
        className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-primary to-secondary origin-left scale-x-0"
      />
      
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-display font-bold tracking-tighter">
          KINETIC<span className="text-primary">.</span>
        </a>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#work" className="text-sm font-medium hover:text-primary transition-colors">Work</a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
        </nav>
        
        <button className="md:hidden flex flex-col space-y-1.5 p-2">
          <span className="w-6 h-[2px] bg-white block"></span>
          <span className="w-6 h-[2px] bg-white block"></span>
        </button>
      </div>
    </header>
  );
};
