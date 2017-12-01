import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { gray, white } from '../utils/colors';

export default function DeckItem({ deck, navigation }) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('DeckDetails', { deck: deck })}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cardCount}>{deck.questions.length} cards</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    backgroundColor: white,
    borderColor: white,
    fontSize: 28,
    paddingTop: 30,
  },
  cardCount: {
    textAlign: 'center',
    backgroundColor: white,
    color: gray,
    fontSize: 18,
    paddingBottom: 30,
  },
});
