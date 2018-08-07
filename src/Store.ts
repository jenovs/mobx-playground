import { action, computed, configure, observable } from 'mobx';

import Api from './api';
import { initialPairs } from './initialPairs';
import { getNextId } from './utils';

configure({
  enforceActions: true,
});

const REFRESH_TIMEOUT = 11000;

export interface IPairs {
  delta?: number;
  id: number;
  from: string;
  to: string;
  amount: string;
}

class AppState {
  api: any;
  @observable pairs: IPairs[];
  id: number;
  @observable prices = {};
  @observable lastPrices = {};
  @observable lastUpdateTime = new Date().getTime();
  @observable secondsSinceUpdate = 0;
  refreshToken = setTimeout(() => {
    this.getPrices();
  }, REFRESH_TIMEOUT);

  constructor(api = new Api()) {
    this.api = api;
    this.pairs = api.loadData() || initialPairs;
    this.id = getNextId(this.pairs);

    window.setInterval(
      action(() => {
        this.secondsSinceUpdate = Math.floor(
          (new Date().getTime() - this.lastUpdateTime) / 1000
        );
      }),
      1000
    );
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
    const { lastPrices, pairs, prices } = this;

    return pairs.map(pair => {
      const price = prices[pair.from] && prices[pair.from][pair.to];
      const lastPrice =
        (lastPrices[pair.from] && lastPrices[pair.from][pair.to]) || price;
      return {
        ...pair,
        price,
        delta: price - lastPrice || 0,
      };
    });
  }

  amountById(id: number | string): string {
    const pair = this.pairs.find(p => p.id === id);

    if (!pair || pair.amount === undefined) {
      return '';
    }

    return pair.amount;
  }

  @action
  addAmount = (id: number, amount: string) => {
    const idx = this.pairs.findIndex(pair => pair.id === id);

    if (idx === -1) {
      return;
    }

    this.pairs[idx].amount = amount;
    this.api.saveData(this.pairs);
  };

  @action
  addPair = (from: string, to: string) => {
    this.pairs.push({
      id: this.id++,
      from: from.trim().toUpperCase(),
      to: to.trim().toUpperCase(),
      amount: '1',
    });
    this.api.saveData(this.pairs);
  };

  @action
  deletePair = (id: number) => {
    const idx = this.pairs.findIndex(pair => pair.id === id);
    if (idx === -1) {
      return;
    }
    this.pairs.splice(idx, 1);
    this.api.saveData(this.pairs);
  };

  @action
  movePair = (source: any, destination: any): void => {
    const moved = this.pairs[source.index];
    this.pairs.splice(source.index, 1);
    this.pairs.splice(destination.index, 0, moved);
    this.api.saveData(this.pairs);
  };

  fetchData = (from: string, to: string) => {
    const { addPair, getPrices, hasPair } = this;

    if (!hasPair(from, to)) {
      addPair(from, to);
    }

    getPrices();
  };

  checkSymbol = async (sym: string) => {
    try {
      const res = await this.api.getPrice(sym, sym);

      return !!res[sym.toUpperCase()];
    } catch (e) {
      return false;
    }
  };

  getPrices = () => {
    clearTimeout(this.refreshToken);

    this.api
      .getPrices(this.fromAll, this.toAll)
      .then(
        action((prices: any) => {
          this.lastPrices = this.prices;
          this.prices = prices;
          this.lastUpdateTime = new Date().getTime();
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
