import { useState, useEffect } from 'react';

export const useImageSequence = (frameCount: number, basePath: string, extension: string = 'jpg') => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const loadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        // ezgif outputs start at 001 and use 3-digit padding
        const frameNumber = i + 1;
        const frameStr = String(frameNumber).padStart(3, '0');
        img.src = `${basePath}/ezgif-frame-${frameStr}.${extension}`;
        
        img.onload = () => {
          loadedCount++;
          setProgress((loadedCount / frameCount) * 100);
          if (loadedCount === frameCount) {
            setImages(loadedImages);
          }
        };
        
        img.onerror = () => {
          console.error(`Failed to load frame ${i}`);
          loadedCount++;
          if (loadedCount === frameCount) {
            setImages(loadedImages);
          }
        };

        loadedImages.push(img);
      }
    };

    loadImages();
  }, [frameCount, basePath, extension]);

  return { images, progress };
};
