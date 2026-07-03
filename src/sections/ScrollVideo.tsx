import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImageSequence } from '../hooks/useImageSequence';

gsap.registerPlugin(ScrollTrigger);

export const ScrollVideo = () => {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const frameCount = 120;
  const { images } = useImageSequence(frameCount, '/frames', 'svg');

  // Draw first frame when images load
  useEffect(() => {
    if (images.length > 0 && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.drawImage(images[0], 0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, [images]);

  useGSAP(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const playhead = { frame: 0 };

    // Pin section and scrub through images
    gsap.to(playhead, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000", // 3000px of scrolling
        pin: true,
        scrub: 0.5,
      },
      onUpdate: () => {
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        ctx.drawImage(images[playhead.frame], 0, 0, canvasRef.current!.width, canvasRef.current!.height);
      }
    });

    // Animate overlay text based on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        scrub: 0.5,
      }
    });

    tl.to(textRef.current, { opacity: 1, y: -50, duration: 1 }, 0.2) // Show around 20%
      .to(textRef.current, { opacity: 0, y: -100, duration: 1 }, 0.6); // Hide around 60%

  }, { scope: containerRef, dependencies: [images] });

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-bg-dark overflow-hidden">
      {/* Canvas for Video Frames */}
      <canvas 
        ref={canvasRef}
        width={1920}
        height={1080}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      
      {/* Overlay Content */}
      <div 
        ref={textRef} 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 translate-y-[50px]"
      >
        <div className="glass p-8 md:p-16 rounded-3xl max-w-2xl text-center shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-gradient">
            Perfect Sync.
          </h2>
          <p className="text-xl md:text-2xl text-white/80 font-sans leading-relaxed">
            Scroll-driven playback using WebCodecs or image sequences provides frame-perfect precision without any video jitter.
          </p>
        </div>
      </div>
    </section>
  );
};
