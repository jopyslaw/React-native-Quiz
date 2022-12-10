import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TestEndScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const {points} = route.params;

    const backToMainScreen = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <View style={styles.resultsContainer}>
                <Text>
                    Gratulacja udało Ci się rozwiązać Quiz
                </Text>
                <Text>
                    Liczba punktów którą udało ci się uzyskać to:
                </Text>
                <Text>
                    {points}
                </Text>
                <Text>
                    Wielkie gratulacje
                </Text>
                <TouchableOpacity onPress={backToMainScreen} style={styles.button}>
                    <Text>
                        Powrót do okna głównego
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#13d3e8',
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultsContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#13d3e8',
        marginTop: 25
    }
})

export default TestEndScreen