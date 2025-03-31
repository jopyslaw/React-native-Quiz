import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from './Button';

const Answers = props => {
  const getAnswer = answer => {
    props.childToParent(answer);
  };

  return (
    <View style={styles.answerContainer}>
      {props.answers.map((answer, index) => (
        <Button
          newStyles={styles.answerButton}
          title={answer.content}
          onPress={() => getAnswer(answer.isCorrect)}
          key={index}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    padding: 10,
    marginTop: 40,
    borderRadius: 20,
    minHeight: 400,
  },
  answerButton: {
    minHeight: 90,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontFamily: 'CaveatBrush-Regular',
  },
});

export default Answers;
