import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cursorRef.current) return;
    
    // Create quick setters for performance
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" });
    
    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    
    // Scale up on clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button')
      ) {
        gsap.to(cursorRef.current, { scale: 2.5, duration: 0.3, ease: "back.out(1.5)" });
      } else {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main dot */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      {/* Glow tail */}
      <div 
        ref={(el) => {
          if (el && !cursorRef.current?.dataset.tailAdded) {
            cursorRef.current!.dataset.tailAdded = "true";
            const xToTail = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
            const yToTail = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
            window.addEventListener('mousemove', (e) => {
              xToTail(e.clientX);
              yToTail(e.clientY);
            });
          }
        }}
        className="fixed top-0 left-0 w-12 h-12 bg-white/20 blur-md rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
};
