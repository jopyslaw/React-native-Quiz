import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TestEndScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const backToMainScreen = () => {
    navigation.navigate('Home');
  };

  const {points, totalPoints, type} = route.params;

  const sendData = async () => {
    console.log(points, totalPoints, type);

    await fetch('http://tgryl.pl/quiz/result', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nick: 'Test',
        score: points,
        total: totalPoints,
        type: type,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Sucess', data);
      })
      .catch(error => {
        console.error('Error', error);
      });
  };

  useEffect(() => {
    sendData();
  });

  return (
    <View style={styles.container}>
      <View style={styles.resultsContainer}>
        <Text style={styles.titleStyle}>
          Gratulacja udało Ci się rozwiązać Quiz
        </Text>
        <Text style={styles.otherDataStyle}>
          Liczba punktów którą udało ci się uzyskać to:
        </Text>
        <Text style={styles.pointsStyle}>{points}</Text>
        <Text style={styles.otherDataStyle}>Wielkie gratulacje</Text>
        <TouchableOpacity onPress={backToMainScreen} style={styles.button}>
          <Text>Powrót do okna głównego</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#13d3e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#13d3e8',
    marginTop: 25,
  },
  titleStyle: {
    fontFamily: 'CaveatBrush-Regular',
    fontSize: 35,
    textAlign: 'center',
  },
  otherDataStyle: {
    marginTop: 20,
    fontFamily: 'CaveatBrush-Regular',
    fontSize: 20,
  },
  pointsStyle: {
    marginTop: 20,
    fontFamily: 'CaveatBrush-Regular',
    fontSize: 50,
  },
});

export default TestEndScreen;
