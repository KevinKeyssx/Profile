import {
	AcademicCapIcon,
	CalendarIcon,
	DownloadIcon,
	FlagIcon,
	MapIcon,
	OfficeBuildingIcon,
	SparklesIcon,
} from '@heroicons/react/outline';

import GithubIcon           from '../components/Icon/GithubIcon';
import InstagramIcon        from '../components/Icon/InstagramIcon';
import LinkedInIcon         from '../components/Icon/LinkedInIcon';
import StackOverflowIcon    from '../components/Icon/StackOverflowIcon';
import TwitterIcon          from '../components/Icon/TwitterIcon';
import heroImage            from '../images/header-background.webp';
import {About, AboutItem, Hero, PortfolioItem, SkillGroup, Social, TimelineItem}       from "./dataDef";
import {ILov, ILovval} 		from "./lov.interface";

/**
 * Hero section
 */
export const heroData = ( data: ILov[] ) => {

    return {
        imageSrc      : heroImage,
        name          : filterLovVals(data, 'About', 'Title'),
        description   : (
            <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
                { filterLovVals(data, 'About', 'Description') }
            </p>
        ),
        actions: [
            {
                href      : '/assets/resume.pdf',
                text      : 'Resume',
                primary   : true,
                Icon      : DownloadIcon,
            }
        ],
    } as Hero;

}

/**
 * Social items
 */
export const socialLinks = ( data: ILov[] ): Social[] => {

    return [
        {label: 'Github',         Icon: GithubIcon,         href: filterLovVals(data, 'About', 'GitHub')},
        {label: 'Stack Overflow', Icon: StackOverflowIcon,  href: filterLovVals(data, 'About', 'StackOverflow')},
        {label: 'LinkedIn',       Icon: LinkedInIcon,       href: filterLovVals(data, 'About', 'Linkedin')},
        {label: 'Instagram',      Icon: InstagramIcon,      href: filterLovVals(data, 'About', 'Instagram')},
        {label: 'Twitter',        Icon: TwitterIcon,        href: filterLovVals(data, 'About', 'Twitter')},
    ];

}

/**
 * About section
 */
export const aboutData = ( data: ILov[] ): About => {

    const icons = [
        AcademicCapIcon,
        CalendarIcon,
        SparklesIcon,
        OfficeBuildingIcon,
        FlagIcon,
        MapIcon,
    ]

    const aboutItems = handleItems(data, 'About', 'true', icons)  as AboutItem[]

	return { 
        profileImageSrc : filterLovVals(data, 'About', 'ImgAbout'),
        description     : filterLovVals(data, 'About', 'AboutMe'),
        aboutItems
    }

};

/**
 * Get formation information
 */
export const getFormation = ( data: ILov[], type: string ): TimelineItem[] => {

    const formations = filterLovValsS(data, type);

    return formations.map( formation => ({
        date        : formation.skill.date,
        location    : formation.skill.location,
        title       : formation.description,
        content     : <p>{formation.comment}</p>
    } as TimelineItem));

}

/**
 * Skills section
 */
export const getSkills = ( data: ILov[], type: string ): SkillGroup[] => {

    const skillFilters  = filterLovValsS(data, type);
    const skillSet      = [ ...new Set( skillFilters.map( skill => ( skill.skill.type ) ))];

    return skillFilters.map( (_, index) =>({
        name    : skillSet[index],
        skills  : skillFilters
            .filter( filter => filter.skill.type === skillSet[index] )
            .map( skill => ({
                name: skill.description,
                level: Number(skill.comment)
            }))
    }))
    .filter( group => group.name );

}

/**
 * Portfolio section
 */
export const portfolioItems = (data: ILov[] ): PortfolioItem[] =>{

	return filterLovValsS( data, 'Portfolio' )
	.map( portfolio => ({
		title			: portfolio.description,
		description		: portfolio.comment,
		url				: portfolio.skill.url,
		image			: portfolio.skill.img
	}) );

}

export const getCertificates = ( data: ILov[] ) => {
	return filterLovValsS(data, 'Certificates')
	.map( certificate =>( certificate.description ));
}

export const filterLovVals = (
    data        : ILov[],
    name        : string,
    description : string
): string => 
    data
    ?.find( lov => lov.description === name)
    ?.lov_vals
    .find( val => val.description === description )
    ?.comment ?? '';

export const filterLovValsS = (
    data        : ILov[],
    name        : string,
): ILovval[] =>
    data
    ?.find( lov => lov.description === name)
    ?.lov_vals ?? [];


const handleItems = ( data : ILov[], name : string, description : string, icons: unknown[]
): unknown => {
    const items = data
    ?.find( lov => lov.description === name)
    ?.lov_vals
    .filter( val => val.skill.filter === description )

    return items?.map( (item, index) => ({
        label   : item.description,
        text    : item.comment,
        Icon    : icons[index]
    })) ?? [];
}
