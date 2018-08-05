import { IPairs } from '../Store';

export default class Api {
  baseUrl = `https://min-api.cryptocompare.com/data/`;

  getCoinlist() {
    const { baseUrl } = this;

    return fetch(`${baseUrl}all/coinlist`)
      .then(res => res.json())
      .then(this.checkError)
      .then(json => json.Data);
  }

  getPrice(fsym: string, tsym: string) {
    const { baseUrl } = this;

    return fetch(
      `${baseUrl}price?fsym=${fsym.toUpperCase()}&tsyms=${tsym.toUpperCase()}`
    )
      .then(res => res.json())
      .then(this.checkError);
  }

  getPrices(fsyms: string, tsyms: string) {
    const { baseUrl } = this;

    return fetch(
      `${baseUrl}pricemulti?fsyms=${fsyms.toUpperCase()}&tsyms=${tsyms.toUpperCase()}`
    )
      .then(res => res.json())
      .then(this.checkError)
      .then(json => json);
  }

  checkError(json: any) {
    if (json.Response === 'Error') {
      throw json.Message || 'Fetching error';
    }
    return json;
  }

  saveData(json: any): void {
    localStorage.setItem('pairs', JSON.stringify(json));
  }

  loadData(): IPairs[] | null {
    const data = localStorage.getItem('pairs');
    return data && JSON.parse(data);
  }
}
