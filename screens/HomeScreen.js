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


export default HomeScreen = () => {
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


