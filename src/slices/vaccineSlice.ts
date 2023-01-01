import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { VaccineState } from './reducers/vaccineReducer';

import {
  Vaccine,
  PatchVaccinePayload,
  CreateVaccinePayload,
} from '../interfaces/vaccineInterface';

import {
  getVaccines,
  createVaccine,
  deleteVaccine,
  updateVaccine,
} from '../services/vaccineService';

export const initialState: VaccineState = {
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

export const updateVaccineThunk = createAsyncThunk<
  Vaccine,
  PatchVaccinePayload
>('vaccine/update', async (payload, { rejectWithValue }) => {
  try {
    const data = await updateVaccine(payload.id, payload);
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
  extraReducers(builder) {
    builder.addCase(createVaccineThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createVaccineThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.vaccines.push(payload);
    });
    builder.addCase(
      createVaccineThunk.rejected as any,
      (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      },
    );
    builder.addCase(getVaccineThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.vaccines = payload;
    });
    builder.addCase(getVaccineThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVaccineThunk.rejected as any, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(deleteVaccineThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteVaccineThunk.fulfilled as any,
      (state, { payload }) => {
        state.isLoading = false;
        state.vaccines = payload;
      },
    );
    builder.addCase(
      deleteVaccineThunk.rejected as any,
      (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      },
    );
  },
});

export default vaccineSlice.reducer;
