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

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
      <a href={`/blog/${post.slug}`} className="block h-44 overflow-hidden bg-[#eef1f4]">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6" />
            </svg>
          </div>
        )}
      </a>

      <div className="p-5 flex flex-col flex-1">
        <a href={`/blog/${post.slug}`}>
          <h3 className="text-[#1f2d3d] font-bold text-sm leading-snug hover:text-[#0f8b8d] transition-colors line-clamp-3 mb-2">
            {post.title}
          </h3>
        </a>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">{formatDate(post.date, locale)}</span>
          <a href={`/blog/${post.slug}`} className="text-[#0f8b8d] text-xs font-semibold hover:underline">
            {locale === 'es' ? 'Leer más »' : 'Read more »'}
          </a>
        </div>
      </div>
    </article>
  );
}
