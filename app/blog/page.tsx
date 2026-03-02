import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, Tag, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Health Tips & Blog — GURUKRUPA NATURALS",
  description:
    "Expert articles on organic living, Ayurvedic wellness, black garlic benefits, and natural health tips from GURUKRUPA NATURALS.",
};

const categories = ["All", "Black Garlic", "Ayurveda", "Organic Living", "Superfoods", "Recipes"];

export default function BlogPage() {
  const [featuredPost, ...restPosts] = blogPosts;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-forest py-16 px-4 text-center">
        <p className="text-turmeric font-lato font-bold text-sm uppercase tracking-widest mb-3">
          Knowledge & Wellness
        </p>
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-cream mb-4">
          Health Tips & Insights
        </h1>
        <p className="text-cream/70 font-lato max-w-xl mx-auto">
          Evidence-based articles on organic living, Ayurvedic wisdom, and
          natural wellness — curated by our team of experts.
        </p>
      </div>

      {/* Category Filter */}
      <div className="sticky top-16 md:top-20 bg-cream/95 backdrop-blur-sm border-b border-forest/5 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max" role="navigation" aria-label="Blog categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-lato font-bold transition-colors whitespace-nowrap ${
                  cat === "All"
                    ? "bg-forest text-cream"
                    : "border border-forest/20 text-charcoal hover:border-forest hover:text-forest"
                }`}
                aria-current={cat === "All" ? "true" : undefined}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <article className="mb-12">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block bg-cream-light rounded-3xl overflow-hidden shadow-product hover:shadow-card-hover transition-all duration-300"
            aria-label={`Read: ${featuredPost.title}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={`https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80`}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-forest/10 text-forest text-xs font-bold px-3 py-1 rounded-full font-lato uppercase tracking-wide">
                    Featured
                  </span>
                  <span className="flex items-center gap-1 text-xs text-charcoal/50 font-lato">
                    <Tag className="w-3 h-3" aria-hidden="true" />
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="font-playfair font-bold text-charcoal text-2xl sm:text-3xl mb-4 group-hover:text-forest transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="font-lato text-charcoal/60 leading-relaxed mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-charcoal/50 font-lato">
                    <span>{featuredPost.author}</span>
                    <span>·</span>
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                  <span className="flex items-center gap-1 text-forest font-bold text-sm font-lato group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </article>

        {/* Blog Grid */}
        <section aria-labelledby="blog-posts-heading">
          <h2 id="blog-posts-heading" className="sr-only">Blog posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restPosts.map((post) => (
              <article key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-cream-light rounded-2xl overflow-hidden shadow-product hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                  aria-label={`Read: ${post.title}`}
                >
                  {/* Post Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80`}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>

                  {/* Post Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-earth/10 text-earth text-xs font-bold px-2.5 py-1 rounded-full font-lato">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-playfair font-bold text-charcoal text-lg leading-tight mb-2 line-clamp-2 group-hover:text-forest transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-lato text-charcoal/60 text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-charcoal/40 font-lato">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        <span>{post.readTime} min read</span>
                      </div>
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-forest rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-cream mb-3">
            Get Wellness Tips in Your Inbox
          </h2>
          <p className="text-cream/70 font-lato mb-6">
            Subscribe to our weekly health newsletter — no spam, just pure wellness wisdom.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            action="#"
            aria-label="Newsletter subscription"
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              aria-label="Email address"
              className="flex-1 px-4 py-3 rounded-full bg-cream/10 border border-cream/20 text-cream placeholder-cream/40 focus:outline-none focus:border-turmeric text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-turmeric text-charcoal font-bold rounded-full hover:bg-turmeric-dark transition-colors text-sm whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
