import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const { toNewPatient, toNewEntry } = utils;

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getAll());
});

router.get('/:id', (req, res) => {
	const patient = patientService.findById(req.params.id);

	if (patient) {
		res.send(patient);
	} else {
		res.sendStatus(404);
	}
});

router.post('/', (req, res) => {
	try {
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
	}
});

router.post('/:id/entries', (req, res) => {
	try {
		const newEntry = toNewEntry(req.body);
		const updatePatient = patientService.addEntry(req.params.id, newEntry);
		res.json(updatePatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
	}
});

router.put('/:id', (req, res) => {
	const patient = patientService.findById(req.params.id);

	if (patient) {
		// extract id
		// check the rest by toNewPatient
		try {
			const verifiedPatient = toNewPatient(req.body);
			patientService.updatePatient({ id: patient.id, ...verifiedPatient });
			res.send(patient);
		} catch (error: unknown) {
			let errorMessage = 'Something went wrong.';
			if (error instanceof Error) {
				errorMessage += ' Error: ' + error.message;
			}
			res.status(400).send(errorMessage);
		}
	} else {
		res.sendStatus(404);
	}
});

export default router;