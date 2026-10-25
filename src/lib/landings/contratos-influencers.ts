import type { LandingContent } from './types';

// Servicio "Contratos especializados de transmisión y transferencia de datos" (home-data.ts),
// enfocado en creadores de contenido y personas que viven de su imagen.
export const contratosInfluencers: LandingContent = {
  path: '/productos/contratos-influencers',
  meta: {
    title: 'Contratos de imagen y datos personales para influencers y creadores | TDE',
    description:
      'Contratos de transmisión y transferencia de datos personales para influencers, creadores de contenido y personas que viven de su imagen: qué se usa, para qué, por cuánto tiempo y dónde.',
  },
  og: {
    kicker: 'TDE · Contratos para creadores',
    title: 'Tu imagen es tu negocio. Protégela en cada contrato',
    subtitle: 'Transmisión y transferencia de datos para influencers y creadores',
    tags: ['Imagen', 'Marcas', 'Audiencia', 'Ley 1581'],
  },
  name: { es: 'Contratos para creadores', en: 'Contracts for creators' },
  whatsapp: {
    es: 'Hola, vengo de la página de contratos para influencers y creadores de contenido y quiero revisar mi caso.',
    en: 'Hello, I come from the contracts for influencers and creators page and I would like you to review my case.',
  },

  hero: {
    badge: { es: 'Influencers · Creadores de contenido', en: 'Influencers · Content creators' },
    title: {
      es: 'Tu imagen es tu negocio. Protégela en cada contrato',
      en: 'Your image is your business. Protect it in every contract',
    },
    subtitle: {
      es: 'Contratos de transmisión y transferencia de datos personales para influencers, creadores y personas que viven de su imagen: claros sobre qué se usa, para qué, por cuánto tiempo y en qué países.',
      en: 'Personal data transmission and transfer contracts for influencers, creators and people who live off their image: clear on what is used, for what, for how long and in which countries.',
    },
    cta: { es: 'Revisar mi caso', en: 'Review my case' },
    trust: [
      { es: 'Revisamos lo que ya firmaste', en: 'We review what you already signed' },
      { es: 'Contratos a tu medida', en: 'Tailor-made contracts' },
      { es: 'Basado en la Ley 1581', en: 'Based on Law 1581' },
    ],
    card: {
      title: { es: 'Lo que cuidamos', en: 'What we protect' },
      items: [
        { icon: 'Camera', text: { es: 'Tu imagen, tu voz y tu nombre', en: 'Your image, voice and name' } },
        { icon: 'Users', text: { es: 'Los datos de tu audiencia', en: 'Your audience’s data' } },
        { icon: 'Handshake', text: { es: 'El uso que hacen marcas y agencias', en: 'How brands and agencies use them' } },
        { icon: 'Globe', text: { es: 'Las transferencias fuera de Colombia', en: 'Transfers outside Colombia' } },
      ],
    },
  },

  risk: {
    label: { es: 'Lo que está en juego', en: 'What is at stake' },
    title: {
      es: 'Cada colaboración comparte datos tuyos',
      en: 'Every collaboration shares your data',
    },
    cards: [
      {
        icon: 'Camera',
        title: { es: 'Tu imagen es un dato personal', en: 'Your image is personal data' },
        text: {
          es: 'Tus fotos, videos y tu voz te identifican. Por eso la ley protege cómo se recolectan, se usan y se comparten.',
          en: 'Your photos, videos and voice identify you. That is why the law protects how they are collected, used and shared.',
        },
      },
      {
        icon: 'Video',
        title: { es: 'Campañas que nunca terminan', en: 'Campaigns that never end' },
        text: {
          es: 'Sin un contrato claro, tu contenido puede seguir circulando años después, en otros países o para fines que no aceptaste.',
          en: 'Without a clear contract, your content may keep circulating years later, in other countries or for purposes you never agreed to.',
        },
      },
      {
        icon: 'Users',
        title: { es: 'Tu audiencia también tiene derechos', en: 'Your audience has rights too' },
        text: {
          es: 'Si recoges datos en sorteos, formularios o listas y los compartes con una marca, necesitas la autorización de tus seguidores.',
          en: 'If you collect data through giveaways, forms or lists and share it with a brand, you need your followers’ authorization.',
        },
      },
    ],
    ctaQuestion: {
      es: '¿Sabes hasta cuándo puede usar tu imagen la última marca con la que trabajaste?',
      en: 'Do you know until when the last brand you worked with can use your image?',
    },
  },

  explainer: {
    label: { es: 'Dos conceptos clave', en: 'Two key concepts' },
    title: { es: 'Transmisión no es lo mismo que transferencia', en: 'Transmission is not the same as transfer' },
    items: [
      {
        title: { es: 'Transmisión', en: 'Transmission' },
        text: {
          es: 'Entregas datos a alguien que los trata por tu cuenta y siguiendo tus instrucciones, como tu agencia, tu manager o tu community manager. Se regula con un contrato de transmisión.',
          en: 'You hand data to someone who processes it on your behalf and under your instructions, such as your agency, manager or community manager. It is governed by a transmission contract.',
        },
      },
      {
        title: { es: 'Transferencia', en: 'Transfer' },
        text: {
          es: 'Entregas datos a otro que decide por sí mismo cómo usarlos, como la marca que contrata tu campaña. Requiere autorización y reglas claras sobre el uso, y condiciones adicionales si sale del país.',
          en: 'You hand data to another party that decides how to use it, such as the brand that hires your campaign. It requires authorization and clear usage rules, plus extra conditions if it leaves the country.',
        },
      },
    ],
    source: {
      es: 'Decreto 1377 de 2013 (compilado en el Decreto 1074 de 2015) y Ley 1581 de 2012, artículo 26.',
      en: 'Decree 1377 of 2013 (compiled in Decree 1074 of 2015) and Law 1581 of 2012, article 26.',
    },
  },

  includes: {
    label: { es: 'Qué hacemos', en: 'What we do' },
    title: { es: 'Contratos para cada relación', en: 'Contracts for every relationship' },
    cards: [
      {
        icon: 'FileSignature',
        title: { es: 'Autorización de uso de imagen y voz', en: 'Image and voice use authorization' },
        text: { es: 'Alcance, medios, territorio, duración y condiciones para terminarla.', en: 'Scope, media, territory, duration and terms to end it.' },
      },
      {
        icon: 'Handshake',
        title: { es: 'Contratos con marcas', en: 'Contracts with brands' },
        text: { es: 'Qué datos e imágenes recibe la marca, para qué y por cuánto tiempo.', en: 'Which data and images the brand receives, for what and for how long.' },
      },
      {
        icon: 'Briefcase',
        title: { es: 'Contratos con agencias y tu equipo', en: 'Contracts with agencies and your team' },
        text: { es: 'Transmisión y confidencialidad con managers, agencias y community managers.', en: 'Transmission and confidentiality with managers, agencies and community managers.' },
      },
      {
        icon: 'Globe',
        title: { es: 'Marcas y plataformas de otros países', en: 'Brands and platforms abroad' },
        text: { es: 'Cláusulas para transferencias internacionales de datos.', en: 'Clauses for international data transfers.' },
      },
      {
        icon: 'Users',
        title: { es: 'Datos de tu audiencia', en: 'Your audience’s data' },
        text: { es: 'Aviso y autorización para sorteos, formularios, listas y comunidades.', en: 'Notice and authorization for giveaways, forms, lists and communities.' },
      },
      {
        icon: 'Search',
        title: { es: 'Revisión de lo que ya firmaste', en: 'Review of what you already signed' },
        text: { es: 'Te decimos qué permite tu contrato actual y qué conviene ajustar.', en: 'We tell you what your current contract allows and what should be adjusted.' },
      },
    ],
    note: {
      es: 'Por bolsas de 3, 6, 9 o 12 horas, según lo que necesites.',
      en: 'In blocks of 3, 6, 9 or 12 hours, as you need.',
    },
  },

  process: {
    label: { es: 'Cómo funciona', en: 'How it works' },
    title: { es: 'Simple y sin letra pequeña', en: 'Simple, no fine print' },
    steps: [
      { title: { es: 'Nos escribes', en: 'You write to us' }, text: { es: 'Nos cuentas con quién trabajas o vas a trabajar.', en: 'You tell us who you work or will work with.' } },
      { title: { es: 'Revisamos tu caso', en: 'We review your case' }, text: { es: 'Leemos tus contratos actuales y entendemos cómo se usa tu imagen.', en: 'We read your current contracts and understand how your image is used.' } },
      { title: { es: 'Redactamos o ajustamos', en: 'We draft or adjust' }, text: { es: 'Preparamos los contratos y cláusulas que necesitas.', en: 'We prepare the contracts and clauses you need.' } },
      { title: { es: 'Te lo explicamos', en: 'We explain it' }, text: { es: 'Sabrás qué firmas y qué puedes negociar con la marca.', en: 'You will know what you sign and what you can negotiate with the brand.' } },
    ],
  },

  audience: {
    label: { es: 'Para quién', en: 'Who it is for' },
    title: { es: 'Personas que viven de su imagen', en: 'People who live off their image' },
    items: [
      { icon: 'Camera', text: { es: 'Influencers y creadores de contenido', en: 'Influencers and content creators' } },
      { icon: 'Video', text: { es: 'Modelos y actores', en: 'Models and actors' } },
      { icon: 'Award', text: { es: 'Deportistas', en: 'Athletes' } },
      { icon: 'Mic', text: { es: 'Speakers y figuras públicas', en: 'Speakers and public figures' } },
      { icon: 'Briefcase', text: { es: 'Agencias de talento y representantes', en: 'Talent agencies and managers' } },
      { icon: 'Users', text: { es: 'Marcas que trabajan con creadores', en: 'Brands that work with creators' } },
    ],
  },

  faq: [
    {
      q: { es: 'Ya firmé un contrato, ¿me sirve?', en: 'I already signed a contract, can you help?' },
      a: {
        es: 'Sí. Revisamos lo que firmaste, te explicamos qué permite y qué conviene ajustar en la próxima negociación.',
        en: 'Yes. We review what you signed, explain what it allows and what to adjust in your next negotiation.',
      },
    },
    {
      q: { es: '¿Mi imagen de verdad es un dato personal?', en: 'Is my image really personal data?' },
      a: {
        es: 'Sí. La imagen que permite identificar a una persona es un dato personal, y su uso está protegido por la Ley 1581.',
        en: 'Yes. An image that identifies a person is personal data, and its use is protected by Law 1581.',
      },
    },
    {
      q: { es: 'Trabajo con marcas de otros países, ¿qué cambia?', en: 'I work with brands abroad, what changes?' },
      a: {
        es: 'La Ley 1581 pone condiciones a las transferencias de datos a otros países. El contrato debe cubrirlas para que estés protegido.',
        en: 'Law 1581 sets conditions for transferring data to other countries. The contract must cover them so you are protected.',
      },
    },
    {
      q: { es: '¿Esto cubre derechos de autor sobre mi contenido?', en: 'Does this cover copyright over my content?' },
      a: {
        es: 'Nos enfocamos en tu imagen y en los datos personales. Si el contrato también cede derechos de autor sobre tu contenido, te lo señalamos en la revisión.',
        en: 'We focus on your image and personal data. If the contract also assigns copyright over your content, we point it out in the review.',
      },
    },
    {
      q: { es: '¿Cuánto cuesta?', en: 'How much does it cost?' },
      a: {
        es: 'Depende de cuántos contratos necesites y de su complejidad. Trabajamos por bolsas de horas; escríbenos y te damos una propuesta.',
        en: 'It depends on how many contracts you need and how complex they are. We work in blocks of hours; write to us for a proposal.',
      },
    },
  ],

  final: {
    title: { es: 'Antes de firmar, pregúntanos', en: 'Before you sign, ask us' },
    subtitle: {
      es: 'Cuéntanos con qué marca o agencia vas a trabajar y revisamos tu caso.',
      en: 'Tell us which brand or agency you will work with and we will review your case.',
    },
  },
};
