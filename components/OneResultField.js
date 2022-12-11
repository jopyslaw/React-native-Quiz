import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const OneResultField = (props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.textStyle}>{props.nick}</Text>
        <Text style={styles.textStyle}>{props.score}</Text>
        <Text style={styles.textStyle}>{props.type}</Text>
        <Text style={styles.textStyle}>{props.date}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 20,
      marginTop: 5,
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    textStyle: {
      fontFamily: 'BarlowCondensed-Light',
      fontSize: 20
    }
})

export default OneResultField