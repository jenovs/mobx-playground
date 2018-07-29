import React, { Component, FormEvent, createRef } from 'react';
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
  @observable inputVal = String(this.props.data!.amountById(this.props.id));
  @observable amount = this.props.data!.amountById(this.props.id);
  inputRef: React.RefObject<HTMLInputElement> = createRef();

  @action
  handleChange = (e: FormEvent) => {
    const { data, id } = this.props;

    this.inputVal = (e.target as HTMLInputElement).value;

    data!.addAmount(id, this.inputVal === '' ? -1 : Number(this.inputVal));
    this.amount = this.props.data!.amountById(this.props.id);
  };

  @action
  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { data, id } = this.props;

    if (this.amount <= 0) {
      data!.addAmount(id, 1);
    }

    this.amount = data!.amountById(id);

    if (this.inputVal.charAt(0) === '.') {
      this.inputVal = `0${this.amount}`;
    }

    this.inputRef.current!.blur();
  };

  render() {
    const { amount, handleChange, handleSubmit, inputRef } = this;
    const formatValue = (val: number) => (val === -1 ? '' : String(val));

    return (
      <form onSubmit={handleSubmit} noValidate={true}>
        <input
          data-testid="num-input"
          ref={inputRef}
          type="number"
          value={formatValue(amount)}
          onClick={e => (e.target as HTMLInputElement).select()}
          onChange={handleChange}
          onBlur={handleSubmit}
        />
      </form>
    );
  }
}

export default NumInput;
