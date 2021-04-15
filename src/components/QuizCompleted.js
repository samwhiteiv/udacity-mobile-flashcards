import React from 'react'
import { connect } from 'react-redux'
import AppMain from './AppMain'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { Title, Divider, Colors, Paragraph, Button as PaperButton } from "react-native-paper";

function QuizCompleted (props) {
  const { navigation, deckId, score, handleResetQuiz } = props

  const handleRestartQuizPress = () => {
    handleResetQuiz()
  }

  const handleBackToDeckPress = (deckId) => {
    handleResetQuiz()
    navigation.navigate('DeckDetail', {
      navigation,
      deckId
      //title: deck.title
    })
  }

  return (
    <AppMain navigation={navigation}>
      <ScrollView style={styles.scrollView}>
        <Title style={styles.paragraph}>Quiz Completed</Title>
        <Paragraph style={styles.paragraph}>You got {score}% of the cards correct</Paragraph>
        <PaperButton
          style={styles.buttonGeneric}
          mode="contained"
          onPress={() => handleRestartQuizPress(deckId)}
        >
          Restart Quiz
        </PaperButton>
        <PaperButton
          style={styles.buttonGeneric}
          mode="outlined"
          onPress={() => handleBackToDeckPress(deckId)}
        >
          Back to Deck
        </PaperButton>
      </ScrollView>
    </AppMain>
  )
}

export default QuizCompleted

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
  buttonGeneric: {
    width: '100%',
    textTransform: "none",
    marginTop: 16
  }
});