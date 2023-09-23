import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetailsPage from "./components/PatientDetailsPage";
import diagnosisService from './services/diagnoses';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    void fetchPatientList();

		const fetchDiagnosisList = async () => {
			const diagnoses = await diagnosisService.getAll();
			setDiagnoses(diagnoses);
		};

		void fetchDiagnosisList();
  }, []);


	const patientById = (id: string | undefined): Patient | undefined =>
		patients.find(p => p.id === id); 

	const patientMatch = useMatch('/patients/:id')

	const patient = patientMatch ? patientById(patientMatch.params.id) : undefined
  
  return (
    <div className="App">
			<Container>
				<Typography variant="h3" style={{ marginBottom: "0.5em" }}>
					Patientor
				</Typography>
				<Button component={Link} to="/" variant="contained" color="primary">
					Home
				</Button>
				<Divider hidden />
				<Routes>
					<Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
					<Route path="/patients/:id" element={<PatientDetailsPage patient={patient} diagnoses={diagnoses} patients={patients} setPatients={setPatients}/>} />
				</Routes>
			</Container>
    </div>
  );
};

export default App;
