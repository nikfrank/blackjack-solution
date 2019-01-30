import { handStatus, dealerStatus } from '../src/util';

it('should calculate bust blackjack or live hand status', ()=>{
  const blackjackCards = [ { rank: 1, suit: 0 }, { rank: 13, suit: 0 } ];

  expect( handStatus(blackjackCards).total ).toEqual( 21 );
  expect( handStatus(blackjackCards).status ).toEqual( 'blackjack' );

  // etc.
});

it('should calculate the correct dealer action', ()=>{
  const softSeventeen = [ { rank: 1, suit: 3 }, { rank: 6, suit: 2 } ];

  expect( dealerStatus( softSeventeen ).total ).toEqual( 17 );
  expect( dealerStatus( softSeventeen ).status ).toEqual( 'hitting' );
});
