import {
	AcademicCapIcon,
	CalendarIcon,
    DeviceMobileIcon,
	DownloadIcon,
	FlagIcon,
	MapIcon,
	OfficeBuildingIcon,
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
        DeviceMobileIcon,
        OfficeBuildingIcon,
        FlagIcon,
        MapIcon,
        CalendarIcon,
    ]

    const aboutItems = handleItems(data, 'About', 'true', icons) as AboutItem[];

	return { 
        // profileImageSrc : filterLovVals(data, 'About', 'ImgAbout'),
        profileImageSrc : '/me.jpg',
        description     : filterLovVals(data, 'About', 'AboutMe'),
        aboutItems
    }

};

/**
 * Get formation information
 */
export const getFormation = ( data: ILov[], type: string ): TimelineItem[] => {

    return filterLovValsS(data, type)
    .sort((a: ILovval, b: ILovval) => 
        a.skill.sort - b.skill.sort
    )
    .map( formation => ({
        date        : formation.skill.date,
        location    : formation.skill.location,
        title       : formation.description,
        content     : <p>{formation.comment}</p>,
        tools       : formation.skill.tools
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
    .sort((a: ILovval, b: ILovval) => 
        a.skill.sort - b.skill.sort
    )

    return items?.map( (item, index) => ({
        label   : item.description,
        text    : item.skill.date === 'true' ? getAge( item.comment ) : item.comment,
        Icon    : icons[index]
    })) ?? [];
}

const getAge = ( birth: string ): string => {
    const birthday  = new Date( birth.split( '/' ).reverse().join( '-' ) );
    const ageDifMs  = Date.now() - birthday.getTime();
    const ageDate   = new Date( ageDifMs );
    return Math.abs( ageDate.getUTCFullYear() - 1970 ).toString();
}