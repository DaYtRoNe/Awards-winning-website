import React, { ReactNode } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = "", 
  strength = 1,
  onClick
}) => {
  const magneticRef = useMagnetic(strength);

  return (
    <div 
      ref={magneticRef} 
      className={`inline-block cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
