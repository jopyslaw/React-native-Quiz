import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

const Button = ({title, onPress, newStyles}) => {
  return (
    <TouchableOpacity style={[styles.button, newStyles]} onPress={() => onPress()}>
          <Text>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
      borderColor: 'black',
      borderWidth: 1,
      padding: 7,
    }
})

export default Button;