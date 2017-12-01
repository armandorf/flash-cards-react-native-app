import React from 'react';
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import DeckList from './components/DeckList';
import DeckItem from './components/DeckItem';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import NewCard from './components/NewCard';
import { purple, white, black, gray } from './utils/colors';

function CardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
  AddEntry: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    },
  },
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: black,
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
    labelStyle: {
      color: black,
      fontSize: 20,
    },
  },
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetails: {
    screen: Deck,
    navigationOptions: {
      title: 'Deck Details',
      headerTintColor: black,
      headerStyle: {
        backgroundColor: white,
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: black,
      headerStyle: {
        backgroundColor: white,
      },
    },
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: black,
      headerStyle: {
        backgroundColor: white,
      },
    },
  },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CardsStatusBar backgroundColor={black} barStyle='light-content' />
        <MainNavigator />
      </View>
    );
  }
}
