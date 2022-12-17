import React, {useEffect, useState, createRef, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import TestScreen from './screens/TestScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import TestEndScreen from './screens/TestEndScreen';
import StatuteScreen from './screens/StatuteScreen';
import {shuffle} from 'lodash';
import {
  getDBConnection,
  testTable,
  questionTable,
  createTable,
  saveTests,
  getTestsDB,
  saveQuestions,
  deleteTable,
} from './services/db-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';

const MainScreenFunction = () => {
  return <HomeScreen />;
};

const TestScreenFunction = () => {
  return <TestScreen />;
};

const ResultScreenFunction = () => {
  return <ResultScreen />;
};

const StatuteScreenFunction = () => {
  return <StatuteScreen />;
};

const EndTestScreenFunction = () => {
  return <TestEndScreen />;
};

const Drawer = createDrawerNavigator();
const navigationRef = createRef();

const App = () => {
  const [tests, setTests] = useState([]);
  const [testWasGet, setTestWasGet] = useState(false);
  const [netState, setNetState] = useState(false);

  const navigate = (name, params) => {
    navigationRef?.current.navigate(name, params);
  };

  useEffect(() => {
    getNetworkState();
    if (netState) {
      deleteTables();
      createTables();
      console.log('work');
      getTests();
      //setTestWasGet(false);
      getData();
      saveQuestionsAndTests();
    } else {
      console.log('not work');
      getTestsFromDb();
      setTestWasGet(false);
    }
  }, []);

  const getTests = () => {
    setTestWasGet(prev => !prev);
    fetch('https://tgryl.pl/quiz/tests')
      .then(response => response.json())
      .then(json => {
        setTests(shuffle(json));
        setTestWasGet(true);
      });
  };

  const getTest = id => {
    const url = 'https://tgryl.pl/quiz/test/' + id;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        return json;
      });
  };

  const createTables = async () => {
    const dbConn = await getDBConnection();
    await createTable(dbConn, 'tests', testTable);
    await createTable(dbConn, 'questions', questionTable);
  };

  const saveQuestionsAndTests = async () => {
    const response = await fetch('https://tgryl.pl/quiz/tests');
    const tests = await response.json();
    const dbConn = await getDBConnection();
    await saveTests(dbConn, tests);
    tests.forEach(async test => {
      const id = test.id;
      const questions = getTest(id);
      console.log(questions);
      await saveQuestions(dbConn, questions);
    });
  };

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('@showStatute');
      if (!data) {
        const data = {
          showState: true,
        };
        console.log('Brak danych');
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem('@showStatute', jsonData);
        navigate('Statute');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getTestsFromDb = useCallback(async () => {
    const db = await getDBConnection();
    const storedTests = await getTestsDB(db);
    setTests(storedTests);
    setTestWasGet(true);
  });

  const deleteTables = async () => {
    const dbConn = await getDBConnection();
    await deleteTable(dbConn, 'tests');
    await deleteTable(dbConn, 'questions');
  };

  const randomTest = () => {
    const randomTest = tests[Math.floor(Math.random() * tests.length)];
    navigate(randomTest.name);
  };

  const getNetworkState = async () => {
    const data = await NetInfo.fetch();
    const state = await data.isConnected;
    console.log(state);
    setNetState(state);
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {testWasGet && (
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={props => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Get tests" onPress={() => getTests()} />
                <DrawerItem label="Random" onPress={() => randomTest()} />
              </DrawerContentScrollView>
            );
          }}>
          <Drawer.Screen
            name="Home"
            component={MainScreenFunction}
            initialParams={{testsData: tests}}
          />
          {tests.map(test => (
            <Drawer.Screen
              name={test.name}
              component={TestScreenFunction}
              initialParams={{id: test.id}}
              key={test.id}
            />
          ))}
          <Drawer.Screen name="Result" component={ResultScreenFunction} />
          <Drawer.Screen
            name="Statute"
            component={StatuteScreenFunction}
            options={{drawerItemStyle: {display: 'none'}}}
          />
          <Drawer.Screen
            name="testEndScreen"
            component={EndTestScreenFunction}
            options={{drawerItemStyle: {display: 'none'}}}
            initialParams={{points: '0'}}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
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
