// seo.ts — Datos institucionales y helpers de datos estructurados (Schema.org)
// Centraliza la información que usan Google y los buscadores con IA
// (ChatGPT, Perplexity, Gemini, Claude) para entender quién es la fundación.

export const SITE_URL = 'https://porunmundomejor.org.ar';
export const SITE_NAME = 'Fundación Por Un Mundo Mejor';

export const ORG_ID = `${SITE_URL}/#organizacion`;
export const WEBSITE_ID = `${SITE_URL}/#sitio`;

// TODO: verificar dirección y teléfono con la fundación antes de publicar
export const NAP = {
  streetAddress: '27 de Abril 616',
  addressLocality: 'Córdoba',
  addressRegion: 'Córdoba',
  postalCode: '5000',
  addressCountry: 'AR',
  telephone: '+5493516716580',
};

export const SOCIAL = [
  'https://www.instagram.com/fundacion.porunmundomejor/',
  'https://www.facebook.com/fundacionporunmundomejor/',
];

/** Organización + sitio web: se emite en todas las páginas. */
export function globalSchema() {
  return [
    {
      '@type': ['MedicalOrganization', 'NGO'],
      '@id': ORG_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logoFundacion.jpg`,
        width: 500,
        height: 500,
      },
      image: `${SITE_URL}/images/og-image.jpg`,
      description:
        'Fundación de Córdoba, Argentina, dedicada a la prevención y el tratamiento de las adicciones y el consumo problemático de sustancias, con un equipo interdisciplinario de salud mental. Ofrece admisión, Hospital de Día, tratamiento ambulatorio, orientación familiar y psicoterapia multifamiliar.',
      foundingDate: '2004',
      medicalSpecialty: 'Psychiatric',
      address: { '@type': 'PostalAddress', ...withoutPhone(NAP) },
      telephone: NAP.telephone,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: NAP.telephone,
        contactType: 'customer service',
        areaServed: 'AR',
        availableLanguage: 'es',
      },
      areaServed: [
        { '@type': 'City', name: 'Córdoba' },
        { '@type': 'State', name: 'Provincia de Córdoba' },
        { '@type': 'Country', name: 'Argentina' },
      ],
      knowsAbout: [
        'Tratamiento de adicciones',
        'Consumo problemático de sustancias',
        'Alcoholismo',
        'Patología dual',
        'Salud mental',
        'Hospital de Día',
        'Orientación familiar',
        'Psicoterapia multifamiliar',
        'Prevención de adicciones en adolescentes',
      ],
      sameAs: SOCIAL,
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: 'es-AR',
      publisher: { '@id': ORG_ID },
    },
  ];
}

function withoutPhone(nap: typeof NAP) {
  const { telephone, ...rest } = nap;
  return rest;
}

/** Migas de pan → BreadcrumbList */
export function breadcrumbSchema(items: { label: string; href?: string }[], currentPath: string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: new URL(item.href ?? currentPath, SITE_URL).href,
    })),
  };
}

/** Preguntas y respuestas → FAQPage */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Convierte "Mónica Frencia" en "monica-frencia" (mismo criterio que las fotos) */
export function slugify(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** @id estable para una persona del equipo (enlaza autoría de artículos con /equipo) */
export function personId(nombre: string) {
  return `${SITE_URL}/equipo#${slugify(nombre)}`;
}
