import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  countries: [],
  cooperation: [],
  countryDetail: null,
  status: 'idle',
  detailStatus: 'idle',
  error: null,
};

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching countries');
    }
  },
);

export const fetchCountryDetail = createAsyncThunk(
  'countries/fetchCountryDetail',
  async (countryCode, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      return response.data[0];
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Network error');
    }
  },
);

const countrySlice = createSlice({
  name: 'countries',
  initialState,

  reducers: {
    addCooperation: (state, action) => {
      const { cca3, name, flags } = action.payload;
      const newCooperation = {
        cca3,
        name: name.common,
        flag: flags.svg,
      };
      state.cooperation.push(newCooperation);
    },
    removeCooperation: (state, action) => {
      state.cooperation = state.cooperation.filter(
        (country) => country.cca3 !== action.payload.cca3,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder
      .addCase(fetchCountryDetail.pending, (state) => {
        state.detailStatus = 'loading';
        state.detailError = null;
      })
      .addCase(fetchCountryDetail.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded';
        state.countryDetail = action.payload;
      })
      .addCase(fetchCountryDetail.rejected, (state, action) => {
        state.detailStatus = 'failed';
        state.detailError = action.payload || 'Failed to fetch country detail';
      });
  },
});

export const { addCooperation, removeCooperation } = countrySlice.actions;
export default countrySlice.reducer;
