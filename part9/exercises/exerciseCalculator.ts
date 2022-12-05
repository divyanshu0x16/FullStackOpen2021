interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const strToNumArray = (args: Array<string>): Array<number> => {
  const convertedArray: Array<number> = [];

  for (const arg of args.slice(2, args.length - 1)) {
    convertedArray.push(Number(arg));
  }

  return convertedArray;
};

const calulateExercise = (exerciseHours: Array<number>): ExerciseResult => {
  if (exerciseHours.length === 0) throw new Error('Input should be of size > 0');

  const target = 2;

  let trainingDays = 0;
  let average = 0;

  for (const exerciseHour of exerciseHours) {
    if (exerciseHour !== 0) trainingDays += 1;

    average += exerciseHour;
  }
  average = average / exerciseHours.length;

  let success: boolean;
  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    success = true;
    rating = 4;
    ratingDescription = 'good';
  } else {
    success = false;
    rating = 0;
    ratingDescription = 'bad';
  }

  return {
    periodLength: exerciseHours.length,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

try {
  console.log(calulateExercise(strToNumArray(process.argv)));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
