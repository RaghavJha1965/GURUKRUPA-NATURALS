"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/products";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length);

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-cream-dark"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-earth font-lato font-bold text-sm uppercase tracking-widest mb-2">
            Customer Stories
          </p>
          <h2
            id="testimonials-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal"
          >
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonials */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          aria-live="polite"
          aria-label="Customer testimonials"
        >
          {visibleTestimonials.map((testimonial, i) => (
            <article
              key={`${testimonial.id}-${i}`}
              className="bg-cream-light rounded-2xl p-6 shadow-natural relative"
            >
              <Quote
                className="absolute top-4 right-4 w-8 h-8 text-forest/10 fill-forest/10"
                aria-hidden="true"
              />

              {/* Stars */}
              <div
                className="flex gap-0.5 mb-3"
                aria-label={`Rating: ${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${
                      j < testimonial.rating
                        ? "fill-turmeric text-turmeric"
                        : "text-charcoal/20"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="font-lato text-charcoal/80 text-sm leading-relaxed mb-4 line-clamp-3">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {testimonial.product && (
                <p className="text-xs text-earth font-bold mb-3">
                  ✅ Verified purchase: {testimonial.product}
                </p>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
                  <span className="font-playfair font-bold text-forest text-base">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-lato font-bold text-charcoal text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-charcoal/50 font-lato">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-forest/20 flex items-center justify-center text-charcoal hover:bg-forest hover:text-cream hover:border-forest transition-all"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Dots */}
          <div className="flex gap-2" role="tablist" aria-label="Testimonial pages">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-forest w-6"
                    : "bg-forest/20 w-2 hover:bg-forest/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-forest/20 flex items-center justify-center text-charcoal hover:bg-forest hover:text-cream hover:border-forest transition-all"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
