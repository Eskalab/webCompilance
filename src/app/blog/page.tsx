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
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">Blog</h1>
        <p className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto">
          {locale === 'es'
            ? 'Artículos sobre protección de datos, derecho digital y comercio electrónico en Colombia.'
            : 'Articles on data protection, digital law and e-commerce in Colombia.'}
        </p>
      </section>

      <section className="py-16 px-4 bg-[#f7f8fa]">
      <div className="max-w-6xl mx-auto">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => (
            <article key={post.slug} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">

              {/* Imagen destacada */}
              <a href={`/blog/${post.slug}`} className="block h-48 overflow-hidden bg-[#eef1f4]">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6" />
                    </svg>
                  </div>
                )}
              </a>

              {/* Contenido */}
              <div className="p-5 flex flex-col flex-1">
                <a href={`/blog/${post.slug}`} className="block mb-2">
                  <h2 className="text-[#1f2d3d] font-bold text-base leading-snug hover:text-[#0f8b8d] transition-colors line-clamp-3">
                    {post.title}
                  </h2>
                </a>

                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
                </p>

                {/* Footer de la card */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <img
                      src="/team/paola.png"
                      alt="Paola Esquivel"
                      className="w-7 h-7 rounded-full object-cover object-top"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="text-xs text-gray-400">{formatDate(post.date, locale)}</span>
                  </div>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-[#0f8b8d] text-xs font-semibold hover:underline"
                  >
                    {locale === 'es' ? 'Leer más »' : 'Read more »'}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
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
