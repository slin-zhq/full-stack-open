import { TextField, InputLabel, Input } from "@mui/material";

interface Props {
	dischargeDate: string;
	setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
	dischargeCriteria: string;
	setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalEntryForm = ({
	dischargeDate, 
	setDischargeDate,
	dischargeCriteria,
	setDischargeCriteria
}: Props) => {
	return (
		<div>
			<InputLabel style={{ marginTop: 20 }}>Discharge date</InputLabel>
			<Input
				type="date"
				value={dischargeDate}
				onChange={({ target }) => setDischargeDate(target.value)}
			/>
			{/* <TextField
				label="Discharge date"
				placeholder="YYYY-MM-DD"
				fullWidth
				value={dischargeDate}
				onChange={({ target }) => setDischargeDate(target.value)}
			/> */}
			<TextField
				label="Discharge criteria"
				fullWidth
				value={dischargeCriteria}
				onChange={({ target }) => setDischargeCriteria(target.value)}
			/>
		</div>
	);
};

export default HospitalEntryForm;