import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	if (!req.query.height || !req.query.weight) {
		res.send({
			error: "malformatted parameters"
		});
	}
	const height = req.query.height;
	const weight = req.query.weight;
	if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
		res.send({
			height,
			weight,
			bmi: calculateBmi(Number(height), Number(weight))
		});
	} else {
		res.send({
			error: "malformatted parameters"
		});
	}
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;
	if (!daily_exercises || !target) {
		res.send({
			error: "parameters missing"
		});
	}
	if ( Array.isArray(daily_exercises) && 
		daily_exercises.every((hours) => !isNaN(Number(hours))) &&
		!isNaN(Number(target)) ) {
			res.send(calculateExercises(daily_exercises.map(hours => Number(hours)), Number(target)));
		} else {
			res.send({
				error: "malformatted parameters"
			});
		}
});


const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});