import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
// import Devtools from 'mobx-react-devtools';

import Card from './Card';

@inject('data')
@observer
class App extends Component<any, any> {
  @observable val1 = '';
  @observable val2 = '';

  componentDidMount() {
    this.props.data.getPrices();
  }

  handleSubmit = (e: any) => {
    e.preventDefault();

    const { fetchData } = this.props.data;

    fetchData(this.val1, this.val2);

    // clear inputs
    e.target.reset();
  };

  render() {
    const { priceData } = this.props.data;

    return (
      <div style={{ margin: 'auto', maxWidth: '768px' }}>
        <div data-testid="cards">
          {/* <Devtools /> */}
          {priceData.map((pair: any) => <Card key={pair.id} {...pair} />)}
        </div>
        <div>
          <form
            onSubmit={this.handleSubmit}
            style={{ margin: 'auto', maxWidth: '500px' }}
          >
            <input
              type="text"
              onChange={e => (this.val1 = e.target.value)}
              data-testid="input-1"
            />
            <input
              type="text"
              onChange={e => (this.val2 = e.target.value)}
              data-testid="input-2"
            />
            <button type="submit">Get Price</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
