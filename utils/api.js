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

export function getAllDecksTemp() {
  return [
    {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces',
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event',
        },
      ],
    },
    {
      title: 'JavaScript0',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.',
        },
      ],
    },
    {
      title: 'JavaScript1',
      questions: [],
    },
    {
      title: 'JavaScript2',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.',
        },
      ],
    },
    {
      title: 'JavaScript3',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.',
        },
      ],
    },
    {
      title: 'JavaScript4',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.',
        },
      ],
    },
  ];
}
