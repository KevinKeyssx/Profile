
import {ChevronDownIcon}  	from '@heroicons/react/outline';
import classNames 			from 'classnames';
import Image              	from 'next/image';
import Link               	from 'next/link';
import {FC, memo}         	from 'react';

import {SectionId}    			from '../../data/data';
import {aboutData, heroData}    from '../../data/handleData';
import {ILov}         			from '../../data/lov.interface';
import Section        			from '../Layout/Section';
import Socials        			from '../Socials';

const Hero: FC = memo((dataChildren) => {

	const {children} 					= dataChildren;
	const {imageSrc, name, description} = heroData( children as ILov[] );
	const {profileImageSrc, aboutItems} = aboutData( children as ILov[] );

	return (
		<Section noPadding sectionId={SectionId.Hero}>
			<div className="relative flex h-screen w-screen items-center justify-center">
				<Image
					alt         = { `${name}-image` }
					className   = "absolute z-0"
					layout      = 'fill'
					objectFit   = 'cover'
					placeholder = "blur"
					priority
					src         = { imageSrc }
				/>

				<div className="z-10  max-w-screen-lg px-4 lg:px-0">
					<div className="flex flex-col items-center gap-y-6 rounded-xl bg-gray-800/40 p-10 pb-px text-center shadow-lg backdrop-blur-sm">
						<h1 className="text-4xl font-bold text-white sm:text-4xl lg:text-6xl">{name}</h1>
						{description}

						<div className={classNames('grid grid-cols-1 gap-y-4', {'md:grid-cols-4': !!profileImageSrc})}>
							{!!profileImageSrc && (
								<div className="col-span-1 flex justify-center md:justify-start">
									<div className="relative h-34 w-34 overflow-hidden rounded-xl md:h-60 md:w-52">
										<Image
											alt     = "me-image"
											height  = '200'
											src     = {profileImageSrc}
											width   = '150'
										/>
									</div>
								</div>
							)}

							<div className={classNames('col-span-1 flex flex-col gap-y-6', {'md:col-span-3': !!profileImageSrc})}>
								<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									{aboutItems.map(({label, text, Icon}, idx) => (
									<li className="col-span-1 flex  items-start gap-x-2" key={idx}>
										{Icon && <Icon className="h-5 w-5 text-white" />}
										<span className="text-sm font-bold text-white">{label}:</span>
										<span className=" text-sm text-gray-300">{text}</span>
									</li>
								))}
								</ul>
								<div className="flex place-content-center gap-x-4 text-neutral-100">
									<Socials children={children as ILov[]}/>
								</div>
							</div>
						</div>

						{/* Botón de descarga */}
						{/* <div className="flex w-full justify-center gap-x-4">
						{actions.map(({href, text, primary, Icon}) => (
							<Link
							className={classNames(
								'flex gap-x-2 rounded-full border-2 bg-none py-2 px-4 text-sm font-medium text-white ring-offset-gray-700/80 hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-base',
								primary ? 'border-orange-500 ring-orange-500' : 'border-white ring-white',
							)}
							href={href}
							key={text}>
							{text}
							{Icon && <Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />}
							</Link>
						))}
						</div> */}
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
