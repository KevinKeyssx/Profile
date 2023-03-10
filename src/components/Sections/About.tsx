import classNames 				from 'classnames';
import Image 					from 'next/image';
import {FC, memo} 				from 'react';

import {SectionId} 	from '../../data/data';
import {aboutData} 	from '../../data/handleData';
import {ILov} 		from '../../data/lov.interface';
import Section 		from '../Layout/Section';

const About: FC = memo((dataChildren) => {

	const {children} = dataChildren;
	const {profileImageSrc, description, aboutItems} = aboutData( children as ILov[] );

	return (
		<Section className="bg-gradient-to-r from-cyan-700 via-sye-800 to-sky-600" sectionId={SectionId.About}>
			<div className={classNames('grid grid-cols-1 gap-y-4', {'md:grid-cols-4': !!profileImageSrc})}>
				{!!profileImageSrc && (
				<div className="col-span-1 flex justify-center md:justify-start">
					<div className="relative h-34 w-34 overflow-hidden rounded-xl md:h-60 md:w-52">
						<Image
							alt     = "about-me-image"
							height  = '200'
							src     = {profileImageSrc}
							width   = '150'
						/>
					</div>
				</div>
				)}

				<div className={classNames('col-span-1 flex flex-col gap-y-6', {'md:col-span-3': !!profileImageSrc})}>
					<div className="flex flex-col gap-y-2">
						<h2 className="text-2xl font-bold text-white">Acerca de mi</h2>
						<p className="prose prose-sm text-gray-300 sm:prose-base">{description}</p>
					</div>

					<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{aboutItems.map(({label, text, Icon}, idx) => (
						<li className="col-span-1 flex  items-start gap-x-2" key={idx}>
							{Icon && <Icon className="h-5 w-5 text-white" />}
							<span className="text-sm font-bold text-white">{label}:</span>
							<span className=" text-sm text-gray-300">{text}</span>
						</li>
						))}
					</ul>
				</div>
			</div>
		</Section>
	);
});

About.displayName = 'About';
export default About;
