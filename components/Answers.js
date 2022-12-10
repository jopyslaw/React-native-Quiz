import React, { useEffect } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Button from './Button';

const Answers = (props) => {
    const getAnswer = (answer) => {
        props.childToParent(answer);
    }
    
    return (
        <View style={styles.answerContainer}>
            <Button newStyles={styles.answerButton} title={props.answers[0].content} onPress={() => getAnswer(props.answers[0].isCorrect)}/>
            <Button newStyles={styles.answerButton} title={props.answers[1].content} onPress={() => getAnswer(props.answers[1].isCorrect)}/>
            <Button newStyles={styles.answerButton} title={props.answers[2].content} onPress={() => getAnswer(props.answers[2].isCorrect)}/>
            <Button newStyles={styles.answerButton} title={props.answers[3].content} onPress={() => getAnswer(props.answers[3].isCorrect)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    answerContainer: {
        padding:10,
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
        fontSize: 20
    }
})

export default Answers