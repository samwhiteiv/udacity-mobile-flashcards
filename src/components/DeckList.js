import React from 'react'
import { connect } from 'react-redux'
import AppMain from './AppMain'
import { ScrollView, Text, StyleSheet, Button } from 'react-native'
import { Avatar, Card, Divider, Colors, Button as PaperButton } from "react-native-paper";
import { TouchableOpacity } from 'react-native-gesture-handler';

function DeckList ({navigation, decks }) {
  
  const handleDeckPress = (deck) => {
    navigation.navigate('DeckDetail', {
      navigation,
      deckId: deck.id,
      title: deck.title
    })
  }

  return (
    <AppMain navigation={navigation}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.paragraph}>Select a Deck</Text>
        {decks && Object.keys(decks).map((deckId) => (
          <TouchableOpacity 
            key={deckId}
            onPress={() => handleDeckPress(decks[deckId])}
            style={{width: '100%'}}
          >
            <Card.Title
              title={decks[deckId].title}
              left={props => (
                <Avatar.Icon
                  {...props}
                  style={styles.avatarIcon}
                  icon="folder"
                  color={Colors.white}
                />
              )}
              right={props => (
                <Avatar.Text
                  size={24}
                  style={styles.avatarText}
                  label={decks[deckId].questions.length}
                />
              )}
            />
            <Divider />
          </TouchableOpacity>
        ))}
        <PaperButton
          style={{marginTop: 16, }}
          title="Add New Deck"
          mode="contained"
          onPress={() => navigation.navigate('Add New Deck')}
        >
          Add New Deck
        </PaperButton>
      </ScrollView> 
    </AppMain>
  )
}

let DeckListContainer = connect(state => ({ decks: state.decks }))(DeckList)
export default DeckListContainer

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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.purple900
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "500"
  },
  avatarIcon: {
    //backgroundColor: Colors.purple500
  },
  avatarText: {
    marginRight: 16,
  }
});