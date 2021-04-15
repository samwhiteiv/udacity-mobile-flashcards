import React, { useState } from 'react'
import { connect } from 'react-redux'
import AppMain from './AppMain'
import { StyleSheet, ScrollView, Text, View, KeyboardAvoidingView} from 'react-native'
import { Card, Colors, Button as PaperButton, Title, Paragraph, TextInput} from "react-native-paper"
import { handleAddDeck } from "../store/actions"
import { generateUID } from "../utils/generateUid";

function NewDeck (props) {
  const { navigation, addDeck } = props
  const [ deckName, setDeckName ] = useState('')

  const handleSubmit = (evt) => {
    if(!deckName) return alert('Please enter a valid deck name')
    const newId = generateUID();
    addDeck(newId, deckName)
    navigation.navigate('DeckDetail', {
      navigation,
      deckId: newId,
      title: deckName
    })
  }
  
  return (
    <AppMain navigation={navigation}>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">
        <View style={styles.container}>
        <Title>Add New Deck</Title>
        <KeyboardAvoidingView behavior="padding">
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Paragraph>What is the name of your new deck?</Paragraph>
              <TextInput
                label="Deck Name"
                returnKeyType="done"
                onChangeText={(evt) => setDeckName(evt)}
                autoCapitalize="sentences"
              />
            </Card.Content>
            <Card.Actions>
              <PaperButton
                mode="contained"
                onPress={(evt) => handleSubmit(evt)}
                style={styles.buttonGeneric}
              >
                Create New Deck
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
    addDeck: (id, deckName) => {
      dispatch(handleAddDeck(id, deckName))
    }
  }
}

let NewDeckContainer = connect(null, mapDispatchToProps)(NewDeck)
export default NewDeckContainer

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