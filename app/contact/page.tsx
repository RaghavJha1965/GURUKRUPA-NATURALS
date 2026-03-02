"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    details: ["+91 99999 99999", "+91 88888 88888"],
    link: "tel:+919999999999",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["hello@gurukrupanaturals.com", "orders@gurukrupanaturals.com"],
    link: "mailto:hello@gurukrupanaturals.com",
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["123 Organic Valley,", "Pune, Maharashtra 411001"],
    link: null,
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon – Sat: 9:00 AM – 7:00 PM", "Sunday: 10:00 AM – 4:00 PM"],
    link: null,
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formState.message.trim()) newErrors.message = "Message is required";
    else if (formState.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-forest py-16 px-4 text-center">
        <p className="text-turmeric font-lato font-bold text-sm uppercase tracking-widest mb-3">
          Get in Touch
        </p>
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-cream mb-4">
          We&apos;d Love to Hear from You
        </h1>
        <p className="text-cream/70 font-lato max-w-xl mx-auto">
          Questions, feedback, or just want to say hello? Our team is here to help.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-playfair font-bold text-charcoal text-2xl mb-6 heading-underline">
                Contact Information
              </h2>
              <div className="space-y-5">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-forest" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-lato font-bold text-charcoal text-sm mb-1">
                          {item.title}
                        </p>
                        {item.details.map((detail, i) =>
                          item.link ? (
                            <a
                              key={i}
                              href={item.link}
                              className="block font-lato text-charcoal/60 text-sm hover:text-forest transition-colors"
                            >
                              {detail}
                            </a>
                          ) : (
                            <p key={i} className="font-lato text-charcoal/60 text-sm">
                              {detail}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919999999999?text=Hello%20GURUKRUPA%20NATURALS!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white rounded-2xl px-6 py-4 hover:bg-[#20B857] transition-colors"
              aria-label="Chat with us on WhatsApp"
            >
              <MessageCircle className="w-6 h-6" aria-hidden="true" />
              <div>
                <p className="font-lato font-bold">Chat on WhatsApp</p>
                <p className="text-sm text-white/80">Typically replies within minutes</p>
              </div>
            </a>

            {/* Map placeholder */}
            <div
              className="rounded-2xl overflow-hidden h-64 bg-forest/10 flex items-center justify-center border border-forest/10"
              aria-label="Office location map"
            >
              <div className="text-center p-4">
                <MapPin className="w-8 h-8 text-forest/40 mx-auto mb-2" aria-hidden="true" />
                <p className="font-lato text-charcoal/50 text-sm">
                  123 Organic Valley, Pune, Maharashtra
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest text-sm font-bold mt-2 inline-block hover:underline"
                >
                  View on Google Maps ↗
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-playfair font-bold text-charcoal text-2xl mb-6">
              Send us a Message
            </h2>

            {isSubmitted ? (
              <div className="bg-forest/10 border border-forest/20 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-forest" aria-hidden="true" />
                </div>
                <h3 className="font-playfair font-bold text-charcoal text-xl mb-2">
                  Message Sent!
                </h3>
                <p className="font-lato text-charcoal/60">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-forest font-lato font-bold hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                aria-label="Contact form"
                noValidate
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-lato font-bold text-charcoal text-sm mb-2"
                  >
                    Your Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Priya Sharma"
                    required
                    aria-required="true"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                    className={`w-full border rounded-xl px-4 py-3 bg-cream-light text-charcoal placeholder-charcoal/30 focus:outline-none font-lato text-sm transition-colors ${
                      errors.name ? "border-red-400 focus:border-red-400" : "border-forest/20 focus:border-forest"
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-xs mt-1 font-lato" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-lato font-bold text-charcoal text-sm mb-2"
                    >
                      Email <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="priya@example.com"
                      required
                      aria-required="true"
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={!!errors.email}
                      className={`w-full border rounded-xl px-4 py-3 bg-cream-light text-charcoal placeholder-charcoal/30 focus:outline-none font-lato text-sm transition-colors ${
                        errors.email ? "border-red-400" : "border-forest/20 focus:border-forest"
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-xs mt-1 font-lato" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block font-lato font-bold text-charcoal text-sm mb-2"
                    >
                      Phone (optional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full border border-forest/20 rounded-xl px-4 py-3 bg-cream-light text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-forest font-lato text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block font-lato font-bold text-charcoal text-sm mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full border border-forest/20 rounded-xl px-4 py-3 bg-cream-light text-charcoal focus:outline-none focus:border-forest font-lato text-sm"
                    aria-label="Select inquiry subject"
                  >
                    <option value="">Select a subject...</option>
                    <option value="order">Order Query</option>
                    <option value="product">Product Information</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="return">Return / Refund</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-lato font-bold text-charcoal text-sm mb-2"
                  >
                    Message <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    required
                    rows={5}
                    aria-required="true"
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                    className={`w-full border rounded-xl px-4 py-3 bg-cream-light text-charcoal placeholder-charcoal/30 focus:outline-none font-lato text-sm transition-colors resize-none ${
                      errors.message ? "border-red-400" : "border-forest/20 focus:border-forest"
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-500 text-xs mt-1 font-lato" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-forest text-cream font-lato font-bold py-4 rounded-xl hover:bg-forest-dark transition-colors disabled:opacity-70"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-xs text-charcoal/40 font-lato text-center">
                  By submitting, you agree to our{" "}
                  <a href="/privacy-policy" className="text-forest hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
