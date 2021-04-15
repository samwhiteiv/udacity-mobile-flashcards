import React, { useState } from 'react'
import { connect } from 'react-redux'
import AppMain from './AppMain'
import { StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native'
import { Colors, FAB, Button as PaperButton } from "react-native-paper"
import QuizCompleted from './QuizCompleted'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import CardFlip from "react-native-card-flip";
import { clearLocalNotification, setLocalNotification } from "../utils/notifications"; 

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      cardRotated: false,
      questionIndex: 0,
      correctCount: 0,
      quizCompleted: false,
      userViewedAnswer: 0,
      actionsDisabled: false,
      actionsFadeValue: new Animated.Value(1)
    };
    this.handleResetQuiz = this.handleResetQuiz.bind(this);
  }
  _handleActionsFade = () => {
    Animated.timing(this.state.actionsFadeValue, {
      toValue: 0.3,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  handleCardFlip() {
    if (!this.state.quizCompleted) {
      this.card.flip();
      if (!this.state.cardRotated) {
        this.setState({
          viewedAnswer: ++this.state.userViewedAnswer
        });
      }
    }
  }

  handleResetQuiz = () => {
    this.setState({
      quizCompleted: false,
      cardRotated: false,
      questionIndex: 0,
      correctCount: 0,
      userViewedAnswer: 0
    })
  }

  scheduleNotificaiton() {
    clearLocalNotification().then(setLocalNotification);
  }

  handleMarkQuestion(isCorrect) {
    if (!this.state.quizCompleted) {
      const updatedQuestionIndex = this.state.questionIndex + 1;
      this.state.viewedAnswer === 0 && this.handleCardFlip();
      this._handleActionsFade();
      this.setState({
        actionsDisabled: true
      });

      setTimeout(
        function() {
          if (this.props.deck.questions.length != updatedQuestionIndex) {
            this.handleCardFlip();
            this._handleActionsFade();
          }
          setTimeout(
            function() {
              this.setState((state, props) => {
                return {
                  correctCount: isCorrect
                    ? ++state.correctCount
                    : state.correctCount,
                  questionIndex: updatedQuestionIndex,
                  quizCompleted:
                    props.deck.questions.length === updatedQuestionIndex,
                  viewedAnswer: 0,
                  actionsDisabled: false
                };
              });
            }.bind(this),
            400
          );
        }.bind(this),
        1000
      );
    } else {
      scheduleNotificaiton();
    }
  }

  render() {
    const deck = this.props.deck
    const quizScore = Math.round((this.state.correctCount/deck.questions.length) * 100)

    if (this.state.quizCompleted) return <QuizCompleted navigation={this.props.navigation} score={quizScore} deckId={deck.id} handleResetQuiz={this.handleResetQuiz} />

    return (
      <AppMain navigation={this.props.navigation}>
        <View style={styles.cardContainer}>
          <CardFlip style={styles.cardFlip} ref={card => (this.card = card)}>
            <TouchableOpacity
              style={[styles.card, styles.card1]}
              activeOpacity={0.9}
              onPress={() => this.handleCardFlip()}
            >
              <Text style={[styles.label, styles.label1]}>
                {deck.questions[this.state.questionIndex].question}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, styles.card2]}
              activeOpacity={0.9}
              onPress={() => this.handleCardFlip()}
            >
              <Text style={[styles.label, styles.label2]}>
                {deck.questions[this.state.questionIndex].answer}
              </Text>
            </TouchableOpacity>
          </CardFlip>
          <Text style={styles.remainingQuestionText}>
            {deck.questions.length - this.state.questionIndex}{" "}
            {deck.questions.length - this.state.questionIndex > 1
              ? "questions "
              : "question "}
            remaining
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <FAB
            style={[
              styles.fab,
              styles.fabCenter,
              this.state.actionsDisabled && {
                opacity: this.state.actionsFadeValue
              }
            ]}
            disabled={this.state.actionsDisabled}
            color={Colors.white}
            small
            icon="rotate-right"
            onPress={() => this.handleCardFlip()}
          />
          <FAB
            style={[
              styles.fab,
              styles.fabLeft,
              this.state.actionsDisabled && {
                opacity: this.state.actionsFadeValue
              }
            ]}
            disabled={this.state.actionsDisabled}
            color={Colors.red500}
            icon="thumb-down"
            onPress={() => this.handleMarkQuestion(false)}
          />
          <FAB
            style={[
              styles.fab,
              styles.fabRight,
              this.state.actionsDisabled && {
                opacity: this.state.actionsFadeValue
              }
            ]}
            disabled={this.state.actionsDisabled}
            color={Colors.green500}
            icon="thumb-up"
            onPress={() => this.handleMarkQuestion(true)}
          />
        </View>
      </AppMain>
    )
  }
}

function mapStateToProps({ decks }, props) {
  const deckId = props.route.params.deckId;
  return {
    deck: decks[deckId],
  };
}

let QuizContainer = connect(mapStateToProps)(Quiz)
export default QuizContainer

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
  },
  root: {
    //backgroundColor: "#4BB6F3"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  animatedCardContainer: { flex: 1 },
  cardContainer: {
    flex: 4,
    alignItems: "center"
  },
  cardFlip: {
    flex: 1,
    height: hp("100%"),
    width: wp("100%") - 45,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10
  },
  actionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 2,
      height: 1
    },
    shadowOpacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  card1: {
    backgroundColor: Colors.purple900
  },
  card2: {
    backgroundColor: Colors.purple500
  },
  label: {
    textAlign: "center",
    fontSize: 24,
    padding: 20,
    fontFamily: "System"
  },
  label1: { color: Colors.white },
  label2: { color: Colors.white },
  fab: {
    position: "absolute",
    margin: 60,
    bottom: 0,
    zIndex: 9999,
    borderWidth: 5,
    borderRadius: 50,
    backgroundColor: "#FFF"
  },
  fabCenter: {
    marginBottom: 50,
    borderWidth: 0,
    backgroundColor: Colors.purple500
  },
  fabLeft: {
    left: 0,
    marginBottom: 20,
    borderColor: Colors.red500
  },
  fabRight: {
    right: 0,
    marginBottom: 20,
    borderColor: Colors.green500
  },
  quizCompletedContainer: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  remainingQuestionText: {
    fontSize: 16,
    paddingTop: 20,
    color: Colors.grey500
  }
});