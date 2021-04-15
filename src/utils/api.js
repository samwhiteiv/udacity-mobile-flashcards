import AsyncStorage from '@react-native-community/async-storage'
import { decks } from './_DATA'

const DECKS_STORAGE_KEY = "decks"

export async function _getDecks() {
  try {
    const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    if (results === null) {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    }
    return results === null ? decks : JSON.parse(results)
  }
  catch(err) {
    console.log('err: ', err)
  }
}

export async function _saveNewDeck(id, title) {
  const deck = {
    id: id,
    title: title,
    questions: []
  };

  await AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [id]: deck
    })
  );
  return deck;
}

export async function _saveCardToDeck(deckId, card) {
  const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  if (results) {
    const data = JSON.parse(results);
    const deck = data[deckId];
    deck.questions = deck.questions.concat([card]);
    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [deckId]: deck
      })
    );
    return card;
  }
}

export async function _removeDeck(deckId) {
  const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  if (results) {
    const data = JSON.parse(results);
    delete data[deckId];

    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    return data;
  }
  return {};
}
