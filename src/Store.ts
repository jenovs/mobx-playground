import { action, computed, configure, observable } from 'mobx';

import Api from './api';

configure({
  enforceActions: true,
});

const REFRESH_TIMEOUT = 11000;

interface IPairs {
  id: number;
  from: string;
  to: string;
  amount?: number;
}

class AppState {
  api: any;
  id = 2;
  @observable
  pairs: IPairs[] = [
    { id: 0, from: 'BTC', to: 'EUR', amount: 0.14287755 },
    { id: 1, from: 'LTC', to: 'EUR' },
  ];
  @observable prices = {};
  @observable timer = 0;
  refreshToken = setTimeout(() => {
    this.getPrices();
  }, REFRESH_TIMEOUT);

  constructor(api = new Api()) {
    this.api = api;
  }

  @computed
  get fromAll() {
    return Array.from(new Set(this.pairs.map((pair: any) => pair.from))).join(
      ','
    );
  }

  @computed
  get toAll() {
    return Array.from(new Set(this.pairs.map((pair: any) => pair.to))).join(
      ','
    );
  }

  @computed
  get priceData() {
    const { pairs, prices } = this;

    return pairs.map(pair => {
      return {
        ...pair,
        price: prices[pair.from] && prices[pair.from][pair.to],
      };
    });
  }

  @action
  addAmount = (id: number, amount: number) => {
    const idx = this.pairs.findIndex(pair => pair.id === id);

    if (idx === -1) {
      return;
    }

    this.pairs[idx].amount = amount;
  };

  @action
  addPair = (from: string, to: string) => {
    this.pairs.push({
      id: this.id++,
      from: from.trim().toUpperCase(),
      to: to.trim().toUpperCase(),
    });
  };

  @action
  deletePair = (id: number) => {
    const idx = this.pairs.findIndex(pair => pair.id === id);
    if (idx === -1) {
      return;
    }
    this.pairs.splice(idx, 1);
  };

  fetchData = (from: string, to: string) => {
    const { addPair, getPrices, hasPair } = this;

    if (!hasPair(from, to)) {
      addPair(from, to);
    }

    getPrices();
  };

  getPrices = () => {
    clearTimeout(this.refreshToken);

    this.api
      .getPrices(this.fromAll, this.toAll)
      .then(
        action((prices: any) => {
          this.prices = prices;
        })
      )
      .catch((err: any) => {
        // tslint:disable-next-line
        console.log(err);
      });

    this.refreshToken = setTimeout(() => {
      this.getPrices();
    }, REFRESH_TIMEOUT);
  };

  hasPair = (from: string, to: string) =>
    this.pairs.some(
      (pair: any) =>
        pair.from === from.toUpperCase() && pair.to === to.toUpperCase()
    );

  // getCoinlist = () => this.api.getCoinlist();
}

export default AppState;
