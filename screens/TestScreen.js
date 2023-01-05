import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Question from '../components/Question';
import {useNavigation, useRoute} from '@react-navigation/native';
import {shuffle} from 'lodash';
import {useNetInfo} from '@react-native-community/netinfo';
import {getDBConnection, getDBQuestions} from '../services/db-service';

const TestScreen = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [points, setPoints] = useState(0);
  const route = useRoute();
  const navigation = useNavigation();
  const [timerCount, setTimer] = useState(30);
  const [questions, setQuestions] = useState([]);
  const [ready, setReady] = useState(false);
  const netState = useNetInfo();

  useEffect(() => {
    /*let interval = setInterval(() => {
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
    */
    getQuestions();
  }, []);

  const checkIfTrue = odp => {
    if (odp === true) {
      setPoints(prev => (prev += 1));
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (questionNumber + 1 < questions.tasks.length) {
      setQuestionNumber(prev => (prev += 1));
      setTimer(30);
    } else {
      navigation.navigate('testEndScreen', {
        points: points,
        totalPoints: questions.tasks.length,
        type: questions.name,
      });
      clearData();
    }
  };

  const clearData = () => {
    setPoints(0);
    setQuestionNumber(0);
  };

  const getBtnData = btnData => {
    checkIfTrue(btnData);
  };

  const getQuestions = async () => {
    if (netState.isConnected) {
      const {id} = route.params;
      const url = 'https://tgryl.pl/quiz/test/' + id;
      const response = await fetch(url);
      const json = await response.json();
      setQuestions(json);
    } else {
      const {id} = route.params;
      const db = await getDBConnection();
      const storedQuestions = await getDBQuestions(db, id);
      setQuestions(translateDBdatatoJSONObject(storedQuestions));
      setReady(true);
    }
  };

  const translateDBdatatoJSONObject = questions => {
    const q = questions.map(question => {
      const allAnswers = [
        question.answer_a,
        question.answer_b,
        question.answer_c,
        question.answer_d,
      ];
      return {
        question: question.question,
        duration: question.duration,
        answers: allAnswers
          .map(answer => {
            if (answer !== 'null') {
              return {
                content: answer,
                isCorrect: question.correct_answer === answer ? true : false,
              };
            }
          })
          .filter(data => typeof data !== 'undefined'),
      };
    });
    const data = {
      tasks: q,
    };
    return data;
  };

  return (
    <View style={styles.container}>
      {ready && (
        <>
          <View style={styles.flexBox}>
            <View style={styles.oneRow}>
              <Text>
                Question {questionNumber + 1} of {questions?.tasks?.length}
              </Text>
            </View>
            <View style={styles.oneRow}>
              <Text>Time: {questions?.tasks[questionNumber]?.duration} s</Text>
            </View>
          </View>
          <View style={{padding: 10}}>
            <Question
              answers={questions?.tasks[questionNumber]?.answers}
              question={questions?.tasks[questionNumber]?.question}
              childToParent={getBtnData}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#13d3e8',
  },
  oneRow: {
    padding: 10,
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TestScreen;
