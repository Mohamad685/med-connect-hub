const initialState = {
    diagnosisData: {},
  };
  
  const diagnosisReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_DIAGNOSIS_DATA':
        return {
          ...state,
          diagnosisData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default diagnosisReducer;
  