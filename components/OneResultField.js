import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const OneResultField = (props) => {
  return (
    <View style={styles.container}>
        <Text>{props.nick}</Text>
        <Text>{props.score}</Text>
        <Text>{props.type}</Text>
        <Text>{props.date}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        marginTop: 5,
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})

export default OneResultField