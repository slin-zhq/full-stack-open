import patientData from '../../data/patients';
import { NewPatient, Patient, PatientDataWithoutSSN } from '../types';
import { v1 as uuid } from 'uuid';

const getAll = (): Patient[] => {
	return patientData;
};

const getPatientDataWithoutSSN = (): PatientDataWithoutSSN[] => {
	return patientData.map(({
		id, name, dateOfBirth, gender, occupation
	}) => ({
		id, name, dateOfBirth, gender, occupation
	}));
};

const addPatient = ( newP: NewPatient ): Patient => {
	const newPatient = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
		id: uuid(),
		...newP
	};

	patientData.push(newPatient);
	return newPatient;
};

export default {
	getAll,
	getPatientDataWithoutSSN,
	addPatient
};