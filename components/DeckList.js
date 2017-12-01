import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getAllDecksTemp } from '../utils/api';
import DeckItem from './DeckItem';

export default class DeckList extends React.Component {

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <DeckItem deck={item} navigation={this.props.navigation} />
    </View>
  );

  render() {
    const decks = getAllDecksTemp();

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
