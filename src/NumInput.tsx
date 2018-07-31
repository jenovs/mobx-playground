import React, { Component, FormEvent } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import Store from './Store';

interface IProps {
  data?: Store;
  id: number;
}

@inject('data')
@observer
class NumInput extends Component<IProps, {}> {
  @observable amount = this.props.data!.amountById(this.props.id);
  @observable inputVal = '';

  @action
  handleChange = (e: FormEvent) => {
    const { data, id } = this.props;

    this.inputVal = (e.target as HTMLInputElement).value;

    data!.addAmount(id, !isNaN(Number(this.inputVal)) ? this.inputVal : '');
    this.amount = data!.amountById(id);
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.formatAmount();
  };

  handleBlur = () => {
    this.formatAmount();
  };

  @action
  formatAmount = () => {
    const { data, id } = this.props;

    if (Number(this.amount) <= 0) {
      data!.addAmount(id, '1');
    } else if (this.amount.charAt(0) === '.') {
      data!.addAmount(id, `0${this.inputVal}`);
    } else {
      data!.addAmount(id, `${Number(this.inputVal)}`);
    }

    this.amount = data!.amountById(id);
  };

  render() {
    const { amount, handleBlur, handleChange, handleSubmit } = this;

    return (
      <form onSubmit={handleSubmit} noValidate={true}>
        <input
          data-testid="num-input"
          type="number"
          value={amount}
          onClick={e => (e.target as HTMLInputElement).select()}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </form>
    );
  }
}

export default NumInput;
