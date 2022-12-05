import express = require('express');
import { bmiCalculator } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  try {
    let height: number = Number(_req.query.height);
    let weight: number = Number(_req.query.weight);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0)
      throw new Error('malformatted parameters');

    let bmi: string = bmiCalculator(weight, height);

    res.send({
      weight: weight,
      height: height,
      bmi: bmi,
    });
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
