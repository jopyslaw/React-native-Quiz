import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StatuteScreen = () => {
  const naviagtion = useNavigation();

  const navigateToHomeScreen = () => {
    naviagtion.navigate('Home');
  };

  useEffect(() => {
    SplashScreen.hide();
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('@showStatute');
      if (!data) {
        const data = {
          showState: true,
        };
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem('@showStatute', jsonData);
      } else {
        naviagtion.navigate('Home');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Regulamin</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          tristique volutpat pharetra. Etiam blandit risus ac pretium elementum.
          Nullam efficitur consequat cursus. Pellentesque lobortis lorem at
          felis pharetra dignissim. Vivamus quis massa ac tellus tincidunt
          malesuada in ac velit. Vivamus vel lorem blandit, convallis sapien
          sed, varius enim. Mauris eget enim at arcu ornare feugiat nec non
          nisl. Donec luctus, eros quis efficitur tincidunt, dolor purus dictum
          ex, vitae tristique tortor tellus id leo. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Etiam tristique volutpat pharetra. Etiam
          blandit risus ac pretium elementum. Nullam efficitur consequat cursus.
          Pellentesque lobortis lorem at felis pharetra dignissim. Vivamus quis
          massa ac tellus tincidunt malesuada in ac velit. Vivamus vel lorem
          blandit, convallis sapien sed, varius enim. Mauris eget enim at arcu
          ornare feugiat nec non nisl. Donec luctus, eros quis efficitur
          tincidunt, dolor purus dictum ex, vitae tristique tortor tellus id
          leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          tristique volutpat pharetra. Etiam blandit risus ac pretium elementum.
          Nullam efficitur consequat cursus. Pellentesque lobortis lorem at
          felis pharetra dignissim. Vivamus quis massa ac tellus tincidunt
          malesuada in ac velit. Vivamus vel lorem blandit, convallis sapien
          sed, varius enim. Mauris eget enim at arcu ornare feugiat nec non
          nisl. Donec luctus, eros quis efficitur tincidunt, dolor purus dictum
          ex, vitae tristique tortor tellus id leo.
        </Text>
        <TouchableOpacity style={styles.btn} onPress={navigateToHomeScreen}>
          <Text style={styles.btnText}>Zaakceptuj regulamin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#13d3e8',
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoContainer: {
    height: '90%',
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  btn: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#13d3e8',
    width: '100%',
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default StatuteScreen;
