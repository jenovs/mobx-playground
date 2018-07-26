import React, { Component } from 'react';
import { computed } from 'mobx';

import { observer } from 'mobx-react';

@observer
class App extends Component<any, any> {
  @computed
  get string() {
    return `Passed ${this.props.appState.timer} seconds`;
  }

  handleReset = () => {
    this.props.appState.resetTimer();
  };

  render() {
    return (
      <div>
        <button onClick={this.handleReset}>Reset</button>
        <div>{this.string}</div>
      </div>
    );
  }
}

export default App;
