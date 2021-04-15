import React from 'react'
import { connect } from 'react-redux'
import AppMain from './AppMain'
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native'
import { Title, Paragraph, Button as PaperButton, Avatar, Card, Divider, Colors, FAB } from "react-native-paper"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { handleDeleteDeck } from "../store/actions"


function DeckDetail ({navigation, route, decks, deleteDeck}) {
  const { title, deckId } = route.params
  const deck = decks[deckId]

  const handleStartQuizPress = (deckId) => {
    navigation.navigate('Quiz', {
      deckId,
      isNewQuiz: true
    })
  }

  const handleAddCardPress = (deckId) => {
    navigation.navigate('Add New Card', {
      deckId
    })
  }

  const handleDeleteDeckPress = (deckId) => {
    deleteDeck(deckId)
    navigation.navigate('Decks')
  }

  if(!deck) return <ScrollView><Text>This Deck Does Not Exist</Text></ScrollView>

  return (
    <AppMain navigation={navigation} title={title}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Title>{deck.title}</Title>
          <Paragraph>{deck.questions.length} Flashcards</Paragraph>
          <PaperButton
            style={styles.buttonGeneric}
            mode="contained"
            disabled={deck.questions.length < 1 ? true : false}
            onPress={() => handleStartQuizPress(deck.id)}
          >
            Start Quiz
          </PaperButton>
          <PaperButton
            style={styles.buttonGeneric}
            mode="outlined"
            onPress={() => handleAddCardPress(deck.id)}
          >
            Add New Card
          </PaperButton>
          <PaperButton
            style={styles.buttonDeleteDeck}
            labelStyle={styles.buttonDeleteDeckLabel}
            mode="text"
            onPress={() => handleDeleteDeckPress(deck.id)}
          >
            Delete Deck
          </PaperButton>
        </View>
      </ScrollView>
    </AppMain>
  )
}

/* function mapStateToProps({ decks }, navigation) {
  const { deckId } = navigation.params
  return {
    deck: decks[deckId]
  }
} */

function mapDispatchToProps(dispatch) {
  return {
    deleteDeck: (deckId) => {
      dispatch(handleDeleteDeck(deckId))
    }
  }
}

//TODO: don't pass the decks
let DeckDetailContainer = connect(state => ({ decks: state.decks }), mapDispatchToProps)(DeckDetail)
export default DeckDetailContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
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
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "500"
  },
  buttonDeleteDeckLabel: {
    color: Colors.red500,
    textTransform: "none"
  },
  buttonGeneric: {
    margin: 16,
    width: '100%',
    textTransform: "none"
  }
});