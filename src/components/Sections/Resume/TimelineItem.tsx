import {FC, memo} from 'react';

import {TimelineItem} from '../../../data/dataDef';

const TimelineItem: FC<{item: TimelineItem}> = memo(({item}) => {
	const {title, date, location, content, tools} = item;
	return (
		<div className="flex flex-col pb-8 text-center last:pb-0 md:text-left">
			<div className="flex flex-col pb-4">
				<h2 className="text-xl text-cyan-700 font-bold">{title}</h2>
				<div className="flex items-center justify-center gap-x-2 md:justify-start">
					<span className="flex-1 text-yellow-900 text-sm font-medium italic sm:flex-none">{location}</span>
					<span>•</span>
					<span className="flex-1 text-yellow-900 text-sm sm:flex-none">{date}</span>
				</div>
			</div>
			{content}
			{tools?.map( (_, index) => {
				return index === 1 ? <p className='text-xs font-semibold mt-2 mb-2'>Herramientas:</p> : null
			})}
			<div className="space-x-2">
				{tools?.map( tool => (
					<span className="text-xs inline-block py-1 px-2.5 text-center whitespace-nowrap align-baseline font-bold bg-cyan-500 text-white rounded-full">
						<div className="flex items-center text-white">
							<img
								alt			= "cert"
								className	= 'mr-1'
								src			= "tool.svg"
								width		= '17'
							/>
							{tool}
						</div>
					</span>
				))}
			</div>
		</div>
	);
});

TimelineItem.displayName = 'TimelineItem';
export default TimelineItem;
