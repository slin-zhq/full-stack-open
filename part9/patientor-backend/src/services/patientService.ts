import patientData from '../../data/patients-full';
import { NewPatient, Patient, NonSensitivePatient, NewEntry } from '../types';
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

const updatePatient = ( pToUpdate: Patient ) => {
	for (let i = 0; i < patientData.length; i++) {
		if (patientData[i].id === pToUpdate.id) {
			patientData[i] = pToUpdate;
		}
	}
};

const addEntry = (patientID: string, newE: NewEntry): Patient | undefined => {
	const patient = patientData.find(p => p.id === patientID);
	patient?.entries.push({ id: uuid(), ...newE});
	return patient;
};

export default {
	getAll,
	getNonSensitivePatientData,
	findById,
	addPatient,
	updatePatient,
	addEntry
};