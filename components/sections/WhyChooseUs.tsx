import { Leaf, FlaskConical, Sprout, Heart, Award, Truck } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Organic Certified",
    description:
      "Every product is certified organic by FSSAI and trusted certification bodies. No synthetic pesticides, ever.",
    color: "text-forest",
    bg: "bg-forest/10",
  },
  {
    icon: Sprout,
    title: "Farm Fresh Sourcing",
    description:
      "Sourced directly from verified organic farms across India. From soil to shelf in the shortest time possible.",
    color: "text-earth",
    bg: "bg-earth/10",
  },
  {
    icon: FlaskConical,
    title: "Rigorous Lab Testing",
    description:
      "Every batch is tested for heavy metals, microbial safety, and potency by accredited third-party labs.",
    color: "text-turmeric",
    bg: "bg-turmeric/10",
  },
  {
    icon: Heart,
    title: "No Preservatives",
    description:
      "Pure products with zero artificial additives, preservatives, or fillers. What nature made is what you get.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Award,
    title: "Traditional Methods",
    description:
      "We combine ancient Ayurvedic wisdom with modern food science for maximum potency and bioavailability.",
    color: "text-forest",
    bg: "bg-forest/10",
  },
  {
    icon: Truck,
    title: "Free Shipping ₹999+",
    description:
      "Fast pan-India delivery with temperature-controlled packaging to preserve product freshness.",
    color: "text-earth",
    bg: "bg-earth/10",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-cream-dark"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-earth font-lato font-bold text-sm uppercase tracking-widest mb-3">
            Our Promise
          </p>
          <h2
            id="why-choose-us-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal mb-4"
          >
            Why Choose GURUKRUPA NATURALS?
          </h2>
          <p className="text-charcoal/60 font-lato max-w-2xl mx-auto text-lg">
            We believe that what you put into your body matters. That&apos;s why every
            decision we make is guided by purity, transparency, and your well-being.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="bg-cream-light rounded-2xl p-6 shadow-natural hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}
                >
                  <Icon
                    className={`w-6 h-6 ${feature.color}`}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-playfair font-bold text-charcoal text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="font-lato text-charcoal/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Botanical Decoration */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-forest/30" />
            <span className="text-2xl" aria-hidden="true">🌿</span>
            <span className="font-playfair italic text-charcoal/50 text-sm">
              Rooted in Nature, Guided by Tradition
            </span>
            <span className="text-2xl" aria-hidden="true">🌿</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-forest/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
