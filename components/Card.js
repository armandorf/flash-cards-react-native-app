import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { white, black, gray, orange, green } from '../utils/colors';

export default class Card extends React.Component {

  state = {
    showAnswer: false,
  };

  showAnswerOrQuestion = () => {
    this.setState({
      showAnswer: !this.state.showAnswer,
    });
  };

  render() {
    const {
      question,
      answer,
      incrementCorrectAnswerCount,
      loadNextQuestion,
    } = this.props;

    return (
      <View style={styles.container}>
        {!this.state.showAnswer && (
          <View>
            <Text style={styles.questionOrAnswer}>{question}</Text>
            <TouchableOpacity onPress={this.showAnswerOrQuestion}>
              <Text style={styles.showAnswer}>Answer</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
          </View>
        )}
        {this.state.showAnswer && (
          <View>
            <Text style={styles.questionOrAnswer}>{answer}</Text>
            <TouchableOpacity onPress={this.showAnswerOrQuestion}>
              <Text style={styles.showAnswer}>Question</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
          </View>
        )}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.correctBtn}
            onPress={incrementCorrectAnswerCount}
          >
            <Text style={styles.btnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.incorrectBtn}
            onPress={loadNextQuestion}
          >
            <Text style={styles.btnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCount: {
    textAlign: 'left',
    top: 0,
    left: 0,
    color: gray,
    fontSize: 20,
    marginTop: 5,
    marginLeft: 5,
  },
  questionOrAnswer: {
    textAlign: 'center',
    backgroundColor: white,
    borderColor: white,
    fontSize: 28,
    alignSelf: 'stretch',
  },
  showAnswer: {
    textAlign: 'center',
    color: gray,
    fontSize: 16,
  },
  separator: {
    height: 80,
  },
  correctBtn: {
    backgroundColor: green,
    margin: 5,
    padding: 10,
    paddingLeft: 55,
    paddingRight: 55,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
  },
  incorrectBtn: {
    backgroundColor: orange,
    margin: 5,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
  },
  btnText: {
    color: black,
    fontSize: 18,
    textAlign: 'center',
  },
});

Card.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  incrementCorrectAnswerCount: PropTypes.func.isRequired,
  loadNextQuestion: PropTypes.func.isRequired,
};
