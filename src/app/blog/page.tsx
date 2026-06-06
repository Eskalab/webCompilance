'use client';

import Topbar from '@/components/topbar';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { useLanguage } from '@/contexts/language';
import { blogPosts } from '@/lib/blog-data';

function formatDate(dateStr: string, locale: 'es' | 'en') {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function BlogContent() {
  const { locale } = useLanguage();

  return (
    <>
      <section className="bg-gradient-to-r from-[#1a2a3a] to-[#2c3e50] py-20 px-6 text-center text-white">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
          {locale === 'es' ? 'Blog' : 'Blog'}
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          {locale === 'es'
            ? 'Artículos sobre protección de datos, derecho digital y comercio electrónico en Colombia.'
            : 'Articles on data protection, digital law and e-commerce in Colombia.'}
        </p>
      </section>

      <section className="py-20 px-6 bg-[#f7f8fa]">
        <div className="max-w-5xl mx-auto grid gap-8">
          {blogPosts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 block group"
            >
              <p className="text-sm text-[#e91e8c] font-medium mb-2">
                {formatDate(post.date, locale)}
              </p>
              <h2 className="text-xl font-bold text-[#1f2d3d] mb-3 group-hover:text-[#0f8b8d] transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-block text-[#0f8b8d] font-semibold text-sm">
                {locale === 'es' ? 'Leer más →' : 'Read more →'}
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <Topbar />
      <SiteHeader />
      <BlogContent />
      <SiteFooter />
    </main>
  );
}
