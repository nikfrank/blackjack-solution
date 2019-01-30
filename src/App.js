import React, { Component } from 'react';
import './App.css';

import { Hand } from 'react-deck-o-cards';

class App extends Component {
  state = {
    cards: [
      { rank: 1, suit: 3 },
      { rank: 13, suit: 3 },
    ],
  }
  
  render() {
    return (
      <div className="App">
        <Hand cards={this.state.cards}/>
      </div>
    );
  }
}

export default App;
