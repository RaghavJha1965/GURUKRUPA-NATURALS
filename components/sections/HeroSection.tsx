"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Leaf, Shield, FlaskConical, Sprout } from "lucide-react";

const leafPositions = [
  { left: "10%", delay: "0s", duration: "6s", size: "w-4 h-4" },
  { left: "25%", delay: "1.5s", duration: "8s", size: "w-3 h-3" },
  { left: "50%", delay: "0.5s", duration: "7s", size: "w-5 h-5" },
  { left: "70%", delay: "2s", duration: "9s", size: "w-3 h-3" },
  { left: "85%", delay: "1s", duration: "6.5s", size: "w-4 h-4" },
];

const trustBadges = [
  { icon: Shield, label: "FSSAI Certified" },
  { icon: Leaf, label: "100% Organic" },
  { icon: FlaskConical, label: "Lab Tested" },
  { icon: Sprout, label: "Farm Fresh" },
];

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrolled = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-forest"
      aria-label="Hero section"
    >
      {/* Background with parallax */}
      <div ref={parallaxRef} className="absolute inset-0 parallax-bg">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80')`,
          }}
          role="img"
          aria-label="Lush organic farm with green fields"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-forest/20" />
      </div>

      {/* Animated Leaf Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {leafPositions.map((pos, i) => (
          <div
            key={i}
            className={`absolute bottom-0 ${pos.size} text-cream/20`}
            style={{
              left: pos.left,
              animation: `leafFloat ${pos.duration} ${pos.delay} ease-in-out infinite`,
            }}
          >
            <Leaf className="w-full h-full" />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6 animate-fade-in">
            <div className="flex items-center gap-1.5 bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-full px-4 py-1.5">
              <Leaf className="w-3.5 h-3.5 text-turmeric" aria-hidden="true" />
              <span className="text-cream/90 text-xs font-bold uppercase tracking-widest font-lato">
                Pure from Nature
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6 animate-slide-up">
            Pure from Nature,
            <span className="block text-turmeric italic">
              Trusted by Tradition
            </span>
          </h1>

          {/* Subheadline */}
          <p className="font-lato text-cream/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl animate-fade-in">
            Discover GURUKRUPA NATURALS — India&apos;s finest organic superfoods.
            From our certified farms to your table, every product is crafted with
            nature&apos;s wisdom and science&apos;s precision.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-turmeric text-charcoal font-lato font-bold px-8 py-4 rounded-full hover:bg-turmeric-dark transition-all duration-300 hover:shadow-lg group text-base"
            >
              Shop Now
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 bg-cream/10 backdrop-blur-sm border-2 border-cream/30 text-cream font-lato font-bold px-8 py-4 rounded-full hover:bg-cream/20 hover:border-cream/50 transition-all duration-300 text-base"
            >
              Our Story
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-cream/10 backdrop-blur-sm border border-cream/10 rounded-xl px-3 py-2"
              >
                <Icon className="w-4 h-4 text-turmeric flex-shrink-0" aria-hidden="true" />
                <span className="text-cream/80 text-xs font-lato font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-cream/50 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 60"
          className="w-full fill-cream"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
