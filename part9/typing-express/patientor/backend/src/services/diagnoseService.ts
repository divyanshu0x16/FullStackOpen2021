import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnoseEntries = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getDiagnoseEntries,
};
