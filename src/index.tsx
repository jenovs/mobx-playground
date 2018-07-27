import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import './index.css';

import App from './App';
import Store from './Store';

const data = new Store();

ReactDOM.render(
  <Provider data={data}>
    <App />
  </Provider>,
  document.getElementById('root')
);
