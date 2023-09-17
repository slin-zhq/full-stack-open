import { CoursePart } from "../types";
import Part from "./Part";


interface ContentProps {
	courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
	return (
		<div>
			{
				props.courseParts.map((coursePart, index) => (
					<div key={index} >
						<Part part={coursePart} />
						<br/>
					</div>
					)
				)
			}
		</div>
	);
}

export default Content;