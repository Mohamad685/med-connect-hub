export const setSymptoms = (symptoms) => {
  return {
    type: 'SET_SYMPTOMS',
    payload: symptoms,
  };
};

export const setDiagnosis = (diagnosis) => {
  return {
    type: 'SET_DIAGNOSIS',
    payload: diagnosis,
  };
};

export const setLabResults = (labResults) => {
  return {
    type: 'SET_LAB_RESULTS',
    payload: labResults,
  };
};

export const setPrescriptions = (prescriptions) => {
  return {
    type: 'SET_PRESCRIPTIONS',
    payload: prescriptions,
  };
};
  