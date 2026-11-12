// seo.ts — Datos institucionales y helpers de datos estructurados (Schema.org)
// Centraliza la información que usan Google y los buscadores con IA
// (ChatGPT, Perplexity, Gemini, Claude) para entender quién es la fundación.

export const SITE_URL = 'https://porunmundomejor.org.ar';
export const SITE_NAME = 'Fundación Por Un Mundo Mejor';

export const ORG_ID = `${SITE_URL}/#organizacion`;
export const WEBSITE_ID = `${SITE_URL}/#sitio`;

// Dirección y teléfono confirmados (noviembre 2026)
export const NAP = {
  streetAddress: '27 de Abril 616',
  addressLocality: 'Córdoba',
  addressRegion: 'Córdoba',
  postalCode: '5000',
  addressCountry: 'AR',
  telephone: '+5493516716580',
};

// Códigos de verificación de buscadores (pegar acá el valor "content" que te dan)
// Google Search Console → Configuración → Verificación de propiedad → Etiqueta HTML
export const GOOGLE_SITE_VERIFICATION = '';
// Bing Webmaster Tools → Agregar sitio → Metaetiqueta HTML
export const BING_SITE_VERIFICATION = '';

/** Programas de la fundación: se usan en los datos estructurados y en la ficha de la organización */
export const PROGRAMAS = [
  { slug: 'admision', name: 'Admisión', description: 'Tres entrevistas psicológicas y psiquiátricas de evaluación para elaborar un diagnóstico presuntivo y definir el plan de tratamiento.' },
  { slug: 'abordaje-psiquiatrico', name: 'Abordaje psiquiátrico y psicofarmacológico', description: 'Intervención clínica médica especializada para el diagnóstico y tratamiento de patología dual o subyacente a una adicción, los estados de abstinencia en los comienzos de la recuperación y el sostén del nuevo equilibrio hasta su consolidación.' },
  { slug: 'hospital-de-dia', name: 'Hospital de Día', description: 'Jornada completa de 8 horas diarias durante unos 6 meses, orientada a la reinserción social y laboral con capacitación práctica, microemprendimientos, deporte y psicoterapia.' },
  { slug: 'tratamiento-ambulatorio', name: 'Tratamiento Ambulatorio', description: 'Acompañamiento de 3 a 6 meses en el entorno familiar con tres espacios semanales: psicoterapia grupal, individual/familiar y multifamiliar.' },
  { slug: 'orientacion-familiar', name: 'Orientación Familiar', description: 'Encuentros quincenales de 3 a 6 meses para familias preocupadas por un ser querido, aunque la persona todavía no quiera tratarse.' },
  { slug: 'psicoterapia-multifamiliar', name: 'Psicoterapia Multifamiliar', description: 'Programa de mínimo 12 módulos para familiares, para repensar el vínculo con el paciente y construir una alianza terapéutica.' },
];

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
        'Fundación de Córdoba, Argentina, dedicada a la prevención y el tratamiento de las adicciones y el consumo problemático de sustancias, con un equipo interdisciplinario de salud mental. Ofrece admisión, abordaje psiquiátrico y psicofarmacológico, Hospital de Día, tratamiento ambulatorio, orientación familiar y psicoterapia multifamiliar.',
      foundingDate: '2008',
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
        'Abordaje psiquiátrico y psicofarmacológico',
        'Salud mental',
        'Hospital de Día',
        'Orientación familiar',
        'Psicoterapia multifamiliar',
        'Prevención de adicciones en adolescentes',
      ],
      hasMap: 'https://www.google.com/maps/search/?api=1&query=27+de+Abril+616,+C%C3%B3rdoba,+Argentina',
      isAcceptingNewPatients: true,
      availableService: PROGRAMAS.map((p) => ({
        '@type': 'MedicalTherapy',
        name: p.name,
        description: p.description,
        url: `${SITE_URL}/programas/${p.slug}`,
      })),
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

/** Página de un programa → MedicalWebPage + MedicalTherapy (ayuda a buscadores y asistentes de IA a entender cada tratamiento) */
export function programaSchema(slug: string) {
  const p = PROGRAMAS.find((x) => x.slug === slug);
  if (!p) return [];
  const url = `${SITE_URL}/programas/${p.slug}`;
  return [
    {
      '@type': 'MedicalWebPage',
      '@id': `${url}#pagina`,
      url,
      name: p.name,
      description: p.description,
      inLanguage: 'es-AR',
      isPartOf: { '@id': WEBSITE_ID },
      publisher: { '@id': ORG_ID },
      about: { '@id': `${url}#terapia` },
      audience: { '@type': 'Audience', audienceType: 'Personas con consumo problemático de sustancias y sus familias' },
    },
    {
      '@type': 'MedicalTherapy',
      '@id': `${url}#terapia`,
      name: p.name,
      description: p.description,
      relevantSpecialty: 'Psychiatric',
      provider: { '@id': ORG_ID },
    },
  ];
}

/** Quita etiquetas HTML (para usar textos con <strong> en datos estructurados) */
export function sinHtml(texto: string) {
  return texto.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}
