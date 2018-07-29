import React from 'react';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import 'jest-dom/extend-expect';

import App from './App';

describe('App component', () => {
  let store: any;

  beforeEach(() => {
    cleanup();

    store = observable({
      addPair: jest.fn(),
      amountById: jest.fn(),
      deletePair: jest.fn(),
      fetchData: jest.fn(),
      getPrices: jest.fn(),
      priceData: [],
    });
  });

  it('observes priceData changes', () => {
    const { getAllByTestId, queryAllByTestId } = render(
      <Provider data={store}>
        <App />
      </Provider>
    );

    expect(queryAllByTestId('card').length).toBe(0);
    store.priceData.push({ id: 1, from: 'FOO', to: 'BAR', price: 42 });
    expect(getAllByTestId('card').length).toBe(1);
  });

  it('displays initial list of priceData from store', () => {
    store.priceData = [{ id: 12, from: 'FOO', to: 'BAR', price: 42 }];
    const { getAllByTestId, getByText } = render(
      <Provider data={store}>
        <App />
      </Provider>
    );

    expect(getAllByTestId('card').length).toBe(1);

    expect(getByText(/FOO$/)).toBeInTheDocument();
    expect(getByText(/BAR$/)).toBeInTheDocument();
  });

  it('fetches data on mount', () => {
    render(<App data={store} />);
    expect(store.getPrices).toHaveBeenCalled();
  });

  it('calls fetchData with args from inputs when submitting form', () => {
    const { getByTestId, getByText } = render(<App data={store} />);

    const input1 = getByTestId('input-1') as HTMLInputElement;
    const input2 = getByTestId('input-2') as HTMLInputElement;
    input1.value = 'BAZ';
    input2.value = 'FUZ';
    fireEvent.change(input1);
    fireEvent.change(input2);
    fireEvent.click(getByText('Get Price'));

    expect(store.fetchData).toHaveBeenCalledWith('BAZ', 'FUZ');
  });

  it('calls `deletePair` when `Delete` button is clicked', () => {
    store.priceData = [{ id: 12, from: 'FOO', to: 'BAR', price: 42 }];
    const { getAllByTestId, getByText } = render(
      <Provider data={store}>
        <App />
      </Provider>
    );

    expect(getAllByTestId('card')).toHaveLength(1);
    fireEvent.click(getByText('Delete'));
    expect(store.deletePair).toBeCalledWith(12);
  });
});
