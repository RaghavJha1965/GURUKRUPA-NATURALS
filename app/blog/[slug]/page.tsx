import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowLeft, Tag } from "lucide-react";
import { blogPosts } from "@/lib/products";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — GURUKRUPA NATURALS Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

const fullContent = `
<h2>Introduction</h2>
<p>This comprehensive guide explores the remarkable health benefits backed by modern scientific research and traditional Ayurvedic wisdom. Our team of wellness experts and nutritionists have compiled the most relevant findings to help you make informed health decisions.</p>

<h2>The Science Behind the Benefits</h2>
<p>Numerous peer-reviewed studies have demonstrated the powerful compounds found in these natural superfoods. The bioactive constituents work synergistically to provide multiple health benefits simultaneously.</p>

<h3>Key Active Compounds</h3>
<p>The primary active compounds include polyphenols, flavonoids, and organosulfur compounds that have been extensively studied for their therapeutic properties. These natural molecules interact with our body's biological systems in ways that support optimal health.</p>

<h2>Practical Applications</h2>
<p>Incorporating these superfoods into your daily routine doesn't have to be complicated. Start with small amounts and gradually increase as your body adapts. The key is consistency — daily consumption yields the best results.</p>

<h2>Safety and Dosage</h2>
<p>While these natural products are generally safe for most people, it's always advisable to consult with a healthcare provider before starting any new supplement regimen, especially if you have existing medical conditions or are taking medications.</p>

<h2>Conclusion</h2>
<p>Nature has provided us with remarkable tools for supporting our health. By choosing high-quality, organic, lab-tested products from trusted sources like GURUKRUPA NATURALS, you can harness the full power of these natural superfoods.</p>
`;

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "GURUKRUPA NATURALS",
      logo: "https://gurukrupanaturals.com/images/logo.png",
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-cream">
        {/* Breadcrumb */}
        <div className="bg-cream-dark border-b border-forest/5 py-3 px-4">
          <nav className="max-w-7xl mx-auto" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm font-lato text-charcoal/50">
              <li><Link href="/" className="hover:text-forest">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-forest">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-charcoal truncate max-w-xs">{post.title}</li>
            </ol>
          </nav>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-charcoal/60 hover:text-forest transition-colors font-lato text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Blog
          </Link>

          {/* Category */}
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-earth/10 text-earth text-xs font-bold px-3 py-1 rounded-full font-lato uppercase tracking-wide">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal/60 font-lato mb-8 pb-8 border-b border-forest/10">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center">
                <span className="text-forest font-bold text-sm">{post.author.charAt(0)}</span>
              </div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
            <Image
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=80"
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>

          {/* Excerpt */}
          <p className="font-lato text-xl text-charcoal/70 leading-relaxed mb-8 border-l-4 border-turmeric pl-5 italic">
            {post.excerpt}
          </p>

          {/* Content */}
          <div
            className="prose prose-lg prose-charcoal max-w-none font-lato space-y-4"
            dangerouslySetInnerHTML={{ __html: fullContent }}
            style={{
              lineHeight: "1.8",
              color: "rgba(26, 26, 26, 0.8)",
            }}
          />

          {/* Tags */}
          <div className="mt-10 pt-8 border-t border-forest/10 flex flex-wrap gap-2">
            <span className="text-sm font-bold text-charcoal/50 font-lato flex items-center gap-1">
              <Tag className="w-3 h-3" aria-hidden="true" />
              Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-forest/10 text-forest text-xs font-bold px-3 py-1 rounded-full font-lato capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-forest/10" aria-labelledby="related-posts-heading">
            <h2 id="related-posts-heading" className="font-playfair text-2xl font-bold text-charcoal mb-6">
              More from Our Blog
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relPost) => (
                <article key={relPost.id}>
                  <Link
                    href={`/blog/${relPost.slug}`}
                    className="group block bg-cream-light rounded-2xl overflow-hidden shadow-product hover:shadow-card-hover transition-all"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
                        alt={relPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-earth text-xs font-bold font-lato">{relPost.category}</span>
                      <h3 className="font-playfair font-bold text-charcoal mt-1 line-clamp-2 group-hover:text-forest transition-colors">
                        {relPost.title}
                      </h3>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
