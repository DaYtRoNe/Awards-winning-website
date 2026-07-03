import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Initial reveal
    tl.from(".hero-char", {
      y: 100,
      opacity: 0,
      rotateX: -90,
      stagger: 0.05,
      duration: 1.5,
      ease: "power4.out",
      delay: 0.5
    });
    
    tl.from(".hero-sub", {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out"
    }, "-=1");

    // Scroll parallax
    gsap.to(textRef.current, {
      yPercent: 50,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: containerRef });

  // Split text into spans for animation
  const title = "MOTION".split('');

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/30 via-bg-dark to-bg-dark pointer-events-none" />
      
      <div className="z-10 text-center" ref={textRef}>
        <h1 className="text-[15vw] md:text-[12vw] font-display font-bold leading-none tracking-tighter flex justify-center">
          {title.map((char, i) => (
            <span key={i} className="hero-char inline-block" style={{ transformOrigin: '50% 100%' }}>
              {char}
            </span>
          ))}
        </h1>
        <p className="hero-sub text-xl md:text-2xl text-white/60 font-sans mt-4 max-w-lg mx-auto">
          Pushing the boundaries of web experiences through <span className="text-white font-medium">code and motion.</span>
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50">
        <span className="text-xs uppercase tracking-[0.2em] mb-2 font-display">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};
