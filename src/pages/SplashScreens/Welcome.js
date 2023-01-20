// /* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import Onboarding from './Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = () => {
  const navigator = useNavigation();
  const [splashScreen, setSplashScreen] = useState(1);
  const Stack = createNativeStackNavigator();
  const nextSplashScreen = () => {
    splashScreen === 1 && navigator.navigate('Onboarding2');
    splashScreen === 2 && navigator.navigate('Onboarding3');
  };
  const skipSplashScreen = () => {
    navigator.replace('PagesNavigation');
    const saveAsyncStorage = async () => {
      try {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        await AsyncStorage.setItem(
          'firstTime',
          `App Installed on ${day}-${month + 1}-${year} `,
        );
      } catch (e) {
        console.log(e);
      }
    };
    saveAsyncStorage();
  };

  const Onboarding1 = () => {
    return (
      <Onboarding
        image={require('../../../assets/images/splash1.png')}
        heading={'Your Food At Your Doorstep'}
        text={
          'Our mobile app makes it easy for anybody to look over our menu and place an order.'
        }
        splashScreen={splashScreen}
        nextSplashScreen={nextSplashScreen}
        setSplashScreen={setSplashScreen}
        skipSplashScreen={skipSplashScreen}
      />
    );
  };
  const Onboarding2 = () => {
    return (
      <Onboarding
        image={require('../../../assets/images/splash2.png')}
        heading={'Walk In and Pick up'}
        text={'Walk into any of our Restaurant and pick up your order'}
        splashScreen={splashScreen}
        nextSplashScreen={nextSplashScreen}
        setSplashScreen={setSplashScreen}
        skipSplashScreen={skipSplashScreen}
      />
    );
  };
  const Onboarding3 = () => {
    return (
      <Onboarding
        image={require('../../../assets/images/splash3.png')}
        heading={'The Fastest In Food Delivery'}
        text={
          'Our job is to fill your tummy with delicious food and fast Delivery'
        }
        splashScreen={splashScreen}
        nextSplashScreen={nextSplashScreen}
        setSplashScreen={setSplashScreen}
        skipSplashScreen={skipSplashScreen}
      />
    );
  };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />
    </Stack.Navigator>
  );
};

export default Welcome;
