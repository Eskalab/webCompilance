// Sectores económicos empresariales de Colombia.
// Agrupados a partir de las 21 secciones de la CIIU Rev. 4 A.C. (DANE),
// simplificados a categorías reconocibles para un formulario de leads B2B.
export interface Sector {
  value: string;
  es: string;
  en: string;
}

export const SECTORS: Sector[] = [
  { value: 'agro',            es: 'Agricultura, ganadería y pesca',          en: 'Agriculture, livestock & fishing' },
  { value: 'mineria-energia', es: 'Minería y energía',                       en: 'Mining & energy' },
  { value: 'manufactura',     es: 'Industria manufacturera',                 en: 'Manufacturing' },
  { value: 'construccion',    es: 'Construcción',                            en: 'Construction' },
  { value: 'comercio',        es: 'Comercio (mayorista y minorista)',        en: 'Wholesale & retail trade' },
  { value: 'transporte',      es: 'Transporte y logística',                  en: 'Transport & logistics' },
  { value: 'turismo',         es: 'Turismo, hotelería y restaurantes',       en: 'Tourism, hospitality & restaurants' },
  { value: 'tic',             es: 'Tecnología y comunicaciones (TIC)',       en: 'Technology & communications (ICT)' },
  { value: 'financiero',      es: 'Servicios financieros y seguros',         en: 'Financial services & insurance' },
  { value: 'inmobiliario',    es: 'Inmobiliario',                            en: 'Real estate' },
  { value: 'servicios-prof',  es: 'Servicios profesionales y consultoría',   en: 'Professional services & consulting' },
  { value: 'salud',           es: 'Salud',                                   en: 'Health' },
  { value: 'educacion',       es: 'Educación',                               en: 'Education' },
  { value: 'sector-publico',  es: 'Sector público / gobierno',               en: 'Public sector / government' },
  { value: 'arte-medios',     es: 'Arte, entretenimiento y medios',          en: 'Arts, entertainment & media' },
  { value: 'otros',           es: 'Otros servicios',                         en: 'Other services' },
];
