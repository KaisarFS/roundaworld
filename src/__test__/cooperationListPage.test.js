/* eslint-disable */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import CooperationList from '../pages/CooperationListPage';
import { removeCooperation } from '../features/countrySlice';
import { useNavigate } from 'react-router-dom';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('CooperationListPage', () => {
  let store;
  const dummyCooperationData = [
    { cca3: 'USA', name: 'United States', flag: 'https://flagcdn.com/us.svg' },
    { cca3: 'CAN', name: 'Canada', flag: 'https://flagcdn.com/ca.svg' },
  ];

  beforeEach(() => {
    store = mockStore({
      countries: {
        cooperation: dummyCooperationData, 
      },
    });
    jest.clearAllMocks();
  });

  test('renders the title "Countries that have collaborated with you"', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CooperationList />
        </MemoryRouter>
      </Provider>
    );

    const title = screen.getByText((content) =>
      content.includes('Countries that have')
    );
    expect(title).toBeInTheDocument();
  });

  test('displays "No cooperating countries yet" when cooperation list is empty', () => {
    store = mockStore({
      countries: {
        cooperation: [], 
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CooperationList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('No cooperating countries yet.')).toBeInTheDocument();
  });

  test('renders the cooperation list when data is available', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CooperationList />
        </MemoryRouter>
      </Provider>
    );

    const countryImages = screen.getAllByRole('img');
    expect(countryImages.length).toBe(2);
    expect(screen.getByAltText('United States flag')).toBeInTheDocument();
    expect(screen.getByAltText('Canada flag')).toBeInTheDocument();
  });

 

  test('removes country from the cooperation list when confirmed', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CooperationList />
        </MemoryRouter>
      </Provider>
    );

    const removeButton = screen.getAllByTestId('remove-country')[0]; 
    fireEvent.click(removeButton);
    expect(screen.getByText('Confirm')).toBeInTheDocument();

    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(store.getActions()).toContainEqual(removeCooperation(dummyCooperationData[0]));
  });
});
