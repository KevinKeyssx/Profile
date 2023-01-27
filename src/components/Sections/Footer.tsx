import {ChevronUpIcon}  from '@heroicons/react/outline';
import Link             from 'next/link';
import {FC, memo}       from 'react';

import {SectionId}      from '../../data/data';
import {ILov} 			from '../../data/lov.interface';
import Socials          from '../Socials';

const Footer: FC = memo((dataChildren) => {

	const {children} = dataChildren;

	return (
		<div className="relative bg-neutral-900 px-4 pb-6 pt-12 sm:px-8 sm:pt-14 sm:pb-8">
			<div className="absolute inset-x-0 -top-4 flex justify-center sm:-top-6">
				<Link
					className="rounded-full bg-neutral-100 p-1 ring-white ring-offset-2 ring-offset-gray-700/80 focus:outline-none focus:ring-2 sm:p-2"
					href={`/#${SectionId.Hero}`}>
					<ChevronUpIcon className="h-6 w-6 bg-transparent sm:h-8 sm:w-8" />
				</Link>
			</div>

			<div className="flex flex-col items-center gap-y-6">
				<div className="flex gap-x-4 text-neutral-200">
					<Socials children = {children as ILov[] }/>
				</div>
				<span className="text-sm text-neutral-100">© Copyright {new Date().getFullYear()} KevinKeyssx</span>
			</div>
		</div>
	)
});

Footer.displayName = 'Footer';
export default Footer;
