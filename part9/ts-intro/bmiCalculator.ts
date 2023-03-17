interface BMIValues {
  value1: number;
  value2: number;
}

const parseArgumentsBmi = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (Number(args[3]) === 0) throw new Error('Weight cannot be 0');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers')
  }
}

const bmiCalculator = (height: number, weight: number): string => {
  const result = weight / (Math.pow(height/100, 2));
  console.log('result', result)
  if (result < 16) return 'Underweight (Severe thinness)';
  else if (result >= 16.0 && result <= 16.9) return 'Underweight (Moderate thinness)';
  else if (result >= 17.0 && result <= 18.4) return 'Underweight (Mild thinness)';
  else if (result >= 18.5 && result <= 24.9) return 'Normal range';
  else if (result >= 25.0 && result <= 29.9) return 'Overweight (Pre-obese)';
  else if (result >= 30.0 && result <= 34.9) return 'Obese (Class I)';
  else if (result >= 35.0 && result <= 39.9) return 'Obese (Class II)';
  else if (result >= 40) return 'Obese (Class III)';
}

try {
  const { value1, value2 } = parseArgumentsBmi(process.argv);
  console.log(bmiCalculator(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage)
}
