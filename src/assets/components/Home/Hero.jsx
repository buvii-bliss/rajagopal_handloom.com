import React, { useEffect, useRef, useState } from "react";

import banner1 from "../../img/banner1.png";
import adVideo from "../../img/video.mp4";

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const videoRef = useRef(null);

  const slides = [
    // { type: "image", src: banner1 },
    { type: "video", src: adVideo },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (slides[activeSlide].type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [activeSlide]);

  return (
    <section className="relative w-full overflow-hidden bg-[#f8f1e7]">
      {/* SLIDES */}
      <div className="relative w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${index === activeSlide ? "relative opacity-100" : "absolute inset-0 opacity-0"} w-full transition-opacity duration-700 ease-in-out`}
          >
            {" "}
            {slide.type === "image" ? (
              <img
                src={slide.src}
                alt="Handloom Collection"
                className="block h-auto min-h-[220px] w-full object-cover object-center sm:min-h-[300px] lg:h-[calc(100vh-130px)]  g:max-h-[720px] lg:min-h-[500px]"
              />
            ) : (
              <video
                ref={index === activeSlide ? videoRef : null}
                src={slide.src}
                muted
                playsInline
                loop
                autoPlay
                className=" block aspect-[16/9] h-auto w-full object-cover sm:aspect-[16/8] lg:h-[calc(100vh-130px)] lg:max-h-[720px] lg:min-h-[500px]"
              />
            )}
          </div>
        ))}

        {/* DARK OVERLAY */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-black/5 to-transparent" />

        {/* SLIDE INDICATORS */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-7">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === index ? "w-8 bg-[#e5bd62]" : "w-2 bg-white/60"}`}
            />
          ))}
        </div>

        {/* PREVIOUS */}
        <button
          type="button"
          onClick={() =>
            setActiveSlide((activeSlide - 1 + slides.length) % slides.length)
          }
          className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/50 sm:flex lg:left-6"
          aria-label="Previous slide"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {" "}
            <path
              d="m15 18-6-6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* NEXT */}
        <button
          type="button"
          onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}
          className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/50 sm:flex lg:right-6"
          aria-label="Next slide"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {" "}
            <path
              d="m9 18 6-6-6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
