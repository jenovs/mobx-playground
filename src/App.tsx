import React, { Component, createRef } from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import Devtools from 'mobx-react-devtools';

import Card from './Card';

const isDevelopment = process.env.NODE_ENV === 'development';

@inject('data')
@observer
class App extends Component<any, any> {
  @observable val1 = '';
  @observable val2 = '';
  ref1: React.RefObject<HTMLInputElement> = createRef();
  ref2: React.RefObject<HTMLInputElement> = createRef();

  componentDidMount() {
    this.props.data.getPrices();
  }

  handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    this[`val${name}`] = value;
    this[`ref${name}`].current.style.borderColor = 'inherit';
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { checkSymbol, fetchData } = this.props.data;

    const [input1valid, input2valid] = await Promise.all([
      checkSymbol(this.val1),
      checkSymbol(this.val2),
    ]);

    if (input1valid && input2valid) {
      fetchData(this.val1, this.val2);
      // clear inputs
      form.reset();
    } else {
      if (!input2valid) {
        this.ref2.current!.style.borderColor = 'red';
        this.ref2.current!.focus();
      }
    }
    if (!input1valid) {
      this.ref1.current!.style.borderColor = 'red';
    }

    // focus first input
    this.ref1.current!.focus();
  };

  render() {
    const { priceData } = this.props.data;

    return (
      <div style={{ margin: 'auto', maxWidth: '768px' }}>
        <div data-testid="cards">
          {isDevelopment && <Devtools />}
          {priceData.map((pair: any) => <Card key={pair.id} {...pair} />)}
        </div>
        <div>
          <form
            onSubmit={this.handleSubmit}
            style={{ margin: 'auto', maxWidth: '500px' }}
          >
            <input
              type="text"
              name="1"
              onChange={this.handleChange}
              data-testid="input-1"
              ref={this.ref1}
            />
            <input
              type="text"
              name="2"
              onChange={this.handleChange}
              data-testid="input-2"
              ref={this.ref2}
            />
            <button type="submit">Get Price</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
