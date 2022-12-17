import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from './Button';

const Footer = ({title, onPress}) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <View style={styles.margin}>
        <Button title="Check!" onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 100,
  },
  margin: {
    marginTop: 10,
  },
});

export default Footer;
