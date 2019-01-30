export const handStatus = cards => {
  const hand = cards.reduce((p, c)=> ({
    hasAce: p.hasAce || c.rank === 1,
    total: p.total + Math.min(10, c.rank),
  }), { total: 0 });
  
  return {
    total: hand.total + ((hand.hasAce && hand.total <= 11) ? 10 : 0) ,
    hasAce: hand.hasAce,
    status: ( hand.total > 21 ) ? 'bust' :
            ( hand.total === 11 && hand.hasAce ) ? 'blackjack' :
            'live',
  };
};
