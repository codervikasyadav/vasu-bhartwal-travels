import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { blogPosts } from '@/data/blog-posts';
import { Clock, ArrowRight, User } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Blog | Travel Guides & Tips',
  description: 'Expert travel guides, packing tips, and insider knowledge for Himalayan pilgrimages and adventure treks in Uttarakhand.',
};

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      <PageHero title="Travel Blog" subtitle="Expert guides, route tips, and stories from the Himalayas" code="BLOG" gradient />

      <section className="section bg-snow">
        <div className="container-main">
          <Link href={`/blog/${featured.slug}`} className="block group mb-14">
            <article className="card grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden hover:!transform-none">
              <div className="relative h-64 md:h-auto min-h-[280px]">
                <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-saffron text-xs font-semibold uppercase tracking-wider mb-3">{featured.category}</span>
                <h2 className="font-heading text-2xl md:text-3xl text-charcoal mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="text-muted mb-4 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {featured.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featured.readTime}</span>
                  <span>{featured.date}</span>
                </div>
              </div>
            </article>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block group h-full">
                <article className="card h-full flex flex-col hover:!transform-none">
                  <div className="relative h-48">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-saffron text-xs font-semibold uppercase tracking-wider">{post.category}</span>
                    <h3 className="font-heading text-lg text-charcoal mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-muted text-sm mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted pt-4 border-t border-border">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      <span className="flex items-center gap-1 text-saffron font-medium group-hover:gap-2 transition-all">Read More <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
