import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoseEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
