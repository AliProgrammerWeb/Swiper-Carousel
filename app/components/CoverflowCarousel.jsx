import { useState, useEffect, useRef } from "react";

export default function CoverflowCarousel() {
  const slides = Array.from({ length: 7 }, (_, i) => `Slide ${i + 1}`);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef();

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 2500);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-gray-900">
      <div className="relative w-[800px] h-[400px] flex items-center justify-center">
        {slides.map((slide, i) => {
          const offset = (i - current + slides.length) % slides.length;
          let transform = "translateX(0) scale(1) rotateY(0)";
          let zIndex = 0;
          let opacity = 1;

          if (offset === 0) {
            // center slide
            transform = "translateX(0) scale(1.2) rotateY(0)";
            zIndex = 50;
          } else if (offset === 1 || offset === -(slides.length - 1)) {
            // right slide
            transform = "translateX(200px) scale(0.9) rotateY(-40deg)";
            zIndex = 40;
          } else if (offset === slides.length - 1 || offset === -1) {
            // left slide
            transform = "translateX(-200px) scale(0.9) rotateY(40deg)";
            zIndex = 40;
          } else {
            // other slides (hidden in back)
            transform = "translateX(0) scale(0.7) rotateY(0) translateZ(-300px)";
            zIndex = 0;
            opacity = 0;
          }

          return (
            <div
              key={i}
              className="absolute w-[250px] h-[150px] flex items-center justify-center rounded-xl text-white text-xl font-bold shadow-lg transition-all duration-700"
              style={{
                background: `hsl(${i * 60}, 70%, 50%)`,
                transform,
                zIndex,
                opacity,
              }}
            >
              {slide}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full px-3 py-2"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full px-3 py-2"
      >
        ▶
      </button>
    </div>
  );
}
