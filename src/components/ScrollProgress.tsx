import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollProgress = () => {
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (dotRef.current) {
          gsap.set(dotRef.current, { y: self.progress * (window.innerHeight - 100) });
        }
      }
    });
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 h-[calc(100vh-100px)] w-[2px] bg-white/10 z-40 hidden md:block rounded-full">
      <div 
        ref={dotRef} 
        className="w-[6px] h-[6px] bg-white rounded-full -translate-x-[2px] shadow-[0_0_10px_rgba(255,255,255,0.8)]"
      />
    </div>
  );
};
