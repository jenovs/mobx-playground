import { observe, toJS } from 'mobx';

import Store, { IPairs } from './Store';

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

const pairs: IPairs[] = [
  { id: 0, from: 'CAR', to: 'ROT', amount: '42' },
  { id: 1, from: 'BER', to: 'LIN', amount: '0' },
  { id: 4, from: 'POR', to: 'TAL', amount: '' },
];

describe('Store', () => {
  let store: any;
  beforeEach(() => {
    store = new Store(new MockApi());
    store.pairs = pairs;
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
    expect(store.pairs.length).toBe(3);

    store.addPair('foo', 'bar');
    expect(store.pairs.length).toBe(4);
    expect(toJS(store.pairs[3])).toEqual({
      id: 0,
      from: 'FOO',
      to: 'BAR',
      amount: '1',
    });

    store.addPair('car', 'rot');
    expect(store.pairs.length).toBe(5);
    expect(toJS(store.pairs[4])).toEqual({
      id: 1,
      from: 'CAR',
      to: 'ROT',
      amount: '1',
    });
  });

  it('fetches data with arguments', () => {
    store.api.getPrices = jest.fn(() => new Promise(r => r()));

    store.fetchData('FOO', 'BAR');
    expect(store.api.getPrices).toBeCalledWith(
      'CAR,BER,POR,FOO',
      'ROT,LIN,TAL,BAR'
    );
  });

  it('returns string of unique `from` values', () => {
    expect(store.fromAll).toBe('CAR,BER,POR');
  });

  it('returns string of unique `to` values', () => {
    expect(store.toAll).toBe('ROT,LIN,TAL');
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

  it('deletes a pair by `id`', () => {
    store.pairs = [
      { id: 0, from: 'CAR', to: 'ROT' },
      { id: 1, from: 'BER', to: 'LIN' },
      { id: 2, from: 'LEN', to: 'OVO' },
    ];

    store.deletePair(0);
    expect(store.pairs.length).toBe(2);
    expect(store.pairs[0].id).toBe(1);

    store.deletePair(2);
    expect(store.pairs.length).toBe(1);
    expect(store.pairs[0].id).toBe(1);

    // attempt to delete pair with non-existent id
    store.deletePair(42);
    expect(store.pairs.length).toBe(1);
    expect(store.pairs[0].id).toBe(1);
  });

  it('adds amount', () => {
    store.pairs = [
      { id: 0, from: 'CAR', to: 'ROT' },
      { id: 1, from: 'BER', to: 'LIN' },
    ];

    store.addAmount(1, 15);
    expect(store.pairs[1].amount).toBe(15);

    store.addAmount(2, 15);
    expect(store.pairs).toHaveLength(2);
    expect(store.pairs[0].amount).toBeUndefined();
    expect(store.pairs[1].amount).toBe(15);

    store.addAmount(1, -1);
    expect(store.pairs[1].amount).toBe(-1);

    store.addAmount(1, 0);
    expect(store.pairs[1].amount).toBe(0);
  });

  it('returns amount', () => {
    store.pairs = pairs;

    // amount exists
    expect(store.amountById(0)).toBe('42');
    // amount is zero
    expect(store.amountById(1)).toBe('0');
    // amount is not set
    expect(store.amountById(4)).toBe('');
    // id doesn't exist
    expect(store.amountById(12)).toBe('');
  });
});
