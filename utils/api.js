import { AsyncStorage } from 'react-native';

export function getDecks() {
  return AsyncStorage.getAllKeys()
    .then(deckTitles => AsyncStorage.multiGet(deckTitles, (err, stores) => stores))
    .then(stores => stores.map(result => JSON.parse(result[1])));
}

export function getDeck(deckTitle) {
  return AsyncStorage.getItem(deckTitle).then(deck => JSON.parse(deck));
}

export function saveDeckTitle(deckTitle) {
  const deck = {
    title: deckTitle,
    questions: [],
  };
  return AsyncStorage.setItem(deckTitle, JSON.stringify(deck));
}

export function addCardToDeck(deckTitle, card) {
  return getDeck(deckTitle)
    .then(deck => {
      deck.questions.push(card);
      AsyncStorage.setItem(deckTitle, JSON.stringify(deck));
      return deck;
    });
}
