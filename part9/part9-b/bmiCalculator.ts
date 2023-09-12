import { bmiCalculatorArgsParser } from "./utils"

const calculateBmi = (heightInCm: number, weightInKg: number): string => {
	const bmi = weightInKg/((heightInCm/100)**2)

	if (bmi < 16.0) {
		return "Underweight (Severe thinness)"
	} else if (bmi >= 16.0 && bmi <= 16.9) {
		return "Underweight (Moderate thinness)"
	} else if (bmi >= 17.0 && bmi <= 18.4) {
		return "Underweight (Mild thinness)"
	} else if (bmi >= 18.5 && bmi <= 24.9) {
		return "Normal range"
	} else if (bmi >= 25.0 && bmi <= 29.9) {
		return "Overweight (Pre-obese)"
	} else if (bmi >= 30.0 && bmi <= 34.9) {
		return "Obese (Class I)"
	} else if (bmi >= 35.0 && bmi <= 39.9) {
		return "Obese (Class II)"
	} else if (bmi >= 40.0) {
		return "Obese (Class III)"
	} 
}

try {
	const { height, weight } = bmiCalculatorArgsParser(process.argv);
	console.log(calculateBmi(height, weight));
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.'
	if (error instanceof Error) {
		errorMessage += error.message;
	}
	console.log(errorMessage);
}

// console.log(calculateBmi(180, 74))