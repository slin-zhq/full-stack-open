import { TextField } from "@mui/material";

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
			<TextField
				label="Discharge date"
				placeholder="YYYY-MM-DD"
				fullWidth
				value={dischargeDate}
				onChange={({ target }) => setDischargeDate(target.value)}
			/>
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