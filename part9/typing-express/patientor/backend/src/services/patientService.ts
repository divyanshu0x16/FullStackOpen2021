import patientEntries from '../../data/patients';
import { NoSSNPatient } from '../types';

const getPatientEntriesNoSSN = (): NoSSNPatient[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

export default {
  getPatientEntriesNoSSN,
};
