interface BMIValues {
  weight: number; // in kg
  height: number; // in cm
}

const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[3]),
      height: Number(args[2]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const bmiCalculator = (weight: number, height: number): string => {
  if (weight <= 0 || height <= 0)
    throw new Error('Weight or Height cannot be negative');

  let bmi: number = (weight * 100 * 100) / (height * height);

  if (bmi < 16) return 'Underweight (Severe thinness)';
  else if (16 <= bmi && bmi <= 16.9) return 'Underweight (Moderate thinness)';
  else if (17 <= bmi && bmi <= 18.4) return 'Underweight (Mild thinness)';
  else if (18.5 <= bmi && bmi <= 24.9) return 'Normal Range';
  else if (25 <= bmi && bmi <= 29.9) return 'Overweight (Pre-obese)';
  else if (30 <= bmi && bmi <= 34.9) return 'Obese (Class I)';
  else if (25 <= bmi && bmi <= 39.9) return 'Obese (Class II)';

  return 'Obese (Class III)';
};

try {
  const { weight, height } = parseArguments(process.argv);
  console.log(bmiCalculator(weight, height));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export {bmiCalculator};
