import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // Simulate loading progress
    const obj = { value: 0 };
    tl.to(obj, {
      value: 100,
      duration: 2.5, // Total preloader duration
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.round(obj.value));
      }
    });

    // Reveal animation
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      delay: 0.2
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[90] bg-bg-dark flex flex-col items-center justify-center"
    >
      <div className="overflow-hidden">
        <h1 
          className="text-[15vw] md:text-[10vw] font-display font-bold leading-none text-transparent"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}
        >
          awwwards.
        </h1>
      </div>
      
      <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20">
        <div ref={counterRef} className="text-4xl md:text-6xl font-display font-light">
          {progress}%
        </div>
      </div>
      
      <div className="absolute bottom-12 right-10 md:bottom-24 md:right-20 w-32 md:w-64 h-[1px] bg-white/20">
        <div 
          className="h-full bg-white origin-left"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  );
};
