import React from 'react';
import ReactDOM from 'react-dom';
import { observable, action } from 'mobx';

import App from './App';
import './index.css';

const appState: any = observable({ timer: 0 });

appState.resetTimer = action(function reset() {
  appState.timer = 0;
});

setInterval(
  action(function tick() {
    appState.timer += 1;
  }),
  1000
);

ReactDOM.render(<App appState={appState} />, document.getElementById('root'));
