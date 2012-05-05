Template.editor.show = function () {
  return !!Session.get('editor');
};

Template.editor.deckName = function () {
	var myDeck = currentPlayerDeck();
  return myDeck && myDeck.name;
};

Template.editor.cards = function () {
  var myDeck = currentPlayerDeck();
  return myDeck ? myDeck.card_names : [];
};

Template.editor.events = {
  'click #done-editing': function (e) {
    Session.set('editor', false);
    e.preventDefault();
  },
  'submit #add-card-form': function (e) {
    var cardName = $.trim($('#new-card').val());
    if (cardName.length > 0) {
      var me = currentPlayer();
      if (me) {
        Decks.update(me.deck_id, {$push: {card_names: cardName}});
      }
    }
    e.preventDefault();
  },
  'click .card': function (e) {
    var cardName = $(e.target).attr('title');
    if (cardName && cardName.length > 0) {
      var me = currentPlayer();
      if (me) {
        Decks.update(me.deck_id, {$pull: {card_names: cardName}});
      }
    }
  }
};



