import { useState } from 'react';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { HeroSection } from './sections/HeroSection';
import { ScrollVideo } from './sections/ScrollVideo';
import { HorizontalScroll } from './sections/HorizontalScroll';
import { ModelSection } from './sections/ModelSection';
import { Footer } from './components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Configure GSAP defaults for the whole app
ScrollTrigger.defaults({
  // This ensures ScrollTrigger calculates pins in the correct
  // top-to-bottom order based on `refreshPriority`.
  // Higher numbers refresh first. We assigned:
  //   ScrollVideo:      -2
  //   HorizontalScroll: -3
  //   ModelSection:     -4
  // This permanently eliminates the "gap" bug without any setTimeout hacks.
});

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <SmoothScrollProvider>
        <Navbar />
        
        <main>
          <HeroSection />
          
          <ScrollVideo />
          
          <HorizontalScroll />
          
          <ModelSection />
          
          <Footer />
        </main>
      </SmoothScrollProvider>
    </>
  );
}

export default App;