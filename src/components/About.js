import React from 'react'
import { ScrollView, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import AppMain from './AppMain'

function About({ decks, navigation }) {
  return (
    <AppMain navigation={navigation}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.paragraph}>About</Text>
        {Object.keys(decks).map((deckId) => (
          <Text key={deckId}>{decks[deckId].title}</Text>
        ))}
        <Button
          title="View Decks"
          onPress={() => navigation.navigate('Decks', 
            decks
          )}
        />
      </ScrollView>
    </AppMain>
  );
}

let AboutContainer = connect(state => ({ decks: state.decks }))(About);
export default AboutContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  scrollView: {
    width: '100%', 
    padding: 8
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});