import patientData from '../../data/patients-full';
import { NewPatient, Patient, NonSensitivePatient } from '../types';
import { v1 as uuid } from 'uuid';

const getAll = (): Patient[] => {
	return patientData;
};

const getNonSensitivePatientData = (): NonSensitivePatient[] => {
	return patientData.map(({
		id, name, dateOfBirth, gender, occupation
	}) => ({
		id, name, dateOfBirth, gender, occupation
	}));
};

const findById = (id: string): Patient | undefined => {
	const patient = patientData.find(p => p.id === id);
	return patient;
	// if (patient) {
	// 	return {
	// 		...patient,
	// 		entries: [],
	// 	};
	// } else {
	// 	return undefined;
	// }
};

const addPatient = ( newP: NewPatient ): Patient => {
	const newPatient = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
		id: uuid(),
		...newP,
		entries: [],
	};

	patientData.push(newPatient);
	return newPatient;
};

export default {
	getAll,
	getNonSensitivePatientData,
	findById,
	addPatient
};