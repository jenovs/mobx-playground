import React from 'react';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import 'jest-dom/extend-expect';

import NumInput from './NumInput';

describe('NumInput component', () => {
  let cache: any;
  let store: any;
  let renderFn: any;

  beforeEach(() => {
    cache = { 2: '13', 5: '42' };

    store = observable({
      addAmount: (id: number, amount: string) => {
        cache[id] = amount;
      },
      amountById: (id: number) => {
        return cache[id];
      },
    });

    const props = {
      id: 2,
    };

    renderFn = (p: any) => ({
      ...render(
        <Provider data={store}>
          <NumInput {...props} {...p} />
        </Provider>
      ),
    });
  });

  afterEach(cleanup);

  it('shows an input field with a value', () => {
    const { getByTestId } = renderFn();

    const inputField = getByTestId('num-input') as HTMLInputElement;

    expect(inputField).toBeVisible();
    expect(inputField.value).toBe('13');
    expect(cache).toEqual({ 2: '13', 5: '42' });
  });

  it('reacts to input 0', () => {
    const { getByTestId } = renderFn();

    const inputField = getByTestId('num-input') as HTMLInputElement;

    expect(cache).toEqual({ 2: '13', 5: '42' });
    inputField.value = '0';
    fireEvent.change(inputField);
    expect(inputField.value).toBe('0');
    expect(cache).toEqual({ 2: '0', 5: '42' });
  });

  it('reacts to input 42', () => {
    const { getByTestId } = renderFn({ id: 5 });

    const inputField = getByTestId('num-input') as HTMLInputElement;

    expect(cache).toEqual({ 2: '13', 5: '42' });
    inputField.value = '88';
    fireEvent.change(inputField);
    expect(cache).toEqual({ 2: '13', 5: '88' });
    expect(inputField.value).toBe('88');
  });

  it('does not react to input `abc`', () => {
    const { getByTestId } = renderFn();
    const inputField = getByTestId('num-input') as HTMLInputElement;

    expect(cache).toEqual({ 2: '13', 5: '42' });
    inputField.value = 'abc';
    fireEvent.change(inputField);
    expect(cache).toEqual({ 2: '', 5: '42' });

    expect(inputField.value).toBe('');
  });

  it('sets invalid input on submit to 1', () => {
    const { getByTestId } = renderFn();

    const inputField = getByTestId('num-input') as HTMLInputElement;

    expect(cache).toEqual({ 2: '13', 5: '42' });
    inputField.value = 'abc';
    fireEvent.change(inputField);
    fireEvent.submit(inputField);
    expect(cache).toEqual({ 2: '1', 5: '42' });
    expect(inputField.value).toBe('1');
  });

  it('sets invalid input on blur to 1', () => {
    const { getByTestId } = renderFn();

    const inputField = getByTestId('num-input') as HTMLInputElement;

    expect(cache).toEqual({ 2: '13', 5: '42' });
    inputField.value = 'abc';
    fireEvent.change(inputField);
    fireEvent.blur(inputField);
    expect(cache).toEqual({ 2: '1', 5: '42' });
    expect(inputField.value).toBe('1');
  });

  it('converts .12 to 0.12', () => {
    const { getByTestId } = renderFn();

    const inputField = getByTestId('num-input') as HTMLInputElement;

    expect(cache).toEqual({ 2: '13', 5: '42' });
    inputField.value = '.12';
    fireEvent.change(inputField);
    expect(cache).toEqual({ 2: '.12', 5: '42' });
    expect(inputField.value).toBe('.12');
    fireEvent.submit(inputField);
    expect(inputField.value).toBe('0.12');
  });

  it('converts .01 to 0.01 on submit', () => {
    const { getByTestId } = renderFn();

    const inputField = getByTestId('num-input') as HTMLInputElement;

    expect(cache).toEqual({ 2: '13', 5: '42' });
    inputField.value = '.01';
    fireEvent.change(inputField);
    fireEvent.submit(inputField);
    expect(cache).toEqual({ 2: '0.01', 5: '42' });
    expect(inputField.value).toBe('0.01');
  });

  it('converts .01 to 0.01 on blur', () => {
    const { getByTestId } = renderFn({ id: 5 });

    const inputField = getByTestId('num-input') as HTMLInputElement;

    expect(cache).toEqual({ 2: '13', 5: '42' });
    inputField.value = '.01';
    fireEvent.change(inputField);
    fireEvent.blur(inputField);
    expect(cache).toEqual({ 2: '13', 5: '0.01' });
    expect(inputField.value).toBe('0.01');
  });

  it('converts .00 to 1 on blur', () => {
    const { getByTestId } = renderFn({ id: 5 });

    const inputField = getByTestId('num-input') as HTMLInputElement;

    expect(cache).toEqual({ 2: '13', 5: '42' });
    inputField.value = '.00';
    fireEvent.change(inputField);
    fireEvent.blur(inputField);
    expect(cache).toEqual({ 2: '13', 5: '1' });
    expect(inputField.value).toBe('1');
  });

  it('converts 0.00 to 1 on blur', () => {
    const { getByTestId } = renderFn({ id: 5 });

    const inputField = getByTestId('num-input') as HTMLInputElement;

    expect(cache).toEqual({ 2: '13', 5: '42' });
    inputField.value = '0.00';
    fireEvent.change(inputField);
    fireEvent.blur(inputField);
    expect(cache).toEqual({ 2: '13', 5: '1' });
    expect(inputField.value).toBe('1');
  });

  it('converts 2.0 to 2 on blur', () => {
    const { getByTestId } = renderFn({ id: 5 });

    const inputField = getByTestId('num-input') as HTMLInputElement;

    expect(cache).toEqual({ 2: '13', 5: '42' });
    inputField.value = '2.0';
    fireEvent.change(inputField);
    fireEvent.blur(inputField);
    expect(cache).toEqual({ 2: '13', 5: '2' });
    expect(inputField.value).toBe('2');
  });

  it('doesn not change 0.01 on blur', () => {
    const { getByTestId } = renderFn({ id: 5 });

    const inputField = getByTestId('num-input') as HTMLInputElement;

    expect(cache).toEqual({ 2: '13', 5: '42' });
    inputField.value = '0.01';
    fireEvent.change(inputField);
    expect(cache).toEqual({ 2: '13', 5: '0.01' });
    fireEvent.blur(inputField);
    expect(inputField.value).toBe('0.01');
  });
});
