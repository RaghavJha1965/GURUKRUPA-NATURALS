import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Leaf,
  Award,
  Heart,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — GURUKRUPA NATURALS",
  description:
    "Learn the story of GURUKRUPA NATURALS — our roots, our mission, our farms, and our commitment to pure organic superfoods. Rooted in nature, guided by tradition.",
};

const timeline = [
  {
    year: "2018",
    title: "The Beginning",
    description:
      "Founded with a simple mission: make authentic organic superfoods accessible to every Indian household.",
  },
  {
    year: "2019",
    title: "First Farm Partnership",
    description:
      "Partnered with 12 certified organic farms across Rajasthan, Tamil Nadu, and Maharashtra.",
  },
  {
    year: "2020",
    title: "Black Garlic Launch",
    description:
      "Introduced India's first commercially available 40-day aged organic black garlic.",
  },
  {
    year: "2021",
    title: "FSSAI Certification",
    description:
      "Achieved FSSAI organic certification and launched our lab-testing transparency program.",
  },
  {
    year: "2022",
    title: "10,000 Customers",
    description:
      "Crossed 10,000 happy customers milestone. Expanded product range to 30+ products.",
  },
  {
    year: "2024",
    title: "50,000+ Community",
    description:
      "Growing natural living community with 50,000+ customers across India.",
  },
];

const certifications = [
  { name: "FSSAI Certified", desc: "Food Safety and Standards Authority of India", icon: "🏛️" },
  { name: "Organic Certified", desc: "Third-party organic certification", icon: "🌿" },
  { name: "Non-GMO Verified", desc: "No genetically modified organisms", icon: "✅" },
  { name: "Heavy Metal Tested", desc: "Lab-tested for 100+ contaminants", icon: "🔬" },
  { name: "GMP Compliant", desc: "Good Manufacturing Practice certified", icon: "🏭" },
  { name: "ISO 22000", desc: "Food safety management systems", icon: "📋" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section
        className="relative py-24 px-4 bg-forest overflow-hidden"
        aria-labelledby="about-hero-heading"
      >
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-turmeric font-lato font-bold text-sm uppercase tracking-widest mb-4">
            Our Story
          </p>
          <h1
            id="about-hero-heading"
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mb-6 leading-tight"
          >
            Rooted in Nature,
            <br />
            <em className="text-turmeric">Guided by Tradition</em>
          </h1>
          <p className="font-lato text-cream/80 text-xl leading-relaxed max-w-2xl mx-auto">
            GURUKRUPA NATURALS was born from a deep belief that nature provides
            everything our bodies need. We exist to bring these gifts to you —
            pure, potent, and untampered.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="mission-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-earth font-lato font-bold text-sm uppercase tracking-widest mb-3">
                Our Mission
              </p>
              <h2
                id="mission-heading"
                className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal mb-6 heading-underline"
              >
                Why We Started
              </h2>
              <div className="space-y-4 font-lato text-charcoal/70 leading-relaxed">
                <p>
                  India is blessed with the world&apos;s richest tradition of natural
                  medicine — Ayurveda. Yet, in an age of processed foods and synthetic
                  supplements, most people have lost touch with the healing power of
                  pure, natural ingredients.
                </p>
                <p>
                  GURUKRUPA NATURALS was founded to change this. We work directly
                  with certified organic farmers, process our products using traditional
                  methods, and rigorously test every batch to ensure you receive only
                  the best that nature has to offer.
                </p>
                <p>
                  We believe in radical transparency: every product comes with full
                  ingredient disclosure, lab test results, and farm sourcing information.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: Leaf, text: "100% Organic" },
                  { icon: Award, text: "Lab Certified" },
                  { icon: Heart, text: "No Additives" },
                  { icon: Users, text: "50K+ Happy Customers" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-forest flex-shrink-0" aria-hidden="true" />
                    <span className="font-lato font-bold text-charcoal text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-card-hover">
                <Image
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80"
                  alt="Organic farm with lush green fields"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-cream-light rounded-2xl p-5 shadow-product">
                <p className="font-playfair font-bold text-charcoal text-lg">50,000+</p>
                <p className="font-lato text-charcoal/60 text-sm">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder&apos;s Message */}
      <section className="py-16 px-4 bg-cream-dark" aria-labelledby="founder-heading">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-earth font-lato font-bold text-sm uppercase tracking-widest mb-3">
            Founder&apos;s Message
          </p>
          <h2
            id="founder-heading"
            className="font-playfair text-3xl font-bold text-charcoal mb-8"
          >
            A Word from Our Founder
          </h2>

          <div className="bg-cream-light rounded-3xl p-8 sm:p-12 shadow-natural text-left relative">
            <div className="text-6xl text-forest/10 font-playfair absolute top-6 left-8 leading-none">
              &ldquo;
            </div>
            <blockquote className="font-playfair italic text-charcoal/80 text-xl leading-relaxed mt-4">
              Growing up in a household where my grandmother would prepare fresh
              herbal remedies from plants she grew in our backyard, I witnessed
              firsthand the power of nature&apos;s pharmacy. When I started GURUKRUPA
              NATURALS, I carried that wisdom with me — combined with modern food
              science and a commitment to absolute purity. Every product we make
              is something I would confidently give to my own family.
            </blockquote>

            <div className="flex items-center gap-4 mt-8">
              <div className="w-14 h-14 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-playfair font-bold text-forest text-xl">G</span>
              </div>
              <div>
                <p className="font-playfair font-bold text-charcoal text-lg">Gurukrupa Patel</p>
                <p className="font-lato text-charcoal/60 text-sm">
                  Founder & CEO, GURUKRUPA NATURALS
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farm Sourcing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="sourcing-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-earth font-lato font-bold text-sm uppercase tracking-widest mb-3">
              Farm to Table
            </p>
            <h2
              id="sourcing-heading"
              className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal"
            >
              Sourced from India&apos;s Finest Farms
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                region: "Rajasthan",
                products: "Ashwagandha, Shatavari",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
                alt: "Rajasthan dry region where Ashwagandha grows",
                fact: "Traditional Ashwagandha growing region",
              },
              {
                region: "Tamil Nadu",
                products: "Turmeric, Moringa",
                image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80",
                alt: "Tamil Nadu farms where turmeric is cultivated",
                fact: "Erode — Turmeric Capital of the World",
              },
              {
                region: "Kerala",
                products: "Black Garlic, Spices",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
                alt: "Kerala spice gardens",
                fact: "Rich spice tradition since ancient times",
              },
            ].map((farm) => (
              <article
                key={farm.region}
                className="rounded-2xl overflow-hidden shadow-product"
              >
                <div className="relative h-48">
                  <Image
                    src={farm.image}
                    alt={farm.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="font-playfair font-bold text-cream text-xl">{farm.region}</p>
                    <p className="text-cream/70 text-sm font-lato">{farm.products}</p>
                  </div>
                </div>
                <div className="bg-cream-light p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-forest flex-shrink-0" aria-hidden="true" />
                    <p className="font-lato text-charcoal/70 text-sm">{farm.fact}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4 bg-forest" aria-labelledby="certifications-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              id="certifications-heading"
              className="font-playfair text-3xl sm:text-4xl font-bold text-cream"
            >
              Certifications & Trust
            </h2>
            <p className="text-cream/70 font-lato mt-2">
              Our commitment to quality is backed by industry certifications
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-cream/10 backdrop-blur-sm border border-cream/10 rounded-2xl p-5 text-center hover:bg-cream/20 transition-colors"
              >
                <div className="text-4xl mb-3" aria-hidden="true">{cert.icon}</div>
                <h3 className="font-playfair font-bold text-cream text-base mb-1">
                  {cert.name}
                </h3>
                <p className="font-lato text-cream/60 text-xs">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="timeline-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-earth font-lato font-bold text-sm uppercase tracking-widest mb-3">
              Our Journey
            </p>
            <h2
              id="timeline-heading"
              className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal"
            >
              How We Got Here
            </h2>
          </div>

          <ol className="relative border-l-2 border-forest/20 ml-6 space-y-8">
            {timeline.map((item, i) => (
              <li key={i} className="relative pl-8">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-forest rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-turmeric rounded-full" aria-hidden="true" />
                </div>
                <time
                  dateTime={item.year}
                  className="font-lato font-bold text-forest text-sm uppercase tracking-wider"
                >
                  {item.year}
                </time>
                <h3 className="font-playfair font-bold text-charcoal text-xl mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="font-lato text-charcoal/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-cream-dark text-center">
        <h2 className="font-playfair text-3xl font-bold text-charcoal mb-4">
          Join Our Natural Living Community
        </h2>
        <p className="font-lato text-charcoal/60 mb-8 max-w-xl mx-auto">
          Experience the difference that pure, organic superfoods can make in your life.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-forest text-cream font-lato font-bold px-8 py-4 rounded-full hover:bg-forest-dark transition-colors"
        >
          Shop Our Products <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
