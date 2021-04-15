import {
  _getDecks,
  _saveNewDeck,
  _saveCardToDeck,
  _removeDeck,
} from "../../utils/api"

/** Declare action types */
export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const ADD_DECK = "ADD_DECK"
export const ADD_CARD = "ADD_CARD"
export const DELETE_DECK = "DELETE_DECK"
export const RESET_NEW_DECK_ID = "RESET_NEW_DECK_ID"

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function addCardToDeck(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card
  };
}

export function deleteDeck(deckId) {
  return {
    type: DELETE_DECK,
    deckId
  }
}

export function resetNewDeckId() {
  return {
    type: RESET_NEW_DECK_ID
  }
}

export function handleInitialData() {
  return dispatch => {
    return _getDecks()
      .then(decks => {
        dispatch(receiveDecks(decks));
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function handleAddDeck(id, deckTitle) {
  return dispatch => {
    return _saveNewDeck(id, deckTitle)
      .then(deck => {
        dispatch(addDeck(deck));
      })
      .catch(err => console.log('An error occurred in handleAddDeck > _saveNewDeck: ', err))
  };
}

export function handleAddCardToDeck(deckId, card) {
  return dispatch => {
    return _saveCardToDeck(deckId, card)
      .then(() => {
        dispatch(addCardToDeck(deckId, card));
      });
  };
}

export function handleDeleteDeck(deckId) {
  return dispatch => {
    return _removeDeck(deckId).then(() => {
      dispatch(deleteDeck(deckId));
    });
  };
}