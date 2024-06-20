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

export type SectionIdType = typeof SectionId[keyof typeof SectionId];
