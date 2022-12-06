import express from 'express';
import { calculator } from './calculator';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pon');
});

app.post('/caluculate', (req, res) => {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
