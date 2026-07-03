import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalScroll = () => {
  const containerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapperRef.current || !containerRef.current) return;

    // Calculate exact pixel distance to translate:
    // total width of all panels minus one viewport width (what's already visible)
    const getScrollAmount = () => {
      return -(wrapperRef.current!.scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(wrapperRef.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + (-getScrollAmount()),
        invalidateOnRefresh: true, // Recalculate on resize
        refreshPriority: -3, // Ensures correct ordering (lower = later in the page)
      }
    });

  }, { scope: containerRef });

  return (
    <section 
      id="capabilities"
      ref={containerRef} 
      className="h-screen w-full bg-zinc-950 overflow-hidden relative"
    >
      <div 
        ref={wrapperRef} 
        className="flex h-full"
      >
        {/* Panel 1 */}
        <div className="horizontal-panel min-w-screen w-screen h-full flex flex-col justify-center px-10 md:px-32 relative border-r border-white/10 shrink-0">
          <div className="absolute top-20 left-10 md:left-32 opacity-20">
            <span className="panel-number text-8xl md:text-[12rem] font-display font-bold">01</span>
          </div>
          <div className="panel-content z-10 max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-display font-bold mb-6">GSAP<br/><span className="text-primary">Animations</span></h2>
            <p className="text-xl text-white/60 font-sans leading-relaxed">
              Complex timeline sequencing, scroll-driven scrubbing, and performant DOM manipulations that bring static layouts to life.
            </p>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="horizontal-panel min-w-screen w-screen h-full flex flex-col justify-center px-10 md:px-32 relative border-r border-white/10 shrink-0">
          <div className="absolute top-20 left-10 md:left-32 opacity-20">
            <span className="panel-number text-8xl md:text-[12rem] font-display font-bold">02</span>
          </div>
          <div className="panel-content z-10 max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-display font-bold mb-6">WebGL &<br/><span className="text-secondary">3D Experiences</span></h2>
            <p className="text-xl text-white/60 font-sans leading-relaxed">
              Immersive three-dimensional worlds built with React Three Fiber, custom shaders, and optimized for the browser.
            </p>
          </div>
        </div>

        {/* Panel 3 */}
        <div className="horizontal-panel min-w-screen w-screen h-full flex flex-col justify-center px-10 md:px-32 relative shrink-0">
          <div className="absolute top-20 left-10 md:left-32 opacity-20">
            <span className="panel-number text-8xl md:text-[12rem] font-display font-bold">03</span>
          </div>
          <div className="panel-content z-10 max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-display font-bold mb-6">Creative<br/><span className="text-gradient">Typography</span></h2>
            <p className="text-xl text-white/60 font-sans leading-relaxed">
              Kinetic text effects, dynamic splitting, and font manipulations that treat text as an interactive visual element.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
