import React, { Component } from 'react';
import './App.css';

import { Hand } from 'react-deck-o-cards';

import { handStatus, dealerStatus } from './util';

const newCard = ()=> ({ rank: Math.floor(Math.random()*13 + 1), suit: Math.floor(Math.random()*4) });

class App extends Component {
  state = {
    cards: [],
    handStatus: 'live',
    handTotal: 0,
    dealerHand: [ newCard() ],
  }

  componentDidUpdate(prevProps, prevState){
    if( ['bust', 'standing'].includes(this.state.handStatus) &&
        !['bust', 'standing'].includes(prevState.handStatus) )
      this.runDealer();
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

  runDealer = ()=> {
    const dealer = dealerStatus( this.state.dealerHand );
    
    if( dealer.status === 'bust' ){
      // player not bust wins
      console.log('bust');
      
    } else if( dealer.status === 'standing' ){
      // check player hand total v dealer hand total => win/lose/push
      console.log('standing');
      
    } else if( dealer.status === 'blackjack' ){
      // player not blackjack loses, unless you code insurance
      console.log('dbj');
      
    } else if( dealer.status === 'hitting' ){
      this.setState(state => ({ dealerHand: state.dealerHand.concat( newCard() ) }), this.runDealer);
      
    }
  }

  
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
