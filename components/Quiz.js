import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import Card from './Card';
import ArrayIterator from 'es6-iterator/array';
import { white, black, gray, green } from '../utils/colors';

const QuizFinished = ({ styles, deck, percentage, navigation }) => {

  const resetToDeckDetails = deck => NavigationActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({
        routeName: 'Home',
        params: {
          deck: deck,
        },
      }),
      NavigationActions.navigate({
        routeName: 'DeckDetails',
        params: {
          deck: deck,
        },
      }),
    ],
  });

  const resetToStartQuiz = deck => NavigationActions.reset({
    index: 2,
    actions: [
      NavigationActions.navigate({
        routeName: 'Home',
        params: {
          deck: deck,
        },
      }),
      NavigationActions.navigate({
        routeName: 'DeckDetails',
        params: {
          deck: deck,
        },
      }),
      NavigationActions.navigate({
        routeName: 'Quiz',
        params: {
          deck: deck,
        },
      }),
    ],
  });

  return (
    <View>
      <Text style={styles.goodJobText}>Good job!</Text>
      <Text style={styles.percentageText}>Correct answers percentage: </Text>
      <Text style={styles.percentageResult}>{percentage}%</Text>
      <TouchableOpacity
        style={styles.retakeQuizBtn}
        onPress={() => navigation.dispatch(resetToStartQuiz(deck))}
      >
        <Text style={styles.btnText}>Retake quiz?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deckDetailsBtn}
        onPress={() => navigation.dispatch(resetToDeckDetails(deck))}
      >
        <Text style={styles.btnTextWhite}>Deck Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const EmptyDeck = ({ styles, deck, navigation }) => (
  <View>
    <Text style={styles.noQuestionsText}>This deck is empty</Text>
    <Text style={styles.addCartText}>Please add some questions or go back to see deck details</Text>
    <TouchableOpacity
      style={styles.addCardBtn}
      onPress={() => props.navigation.navigate('NewCard', { deck: deck })}
    >
      <Text style={styles.btnText}>Add Card</Text>
    </TouchableOpacity>
  </View>
);

export default class Quiz extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      questionsIter: new ArrayIterator(this.props.navigation.state.params.deck.questions, 'key+value'),
      correctAnswersCt: 0,
      currentCardNum: 0,
      currentCard: {},
      finished: false,
    };

    this.incrementCorrectAnswerCount = this.incrementCorrectAnswerCount.bind(this);
    this.loadNextQuestion = this.loadNextQuestion.bind(this);
  };

  incrementCorrectAnswerCount = () => {
    this.setState({
      correctAnswersCt: this.state.correctAnswersCt + 1,
    });
    this.loadNextQuestion();
  };

  componentWillMount() {
    this.loadNextQuestion();
  }

  loadNextQuestion = () => {
    const entry = this.state.questionsIter.next();
    if (!entry.done) {
      this.setState({
        currentCardNum: entry.value[0] + 1,
        currentCard: {
          ...entry.value[1],
        },
      });
    } else {
      // user has seen all the questions
      this.setState({
        finished: true,
      });
    }
  };

  calculatePercentage = numOfQuestions => parseFloat(this.state.correctAnswersCt * 100 / numOfQuestions).toFixed(2);

  render() {
    const { navigation } = this.props;
    const { deck } = navigation.state.params;
    const { currentCard, currentCardNum, finished } = this.state;
    const deckEmpty = deck.questions.length === 0;

    return (
      <View style={styles.container}>
        {deckEmpty &&
          <EmptyDeck
            styles={styles}
            deck={deck}
            navigation={navigation}
          />
        }
        {(!finished && !deckEmpty) &&
          <View style={styles.container}>
            <Text style={styles.cardCount}>{currentCardNum} of {deck.questions.length}</Text>
            <Card
              question={currentCard.question}
              answer={currentCard.answer}
              incrementCorrectAnswerCount={this.incrementCorrectAnswerCount}
              loadNextQuestion={this.loadNextQuestion}
            />
          </View>
        }
        {(finished && !deckEmpty) &&
          <QuizFinished
            styles={styles}
            percentage={this.calculatePercentage(deck.questions.length)}
            deck={deck}
            navigation={navigation}
          />
        }
      </View>
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
  cardCount: {
    position: 'absolute',
    top: 5,
    left: 5,
    color: gray,
    fontSize: 20,
  },
  goodJobText: {
    textAlign: 'center',
    fontSize: 36,
  },
  noQuestionsText: {
    textAlign: 'center',
    fontSize: 38,
    marginBottom: 20,
  },
  addCartText: {
    textAlign: 'center',
    color: gray,
    fontSize: 24,
    marginBottom: 40,
  },
  percentageText: {
    textAlign: 'center',
    color: gray,
    fontSize: 24,
  },
  percentageResult: {
    textAlign: 'center',
    color: green,
    fontSize: 38,
    marginTop: 20,
    marginBottom: 60,
  },
  deckDetailsBtn: {
    backgroundColor: black,
    margin: 5,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
  },
  retakeQuizBtn: {
    backgroundColor: white,
    margin: 5,
    padding: 10,
    paddingLeft: 60,
    paddingRight: 60,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
    borderWidth: 1,
  },
  addCardBtn: {
    backgroundColor: white,
    margin: 5,
    padding: 10,
    marginLeft: 80,
    marginRight: 80,
    borderWidth: 1,
    borderRadius: 5,
  },
  btnTextWhite: {
    color: white,
    fontSize: 18,
    textAlign: 'center',
  },
  btnText: {
    color: black,
    fontSize: 18,
    textAlign: 'center',
  },
});

QuizFinished.propTypes = {
  styles: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
  percentage: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
};

EmptyDeck.propTypes = {
  styles: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

Quiz.propTypes = {
  navigation: PropTypes.object.isRequired,
};
