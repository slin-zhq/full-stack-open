interface bmiCalculatorParams {
	height: number;
	weight: number;
}

export const bmiCalculatorArgsParser = (args: string[]): bmiCalculatorParams => {
	if (args.length < 4) throw new Error('bmiCalculatorArgsParser: Not enough arguments');
	if (args.length > 4) throw new Error('bmiCalculatorArgsParser: Too many arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3])
		}
	} else {
		throw new Error('bmiCalculatorArgsParser: Provided values were not numbers!');
	}
}

interface exerciseCalculatorParams {
	dailyExerciseHours: number[];
	targetAmount: number;
}

export const exerciseCalculatorArgsParser = (args: string[]): exerciseCalculatorParams => {
	if (args.length < 4) throw new Error('exerciseCalculatorParser: Not enough arguments');

	const dailyExerciseHoursArgs = args.slice(3, args.length);
	let validDailyExerciseHoursArgs = dailyExerciseHoursArgs.filter(hoursArg => !isNaN(Number(hoursArg)))

	if (!isNaN(Number(args[2])) && validDailyExerciseHoursArgs.length === dailyExerciseHoursArgs.length) {
		return {
			dailyExerciseHours: dailyExerciseHoursArgs.map(hoursArg => Number(hoursArg)),
			targetAmount: Number(args[2])
		}
	} else {
		throw new Error('exerciseCalculatorParser: Provided values were not numbers!');
	}
}