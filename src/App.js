import React, { Component } from 'react';
import './App.css';

import { Hand } from 'react-deck-o-cards';

import { handStatus } from './util';

const newCard = ()=> ({ rank: Math.floor(Math.random()*13 + 1), suit: Math.floor(Math.random()*4) });

class App extends Component {
  state = {
    cards: [],
    handStatus: 'live',
    handTotal: 0,
    dealerHand: [ newCard() ],
  }

  hit = ()=> {
    if( this.state.handStatus === 'bust' ) console.log('should remove the button on bust');
    else this.dealCard();
  }

  stand = ()=> this.setState({ handStatus: 'standing' })
  
  dealCard = ()=>
    this.setState(state => {
      const nextCards = state.cards.concat(newCard());
      const nextHand = handStatus(nextCards);
      
      return ({
        cards: nextCards,
        handStatus: nextHand.status, // we'll use this in the next task
        handTotal: nextHand.total, // we can render this snp
      });
    })

  
  render() {
    return (
      <div className="App">
        <div className='hand dealer'>
          <Hand cards={this.state.dealerHand}/>
        </div>
        <div className='hand'>
          <Hand cards={this.state.cards}/>
        </div>
        {['bust', 'standing'].includes(this.state.handStatus) ? null : [
           <button key='hit' onClick={this.hit}>Hit me Jeeves</button>,
           <button key='stand' onClick={this.stand}>Stand</button>,
        ]}
      </div>
    );
  }
}

export default App;
