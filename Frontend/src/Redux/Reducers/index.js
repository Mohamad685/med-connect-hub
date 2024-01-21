import { createSlice } from '@reduxjs/toolkit';

const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState: {
    diagnosisData: {},
  },
  reducers: {
    setDiagnosisData: (state, action) => {
      state.diagnosisData = action.payload;
    },
  },
});

export const { setDiagnosisData } = diagnosisSlice.actions;
export default diagnosisSlice.reducer;
