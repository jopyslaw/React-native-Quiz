import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

const TestContainer = (props) => {
  return (
    <View style={styles.container}>
        <Text>{props.title}</Text>
        <Text>{props.tag}</Text>
        <Text>{props.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#e00bd6',
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: 'pink',
    }
})

export default TestContainer