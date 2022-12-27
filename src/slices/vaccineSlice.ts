import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { VaccineState } from './reducers/vaccineReducer';

import { CreateVaccinePayload, Vaccine } from '../interfaces/vaccine.interface';

import {
  createVaccine,
  deleteVaccine,
  getVaccines,
} from '../services/vaccineService';

const initialState: VaccineState = {
  vaccine: null,
  error: null,
  vaccines: [],
  isLoading: false,
};

export const createVaccineThunk = createAsyncThunk<
  Vaccine,
  CreateVaccinePayload
>('vaccine/create', async (payload, { rejectWithValue }) => {
  try {
    const data = await createVaccine(payload);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const getVaccineThunk = createAsyncThunk<Vaccine[], void>(
  'vaccine/get',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getVaccines();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteVaccineThunk = createAsyncThunk<object, number>(
  'vaccine/delete',
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteVaccine(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
const vaccineSlice = createSlice({
  name: 'vaccine',
  initialState,
  reducers: {},
  extraReducers: {
    [createVaccineThunk.pending as any]: (state) => {
      state.isLoading = true;
    },
    [createVaccineThunk.fulfilled as any]: (state, { payload }) => {
      state.isLoading = false;
      state.vaccines.push(payload);
    },
    [createVaccineThunk.rejected as any]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [getVaccineThunk.pending as any]: (state) => {
      state.isLoading = true;
    },
    [getVaccineThunk.fulfilled as any]: (state, { payload }) => {
      state.isLoading = false;
      state.vaccines = payload;
    },
    [getVaccineThunk.rejected as any]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [deleteVaccineThunk.pending as any]: (state) => {
      state.isLoading = true;
    },
    [deleteVaccineThunk.fulfilled as any]: (state, { payload }) => {
      state.isLoading = false;
      state.vaccines = payload;
    },
    [deleteVaccineThunk.rejected as any]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export default vaccineSlice.reducer;
