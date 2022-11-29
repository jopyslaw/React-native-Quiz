import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';

const MainScreen = () => {
  return (
    <HomeScreen />
  )
}

const TestScreen = () => {
  return (
    <TestScreen />
  )
}

const ResultScreen = () => {
  return (
    <ResultScreen />
  )
}

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={MainScreen} />
        <Stack.Screen name='Test' component={TestScreen} />
        <Stack.Screen name='Result' component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
