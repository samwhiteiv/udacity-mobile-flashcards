import { combineReducers } from 'redux'
import { 
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  DELETE_DECK,
  RESET_NEW_DECK_ID
} from '../actions'

function decks(state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      const { deck } = action
      return {
        ...state,
        [deck.id]: deck
      }
    case ADD_CARD:
      const { deckId, card } = action
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: state[deckId].questions.concat([card])
        }
      }
    case DELETE_DECK:
      delete state[action.deckId]
      return {
        ...state
      }
    default:
      return state
  }
}

function newDeckId(state = {}, action) {
  switch(action.type){
    case ADD_DECK:
      const { deck } = action; 
      return {
        ...state,
        newDeckId: deck.id
      }
    case RESET_NEW_DECK_ID:
      return {
        ...state,
        newDeckId: null,
      }
    default :
        return state;
  }
}

// A very simple reducer
function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

export default combineReducers({
  decks,
  newDeckId,
  count: counter
})