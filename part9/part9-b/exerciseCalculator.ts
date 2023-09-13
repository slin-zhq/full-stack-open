import { exerciseCalculatorArgsParser } from "./utils";

interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

export const calculateExercises = (dailyExerciseHours: number[], targetAmount: number): Result => {
	const periodLength = dailyExerciseHours.length;
	const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
	const average = dailyExerciseHours.reduce((accumulatedHours, hours) => accumulatedHours + hours, 0)/periodLength;
	const success = average >= targetAmount;
	let rating;
	let ratingDescription;
	if (average >= targetAmount) {
		rating = 3;
		ratingDescription = "Wow, excellent!"; 
	} else if (targetAmount - average <= 0.5) {
		rating = 2;
		ratingDescription = "Not too bad, but could be better";
	} else {
		rating = 1;
		ratingDescription = "Can improve a lot; try again next time";
	}

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target: targetAmount,
		average
	};
};

try {
	const { dailyExerciseHours, targetAmount } = exerciseCalculatorArgsParser(process.argv);
	console.log(calculateExercises(dailyExerciseHours, targetAmount));
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += error.message;
	}
	console.log(errorMessage);
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))