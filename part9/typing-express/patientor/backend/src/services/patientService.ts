import patientEntries from '../../data/patients';
import { NoSSNPatient, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

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

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();

  const newPatientEntry = {
    id: id,
    ...entry,
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatientEntriesNoSSN,
  addPatient,
};
