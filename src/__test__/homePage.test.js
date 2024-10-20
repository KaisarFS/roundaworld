/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; 
import configureStore from 'redux-mock-store';
import HomePage from '../pages/HomePage';

const mockStore = configureStore([]);

describe('HomePage', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      countries: {
        countries: [
          {
            name: { common: 'Country 1' },
            flags: { png: 'https://flag-url-1.png' }
          },
          {
            name: { common: 'Country 2' },
            flags: { png: 'https://flag-url-2.png' }
          }
        ],
        status: 'succeeded',
        error: null,
      },
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter> 
          <HomePage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('All Countries')).toBeInTheDocument();
  });

  it('displays the loading state', () => {
    store = mockStore({
      countries: {
        countries: [],
        status: 'loading',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays countries when loaded', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Country 1')).toBeInTheDocument();
    expect(screen.getByText('Country 2')).toBeInTheDocument();
  });

  it('displays an error message on failure', () => {
    store = mockStore({
      countries: {
        countries: [],
        status: 'failed',
        error: 'Failed to fetch countries',
      },
    });
  
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Failed to fetch countries/i)).toBeInTheDocument();
    // expect(screen.getByText('Error: Failed to fetch countries')).toBeInTheDocument();
  });
  
});
