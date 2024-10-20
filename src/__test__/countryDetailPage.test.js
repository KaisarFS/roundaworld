/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from "redux-thunk";
import { BrowserRouter } from 'react-router-dom';
import CountryDetail from '../pages/CountryDetailPage';

const middlewares = [thunk]; 
const mockStore = configureStore(middlewares);

describe('CountryDetailPage', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks(); 
    store = mockStore({
      countries: {
        countryDetail: null,
        detailStatus: 'idle',
        detailError: null,
        cooperation: [],
      },
    });
  });


  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CountryDetail />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('No details available')).toBeInTheDocument();
  });

  test('displays the loading state', () => {
    store = mockStore({
      countries: {
        countryDetail: null,
        detailStatus: 'loading',
        detailError: null,
        cooperation: [],
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CountryDetail />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('custom-loader')).toBeInTheDocument();

  });

  test('displays country details when loaded', () => {
    store = mockStore({
      countries: {
        countryDetail: {
          name: { common: 'France', official: 'French Republic' },
          latlng: [48.8566, 2.3522],
          flags: { svg: 'https://flagcdn.com/fr.svg', alt: 'Flag of France' },
          population: 67000000,
          capital: ['Paris'],
          currencies: {
            EUR: { name: 'Euro', symbol: '€' },
          },
          languages: { fra: 'French' },
          region: 'Europe',
          coatOfArms: { svg: '', png: '' },
        },
        detailStatus: 'succeeded',
        detailError: null,
        cooperation: [],
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CountryDetail />
        </BrowserRouter>
      </Provider>
    );

    const countryNameElements = screen.getAllByText('France');
    expect(countryNameElements.length).toBeGreaterThan(0);

  });

  test('displays an error message on failure', () => {
    store = mockStore({
      countries: {
        countryDetail: null,
        detailStatus: 'failed',
        detailError: 'Failed to fetch country details',
        cooperation: [],
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CountryDetail />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Failed to fetch country details/i)).toBeInTheDocument();
  });

  test('displays message when there is no country detail', () => {
    store = mockStore({
      countries: {
        countryDetail: null,
        detailStatus: 'succeeded',
        detailError: null,
        cooperation: [],
      },
    });
  
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CountryDetail />
        </BrowserRouter>
      </Provider>
    );
  
    expect(screen.getByText('No details available')).toBeInTheDocument();
  });
  
});