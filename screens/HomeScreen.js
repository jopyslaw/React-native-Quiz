import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Footer from '../components/Footer';
import TestCard from '../components/TestCard';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export default HomeScreen = () => {
  const [tests, setTests] = useState([]);
  const route = useRoute();
  const {testsData} = route.params;

  useEffect(() => {
    SplashScreen.hide();
    setTests(testsData);
    console.log(testsData);
  }, []);

  const navigation = useNavigation();
  const navigateResult = () => {
    navigation.navigate('Result');
  };

  const generateData = () => {
    return tests.map(test => (
      <TestCard
        key={test.id}
        title={test.name}
        description={test.description}
        tag={test.tags}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.testContainer}>{generateData()}</View>
        <Footer
          title="Get to know your ranking result"
          onPress={() => navigateResult()}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#13d3e8',
  },
  testContainer: {
    padding: 10,
  },
});
