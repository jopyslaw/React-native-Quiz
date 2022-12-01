import React, { useEffect } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Button from './Button';

const Answers = (props) => {
    useEffect(() => {
        console.log(props.answers);
    })

    return (
        <View style={styles.answerContainer}>
            <Button newStyles={styles.answerButton} title={props.answers[0].answerA} />
            <Button newStyles={styles.answerButton} title={props.answers[0].answerB} />
            <Button newStyles={styles.answerButton} title={props.answers[0].answerC} />
            <Button newStyles={styles.answerButton} title={props.answers[0].answerD} />
        </View>
    )
}

const styles = StyleSheet.create({
    answerContainer: {
        padding:10,
        marginTop: 40,
        borderRadius: 20,
        backgroundColor: 'gray',
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