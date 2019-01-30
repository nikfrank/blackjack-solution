import { handStatus } from '../src/util';

it('should calculate bust blackjack or live hand status', ()=>{
  const blackjackCards = [ { rank: 1, suit: 0 }, { rank: 13, suit: 0 } ];

  expect( handStatus(blackjackCards).total ).toEqual( 21 );
  expect( handStatus(blackjackCards).status ).toEqual( 'blackjack' );

  // etc.
});
