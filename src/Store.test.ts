import { observe, toJS } from 'mobx';

import Store from './Store';

class MockApi {
  baseUrl: '';
  getCoinlist() {
    return new Promise(r => r());
  }
  getPrices(f: string, t: string) {
    return new Promise(r => r());
  }
  checkError(f: any) {
    return f;
  }
}

describe('Store', () => {
  let store: any;
  beforeEach(() => {
    store = new Store(new MockApi());
    store.pairs = [];
  });

  it('observes store values', () => {
    let isObserved = false;
    observe(store, () => {
      isObserved = true;
    });

    expect(isObserved).toBeFalsy();
    store.prices = { FOO: { BAR: 42 } };
    expect(isObserved).toBeTruthy();
  });

  it('adds new pair', () => {
    store.id = 0;
    expect(store.pairs.length).toBe(0);

    store.addPair('foo', 'bar');
    expect(store.pairs.length).toBe(1);
    expect(toJS(store.pairs[0])).toEqual({ id: 0, from: 'FOO', to: 'BAR' });

    store.addPair('car', 'rot');
    expect(store.pairs.length).toBe(2);
    expect(toJS(store.pairs[1])).toEqual({ id: 1, from: 'CAR', to: 'ROT' });
  });

  it('fetches data with arguments', () => {
    store.api.getPrices = jest.fn(() => new Promise(r => r()));

    store.fetchData('FOO', 'BAR');
    expect(store.api.getPrices).toBeCalledWith('FOO', 'BAR');
  });

  it('returns string of unique `from` values', () => {
    store.pairs = [
      { from: 'FOO', to: 'BAR' },
      { from: 'LOO', to: 'BAM' },
      { from: 'FOO', to: 'BAZ' },
    ];

    expect(store.fromAll).toBe('FOO,LOO');
  });

  it('returns string of unique `to` values', () => {
    store.pairs = [
      { from: 'FOO', to: 'BAR' },
      { from: 'LOO', to: 'BAM' },
      { from: 'MOO', to: 'BAR' },
    ];

    expect(store.toAll).toBe('BAR,BAM');
  });

  it('returns correct price data', () => {
    store.pairs = [{ from: 'FOO', to: 'BAR' }, { from: 'LOO', to: 'BAM' }];
    store.prices = { FOO: { BAR: 42 }, LOO: { BAM: 99 } };

    expect(store.priceData).toEqual([
      { from: 'FOO', price: 42, to: 'BAR' },
      { from: 'LOO', price: 99, to: 'BAM' },
    ]);
  });

  it('identifies duplicate pairs', () => {
    store.pairs = [{ from: 'FOO', to: 'BAR' }, { from: 'LOO', to: 'BAM' }];
    expect(store.hasPair('ROO', 'BAR')).toBeFalsy();
    expect(store.hasPair('FOO', 'BAR')).toBeTruthy();
  });
});
