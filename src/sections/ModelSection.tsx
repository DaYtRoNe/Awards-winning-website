import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RotatingModel } from '../components/3d/RotatingModel';

gsap.registerPlugin(ScrollTrigger);

export const ModelSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Use gsap.set() to initialize opacity to 0 BEFORE ScrollTrigger kicks in.
    // This prevents the flash-of-content on mount.
    gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1,
        refreshPriority: -4, // After horizontal scroll (-3)
      }
    });

    // Send scroll progress to the 3D model via custom event
    tl.to({}, { 
      duration: 1,
      onUpdate: function() {
        window.dispatchEvent(new CustomEvent('modelScroll', { detail: this.progress() }));
      }
    }, 0);

    // Text 1: fade in from 0% to 15%, visible until 25%, fade out to 35%
    tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 0.15 }, 0)
      .to(text1Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.25);

    // Text 2: fade in from 35% to 50%, visible until 60%, fade out to 70%
    tl.to(text2Ref.current, { opacity: 1, y: 0, duration: 0.15 }, 0.35)
      .to(text2Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.6);

    // Text 3: fade in from 75% to 90%, stays visible
    tl.to(text3Ref.current, { opacity: 1, y: 0, scale: 1, duration: 0.15 }, 0.75);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen w-full bg-black relative overflow-hidden">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <RotatingModel />
          </Float>
        </Canvas>
      </div>

      {/* HTML Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* Text 1 - left aligned */}
        <div ref={text1Ref} className="absolute inset-0 flex items-center justify-start px-10 md:px-32">
          <div className="glass p-8 rounded-2xl max-w-md backdrop-blur-xl border border-white/20">
            <h3 className="text-3xl font-display font-bold text-primary mb-2">WebGL Magic</h3>
            <p className="text-white/80 font-sans">
              Integrating complex 3D scenes directly into the DOM using React Three Fiber.
            </p>
          </div>
        </div>

        {/* Text 2 - right aligned */}
        <div ref={text2Ref} className="absolute inset-0 flex items-center justify-end px-10 md:px-32">
          <div className="glass p-8 rounded-2xl max-w-md backdrop-blur-xl border border-white/20 text-right">
            <h3 className="text-3xl font-display font-bold text-secondary mb-2">Scroll Driven</h3>
            <p className="text-white/80 font-sans">
              The model reacts to your scroll position, rotating and scaling perfectly in sync with the page.
            </p>
          </div>
        </div>

        {/* Text 3 - centered */}
        <div ref={text3Ref} className="absolute inset-0 flex flex-col items-center justify-center px-10">
          <div className="text-center">
            <h2 className="text-5xl md:text-8xl font-display font-bold text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}>
              INFINITE POSSIBILITIES
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
};
