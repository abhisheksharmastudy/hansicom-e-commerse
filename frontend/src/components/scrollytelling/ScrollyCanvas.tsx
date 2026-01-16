import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface ScrollyCanvasProps {
  frameCount?: number;
  folderPath?: string;
  imagePrefix?: string;
  imageExtension?: string;
}

export default function ScrollyCanvas({
  frameCount = 80, // Default to 80 frames
  folderPath = '/sequence/',
  imagePrefix = 'frame_',
  imageExtension = 'webp'
}: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Hook into the scroll of the parent/window. 
  // We expect this component to be inside a tall container.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map 0-1 scroll progress to 0-(frameCount-1)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    // Preload Images with staggering to prevent UI freeze
    useEffect(() => {
      let cancelled = false;
      const loadImages = async () => {
        const imgArray: HTMLImageElement[] = [];
        const BATCH_SIZE = 10;
        
        for (let i = 0; i < frameCount; i += BATCH_SIZE) {
          if (cancelled) return;
          
          await Promise.all(
            Array.from({ length: Math.min(BATCH_SIZE, frameCount - i) }).map((_, offset) => {
              return new Promise<void>((resolve) => {
                const idx = i + offset;
                const img = new Image();
                const paddedIndex = idx.toString().padStart(3, '0');
                img.src = `${folderPath}${imagePrefix}${paddedIndex}.${imageExtension}`;
                img.onload = () => {
                  imgArray[idx] = img;
                  resolve();
                };
                img.onerror = () => {
                  console.warn(`Failed to load frame ${idx}`);
                  resolve();
                };
              });
            })
          );
          
          // Small delay to yield main thread
          await new Promise(r => setTimeout(r, 0));
        }

        if (!cancelled) {
          setImages(imgArray);
          setImagesLoaded(true);
        }
      };

      loadImages();
      
      return () => { cancelled = true; };
    }, [frameCount, folderPath, imagePrefix, imageExtension]);

  // Render Loop
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesLoaded || images.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Safety check for index
    const safeIndex = Math.min(Math.max(Math.round(index), 0), frameCount - 1);
    const img = images[safeIndex];
    if (!img) return;

    // Responsive Object-Fit: Cover Logic
    // We want the image to cover the canvas size without stretching
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    // Calculate aspect ratios
    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image (cropping top/bottom)
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      // Canvas is taller than image (cropping sides)
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Listen to scroll changes and render
  useMotionValueEvent(frameIndex, "change", (latest) => {
    requestAnimationFrame(() => renderFrame(latest));
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            // Re-render current frame on resize
            renderFrame(frameIndex.get());
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Init size

    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded]); 

  // Initial draw once loaded
  useEffect(() => {
      if (imagesLoaded) {
          renderFrame(0);
      }
  }, [imagesLoaded]);


  return (
    <div ref={containerRef} className="h-[500vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-neutral-900">
         {!imagesLoaded && (
             <div className="absolute inset-0 flex items-center justify-center text-white/50">
                 Loading Experience...
             </div>
         )}
         <canvas 
           ref={canvasRef} 
           className="block w-full h-full object-cover"
         />
      </div>
    </div>
  );
}
