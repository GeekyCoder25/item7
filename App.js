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
  Text,
} from 'react-native';
import Welcome from './src/pages/SplashScreens/Welcome';
import PagesNavigation from './src/components/PagesNavigation';
import { AppContext } from './src/components/AppContext';
import { globalStyles } from './src/styles/globalStyles';
import NoInternetModal from './src/pages/NoInternetModal';

const App = () => {
  const [internetCheck, setInternetCheck] = useState(false);
  const [checking, setChecking] = useState(false);
  const [routeActive, setRouteActive] = useState(false);
  const [showTip, setShowTip] = useState(false);
  // const isDarkMode = useColorScheme() === 'dark';
  // const apiEndpoint = 'https://item7-api.cyclic.app';
  const apiEndpoint = 'http://192.168.0.101:8000';
  // const apiEndpoint = 'http://10.0.2.2:8000';
  const [appContextState, setAppContextState] = useState({
    userLoggedIn: false,
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
    inviteCode: '',
  });
  const Stack = createNativeStackNavigator();
  useLayoutEffect(() => {
    SplashScreen.hide();
  }, []);
  // const clearAsyncStorage = () => {
  //   console.log(showAsyncStorageContentInDev());
  //   AsyncStorage.clear();
  // };
  const networkCheck = () => {
    const interval = async () => {
      const res = await fetch(`${apiEndpoint}/api/network`);
      const data = await res.json();
      return data;
    };
    if (routeActive && !checking) {
      setChecking(true);
      interval()
        .then(data => {
          setChecking(false);
          setInternetCheck(data.network);
        })
        .catch(err => {
          console.log('err', err);
          setChecking(false);
          setInternetCheck(new Date().getSeconds());
        });
    } else if (checking) {
      setTimeout(() => {
        setInternetCheck(new Date().getSeconds());
      }, 15000);
    }
  };
  const contextValue = {
    appContextState,
    setAppContextState,
    apiEndpoint,
    internetCheck,
    setInternetCheck,
    routeActive,
    setRouteActive,
    networkCheck,
    showTip,
    setShowTip,
  };
  return (
    <>
      {/* <View>
        <Text>Show Endpoint-{apiEndpoint}</Text>
      </View> */}
      <AppContext.Provider value={contextValue}>
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
                  <Stack.Screen name="NoInternet" component={NoInternetModal} />
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
    </>
  );
};
const Logo = ({ navigation }) => {
  const {
    appContextState,
    setAppContextState,
    apiEndpoint,
    internetCheck,
    setInternetCheck,
    setShowTip,
  } = useContext(AppContext);
  useEffect(() => {
    const interval = async () => {
      const res = await fetch(`${apiEndpoint}/api/network`);
      const data = await res.json();
      return data;
    };
    interval()
      .then(data => setInternetCheck(data.network))
      .catch(err => {
        console.log(err);
        setInternetCheck(new Date().getSeconds());
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiEndpoint, internetCheck]);
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    const getAsyncStorage = async () => {
      try {
        const getFirstTime = await AsyncStorage.getItem('firstTime');
        const getPhoneNumber = await AsyncStorage.getItem('phoneNumber');
        const getShowTip = await AsyncStorage.getItem('tip');
        if (internetCheck === true) {
          if (getFirstTime && getPhoneNumber) {
            fetchUserData(getPhoneNumber)
              .then(data => {
                setAppContextState({
                  ...appContextState,
                  userLoggedIn: true,
                  ...data,
                });
                navigation.replace('PagesNavigation');
                getShowTip === 'true' && setShowTip(true);
              })
              .catch(err => {
                navigation.replace('PagesNavigation');
                console.log('noLogin', err);
              });
          } else {
            navigation.replace('Welcome');
          }
        } else if (internetCheck !== false) {
          mounted && navigation.replace('NoInternet');
        }
      } catch (e) {
        console.log(e);
        mounted && navigation.replace('NoInternet');
      }
    };
    getAsyncStorage();
    return () => {
      setMounted(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internetCheck]);
  const fetchUserData = async phoneNumber => {
    const res = await fetch(`${apiEndpoint}/api/userData/${phoneNumber}`);
    const data = await res.json();
    return data;
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (internetCheck !== true) {
        ToastAndroid.show('No internet connection', ToastAndroid.LONG);
      }
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, [internetCheck]);
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
