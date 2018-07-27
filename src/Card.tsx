import React from 'react';
import { observer } from 'mobx-react';

const style = {
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '1rem auto',
    width: '500px',
  },
};

const Card = observer(({ from, to, price }) => (
  <div style={style.wrapper}>
    <div>1 {from}</div>
    <div>
      {price || '...'} {to}
    </div>
  </div>
));

export default Card;
