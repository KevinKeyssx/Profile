import {FC, memo} from 'react';

import {education, experience, otherSkills, SectionId, skills} from '../../../data/data';
import Section        from '../../Layout/Section';
import ResumeSection  from './ResumeSection';
import {SkillGroup}   from './Skills';
import TimelineItem   from './TimelineItem';

const Resume: FC = memo(() => {
	return (
		<Section className="bg-neutral-100" sectionId={SectionId.Resume}>
			<div className="flex flex-col divide-y-2 divide-neutral-300">
				{/* Eduación */}
				<ResumeSection title="Educación">
					{education.map((item, index) => (
						<TimelineItem item={item} key={`${item.title}-${index}`} />
					))}
				</ResumeSection>
				{/* Trabajo */}
				<ResumeSection title="Trabajos">
					{experience.map((item, index) => (
						<TimelineItem item={item} key={`${item.title}-${index}`} />
					))}
				</ResumeSection>
				{/* Habilidades */}
				<ResumeSection title="Habilidades">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{skills.map((skillgroup, index) => (
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
						{otherSkills.map((skillgroup, index) => (
							<SkillGroup
								key			= {`${skillgroup.name}-${index}`}
								skillGroup	= {skillgroup}
							/>
						))}
					</div>
				</ResumeSection>
				{/* Certificados */}
				<ResumeSection title="Certificados">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{skills.map((skillgroup, index) => (
							<SkillGroup
								key			= { `${skillgroup.name}-${index}` }
								skillGroup	= { skillgroup }
							/>
						))}
					</div>
				</ResumeSection>
			</div>
		</Section>
	);
});

Resume.displayName = 'Resume';
export default Resume;
