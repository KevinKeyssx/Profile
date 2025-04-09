
import {ChevronDownIcon}  	from '@heroicons/react/outline';
import Image              	from 'next/image';
import Link               	from 'next/link';
import {FC, memo}         	from 'react';

import {SectionId} 				from '../../data/data';
import {aboutData, heroData}    from '../../data/handleData';
import {ILov}         			from '../../data/lov.interface';
import Section        			from '../Layout/Section';
import Socials        			from '../Socials';
import CVDownloader             from './Resume/Buttons/CVDownloader';

const Hero: FC = memo((dataChildren) => {
	const {children} 					= dataChildren;
	const {imageSrc, name, description} = heroData( children as ILov[] );
	const {profileImageSrc, aboutItems} = aboutData( children as ILov[] );

	return (
		<Section noPadding sectionId={SectionId.Hero}>
			<div className="relative flex h-screen w-auto items-center justify-center">
				<Image
					alt         = { `${name}-image` }
					className   = "absolute z-0"
					layout      = 'fill'
                    id          = "heroBackgroundImage"
					objectFit   = 'cover'
					placeholder = "blur"
					priority
					src         = { imageSrc }
				/>

				<div className="z-10  max-w-screen-lg px-4 lg:px-0">
					<div className="flex flex-col items-center gap-y-6 rounded-xl bg-gray-800/40 p-10 pb-px  shadow-lg backdrop-blur-sm">
						<h1 className="text-4xl font-bold text-amber-600 sm:text-4xl lg:text-5xl">
							{name}
						</h1>

						{description}

						<div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-4">
							{!!profileImageSrc && (
								<div className="flex justify-center md:justify-start">
									<div className="relative h-34 w-34 overflow-hidden md:h-60 md:w-52">
										<Image
											alt			= "me-image"
											className	= "rounded-xl"
											height		= "200"
											src			= {profileImageSrc}
											width		= "150"
										/>
									</div>
								</div>
							)}

							<div className="flex flex-col gap-y-6 md:w-3/4">
								<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{aboutItems.map(({label, text, Icon}, idx) => (
									<li className="col-span-1 flex items-start gap-x-2" key={idx}>
										{Icon && <Icon className="h-5 w-5 text-white" />}

										<span className="text-sm font-bold text-white">{label}:</span>

										<span className="text-sm text-gray-300">{text}</span>
									</li>
								))}
								</ul>

								<div className="flex justify-center gap-x-4 text-neutral-100">
									<Socials children={children as ILov[]} />
								</div>

                                <CVDownloader/>
							</div>
						</div>
					</div>
				</div>

				<div className="absolute inset-x-0 bottom-6 flex justify-center">
					<Link
						className="rounded-full bg-white p-1 ring-white ring-offset-2 ring-offset-gray-700/80 focus:outline-none focus:ring-2 sm:p-2"
						href={`/#${SectionId.Resume}`}>
						<ChevronDownIcon className="h-5 w-5 bg-transparent sm:h-6 sm:w-6" />
					</Link>
				</div>
			</div>
		</Section>
	);
});

Hero.displayName = 'Hero';
export default Hero;
