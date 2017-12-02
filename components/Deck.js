import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { purple, white, black, gray, orange, blue, green } from '../utils/colors';

export default function Deck({ navigation }) {

  const { deck } = navigation.state.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.cardCount}>{deck.questions.length} cards</Text>
      <TouchableOpacity
        style={styles.addCardBtn}
        onPress={() => navigation.navigate('NewCard', { deck: deck })}
      >
        <Text style={styles.addCardBtnText}>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.startQuizBtn}
        onPress={() => navigation.navigate('Quiz', { deck: deck })}
      >
        <Text style={styles.startQuizBtnText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    borderColor: white,
    fontSize: 40,
  },
  cardCount: {
    textAlign: 'center',
    color: gray,
    fontSize: 24,
    marginBottom: 80,
  },
  addCardBtn: {
    backgroundColor: white,
    margin: 5,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 1,
    borderRadius: 5,
  },
  startQuizBtn: {
    backgroundColor: black,
    margin: 5,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
  },
  addCardBtnText: {
    color: black,
    fontSize: 18,
    textAlign: 'center',
  },
  startQuizBtnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center',
  },
});
