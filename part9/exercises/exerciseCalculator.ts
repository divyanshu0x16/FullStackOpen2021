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
  let convertedArray: Array<number>;

  for (let arg of args) {
    convertedArray.push(Number(arg));
  }

  return convertedArray;
};

const calulateExercise = (exerciseHours: Array<number>): ExerciseResult => {
  if (exerciseHours.length !== 7) throw new Error('Input should be of size 7');

  let trainingDays: number = 0;
  let target: number = 2;
  let average: number = 0;

  for (let exerciseHour of exerciseHours) {
    if (exerciseHour !== 0) trainingDays += 1;

    average += exerciseHour;
  }
  average = average / 7;

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
    periodLength: 7,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

try {
  console.log(calulateExercise([3, 0, 2, 4.5, 0, 3, 1]));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
