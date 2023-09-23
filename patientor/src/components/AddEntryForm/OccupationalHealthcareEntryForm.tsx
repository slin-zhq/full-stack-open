import { TextField } from "@mui/material";

interface Props {
	employerName: string;
	setEmployerName: React.Dispatch<React.SetStateAction<string>>;
	sickLeave: string;
	setSickLeave: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthcareEntryForm = ({
	employerName, 
	setEmployerName,
	sickLeave,
	setSickLeave
}: Props) => {
	return (
		<div>
			<TextField
				label="Employer name"
				fullWidth
				value={employerName}
				onChange={({ target }) => setEmployerName(target.value)}
			/>
			<TextField
				label="Sick leave period (Optional)"
				placeholder="YYYY-MM-DD - YYYY-MM-DD"
				fullWidth
				value={sickLeave}
				onChange={({ target }) => setSickLeave(target.value)}
			/>
		</div>
	);
};

export default OccupationalHealthcareEntryForm;