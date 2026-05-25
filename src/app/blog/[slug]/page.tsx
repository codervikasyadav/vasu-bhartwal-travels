import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { blogPosts } from '@/data/blog-posts';
import { Clock, User, ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [{ url: post.image }] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  if (postIndex === -1) notFound();
  const post = blogPosts[postIndex];
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-10">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/blog" className="hover:text-white">Blog</Link><span>/</span>
            <span className="text-white line-clamp-1">{post.title}</span>
          </nav>
          <span className="text-saffron text-sm font-semibold uppercase tracking-wider">{post.category}</span>
          <h1 className="font-heading text-3xl md:text-5xl font-semibold text-white mt-2 mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-snow">
        <div className="container-main max-w-3xl">
          <article className="card p-8 md:p-12 hover:!transform-none prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-charcoal prose-a:text-saffron prose-strong:text-charcoal">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {post.tags.map((tag) => (
              <span key={tag} className="px-4 py-1.5 bg-white rounded-full text-sm text-muted border border-border">
                #{tag}
              </span>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" /> <span className="text-sm">Previous Post</span>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="flex items-center gap-2 text-muted hover:text-primary transition-colors">
                <span className="text-sm">Next Post</span> <ArrowRight className="w-4 h-4" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </>
  );
}
