import { Instagram } from "lucide-react";
import Image from "next/image";

const instagramPosts = [
  { id: "1", alt: "Black garlic harvest", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80" },
  { id: "2", alt: "Herbal tea preparation", img: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&q=80" },
  { id: "3", alt: "Organic moringa powder", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80" },
  { id: "4", alt: "Golden turmeric latte", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
  { id: "5", alt: "Ashwagandha root", img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80" },
  { id: "6", alt: "Natural wellness products", img: "https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?w=400&q=80" },
];

export default function InstagramSection() {
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-cream"
      aria-labelledby="instagram-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Instagram className="w-5 h-5 text-earth" aria-hidden="true" />
            <span className="text-earth font-lato font-bold text-sm uppercase tracking-widest">
              @gurukrupanaturals
            </span>
          </div>
          <h2
            id="instagram-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal"
          >
            Follow Our Journey
          </h2>
          <p className="text-charcoal/60 font-lato mt-2">
            Join 50,000+ followers living the organic lifestyle
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/gurukrupanaturals"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl"
              aria-label={`View Instagram post: ${post.alt}`}
            >
              <Image
                src={post.img}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram
                  className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="mt-8 text-center">
          <a
            href="https://instagram.com/gurukrupanaturals"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-lato font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="w-5 h-5" aria-hidden="true" />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
