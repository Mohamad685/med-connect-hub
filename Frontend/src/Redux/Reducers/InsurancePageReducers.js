const initialState = {
	symptoms: { list: [], lastUpdated: null },
	prescriptions: { list: [], lastUpdated: null },
	diagnoses: { list: [], lastUpdated: null },
	labResults: { list: [], lastUpdated: null },
};

const insurancePageReducer = (state = initialState, action) => {
  const currentDate = new Date().toISOString();
  switch (action.type) {
    case 'SET_SYMPTOMS':
      return { ...state, symptoms: { list: action.payload, lastUpdated: currentDate } };
    case 'SET_PRESCRIPTIONS':
      return { ...state, prescriptions: { list: action.payload, lastUpdated: currentDate } };
    case 'SET_DIAGNOSES':
      return { ...state, diagnoses: { list: action.payload, lastUpdated: currentDate } };
    case 'SET_LAB_RESULTS':
      return { ...state, labResults: { list: action.payload, lastUpdated: currentDate } };
    default:
      return state;
  }
};


export default insurancePageReducer;
