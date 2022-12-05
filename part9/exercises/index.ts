import express = require('express');
import { bmiCalculator } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  try {
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0)
      throw new Error('malformatted parameters');

    const bmi: string = bmiCalculator(weight, height);

    res.send({
      weight: weight,
      height: height,
      bmi: bmi,
    });
  } catch (error) {
    res.send({
      //eslint-disable-next-line
      error: error.message,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
