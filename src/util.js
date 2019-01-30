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
  const cardTotal = cards.reduce((p, c)=> p+ Math.min(10, c.rank), 0);
  const total = hasAce && cardTotal <= 11 ? cardTotal + 10 : cardTotal;
        
  return {
    total, 
    status: (total > 21) ? 'bust' :
            (total === 21 && cardTotal === 11) ? 'blackjack' :
            (total >= 18) ? 'standing' :
            (cardTotal >= 17) ? 'standing' :
            'hitting',
  };
}
