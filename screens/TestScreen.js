import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    Text
} from 'react-native'
import Question from '../components/Question'
import { itQuestions, foodQuestions, historyQuestions, marvelQuestions, dcQuestions } from '../assets/questions'
import { useNavigation, useRoute } from '@react-navigation/native'

const TestScreen = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [points, setPoints] = useState(0);
  const route = useRoute()
  const navigation = useNavigation();
  const [timerCount, setTimer] = useState(30)

  /*useEffect(() => {
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        //lastTimerCount <= 1 && clearInterval(interval)
        if((lastTimerCount-1) === 0) {
          nextQuestion();
        }
        console.log('test');
        return lastTimerCount - 1
    })
    }, 1000) //each count lasts for a second
    //cleanup the interval on complete

    if(questionNumber + 1 <= questions.length)
      return () => clearInterval(interval)
  }, []);*/


  const checkIfTrue = (odp) => {
    if(odp === true) {
      setPoints(prev => prev += 1);
      console.log(points)
    }
    nextQuestion();
  }

  const nextQuestion = () => {
    if((questionNumber+1) < questions.length) {
      setQuestionNumber(prev => prev += 1);
      setTimer(30);
    } else {
      navigation.navigate('testEndScreen', {
        points: points
      })
      clearData();
    }
  }

  const clearData = () => {
    setPoints(0);
    setQuestionNumber(0);
  }

  const getBtnData = (btnData) => {
    checkIfTrue(btnData);
  }

  const {type} = route.params;
  let questions = [];

  if(type === 'IT') {
    questions = itQuestions;
  } else if(type === 'Food') {
    questions = foodQuestions;
  } else if(type === 'History') {
    questions = historyQuestions;
  } else if (type === 'Marvel') {
    questions = marvelQuestions;
  } else if (type === 'DC') {
    questions = dcQuestions;
  }


  return (
    <View style={styles.container}>
        <View style={styles.flexBox}>
          <View style={styles.oneRow}>
            <Text>Question {questionNumber+1} of {questions.length}</Text>
          </View>
          <View style={styles.oneRow}>
            <Text>Time: {timerCount} s</Text>
          </View>
        </View>
        <View style={{padding: 10}}>
          <Question answers={questions[questionNumber].answers} question={questions[questionNumber].question} childToParent={getBtnData}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#13d3e8'
  },
  oneRow: {
    padding: 10

  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default TestScreen