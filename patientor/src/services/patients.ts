import axios from "axios";
import { Patient, NewPatient, NewEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: NewPatient) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (patientID: string, object: NewEntry) => {
	const { data } = await axios.post<Patient>(
		`${apiBaseUrl}/patients/${patientID}/entries`,
		object
	);

	return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, addEntry
};

