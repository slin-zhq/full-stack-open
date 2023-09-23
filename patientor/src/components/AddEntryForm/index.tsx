import { TextField, Grid, Button, InputLabel, Select, MenuItem, SelectChangeEvent, Input } from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { Diagnosis, NewEntry, Patient } from "../../types";
import patientService from '../../services/patients';
import axios from 'axios';
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";

const containerStyle = {
	border: '2px solid #000', // Set the border style
	borderRadius: '10px',    // Set border-radius for rounded corners
	padding: '10px',         // Set padding
};

interface Props {
	// onSubmit: (values: NewEntry) => void;
	patients: Patient[];
	setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
	patientID: string;
	setError: React.Dispatch<React.SetStateAction<string | undefined>>;
	diagnoses: Diagnosis[];
}

const AddEntryForm = ({ patients, setPatients, patientID, setError, diagnoses }: Props) => {
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [healthCheckRating, setHealthCheckRating] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
	const [employerName, setEmployerName] = useState('');
	// const [sickLeave, setSickLeave] = useState(''); // to be split on keyword "to"
	const [sickLeaveStart, setSickLeaveStart] = useState('');
	const [sickLeaveEnd, setSickLeaveEnd] = useState('');
	const [dischargeDate, setDischargeDate] = useState('');
	const [dischargeCriteria, setDischargeCriteria] = useState('');

	const [entryType, setEntryType] = useState('HealthCheck');
	// const entryTypes = ["HealthCheck", "Hospital", "OccupationalHealthcare"];
	enum entryTypes {
		Hc = "HealthCheck",
		Hos = "Hospital",
		OHc = "OccupationalHealthcare"
	}

	const addEntry = async (event: SyntheticEvent) => {
		event.preventDefault();
		if (
			(description && date && specialist) && // required fields for all entry types
			(
				(entryType === entryTypes.Hc && healthCheckRating) ||
				(entryType === entryTypes.OHc && employerName) ||
				(entryType === entryTypes.Hos && dischargeDate && dischargeCriteria)
			)
		) {
			let newEntry: NewEntry = {
				description,
				date,
				specialist,
				healthCheckRating: Number(healthCheckRating),
				diagnosisCodes,
				type: entryTypes.Hc
			};
			if (entryType === entryTypes.OHc) {
				newEntry = {
					description,
					date,
					specialist,
					employerName,
					diagnosisCodes,
					type: entryTypes.OHc
				};
				if (sickLeaveStart && sickLeaveEnd) {
					// const [ startDate, endDate ] = sickLeave.split(' - ');
					newEntry.sickLeave = { startDate: sickLeaveStart, endDate: sickLeaveEnd };
				}
			} else if (entryType === entryTypes.Hos) {
				newEntry = {
					description,
					date,
					specialist,
					diagnosisCodes,
					discharge: { date: dischargeDate, criteria: dischargeCriteria },
					type: entryTypes.Hos
				};
			}
			try {
				// onSubmit wasn't used here because I wanted to able to control when the inputs can be cleared
				const updatedPatient = await patientService.addEntry(patientID, newEntry);
				const updatedPatients = patients.map(p => p.id === patientID ? updatedPatient : p);
				setPatients(updatedPatients);
				resetFields();
			} catch (e: unknown) {
				if (axios.isAxiosError(e)) {
					if (e?.response?.data && typeof e?.response?.data === "string") {
						const message = e.response.data.replace('Something went wrong. Error: ', '');
						console.error(message);
						setError(message);
						setTimeout(():void => {
							setError(undefined);
						}, 5000);
					} else {
						setError("Unrecognized axios error");
						setTimeout(():void => {
							setError(undefined);
						}, 5000);
					}
				} else {
					console.error("Unknown error", e);
					setError("Unknown error");
					setTimeout(():void => {
						setError(undefined);
					}, 5000);
				}
			}
		} else {
			setError("All required fields must be filled in.");
			setTimeout(():void => {
				setError(undefined);
			}, 5000);
		}
	};

	const resetFields = (): void => {
		setDescription('');
		setDate('');
		setSpecialist('');
		setHealthCheckRating('');
		setDiagnosisCodes([]);
		setEmployerName('');
		// setSickLeave('');
		setSickLeaveStart('');
		setSickLeaveEnd('');
		setDischargeDate('');
		setDischargeCriteria('');
	};

	const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
		event.preventDefault();
		if ( typeof event.target.value === "string") {
			setEntryType(event.target.value);
		}
	};

	const selectDiagnoses = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
		const {
      target: { value },
    } = event;
		setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value,);
	};

	return (
		<div style={containerStyle}>
			<InputLabel style={{ marginTop: 20 }}>Entry type</InputLabel>
			<Select
				label="Entry Type"
				fullWidth
				value={entryType}
				onChange={onEntryTypeChange}
			>
			{Object.values(entryTypes).map((eT, index) =>
				<MenuItem
					key={index}
					value={eT}
				>
					{eT}
				</MenuItem>
			)}
			</Select>
			{entryType === entryTypes.Hc && <h2>New HealthCheck entry</h2>}
			{entryType === entryTypes.Hos && <h2>New Hospital entry</h2>}
			{entryType === entryTypes.OHc && <h2>New OccupationalHealthcare entry</h2>}
			<form onSubmit={addEntry}>
				<TextField
					label="Description"
					fullWidth
					value={description}
					onChange={({ target }) => setDescription(target.value)}
				/>
				<InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
				<Input
					type="date"
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
				<TextField
					label="Specialist"
					fullWidth
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
				/>
				<InputLabel style={{ marginTop: 20 }}>Diagnosis codes (Optional)</InputLabel>
				{/* <TextField
					label="Diagnosis codes (Optional)"
					fullWidth
					value={diagnosisCodes}
					onChange={({ target }) => setDiagnosisCodes(target.value)}
				/> */}
				<Select
					label="Diagnoses"
					fullWidth
					multiple
					value={diagnosisCodes}
					onChange={selectDiagnoses}
				>
				{diagnoses.map(d => 
					<MenuItem
						key={d.code}
						value={d.code}
					>
						{d.name}
					</MenuItem>
				)}
				</Select>
				{/* <TextField
					label="Healthcheck rating"
					fullWidth
					value={healthCheckRating}
					onChange={({ target }) => setHealthCheckRating(target.value)}
				/> */}
				{entryType === entryTypes.Hc && 
					<HealthCheckEntryForm
						healthCheckRating={healthCheckRating}
						setHealthCheckRating={setHealthCheckRating} 
					/>
				}
				{entryType === entryTypes.Hos &&
					<HospitalEntryForm
						dischargeDate={dischargeDate}
						setDischargeDate={setDischargeDate}
						dischargeCriteria={dischargeCriteria}
						setDischargeCriteria={setDischargeCriteria} 
					/>
				}
				{entryType === entryTypes.OHc &&
					<OccupationalHealthcareEntryForm
						employerName={employerName}
						setEmployerName={setEmployerName}
						sickLeaveStart={sickLeaveStart}
						setSickLeaveStart={setSickLeaveStart}
						sickLeaveEnd={sickLeaveEnd}
						setSickLeaveEnd={setSickLeaveEnd}
					/>
				}
				<Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={resetFields}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
			</form>
		</div>
	);
};

export default AddEntryForm;