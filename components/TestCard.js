import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const TestCard = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.tag}>{props.tag}</Text>
      <Text style={styles.description}>{props.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'BarlowCondensed-Light',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    color: 'black',
  },
  title: {
    fontFamily: 'CaveatBrush-Regular',
    textAlign: 'center',
    fontSize: 20,
  },
  tag: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  description: {
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'BarlowCondensed-Light',
    fontSize: 20,
  },
});

export default TestCard;
