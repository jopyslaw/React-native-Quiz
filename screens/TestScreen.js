import React from 'react'
import {
    View,
    StyleSheet,
    Text
} from 'react-native'
import Question from '../components/Question'

const TestScreen = () => {
  const answers = [
    {
      answerA: 'testA',
      answerB: 'testB',
      answerC: 'testC',
      answerD: 'testD'
    }
  ];

  const question = 'Testowe pytanko xdddd'

  return (
    <View style={styles.container}>
        <View style={styles.flexBox}>
          <View style={styles.oneRow}>
            <Text>Question 1 of 10</Text>
          </View>
          <View style={styles.oneRow}>
            <Text>Time: 30 s</Text>
          </View>
        </View>
        <View style={{padding: 10}}>
          <Question answers={answers} question={question}/>
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