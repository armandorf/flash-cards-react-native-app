import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import DeckItem from './DeckItem';
import { getAllDecks } from '../utils/api';

export default class DeckList extends React.Component {

  state = {
    decks: [],
  };

  componentDidMount() {
    // sort decks by title (ascending)
    getAllDecks().then(decks => {
      decks.sort((a, b) => {
        titleA = a.title.toLowerCase();
        titleB = b.title.toLowerCase();
        if (titleA < titleB) {
          return -1;
        } else if (titleA > titleB) {
          return 1;
        } else {
          return 1;
        }
      });
      this.setState({ decks: decks });
    });
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <DeckItem deck={item} navigation={this.props.navigation} />
    </View>
  );

  render() {
    const { decks } = this.state;

    return (
      <View>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  item: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    justifyContent: 'center',
  },
});

DeckList.propTypes = {
  navigation: PropTypes.object.isRequired,
};
