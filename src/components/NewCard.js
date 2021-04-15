import React, { useState } from 'react'
import { connect } from 'react-redux'
import AppMain from './AppMain'
import { StyleSheet, ScrollView, Text, View, KeyboardAvoidingView} from 'react-native'
import { Card, Colors, Button as PaperButton, Title, Paragraph, TextInput} from "react-native-paper"
import { handleAddCardToDeck } from "../store/actions"

function NewCard (props) {
  const { navigation, addCardToDeck } = props
  const deckId = props.route.params.deckId
  const [ question, setQuestion ] = useState('')
  const [ answer, setAnswer ] = useState('')

  const handleSubmit = () => {
    const formIsValid = !!question && !!answer
    if(!formIsValid) return alert('Please fill out the form completely.')

    addCardToDeck(deckId, {
      question,
      answer
    })
    /** reset form values */
    setQuestion('')
    setAnswer('')
    navigation.navigate('Decks')
  }
  
  return (
    <AppMain navigation={navigation}>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">
        <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Paragraph>Enter your question</Paragraph>
              <TextInput
                label="Question"
                returnKeyType="done"
                onChangeText={(evt) => setQuestion(evt)}
                autoCapitalize="sentences"
              />
            </Card.Content>
            <Card.Content style={styles.cardContent}>
              <Paragraph>Enter your answer</Paragraph>
              <TextInput
                label="Answer"
                returnKeyType="done"
                onChangeText={(evt) => setAnswer(evt)}
                autoCapitalize="sentences"
              />
            </Card.Content>
            <Card.Actions>
              <PaperButton
                mode="contained"
                onPress={(evt) => handleSubmit(evt)}
                style={styles.buttonGeneric}
              >
                Add New Card To Deck
              </PaperButton>
            </Card.Actions>
          </Card>
        </KeyboardAvoidingView>
        </View>
      </ScrollView> 
    </AppMain>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    addCardToDeck: (deckId, card) => {
      dispatch(handleAddCardToDeck(deckId, card))
    }
  }
}

let NewCardContainer = connect(null, mapDispatchToProps)(NewCard)
export default NewCardContainer

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
    //margin: 16,
    width: '100%',
    textTransform: "none"
  }
});