'use client';

import { useLanguage } from '@/contexts/language';
import type { BlogPost } from '@/lib/blog-data';

interface Props {
  post: BlogPost;
}

function formatDate(dateStr: string, locale: 'es' | 'en') {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogCard({ post }: Props) {
  const { locale } = useLanguage();
  const readMore = { es: 'Leer más', en: 'Read more' };

  return (
    <div className="bg-white rounded-[20px] shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all flex flex-col">
      <div className="h-48 bg-[#f7f8fa] flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-[#0f8b8d] font-bold text-base mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3">{formatDate(post.date, locale)}</p>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>
        <a
          href={`/blog/${post.slug}`}
          className="inline-block px-5 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          {readMore[locale]}
        </a>
      </div>
    </div>
  );
}
