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
  saveTestsToDB,
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
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = state.isConnected && state.isInternetReachable;
      setNetState(offline);
    });
    if (netState) {
      deleteTables();
      createTables();
      getTests();
      //setTestWasGet(false);
      getData();
      saveTests();
    } else {
      getTestsFromDb();
      //setTestWasGet(false);
    }
    return () => removeNetInfoSubscription();
  }, [netState]);

  const getTests = () => {
    fetch('https://tgryl.pl/quiz/tests')
      .then(response => response.json())
      .then(json => {
        setTests(shuffle(json));
        setTestWasGet(true);
      });
  };

  const getTest = async id => {
    const url = `https://tgryl.pl/quiz/test/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const createTables = async () => {
    const dbConn = await getDBConnection();
    await Promise.all(
      createTable(dbConn, 'tests', testTable),
      createTable(dbConn, 'questions', questionTable),
    );
  };

  const saveTests = async () => {
    const response = await fetch('https://tgryl.pl/quiz/tests');
    const tests = await response.json();
    const dbConn = await getDBConnection();
    tests.forEach(async test => {
      const id = test.id;
      //console.log('id', id);
      const questions = await getTest(id);
      //console.log(questions);
      await saveQuestions(dbConn, questions);
    });
    await saveTestsToDB(dbConn, tests);
  };

  const saveQuestionsToDB = async () => {
    //console.log('i am alive');
    const dbConn = getDBConnection();
    await tests.forEach(async test => {
      const id = test.id;
      const questions = getTest(id);
      //console.log(questions);
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
    await Promise.all(
      deleteTable(dbConn, 'tests'),
      deleteTable(dbConn, 'questions'),
    );
  };

  const randomTest = () => {
    const randomTest = tests[Math.floor(Math.random() * tests.length)];
    navigate(randomTest.name);
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

export default App;
