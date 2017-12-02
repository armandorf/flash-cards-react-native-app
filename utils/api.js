import { AsyncStorage } from 'react-native';
import { NOTIFICATION_KEY } from './helpers';

export function getAllDecks() {
  return AsyncStorage.getAllKeys()
    .then(storageKeys => {
      const deckTitlesOnly = storageKeys.filter(key => key !== NOTIFICATION_KEY);
      return AsyncStorage.multiGet(deckTitlesOnly, (err, stores) => stores);
    })
    .then(stores => stores.map(result => JSON.parse(result[1])));
}

export function getDeck(deckTitle) {
  return AsyncStorage.getItem(deckTitle)
    .then(deck => JSON.parse(deck));
}

export function saveDeck(deckTitle) {
  const deck = {
    title: deckTitle,
    questions: [],
  };
  return AsyncStorage.setItem(deckTitle, JSON.stringify(deck))
    .then(() => getDeck(deckTitle));
}

export function addCardToDeck(deckTitle, card) {
  return getDeck(deckTitle)
    .then(deck => {
      deck.questions.push(card);
      AsyncStorage.setItem(deckTitle, JSON.stringify(deck));
      return deck;
    });
}
