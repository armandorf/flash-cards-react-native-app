import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { white, black, gray } from '../utils/colors';
import { saveDeck } from '../utils/api';

export default class NewDeck extends React.Component {

  state = {
    deckTitle: '',
  };

  handleTitleTextChange = text => {
    this.setState({
      deckTitle: text,
    });
  };

  handleSubmit = () => {
    saveDeck(this.state.deckTitle)
      .then(deck => this.props.navigation.navigate('DeckDetails', { deck: deck }));
  };

  render() {
    const { deckTitle } = this.state;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.titleQuestionText}>What is the title of your deck?</Text>
        <TextInput
          value={deckTitle}
          placeholder='Deck title'
          style={styles.textInput}
          onChangeText={this.handleTitleTextChange}
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={this.handleSubmit}
        >
          <Text style={styles.btnText}>
            Submit
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleQuestionText: {
    textAlign: 'center',
    fontSize: 34,
    padding: 30,
  },
  textInput: {
    width: 300,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: gray,
    marginTop: 30,
    backgroundColor: white,
  },
  submitBtn: {
    backgroundColor: black,
    margin: 5,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 50,
    borderRadius: 5,
  },
  btnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center',
  },
});
