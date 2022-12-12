import React, { useEffect, useState, createRef } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import TestScreen from './screens/TestScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import TestEndScreen from './screens/TestEndScreen';
import StatuteScreen from './screens/StatuteScreen';
import { shuffle } from 'lodash';


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
const navigationRef = createRef();

const App = () => {
  const [tests, setTests] = useState([]);
  const [testWasGet, setTestWasGet] = useState(false);

  const navigate = (name,params) => {
    navigationRef?.current.navigate(name,params);
  }

  useEffect(() => {
    getTests();
    setTestWasGet(false);
  }, []);

  const getTests = () => {
    setTestWasGet(prev => !prev);
    fetch('https://tgryl.pl/quiz/tests')
    .then((response) => response.json())
    .then((json) => {
      setTests(shuffle(json));
      setTestWasGet(true);
    })
  };

  const randomTest = () => {
    const randomTest = tests[Math.floor(Math.random() * tests.length)];
    navigate(randomTest.name);
  }

  return (
    <NavigationContainer ref={navigationRef}>
      { testWasGet &&
      <Drawer.Navigator initialRouteName='Home' drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props}/>
            <DrawerItem label="Get tests" onPress={() => getTests()}/>
            <DrawerItem label='Random' onPress={() => randomTest()}/>
          </DrawerContentScrollView>
        )
      }}>
        <Drawer.Screen name='Home' component={MainScreenFunction} initialParams={{testsData: tests}}/>
        {tests.map((test) => <Drawer.Screen name={test.name} component={TestScreenFunction} initialParams={{id: test.id}} key={test.id}/>)}
        <Drawer.Screen name='Result' component={ResultScreenFunction} />
        <Drawer.Screen name='Statute' component={StatuteScreenFunction} options={{drawerItemStyle: {display: 'none'}}}/>
        <Drawer.Screen name='testEndScreen' component={EndTestScreenFunction} options={{drawerItemStyle: {display: 'none'}}} initialParams={{points: '0'}}/>
      </Drawer.Navigator>
      }
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
