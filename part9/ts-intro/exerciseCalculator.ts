interface ResultObject {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
}

interface Rating {
  rating: number,
  ratingDescription: string,
}

interface ExerciseValues {
  trainingPerDay: number[],
  target: number,
}

const parseArgumentsEC = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  let target = args[2];
  if (isNaN(Number(target)))
    throw new Error(`Value provided as 'target' is not a number: ${args[2]}`);
  
  let trainingPerDay: number[] = [];
  for (let i = 3; i < args.length; i++) {
    if(!isNaN(Number(args[i]))) {
      trainingPerDay.push(Number(args[i]));
    } else {
      throw new Error(`Value at position ${i} is not a number`);
    }
  }

  return {
    trainingPerDay,
    target: Number(target),
  };
}

const calculateRating = (): Rating => {
  let rating = Math.floor(Math.random() * 3) + 1
  let ratingDescription: string;
  switch (rating) {
    case 1:
      ratingDescription = 'Rating is 1'
    case 2:
      ratingDescription = 'Rating is 2'
    case 3:
      ratingDescription = 'Rating is 3'
    default:
      ratingDescription = 'not too bad but could be better'
      break;
  }

  return {
    rating,
    ratingDescription,
  }
}

const calculateExercises = (hoursPerDay: number[], targetDailyHours: number): ResultObject => {
  let periodLength = hoursPerDay.length;
  let trainingDays = hoursPerDay.filter((hours) => hours !== 0).length;
  let target = targetDailyHours;
  let { rating, ratingDescription } = calculateRating();
  let average = hoursPerDay.reduce((accumulator, currentValue) => accumulator + currentValue) / hoursPerDay.length;
  let success = average === targetDailyHours ? true : false;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average 
  }
}

try {
  const { trainingPerDay, target }: ExerciseValues = parseArgumentsEC(process.argv)
  console.log(calculateExercises(trainingPerDay, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage)
}