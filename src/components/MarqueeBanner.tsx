import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MarqueeBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Continuous infinite scroll
    const tl = gsap.timeline({ repeat: -1 });
    tl.to([text1Ref.current, text2Ref.current], {
      xPercent: -100,
      ease: "none",
      duration: 15
    });

    // Speed up on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        // Adjust timeScale based on scroll velocity
        const velocity = Math.abs(self.getVelocity());
        const targetTimeScale = 1 + (velocity / 100);
        
        gsap.to(tl, {
          timeScale: Math.min(targetTimeScale, 5), // Cap max speed
          duration: 0.2,
          overwrite: "auto"
        });
        
        // Return to normal speed when scroll stops
        gsap.to(tl, {
          timeScale: 1,
          duration: 1,
          delay: 0.2,
          overwrite: "auto"
        });
      }
    });
  }, []);

  const text = "GSAP • WEBGL • REACT • MOTION • AWWWARDS • ";

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-primary py-8 flex items-center border-y border-white/20"
      style={{ transform: "rotate(-2deg) scale(1.1)", zIndex: 20 }}
    >
      <div className="flex whitespace-nowrap">
        <div ref={text1Ref} className="flex shrink-0 px-4 items-center">
          <h2 className="text-6xl md:text-8xl font-display font-black text-bg-dark tracking-tighter uppercase">
            {text}
          </h2>
        </div>
        <div ref={text2Ref} className="flex shrink-0 px-4 items-center">
          <h2 className="text-6xl md:text-8xl font-display font-black text-bg-dark tracking-tighter uppercase">
            {text}
          </h2>
        </div>
      </div>
    </div>
  );
};
