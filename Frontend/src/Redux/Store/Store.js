import { configureStore } from '@reduxjs/toolkit';
import InsurancePageReducer from '../Reducers/InsurancePageReducers';

const store = configureStore({
  reducer: {
    insurancePageData:InsurancePageReducer,
  }
});

export default store;
