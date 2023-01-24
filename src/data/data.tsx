import {
	AcademicCapIcon,
	CalendarIcon,
	DownloadIcon,
	FlagIcon,
	MapIcon,
	OfficeBuildingIcon,
	SparklesIcon,
} from '@heroicons/react/outline';

import GithubIcon         from '../components/Icon/GithubIcon';
import InstagramIcon      from '../components/Icon/InstagramIcon';
import LinkedInIcon       from '../components/Icon/LinkedInIcon';
import StackOverflowIcon  from '../components/Icon/StackOverflowIcon';
import TwitterIcon        from '../components/Icon/TwitterIcon';
import heroImage          from '../images/header-background.webp';
import porfolioImage1     from '../images/portfolio/portfolio-1.jpg';
import porfolioImage2     from '../images/portfolio/portfolio-2.jpg';
import porfolioImage3     from '../images/portfolio/portfolio-3.jpg';
import porfolioImage4     from '../images/portfolio/portfolio-4.jpg';
import porfolioImage5     from '../images/portfolio/portfolio-5.jpg';
import porfolioImage6     from '../images/portfolio/portfolio-6.jpg';
import porfolioImage7     from '../images/portfolio/portfolio-7.jpg';
import porfolioImage8     from '../images/portfolio/portfolio-8.jpg';
import porfolioImage9     from '../images/portfolio/portfolio-9.jpg';
import porfolioImage10    from '../images/portfolio/portfolio-10.jpg';
import porfolioImage11    from '../images/portfolio/portfolio-11.jpg';
import profilepic         from '../images/profilepic.jpg';
import testimonialImage   from '../images/testimonial.webp';
import {
	About,
	ContactSection,
	ContactType,
	Hero,
	HomepageMeta,
	PortfolioItem,
	SkillGroup,
	Social,
	TestimonialSection,
	TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
	title       : 'React Resume Template',
	description : "Example site built with Tim Baker's react resume template",
};

/**
 * Section definition
 */
export const SectionId = {
	Hero          : 'hero',
	About         : 'acerca de mi',
	Contact       : 'contacto',
	Portfolio     : 'portfolio',
	Resume        : 'resumen',
	Skills        : 'habilidades',
	Stats         : 'estadísticas',
	Testimonials  : 'testimonios',
} as const;

export type SectionId = typeof SectionId[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
	imageSrc      : heroImage,
	name          : `Kevin Candia Núñez`,
	description   : (
		<>
		<p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
		Soy un ingeniero joven, cada día
		sigo mejorando y progresando,
		nunca paro de aprender
			I'm a Victoria based <strong className="text-stone-100">Full Stack Software Engineer</strong>, currently working
			at <strong className="text-stone-100">Instant Domains</strong> helping build a modern, mobile-first, domain
			registrar and site builder.
		</p>
		<p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
			In my free time time, you can catch me training in <strong className="text-stone-100">Muay Thai</strong>,
			plucking my <strong className="text-stone-100">banjo</strong>, or exploring beautiful{' '}
			<strong className="text-stone-100">Vancouver Island</strong>.
		</p>
		</>
	),
	actions: [
		{
			href      : '/assets/resume.pdf',
			text      : 'Resume',
			primary   : true,
			Icon      : DownloadIcon,
		},
		{
			href      : `#${SectionId.Contact}`,
			text      : 'Contact',
			primary   : false,
		},
	],
};

/**
 * About section
 */
export const aboutData: About = {
	profileImageSrc : profilepic,
	description     : `Use this bio section as your way of describing yourself and saying what you do, what technologies you like
	to use or feel most comfortable with, describing your personality, or whatever else you feel like throwing
	in.`,
	aboutItems: [
		{label: 'Localidad',    text: 'Santiago, Chile',              Icon: MapIcon},
		{label: 'Edad',         text: '27',                           Icon: CalendarIcon},
		{label: 'Nacionalidad', text: 'Chileno',                      Icon: FlagIcon},
		{label: 'Intereses',    text: 'Robótica, Música, Tecnología', Icon: SparklesIcon},
		{label: 'Estudios',     text: 'Universidad Andrés Bello',     Icon: AcademicCapIcon},
		{label: 'Empleo',       text: 'Ingeniero informático, senior, AUI', Icon: OfficeBuildingIcon},
	],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
	{
		name: 'Frontend development',
		skills: [
			{
				name: 'React',
				level: 7,
			},
			{
				name: 'Next',
				level: 6,
			},
			{
				name: 'Angular',
				level: 9,
			},
			{
				name: 'Typescript',
				level: 10,
			},
			{
				name: 'GraphQL',
				level: 5,
			},
			{
				name: 'HTML5',
				level: 9,
			},
			{
				name: 'CSS/SCCS',
				level: 8,
			},
		],
	},
	{
		name: 'Backend development',
		skills: [
			{
				name: 'FastAPI',
				level: 10,
			},
			{
				name: 'SpringBoot',
				level: 7,
			},
			{
				name: 'Python',
				level: 9,
			},
			{
				name: 'Java',
				level: 9,
			},
			{
				name: 'C#',
				level: 6,
			},
		],
	},
	{
		name: 'Bases de Datos',
		skills: [
			{
				name: 'PostgreSQL',
				level: 9,
			},
			{
				name: 'SQL Serve',
				level: 9,
			},
			{
				name: 'Oracle',
				level: 7,
			},
			{
				name: 'My SQL',
				level: 7,
			},
			{
				name: 'MongoDB',
				level: 7,
			}
		],
	},
	{
		name: 'Idiomas hablados',
		skills: [
			{
				name: 'Inglés',
				level: 5,
			}
		],
	},
];


/**
 * Skills section
 */
export const otherSkills: SkillGroup[] = [
	{
		name: "IDE's y Editores",
		skills: [
			{
				name: 'NetBeans',
				level: 10,
			},
			{
				name: 'Eclipse',
				level: 7,
			},
			{
				name: 'Intellij Idea',
				level: 8,
			},
			{
				name: 'Visual Studio Code',
				level: 10,
			},
			{
				name: 'Sublime Text 3',
				level: 10,
			},
		],
	},
	{
		name: 'Otras Herramientas',
		skills: [
			{
				name: 'Atassian',
				level: 10,
			},
			{
				name: 'Bitbucket',
				level: 9,
			},
			{
				name: 'Sourcetree',
				level: 9,
			},
			{
				name: 'Confluence',
				level: 10,
			},
			{
				name: 'Jira',
				level: 10,
			},
			{
				name: 'Fortify',
				level: 8,
			},
			{
				name: 'Fortify',
				level: 8,
			},
		],
	},
	{
		name: 'Bases de Datos',
		skills: [
			{
				name: 'PostgreSQL',
				level: 9,
			},
			{
				name: 'SQL Serve',
				level: 9,
			},
			{
				name: 'Oracle',
				level: 7,
			},
			{
				name: 'My SQL',
				level: 7,
			},
			{
				name: 'MongoDB',
				level: 7,
			},
		],
	},
	{
		name: 'Idiomas hablados',
		skills: [
			{
				name: 'Inglés',
				level: 5,
			},
		],
	},
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Project title 1',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage1,
  },
  {
    title: 'Project title 2',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage2,
  },
  {
    title: 'Project title 3',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage3,
  },
  {
    title: 'Project title 4',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage4,
  },
  {
    title: 'Project title 5',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage5,
  },
  {
    title: 'Project title 6',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage6,
  },
  {
    title: 'Project title 7',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage7,
  },
  {
    title: 'Project title 8',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage8,
  },
  {
    title: 'Project title 9',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage9,
  },
  {
    title: 'Project title 10',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage10,
  },
  {
    title: 'Project title 11',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage11,
  },
];

/**
 * Resume section -- TODO: Standardize resume contact format or offer MDX
 */
export const education: TimelineItem[] = [
  {
    date      : 'April 2007',
    location  : 'Clown college',
    title     : 'Masters in Beer tasting',
    content   : <p>Describe your experience at school, what you learned, what useful skills you have acquired etc.</p>,
  },
  {
    date      : 'March 2003',
    location  : 'School of Business',
    title     : 'What did you study 101',
    content   : <p>Describe your experience at school, what you learned, what useful skills you have acquired etc.</p>,
  },
];

export const experience: TimelineItem[] = [
  {
    date      : 'March 2010 - Present',
    location  : 'Awesome Development Company',
    title     : 'Senior UX Engineer',
    content: (
      <p>
        Describe work, special projects, notable achievements, what technologies you have been working with, and
        anything else that would be useful for an employer to know.
      </p>
    ),
  },
  {
    date      : 'March 2007 - February 2010',
    location  : 'Garage Startup Studio',
    title     : 'Junior bug fixer',
    content   : (
      <p>
        Describe work, special projects, notable achievements, what technologies you have been working with, and
        anything else that would be useful for an employer to know.
      </p>
    ),
  },
];

/**
 * Testimonial section
 */
export const testimonial: TestimonialSection = {
  imageSrc: testimonialImage,
  testimonials: [
    {
      name: 'John Doe',
      text: 'Use this as an opportunity to promote what it is like to work with you. High value testimonials include ones from current or past co-workers, managers, or from happy clients.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/169.jpg',
    },
    {
      name: 'Jane Doe',
      text: 'Here you should write some nice things that someone has said about you. Encourage them to be specific and include important details (notes about a project you were on together, impressive quality produced, etc).',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/14.jpg',
    },
    {
      name: 'Someone else',
      text: 'Add several of these, and keep them as fresh as possible, but be sure to focus on quality testimonials with strong highlights of your skills/work ethic.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/69.jpg',
    },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description: 'Here is a good spot for a message to your readers to let them know how best to reach out to you.',
  items: [
    {
      type: ContactType.Email,
      text: 'reachout@timbaker.me',
      href: 'mailto:reachout@timbaker.me',
    },
    {
      type: ContactType.Location,
      text: 'Victoria BC, Canada',
      href: 'https://www.google.ca/maps/place/Victoria,+BC/@48.4262362,-123.376775,14z',
    },
    {
      type: ContactType.Instagram,
      text: '@tbakerx',
      href: 'https://www.instagram.com/tbakerx/',
    },
    {
      type: ContactType.Github,
      text: 'tbakerx',
      href: 'https://github.com/tbakerx',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github',         Icon: GithubIcon,         href: 'https://github.com/tbakerx'},
  {label: 'Stack Overflow', Icon: StackOverflowIcon,  href: 'https://stackoverflow.com/users/8553186/tim-baker'},
  {label: 'LinkedIn',       Icon: LinkedInIcon,       href: 'https://www.linkedin.com/in/timbakerx/'},
  {label: 'Instagram',      Icon: InstagramIcon,      href: 'https://www.instagram.com/tbakerx/'},
  {label: 'Twitter',        Icon: TwitterIcon,        href: 'https://twitter.com/TimBakerx'},
];
