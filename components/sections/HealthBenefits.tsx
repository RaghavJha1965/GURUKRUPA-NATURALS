import { Brain, Heart, Shield, Zap, Moon, Leaf } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Cardiovascular Health",
    description: "Black garlic and our heart-healthy formulas support optimal blood pressure and cholesterol levels.",
    color: "text-red-400",
  },
  {
    icon: Shield,
    title: "Immune Boosting",
    description: "Potent adaptogens, antioxidants, and traditional herbs to fortify your body's natural defenses.",
    color: "text-forest",
  },
  {
    icon: Brain,
    title: "Mental Clarity",
    description: "Ashwagandha, Brahmi, and our cognitive-support range to enhance focus and reduce brain fog.",
    color: "text-turmeric",
  },
  {
    icon: Zap,
    title: "Natural Energy",
    description: "Moringa, Spirulina and our energizing superfoods for sustained vitality without caffeine crashes.",
    color: "text-earth",
  },
  {
    icon: Moon,
    title: "Better Sleep",
    description: "Traditional formulas to calm the nervous system and promote deep, restorative sleep.",
    color: "text-indigo-400",
  },
  {
    icon: Leaf,
    title: "Gut & Digestion",
    description: "Triphala, fermented foods and our digestive support range for a thriving gut microbiome.",
    color: "text-forest",
  },
];

export default function HealthBenefits() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 bg-forest relative overflow-hidden"
      aria-labelledby="health-benefits-heading"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-forest-light/30 rounded-full -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-forest-dark/30 rounded-full translate-x-1/3 translate-y-1/3" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-turmeric font-lato font-bold text-sm uppercase tracking-widest mb-3">
            Science-Backed Wellness
          </p>
          <h2
            id="health-benefits-heading"
            className="font-playfair text-3xl sm:text-5xl font-bold text-cream mb-4 leading-tight"
          >
            Nature Heals, Naturally
          </h2>
          <p className="text-cream/70 font-lato max-w-2xl mx-auto text-lg">
            Our products are formulated based on traditional Ayurvedic principles,
            validated by modern nutritional science.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                className="bg-cream/10 backdrop-blur-sm border border-cream/10 rounded-2xl p-6 hover:bg-cream/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-cream/10 flex items-center justify-center mb-4">
                  <Icon className={`w-6 h-6 ${benefit.color}`} aria-hidden="true" />
                </div>
                <h3 className="font-playfair font-bold text-cream text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="font-lato text-cream/60 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-cream/10">
          {[
            { number: "50,000+", label: "Happy Customers" },
            { number: "100%", label: "Organic Certified" },
            { number: "40+", label: "Products" },
            { number: "5★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-playfair text-4xl font-bold text-turmeric">
                {stat.number}
              </p>
              <p className="font-lato text-cream/60 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
