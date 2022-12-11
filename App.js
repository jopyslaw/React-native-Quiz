import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import TestScreen from './screens/TestScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import TestEndScreen from './screens/TestEndScreen';
import StatuteScreen from './screens/StatuteScreen';


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
    <StatuteScreen />
  )
}

const EndTestScreenFunction = () => {
  return (
    <TestEndScreen />
  )
}

const Drawer = createDrawerNavigator();

const App = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    getTests();
    console.log(tests);
  }, []);

  const getTests = () => {
    fetch('https://tgryl.pl/quiz/tests')
    .then((response) => response.json())
    .then((json) => {
      setTests(json);
    })
  };


  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>{/**/}
        <Drawer.Screen name='Home' component={MainScreenFunction} />
        {tests.map((test) => <Drawer.Screen name={test.name} component={TestScreenFunction} initialParams={{id: test.id}} key={test.id}/>)}
        <Drawer.Screen name='Result' component={ResultScreenFunction} />
        <Drawer.Screen name='Statute' component={StatuteScreenFunction} options={{drawerItemStyle: {display: 'none'}}}/>
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
