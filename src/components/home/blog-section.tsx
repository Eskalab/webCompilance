'use client';

import { useLanguage } from '@/contexts/language';
import { blogPosts } from '@/lib/home-data';
import BlogCard from './blog-card';

export default function BlogSection() {
  const { locale } = useLanguage();

  const content = {
    label: {
      es: 'ACTUALÍZATE EN NOTICIAS DEL MUNDO JURÍDICO DIGITAL CON',
      en: 'STAY UPDATED ON DIGITAL LEGAL NEWS WITH',
    },
    title: { es: 'NUESTRO BLOG', en: 'OUR BLOG' },
    desc1: {
      es: 'Impulsa tu carrera legal con insights exclusivos.',
      en: 'Boost your legal career with exclusive insights.',
    },
    desc2: {
      es: 'Obtén gratis tu suscripción a nuestra revista jurídica y mantente a la vanguardia de los desarrollos jurídico-digitales de Colombia y el Mundo. Descubre artículos de expertos que transformarán tu práctica legal.',
      en: 'Get a free subscription to our legal journal and stay at the forefront of legal-digital developments in Colombia and the World. Discover expert articles that will transform your legal practice.',
    },
    desc3: {
      es: 'Únete a nuestra comunidad de lectores. Accede a contenido de especializado, comentarios expertos, debates jurídicos y mas.',
      en: 'Join our reader community. Access specialized content, expert commentary, legal debates and more.',
    },
    blogBtn: { es: 'Ir al Blog', en: 'Go to Blog' },
    subscribeTitle: { es: '¡Inscríbete a nuestro Blog!', en: 'Subscribe to our Blog!' },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#1f2d3d] mb-2">
            {content.label[locale]}
          </h2>
          <p className="text-4xl lg:text-5xl font-bold text-[#e91e8c]">
            {content.title[locale]}
          </p>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
          <p className="text-gray-700 font-medium">{content.desc1[locale]}</p>
          <p className="text-gray-600 text-sm leading-relaxed text-justify">
            {content.desc2[locale]}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            {content.desc3[locale]}
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <a
            href="#"
            className="inline-block px-10 py-4 bg-[#0f8b8d] text-white font-bold rounded-full hover:bg-[#0c7475] transition-colors text-base"
          >
            {content.blogBtn[locale]}
          </a>
          <p className="text-[#e91e8c] font-semibold text-lg">
            {content.subscribeTitle[locale]}
          </p>
        </div>
      </div>
    </section>
  );
}
