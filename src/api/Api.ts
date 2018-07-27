export default class Api {
  baseUrl = `https://min-api.cryptocompare.com/data/`;

  getCoinlist() {
    const { baseUrl } = this;

    return fetch(`${baseUrl}all/coinlist`)
      .then(res => res.json())
      .then(this.checkError)
      .then(json => json);
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
}
