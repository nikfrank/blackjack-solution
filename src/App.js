import React, { Component } from 'react';
import './App.css';

import { Hand } from 'react-deck-o-cards';

const newCard = ()=> ({ rank: Math.floor(Math.random()*13 + 1), suit: Math.floor(Math.random()*4) });

class App extends Component {
  state = {
    cards: [
      { rank: 1, suit: 3 },
      { rank: 13, suit: 3 },
    ],
  }

  hit = ()=> this.setState(state=> ({ cards: [...state.cards, newCard()] }) )
  
  render() {
    return (
      <div className="App">
        <Hand cards={this.state.cards}/>
        <button onClick={this.hit}>Hit me Jeeves</button>
      </div>
    );
  }
}

export default App;
