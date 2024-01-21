import { combineReducers } from 'redux';
import diagnosisReducer from './DiagnosisReducers';

const rootReducer = combineReducers({
  diagnosis: diagnosisReducer,
});

export default rootReducer;
