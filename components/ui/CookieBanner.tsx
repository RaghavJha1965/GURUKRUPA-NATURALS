"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[200] bg-charcoal/95 backdrop-blur-sm border-t border-cream/10 px-4 py-4 animate-slide-up"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-turmeric flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-cream/80 text-sm font-lato">
            We use cookies to enhance your experience, analyze site traffic, and personalize content.
            By continuing, you agree to our{" "}
            <Link href="/cookie-policy" className="text-turmeric underline hover:text-turmeric-light">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-turmeric underline hover:text-turmeric-light">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm text-cream/60 border border-cream/20 rounded-lg hover:bg-cream/10 transition-colors font-lato"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-turmeric text-charcoal font-bold rounded-lg hover:bg-turmeric-dark transition-colors font-lato"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
