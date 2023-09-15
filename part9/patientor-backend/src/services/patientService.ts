import patientData from '../../data/patients';
import { Patient, PatientDataWithoutSSN } from '../types';

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

export default {
	getAll,
	getPatientDataWithoutSSN
};