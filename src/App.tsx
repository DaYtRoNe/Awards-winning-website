import { useState } from 'react';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { HeroSection } from './sections/HeroSection';
import { ScrollVideo } from './sections/ScrollVideo';

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
          
          {/* Placeholder for Phase 3: Horizontal */}
          <section id="about" className="h-screen flex items-center justify-center bg-zinc-950">
            <h2 className="text-3xl font-display text-white/50">Horizontal Scroll Section (Coming Soon)</h2>
          </section>
          
          {/* Placeholder for Phase 4: 3D Model */}
          <section className="h-screen flex items-center justify-center bg-black">
            <h2 className="text-3xl font-display text-white/50">3D Model Section (Coming Soon)</h2>
          </section>

          {/* Placeholder Footer */}
          <footer id="contact" className="h-[50vh] flex items-center justify-center bg-zinc-900 border-t border-white/10">
            <h2 className="text-3xl font-display text-white/50">Footer</h2>
          </footer>
        </main>
      </SmoothScrollProvider>
    </>
  );
}

export default App;