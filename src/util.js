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

export const dealerStatus = cards=>{
  const hasAce = !!cards.find(c => c.rank === 1);
  const total = cards.reduce((p, c)=> p+ Math.min(10, c.rank), 0);

  return {
    total: hasAce && total <= 11 ? total + 10 : total,
    status: (total > 21) ? 'bust' :
            (hasAce && (total === 21)) ? 'blackjack' :
            (hasAce && (total >= 18)) ? 'standing' : // dealer hits on soft 17 lo
            (!hasAce && (total >= 17)) ? 'standing' :
            'hitting',
  };
}
