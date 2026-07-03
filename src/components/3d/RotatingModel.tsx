import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const RotatingModel = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollOffset = useRef(0);

  useEffect(() => {
    // Listen for custom event from GSAP timeline in parent component
    const handleScroll = (e: any) => {
      scrollOffset.current = e.detail;
    };
    
    window.addEventListener('modelScroll', handleScroll);
    return () => window.removeEventListener('modelScroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Time-based rotation for continuous liveliness
    const time = state.clock.elapsedTime;
    
    // Scroll-driven rotation (scrollOffset is between 0 and 1)
    const offset = scrollOffset.current;
    
    // We set the absolute rotation based on scroll AND time, instead of adding to it every frame
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = (offset * Math.PI * 4) + (time * 0.2); // 2 full rotations over the scroll
    
    // Change scale slightly based on scroll (pulse effect)
    const scale = 1 + Math.sin(offset * Math.PI) * 0.5;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial 
        color="#ff4500" 
        wireframe 
        emissive="#00e5ff"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};
