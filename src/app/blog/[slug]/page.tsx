'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Topbar from '@/components/topbar';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { useLanguage } from '@/contexts/language';
import { getBlogPost, blogPosts } from '@/lib/blog-data';

function formatDate(dateStr: string, locale: 'es' | 'en') {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function renderContent(content: string) {
  return content.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return <h2 key={i} className="text-2xl font-bold text-[#0f8b8d] mt-10 mb-3">{block.slice(3)}</h2>;
    }
    if (block.startsWith('### ')) {
      return <h3 key={i} className="text-xl font-bold text-[#1f2d3d] mt-7 mb-2">{block.slice(4)}</h3>;
    }
    if (block.includes('\n- ')) {
      const items = block.split('\n- ').filter(Boolean);
      return (
        <ul key={i} className="list-disc list-inside space-y-2 text-gray-700 my-4 pl-2">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ul>
      );
    }
    if (!block.trim()) return null;
    return (
      <p
        key={i}
        className="text-gray-700 leading-relaxed my-4"
        dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
      />
    );
  });
}

function PostContent({ slug }: { slug: string }) {
  const { locale } = useLanguage();
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
    return null;
  }

  // 3 artículos relacionados (excluye el actual, más recientes primero)
  const related = blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  const sortedAll = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const postIndex = sortedAll.findIndex((p) => p.slug === slug);

  return (
    <>
      {/* Hero con imagen */}
      <section className="relative">
        {post.image ? (
          <div className="relative h-[340px] lg:h-[440px] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a3a]/90 via-[#1a2a3a]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 max-w-4xl mx-auto">
              <a href="/blog" className="text-white/70 hover:text-white text-sm mb-4 inline-block transition-colors">
                ← {locale === 'es' ? 'Volver al blog' : 'Back to blog'}
              </a>
              <p className="text-[#6ed3c1] text-sm font-medium mb-2">{formatDate(post.date, locale)}</p>
              <h1 className="text-2xl lg:text-4xl font-bold text-white leading-tight">{post.title}</h1>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-[#1a2a3a] to-[#2c3e50] py-20 px-6 text-white">
            <div className="max-w-4xl mx-auto">
              <a href="/blog" className="text-white/60 hover:text-white text-sm mb-6 inline-block transition-colors">
                ← {locale === 'es' ? 'Volver al blog' : 'Back to blog'}
              </a>
              <p className="text-[#6ed3c1] text-sm font-medium mb-3">{formatDate(post.date, locale)}</p>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight">{post.title}</h1>
            </div>
          </div>
        )}
      </section>

      {/* Contenido */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          {/* Autor + fecha */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
            <img
              src="/team/paola.png"
              alt="Paola Esquivel"
              className="w-10 h-10 rounded-full object-cover object-top border-2 border-[#6ed3c1]"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div>
              <p className="text-sm font-semibold text-[#1f2d3d]">Paola Esquivel</p>
              <p className="text-xs text-gray-400">{formatDate(post.date, locale)}</p>
            </div>
          </div>

          <div>{renderContent(post.content)}</div>

          {/* CTA WhatsApp */}
          <div className="mt-14 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-600 mb-4">
              {locale === 'es' ? '¿Tienes dudas sobre este tema? Contáctanos.' : 'Have questions? Contact us.'}
            </p>
            <a
              href={`https://wa.me/573143992911?text=${encodeURIComponent(
                locale === 'es'
                  ? `Hola, leí el artículo "${post.title}" y tengo una consulta.`
                  : `Hello, I read the article "${post.title}" and have a question.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-gradient-to-r from-[#6ed3c1] to-[#4cb8c4] text-white font-bold rounded-full hover:shadow-lg transition-all text-base"
            >
              {locale === 'es' ? 'CONTACTAR POR WHATSAPP' : 'CONTACT VIA WHATSAPP'}
            </a>
          </div>
        </div>
      </section>

      {/* Artículos relacionados */}
      <section className="py-14 px-6 bg-[#f7f8fa]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#1f2d3d] mb-8">
            {locale === 'es' ? 'Artículos relacionados' : 'Related articles'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((r) => (
              <a
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow flex flex-col group"
              >
                <div className="h-36 overflow-hidden bg-[#eef1f4]">
                  {r.image ? (
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs text-gray-400 mb-1">{formatDate(r.date, locale)}</p>
                  <h3 className="text-sm font-bold text-[#1f2d3d] group-hover:text-[#0f8b8d] transition-colors line-clamp-3 flex-1">
                    {r.title}
                  </h3>
                  <span className="mt-3 text-xs text-[#0f8b8d] font-semibold">
                    {locale === 'es' ? 'Leer más »' : 'Read more »'}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <Topbar />
      <SiteHeader />
      <PostContent slug={slug} />
      <SiteFooter />
    </main>
  );
}
