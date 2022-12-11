import { useNavigation } from '@react-navigation/native';
import React from 'react'
import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native';
import Footer from '../components/Footer';
import TestCard from '../components/TestCard';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';


export default HomeScreen = () => {
    const [tests, setTests] = useState([]);

    const getData = async () => {
        try {
          const data = await AsyncStorage.getItem('@showStatute');
          if(!data) {
            const data = {
              showState: true
            };
            console.log('Brak danych')
            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem('@showStatute', jsonData);
            navigation.navigate('Statute')
          }
        } catch (e) {
          console.log(e);
        }
    }

    const getTests = () => {
        fetch('https://tgryl.pl/quiz/tests')
        .then((response) => response.json())
        .then((json) => {
            setTests(json);
        })
    };
    
    useEffect(() => {
        SplashScreen.hide();
        getData();
        getTests();
    }, []);
    


    const navigation = useNavigation();
    const navigateResult = () => {
        navigation.navigate('Result');
    }


    const generateData = () => {
        return tests.map((test) => <TestCard key={test.id} title={test.name} description={test.description} tag={test.tags}/>   
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.testContainer}>
                    {generateData()}
                </View>
                <Footer title='Get to know your ranking result' onPress={() => navigateResult()}/>
            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#13d3e8'
    },
    testContainer: {
        padding: 10,
    }
})


