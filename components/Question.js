import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import Answers from './Answers';


const Question = (props) => {
  return (
    <View style={styles.container}>
        <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{props.question}</Text>
        </View>
        <View>
            <Answers answers={props.answers} onPress={() => props.onPress}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        minHeight: 500,
        marginTop: 40
    },
    questionContainer: {
        justifyContent: 'center'
    },
    questionText: {
        textAlign: 'center',
        fontSize: 20,

    }
})

export default Question