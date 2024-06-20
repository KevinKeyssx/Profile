/**
 * Section definition
 */
export const SectionId = {
	Hero          : 'kevin',
	About         : 'kevin',
	Portfolio     : 'portafolio',
	Resume        : 'resumen',
	Skills        : 'habilidades',
	Stats         : 'estadísticas',
	// Testimonials  : 'testimonios',
} as const;

// eslint-disable-next-line no-redeclare
export type SectionId = typeof SectionId[keyof typeof SectionId];
