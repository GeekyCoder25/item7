import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
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
  useColorScheme,
} from 'react-native';
import Welcome from './src/pages/SplashScreens/Welcome';
import PagesNavigation from './src/components/PagesNavigation';
import { AppContext } from './src/components/AppContext';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [appContextState, setAppContextState] = useState({
    userLoggedIn: false,
  });
  const Stack = createNativeStackNavigator();
  useLayoutEffect(() => {
    SplashScreen.hide();
    // clearAsyncStorage();
  }, []);
  // const clearAsyncStorage = () => {
  //   console.log(showAsyncStorageContentInDev());
  //   AsyncStorage.clear();
  // };

  const Logo = ({ navigation }) => {
    useEffect(() => {
      const getAsyncStorage = async () => {
        try {
          const getItem = await AsyncStorage.getItem('firstTime');
          if (getItem) {
            navigation.replace('PagesNavigation');
          } else {
            navigation.replace('Welcome');
          }
        } catch (e) {
          console.log(e);
        }
      };
      getAsyncStorage();
    }, [navigation]);
    return (
      <View style={styles.welcome}>
        <View style={styles.welcomeImage}>
          <Image
            source={require('./assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      {/* <View>
        <Text>hey</Text>
      </View> */}
      <AppContext.Provider value={{ appContextState, setAppContextState }}>
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
    </>
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
});
export default App;
