import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchHelper from '../../Components/Functions/FetchFunction';

export const fetchPatientData = createAsyncThunk(
    'patientData/fetchPatientData',
    async (patientId, thunkAPI) => {
      try {
        const responses = await Promise.all([
          fetchHelper.get(`/patient/${patientId}/lab-results`),
          fetchHelper.get(`/patient/${patientId}/diagnosis`),
          fetchHelper.get(`/patient/${patientId}/prescriptions`),
          fetchHelper.get(`/patient/${patientId}/symptoms`),
        ]);
        return {
          labResults: { list: responses[0], lastUpdated: new Date().toISOString() },
          diagnoses: { list: responses[1], lastUpdated: new Date().toISOString() },
          prescriptions: { list: responses[2], lastUpdated: new Date().toISOString() },
          symptoms: { list: responses[3], lastUpdated: new Date().toISOString() },
        };
      } catch (error) {
        return thunkAPI.rejectWithValue(error.toString());
      }
    }
  );

const initialState = {
	symptoms: { list: [], lastUpdated: null },
	prescriptions: { list: [], lastUpdated: null },
	diagnoses: { list: [], lastUpdated: null },
	labResults: { list: [], lastUpdated: null },
};

const patientDataSlice = createSlice({
    name: 'patientData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchPatientData.fulfilled, (state, action) => {
        state.labResults = action.payload.labResults;
        state.diagnoses = action.payload.diagnoses;
        state.prescriptions = action.payload.prescriptions;
        state.symptoms = action.payload.symptoms;
      });
    },
  });
  
  export default patientDataSlice.reducer;