import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  // Text,
  Image,
  SafeAreaView,
  // useColorScheme,
  ToastAndroid,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Welcome from './src/pages/SplashScreens/Welcome';
import PagesNavigation from './src/components/PagesNavigation';
import { AppContext } from './src/components/AppContext';
import { globalStyles } from './src/styles/globalStyles';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const apiEndpoint = 'https://item7-api.cyclic.app';
  const apiEndpoint = 'http://192.168.0.101:8000';
  // const apiEndpoint = 'http://10.0.2.2:8000';
  const [appContextState, setAppContextState] = useState({
    userLoggedIn: false,
    userProfileData: {},
    cart: [],
    favorites: [],
    orders: [],
    notifications: {
      no: 1,
      messages: [],
    },
    popular: [],
    recents: [],
    userInfo: [],
  });
  const Stack = createNativeStackNavigator();
  useLayoutEffect(() => {
    SplashScreen.hide();
  }, []);
  // const clearAsyncStorage = () => {
  //   console.log(showAsyncStorageContentInDev());
  //   AsyncStorage.clear();
  // };
  return (
    <AppContext.Provider
      value={{ appContextState, setAppContextState, apiEndpoint }}>
      <StatusBar backgroundColor={globalStyles.themeColorSolo} />
      <SafeAreaView style={styles.appContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
          touchSoundDisabled={true}>
          <View style={styles.appContainer}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Logo" component={Logo} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen
                  name="PagesNavigation"
                  component={PagesNavigation}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </AppContext.Provider>
  );
};
const Logo = ({ navigation }) => {
  const { appContextState, setAppContextState, apiEndpoint } =
    useContext(AppContext);
  const [internetCheck, setInternetCheck] = useState(false);

  const [timeoutInterval, setTimeoutInterval] = useState(5000);
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${apiEndpoint}/api/network`);
        const data = await res.json();
        setInternetCheck(data.network);
      } catch (err) {
        console.log(err);
        setInternetCheck(new Date().getSeconds());
        setTimeoutInterval(prev => prev + 20);
      }
    }, timeoutInterval);
    return () => {
      clearTimeout(interval);
    };
  }, [apiEndpoint, timeoutInterval]);

  useEffect(() => {
    const getAsyncStorage = async () => {
      try {
        const getFirstTime = await AsyncStorage.getItem('firstTime');
        // const getLoggedIn = await AsyncStorage.getItem('loggedIn');
        const getName = await AsyncStorage.getItem('firstName');
        const getPhoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (internetCheck === true) {
          if (getFirstTime) {
            getPhoneNumber &&
              fetchUserData(getPhoneNumber)
                .then(data => {
                  setAppContextState({
                    ...appContextState,
                    userLoggedIn: true,
                    userProfileData: {
                      firstName: getName,
                      phoneNumber: getPhoneNumber,
                    },
                    ...data,
                  });
                  navigation.replace('PagesNavigation');
                })
                // .then(navigation.replace('PagesNavigation'))
                .catch(err => {
                  navigation.replace('PagesNavigation');
                  console.log('noLogin', err);
                });
          } else {
            navigation.replace('Welcome');
          }
        } else if (internetCheck !== false) {
          ToastAndroid.show('No internet connection', ToastAndroid.LONG);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getAsyncStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internetCheck]);
  const fetchUserData = async phoneNumber => {
    const res = await fetch(`${apiEndpoint}/api/userData/${phoneNumber}`);
    const data = await res.json();
    return data;
  };

  return (
    <View style={styles.welcome}>
      <View style={styles.welcomeImage}>
        <Image
          source={require('./assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
      <ActivityIndicator
        style={styles.loading}
        size="large"
        color={globalStyles.themeColorSolo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeImage: {
    maxWidth: 100 + '%',
  },
  logo: {
    borderRadius: 20,
  },
  appContainer: {
    flex: 1,
    background: '#fff',
  },
  loading: {
    position: 'absolute',
    bottom: 20 + '%',
  },
});
export default App;
