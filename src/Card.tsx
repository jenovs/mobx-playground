import React from 'react';
import { inject, observer } from 'mobx-react';

import NumInput from './NumInput';

const style = {
  numInput: {
    display: 'flex',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '1rem auto',
    width: '500px',
  },
};

const Card = inject('data')(
  observer(({ amount, data, id, from, to, price }) => {
    const total = price * (amount === undefined ? 1 : amount);
    const formatTotal = (t: number) => {
      return t >= 1 ? t.toFixed(2) : t > 0 ? t : '...';
    };

    return (
      <div style={style.wrapper} data-testid="card">
        <div style={style.numInput}>
          <NumInput id={id as number} /> {from}
        </div>
        <div>
          {formatTotal(total)} {to}
        </div>
        <button onClick={() => data.deletePair(id)}>Delete</button>
      </div>
    );
  })
);

export default Card;
