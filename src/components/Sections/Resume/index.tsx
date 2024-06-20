import {FC, memo} from 'react';

import {getCertificates,getFormation, getSkills} 	from '../../../data/handleData';
import {ILov} 			from '../../../data/lov.interface';
import Section        	from '../../Layout/Section';
import ResumeSection  	from './ResumeSection';
import {SkillGroup}   	from './Skills';
import TimelineItem   	from './TimelineItem';

const Resume: FC = memo((dataChildren) => {

	const {children} = dataChildren;

	return (
		<Section className="bg-neutral-100">
			<div className="flex flex-col divide-y-2 divide-neutral-300">
				{/* Eduación */}
				<ResumeSection title="Educación">
					{getFormation( children as ILov[], 'Education' ).map((item, index) => (
						<TimelineItem item={item} key={`${item.title}-${index}`} />
					))}
				</ResumeSection>
				{/* Trabajo */}
				<ResumeSection title="Trabajos">
					{getFormation( children as ILov[], 'Employement' ).map((item, index) => (
						<TimelineItem item={item} key={`${item.title}-${index}`} />
					))}
				</ResumeSection>
				{/* Habilidades */}
				<ResumeSection title="Habilidades">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{getSkills( children as ILov[], 'Skills' ).map((skillgroup, index) => (
							<SkillGroup
								key			= {`${skillgroup.name}-${index}`}
								skillGroup	= {skillgroup}
							/>
						))}
					</div>
				</ResumeSection>
				{/* Otras Habilidades */}
				<ResumeSection title="Otras Habilidades">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{getSkills( children as ILov[], 'OtherSkills' ).map((skillgroup, index) => (
							<SkillGroup
								key			= {`${skillgroup.name}-${index}`}
								skillGroup	= {skillgroup}
							/>
						))}
					</div>
				</ResumeSection>
				{/* Certificados */}
				<ResumeSection title="Certificados">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-1">
						<div className="space-x-2">
							{getCertificates( children as ILov[] ).map( certificate => (
								<span className="text-xs inline-block py-1 px-2.5 text-center whitespace-nowrap align-baseline font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full">

								<div className="flex items-center text-white">
									<img
										alt			= "cert"
										className	= 'mr-1'
										src			= "cert.svg"
										width		= '17'
									/>
									<span>
										{certificate}
									</span>
								</div>
							</span>))}
						</div>
					</div>
				</ResumeSection>
			</div>
		</Section>
	);
});

Resume.displayName = 'Resume';
export default Resume;
