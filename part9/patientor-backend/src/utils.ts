import { Diagnosis, Entry, Gender, HealthCheckRating, NewEntry, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
	if (!isString(name)) {
		throw new Error('Incorrect or missing name');
	}
	return name;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
	if (!isString(date) || !isDate(date)) {
		throw new Error('Incorrect date: ' + date);
	}
	return date;
};

const parseSSN = (ssn: unknown): string => {
	if (!isString(ssn)) {
		throw new Error('Incorrect or missing ssn');
	}
	return ssn;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect gender: ' + gender);
	}
	return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if ('name' in object &&
		'dateOfBirth' in object &&
		'ssn' in object &&
		'gender' in object &&
		'occupation' in object
		) 
	{
		const newP: NewPatient = {
			name: parseName(object.name),
			dateOfBirth: parseDate(object.dateOfBirth),
			ssn: parseSSN(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
		};
		return newP;
	}

	throw new Error('Incorrect data: a field missing');
};

const isType = (type: unknown): type is string => {
	return isString(type) &&
		(type === 'HealthCheck' || type === 'OccupationalHealthcare' || type === 'Hospital');
};

const parseDescription = (description: unknown): string => {
	if (!isString(description)) {
		throw new Error('Incorrect or missing description');
	}
	return description;
};

const parseOccupation = (occupation: unknown): string => {
	if (!isString(occupation)) {
		throw new Error('Incorrect or missing occupation');
	}
	return occupation;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!isString(specialist)) {
		throw new Error('Incorrect or missing specialist');
	}
	return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number' || param instanceof Number;
};

const isHelathCheckRating = (param: number): param is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
	if (!isNumber(healthCheckRating) || !isHelathCheckRating(healthCheckRating)) {
		throw new Error(`Incorrect healthCheckRating: ${healthCheckRating}`);
	}
	return healthCheckRating;
};

const toNewEntry = (object: unknown): NewEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if (
		'description' in object &&
		'date' in object &&
		'specialist' in object &&
		'type' in object
	) {
		if (!isType(object.type)) {
			throw new Error(`Incorrect type: ${object.type}`);
		}
		
		const { type } = object;
		if (type === 'HealthCheck' && !('healthCheckRating' in object)) {
			throw new Error(`Entry of type "HealthCheck" is missing "healthCheckRating" field.`);
		}
		if (type === 'OccupationalHealthcare' && !('employerName' in object)) {
			throw new Error(`Entry of type "OccupationalHealthcare" is missing "employerName" field.`);
		}
		if (type === 'Hospital' && !('discharge' in object)) {
			throw new Error(`Entry of type "Hospital" is missing "discharge" field.`);
		}

		const potentialEntry = object as Entry;

		switch (potentialEntry.type) {
			case "HealthCheck":
				return {
					type: potentialEntry.type,
					description: parseDescription(potentialEntry.description),
					date: parseDate(potentialEntry.date),
					specialist: parseSpecialist(potentialEntry.specialist),
					diagnosisCodes: parseDiagnosisCodes(potentialEntry),
					healthCheckRating: parseHealthCheckRating(potentialEntry.healthCheckRating)
				};
			case "Hospital":
				return {
					type: potentialEntry.type,
					description: parseDescription(potentialEntry.description),
					date: parseDate(potentialEntry.date),
					specialist: parseSpecialist(potentialEntry.specialist),
					diagnosisCodes: parseDiagnosisCodes(potentialEntry),
					discharge: potentialEntry.discharge
				};
			default: // "OccupationalHealthcare"
				const newE: NewEntry = {
					type: potentialEntry.type,
					description: parseDescription(potentialEntry.description),
					date: parseDate(potentialEntry.date),
					specialist: parseSpecialist(potentialEntry.specialist),
					diagnosisCodes: parseDiagnosisCodes(potentialEntry),
					employerName: potentialEntry.employerName,
				};
				if (potentialEntry.sickLeave) {
					newE.sickLeave = potentialEntry.sickLeave;
				}
				return newE;
		}
	}

	throw new Error('Incorrect data: a field missing');
};

export default { 
	toNewPatient, 
	toNewEntry
};

// const isEntry = (entry: unknown): entry is Entry => {
// 	if (entry && typeof entry === 'object') {
// 		const potentialEntry = entry as Entry;
// 		return (
// 			isString(potentialEntry.id) &&
// 			isString(potentialEntry.description) && 
// 			isDate(potentialEntry.date) && 
// 			isString(potentialEntry.specialist) &&
// 			(
// 				(potentialEntry.type === 'HealthCheck' 
// 					&& 'healthCheckRating' in potentialEntry) ||
// 				(potentialEntry.type === 'OccupationalHealthcare' 
// 					&& 'employerName' in potentialEntry) ||
// 				(potentialEntry.type === 'Hospital' && 'discharge' in potentialEntry)
// 			)
// 		);
// 	}
// 	return false;
// };

// const parseEntries = (entries: unknown): Entry[] => {
// 	if (!Array.isArray(entries)) {
// 		throw new Error('Entries must be an array');
// 	}
// 	if (!entries.every((item) => isEntry(item))) {
// 		throw new Error('All entries must be valid');
// 	}
// 	return entries as Entry[];
// };