import React from 'react';
import { inject, observer } from 'mobx-react';

const style = {
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '1rem auto',
    width: '500px',
  },
};

const Card = inject('data')(
  observer(({ data, id, from, to, price }) => (
    <div style={style.wrapper} data-testid="card">
      <div>1 {from}</div>
      <div>
        {price || '...'} {to}
      </div>
      <button onClick={() => data.deletePair(id)}>Delete</button>
    </div>
  ))
);

export default Card;
