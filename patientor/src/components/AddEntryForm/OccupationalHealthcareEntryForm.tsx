import { TextField, InputLabel, Input } from "@mui/material";

interface Props {
	employerName: string;
	setEmployerName: React.Dispatch<React.SetStateAction<string>>;
	sickLeaveStart: string;
	setSickLeaveStart: React.Dispatch<React.SetStateAction<string>>;
	sickLeaveEnd: string;
	setSickLeaveEnd: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthcareEntryForm = ({
	employerName, 
	setEmployerName,
	sickLeaveStart,
	setSickLeaveStart,
	sickLeaveEnd,
	setSickLeaveEnd
}: Props) => {
	return (
		<div>
			<TextField
				label="Employer name"
				fullWidth
				value={employerName}
				onChange={({ target }) => setEmployerName(target.value)}
			/>
			<InputLabel style={{ marginTop: 20 }}>Sick leave start</InputLabel>
			<Input
				type="date"
				value={sickLeaveStart}
				onChange={({ target }) => setSickLeaveStart(target.value)}
			/>
			<InputLabel style={{ marginTop: 20 }}>Sick leave end</InputLabel>
			<Input
				type="date"
				value={sickLeaveEnd}
				onChange={({ target }) => setSickLeaveEnd(target.value)}
			/>
			{/* <TextField
				label="Sick leave period (Optional)"
				placeholder="YYYY-MM-DD - YYYY-MM-DD"
				fullWidth
				value={sickLeave}
				onChange={({ target }) => setSickLeave(target.value)}
			/> */}
		</div>
	);
};

export default OccupationalHealthcareEntryForm;