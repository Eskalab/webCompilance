'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Topbar from '@/components/topbar';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { useLanguage } from '@/contexts/language';
import { getBlogPost } from '@/lib/blog-data';

function formatDate(dateStr: string, locale: 'es' | 'en') {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function renderContent(content: string) {
  const paragraphs = content.split('\n\n');
  return paragraphs.map((block, i) => {
    if (block.startsWith('## ')) {
      return <h2 key={i} className="text-2xl font-bold text-[#0f8b8d] mt-8 mb-3">{block.slice(3)}</h2>;
    }
    if (block.startsWith('### ')) {
      return <h3 key={i} className="text-xl font-bold text-[#1f2d3d] mt-6 mb-2">{block.slice(4)}</h3>;
    }
    if (block.includes('\n- ')) {
      const items = block.split('\n- ').filter(Boolean);
      return (
        <ul key={i} className="list-disc list-inside space-y-1 text-gray-700 my-3">
          {items.map((item, j) => (
            <li key={j}>{item.replace(/\*\*(.*?)\*\*/g, '$1')}</li>
          ))}
        </ul>
      );
    }
    if (!block.trim()) return null;
    const formatted = block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return (
      <p
        key={i}
        className="text-gray-700 leading-relaxed my-3"
        dangerouslySetInnerHTML={{ __html: formatted }}
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

  return (
    <>
      <section className="bg-gradient-to-r from-[#1a2a3a] to-[#2c3e50] py-20 px-6 text-white">
        <div className="max-w-3xl mx-auto">
          <a href="/blog" className="text-white/60 hover:text-white text-sm mb-6 inline-block transition-colors">
            ← {locale === 'es' ? 'Volver al blog' : 'Back to blog'}
          </a>
          <p className="text-[#6ed3c1] text-sm font-medium mb-3">{formatDate(post.date, locale)}</p>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight">{post.title}</h1>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            {renderContent(post.content)}
          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-600 mb-4">
              {locale === 'es'
                ? '¿Tienes dudas sobre este tema? Contáctanos.'
                : 'Have questions about this topic? Contact us.'}
            </p>
            <a
              href={`https://wa.me/573143992911?text=${encodeURIComponent(locale === 'es' ? `Hola, leí el artículo "${post.title}" y tengo una consulta.` : `Hello, I read the article "${post.title}" and have a question.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-gradient-to-r from-[#6ed3c1] to-[#4cb8c4] text-white font-bold rounded-full hover:shadow-lg transition-all text-base"
            >
              {locale === 'es' ? 'CONTACTAR POR WHATSAPP' : 'CONTACT VIA WHATSAPP'}
            </a>
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
