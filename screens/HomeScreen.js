import { useNavigation } from '@react-navigation/native';
import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';
import data from '../assets/data';
import Footer from '../components/Footer';
import TestCard from '../components/TestCard';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


export default HomeScreen = () => {
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
    
    useEffect(() => {
        SplashScreen.hide();
        getData();
        console.log('useEffect');
        //navigation.navigate('Result');
    })
    


    const navigation = useNavigation();
    const navigateResult = () => {
        navigation.navigate('Result');
    }


    const generateData = () => {
        return data.map((data, index) => <TestCard key={index} title={data.title} description={data.description} tag={data.tag}/>   
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


