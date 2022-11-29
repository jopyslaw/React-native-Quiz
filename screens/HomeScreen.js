import React from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import data from '../assets/data';
import TestContainer from '../components/TestContainer';


export default HomeScreen = () => {
    
    
    const generateData = () => {
        return data.map((data, index) => <TestContainer key={index} title={data.title} description={data.description} tag={data.tag}/>   
        )
    }

    return (
        <View>
            {generateData()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',

    }
})


