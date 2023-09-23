// import { Diagnosis, Entry, HealthCheckRating, NewEntry, Patient } from "../../types";
import { Diagnosis, Entry, HealthCheckRating, Patient } from "../../types";
// import patientService from '../../services/patients';
// import axios from 'axios';
import { useState } from "react";
import { Alert } from "@mui/material";
import AddEntryForm from "../AddEntryForm";

const HealthCheckEntryDetails = ({ healthCheckRating }: { healthCheckRating: HealthCheckRating }) => {
	let hCR;
	switch (healthCheckRating) {
		case HealthCheckRating.Healthy:
			hCR = (<p style={{ color: 'green'}}>Healthy</p>)
			break;
		case HealthCheckRating.LowRisk:
			hCR = (<p>Low risk</p>)
			break;
		case HealthCheckRating.HighRisk:
			hCR = (<p style={{ color: 'orange'}}>High risk!</p>)
			break;
		default: 
			hCR = (<p style={{ color: 'red'}}>Critical risk!!!</p>)
			break;
	}

	return hCR;
}

interface OHEDProps {
	employerName: string;
	sickLeave?: { startDate: string, endDate: string };
}

const OccupationalHealthcareEntryDetails = 
	({ employerName, sickLeave }: OHEDProps) => {
		return (
			<div>
				<div>employer: {employerName}</div>
				{sickLeave && (<div>sick leave: {sickLeave.startDate} to {sickLeave.endDate}</div>)}
			</div>
		)
}

interface HEDProps {
	discharge: { date: string, criteria: string };
}

const HospitalEntryDetails = ({ discharge }: HEDProps) => {
	return (
		<p>Discharged on {discharge.date} because "{discharge.criteria}"</p>
	)
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
	switch (entry.type) {
		case "Hospital": 
			return (<HospitalEntryDetails discharge={entry.discharge}/>)
		case "OccupationalHealthcare":
			return (<OccupationalHealthcareEntryDetails employerName={entry.employerName} sickLeave={entry.sickLeave}/>)
		case "HealthCheck":
			return (<HealthCheckEntryDetails healthCheckRating={entry.healthCheckRating} />)
		default:
			return assertNever(entry);
	}
};

const containerStyle = {
	border: '2px solid #000', // Set the border style
	borderRadius: '10px',    // Set border-radius for rounded corners
	padding: '10px',         // Set padding
};

interface Props {
	patient: Patient | undefined;
	patients: Patient[];
	setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
	diagnoses: Diagnosis[];
}

const PatientDetailsPage = ({ patient, diagnoses, patients, setPatients }: Props) => {
	const [error, setError] = useState<string>();
	
	if (!patient) return null;

	const {
		id,  
		name, 
		gender,
		dateOfBirth,
		ssn,
		occupation,
		entries,
	} = patient;

	// const submitNewEntry = async (values: NewEntry) => {
	// 	try {
	// 		const updatedPatient = await patientService.addEntry(id, values);
	// 		const updatedPatients = patients.map(p => p.id === id ? updatedPatient : p);
	// 		setPatients(updatedPatients);
	// 	} catch (e: unknown) {
  //     if (axios.isAxiosError(e)) {
  //       if (e?.response?.data && typeof e?.response?.data === "string") {
  //         const message = e.response.data.replace('Something went wrong. Error: ', '');
  //         console.error(message);
  //         setError(message);
	// 				setTimeout(():void => {
	// 					setError(undefined);
	// 				}, 5000);
  //       } else {
  //         setError("Unrecognized axios error");
	// 				setTimeout(():void => {
	// 					setError(undefined);
	// 				}, 5000);
  //       }
  //     } else {
  //       console.error("Unknown error", e);
  //       setError("Unknown error");
	// 			setTimeout(():void => {
	// 				setError(undefined);
	// 			}, 5000);
  //     }
	// 	}
	// };

	const entryDiagnoses = entries.map(ent => {
			return {
				id: ent.id,
				diagnosisCodes: ent.diagnosisCodes ? ent.diagnosisCodes.map(dC => {
					const diagnosis = diagnoses.find(d => d.code === dC);
					return diagnosis;
				})
				: [],
			}
		}
	);

	return (
		<div>
			<h2>{name}</h2>
			<div>gender: {gender}</div>
			<div>dateOfBirth: {dateOfBirth}</div>
			<div>ssn: {ssn}</div>
			<div>occupation: {occupation}</div>
			{error && <Alert severity="error">{error}</Alert>}
			<AddEntryForm 
				// onSubmit={submitNewEntry}
				patients={patients}
				setPatients={setPatients}
				patientID={id}
				setError={setError}
			/>
			<h3>entries</h3>
			{entries.map((entry) => {
				const { id, date, description, specialist } = entry;

				return (
					<div key={id} style={containerStyle}>
						<p>[{date}] {description}</p>
						<ul>
							{/* {diagnosisCodes && diagnosisCodes.map((diagnosis, index) => {
									return diagnosis ? (
										<li key={index}>{diagnosis.code}: {diagnosis.name}</li>
									) : null;
								}
							)} */}

							{entryDiagnoses.find(eD => eD.id === id)?.diagnosisCodes
								.map((diagnosis, index) => {
										return diagnosis ? (
											<li key={index}>{diagnosis.code}: {diagnosis.name}</li>
										) : null;
									}
								)
							}
						</ul>
						<EntryDetails entry={entry}/>
						<div>diagnosed by {specialist}</div>
					</div>
				)
			})}
		</div>
	)
};

export default PatientDetailsPage;