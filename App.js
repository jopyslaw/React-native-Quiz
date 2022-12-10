import React, { useEffect } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import TestScreen from './screens/TestScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import TestEndScreen from './screens/TestEndScreen';

LogBox.ignoreLogs(['Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.']);

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

const StatuteScreenFunction = () => {
  return (
    <StatuteScreenFunction />
  )
}

const EndTestScreenFunction = () => {
  return (
    <TestEndScreen />
  )
}

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name='Home' component={MainScreenFunction} />
        <Drawer.Screen name='HistoryTest' component={TestScreenFunction} initialParams={{type: 'History'}}/>
        <Drawer.Screen name='ITTest' component={TestScreenFunction} initialParams={{type: 'IT'}}/>
        <Drawer.Screen name='FoodTest' component={TestScreenFunction} initialParams={{type: 'Food'}}/>
        <Drawer.Screen name='MarvelTest' component={TestScreenFunction} initialParams={{type: 'Marvel'}}/>
        <Drawer.Screen name='DCTest' component={TestScreenFunction} initialParams={{type: 'DC'}}/>
        <Drawer.Screen name='Result' component={ResultScreenFunction} />
        <Drawer.Screen name='statute' component={StatuteScreenFunction} options={{drawerItemStyle: {display: 'none'}}}/>
        <Drawer.Screen name='testEndScreen' component={EndTestScreenFunction} options={{drawerItemStyle: {display: 'none'}}} initialParams={{points: '0'}}/>
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
