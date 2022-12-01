import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import TestScreen from './screens/TestScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';


const MainScreenFunction = () => {
  return (
    <HomeScreen />
  )
}

const TestScreenFunction = () => {
  return (
    <TestScreen />
  )
}

const ResultScreenFunction = () => {
  return (
    <ResultScreen />
  )
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name='Home' component={MainScreenFunction} />
        <Drawer.Screen name='Test' component={TestScreenFunction} />
        <Drawer.Screen name='Result' component={ResultScreenFunction} />
      </Drawer.Navigator>
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
