import { CoursePart, CoursePartBackground, CoursePartBasic, CoursePartGroup, CoursePartSpecial } from "../types";

interface PartProps {
	part: CoursePart; 
}

// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };

const Part = (props: PartProps) => {
	const part = props.part
	switch(props.part.kind) {
		case "basic": {
			const basicPart = part as CoursePartBasic;
			return (
				<div>
					<strong>{basicPart.name} {basicPart.exerciseCount}</strong>
					<br/>
					<i>{basicPart.description}</i>
				</div>
			)
		}
		case "group": {
			const groupPart = part as CoursePartGroup;
			return (
				<div>
					<strong>{groupPart.name} {groupPart.exerciseCount}</strong>
					<br/>
					project exercises {groupPart.groupProjectCount}
				</div>
			)
		}
		case "background": {
			const backgroundPart = part as CoursePartBackground;
			return (
				<div>
					<strong>{backgroundPart.name} {backgroundPart.exerciseCount}</strong>
					<br/>
					<i>{backgroundPart.description}</i>
					<br/>
					submit to {backgroundPart.backgroundMaterial}
				</div>
			)
		}
		case "special": {
			const specialPart = part as CoursePartSpecial;
			return (
				<div>
					<strong>{specialPart.name} {specialPart.exerciseCount}</strong>
					<br/>
					<i>{specialPart.description}</i>
					<br/>
					required skills: {specialPart.requirements.join(', ')}
				</div>
			)
		}
		default:
			return null;
	}
}

export default Part;