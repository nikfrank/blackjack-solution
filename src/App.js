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
    money: 10000,
    wager: 100,
  }

  componentDidMount(){
    this.nextHand();
  }
  
  componentDidUpdate(prevProps, prevState){
    if(( ['bust', 'standing', 'blackjack'].includes(this.state.handStatus) &&
         !['bust', 'standing', 'blackjack'].includes(prevState.handStatus)
    ) || (
      ( this.state.doubledDown && !prevState.doubledDown )
    ))
      this.runDealer();
  }
  
  hit = ()=> {
    if( this.state.handStatus === 'bust' ) console.log('should remove the button on bust');
    else if( this.state.doubledDown ) console.log('no hitting after doubleDown');
    else this.dealCard();
  }

  stand = ()=> this.setState({ handStatus: 'standing' })

  doubleDown = ()=>{
    if( this.state.handStatus === 'bust' ) console.log('should remove the button on bust');
    else this.setState(state => ({ wager: state.wager * 2, doubledDown: true }), this.dealCard);
  }
  
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
      if( this.state.handStatus === 'blackjack' ) this.setState(state=> ({ money: state.money + 1.5 * state.wager })); 
      else if( this.state.handStatus === 'bust' ) this.setState(state=> ({ money: state.money - state.wager }));
      else if( this.state.handTotal < 21 ) this.setState(state=> ({ money: state.money + state.wager }));
      
    } else if( dealer.status === 'standing' ){
      if( this.state.handStatus === 'blackjack' ) this.setState(state=> ({ money: state.money + 1.5 * state.wager }));
      else if( this.state.handStatus === 'bust' ) this.setState(state=> ({ money: state.money - state.wager }));
      else if( this.state.handTotal > dealer.total ) this.setState(state=> ({ money: state.money + state.wager }));
      else if( this.state.handTotal < dealer.total ) this.setState(state=> ({ money: state.money - state.wager }));
      
    } else if( dealer.status === 'blackjack' ){
      //  unless you code insurance
      this.setState(state=> ({ money: state.money - state.wager }));
      
    } else if( dealer.status === 'hitting' ){
      this.setState(state => ({ dealerHand: state.dealerHand.concat( newCard() ) }), this.runDealer);
      
    }
  }

  nextHand = ()=> {
    this.setState({
      wager: 100,
      doubledDown: false,
      handStatus: 'live',
      handTotal: 0,
      
    }, ()=> {
      const cards = [ newCard(), newCard() ];
      const hand = handStatus( cards );
      
      this.setState({
        cards,
        handStatus: hand.status,
        handTotal: hand.total,
        dealerHand: [ newCard() ],
      })
    })
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
        {['bust', 'standing', 'blackjack'].includes(this.state.handStatus) || this.state.doubledDown ? (
           <button onClick={this.nextHand}>Next</button>
        ) : [
           <button key='hit' onClick={this.hit}>Hit me Jeeves</button>,
           <button key='stand' onClick={this.stand}>Stand</button>,
           this.state.cards.length === 2 ? (
             <button key='double-down' onClick={this.doubleDown}>Double Down</button>
           ) : null,
        ]}
        <hr/>
        <div className="PlayerMoney">Bank: ${this.state.money}</div>
        <div className="PlayerWager">betting: ${this.state.wager}</div>
      </div>
    );
  }
}

export default App;
