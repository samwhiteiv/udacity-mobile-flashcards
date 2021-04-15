import React from 'react'
import { Provider as ThemeProvider } from "react-native-paper"
import { Provider as StoreProvider, connect } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import reducer from "./src/store/reducers"
import thunk from "redux-thunk"
import { theme } from "./src/utils/theme"
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DeckList from './src/components/DeckList'
import DeckDetail from './src/components/DeckDetail'
import NewDeck from './src/components/NewDeck'
import NewCard from './src/components/NewCard'
import Quiz from './src/components/Quiz'
import QuizCompleted from './src/components/QuizCompleted'
import About from './src/components/About'

const configureStore = () => {
  return createStore(reducer, applyMiddleware(thunk)); 
}
const store = configureStore();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Decks" drawerPosition={`right`}>
            <Drawer.Screen name="Decks" component={DeckList} />
            <Drawer.Screen name="Add New Deck" component={NewDeck} />
            <Drawer.Screen name="About" component={About} />
            <Drawer.Screen name="DeckDetail" component={DeckDetail} options={{ drawerLabel: () => null }} />
            <Drawer.Screen name="Add New Card" component={NewCard} options={{ drawerLabel: () => null }} />
            <Drawer.Screen name="Quiz" component={Quiz} options={{ drawerLabel: () => null }} />
            <Drawer.Screen name="Quiz Completed" component={QuizCompleted} options={{ drawerLabel: () => null }} />
          </Drawer.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </StoreProvider>
  );
}