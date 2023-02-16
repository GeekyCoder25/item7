import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  // useWindowDimensions,
  View,
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import ChevronDowm from '../../assets/images/chevron-down.svg';
import FoodMenu from '../components/FoodMenu';
import Popular from '../components/Popular';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtomTab from '../components/ButtomTab';
import { AppContext } from '../components/AppContext';
const Home = ({ navigation, route }) => {
  const { appContextState } = useContext(AppContext);
  const { userInfo, userLoggedIn, notifications } = appContextState;
  const firstname = userInfo.firstName;
  const [searchIcon, setSearchIcon] = useState(true);
  const [notificationActive, setNotificationActive] = useState(false);
  const searchInputRef = useRef(TextInput);
  const navigator = useNavigation();
  const { no } = notifications;
  const clearAsyncStorage = () => {
    // console.log(showAsyncStorageContentInDev());
    AsyncStorage.clear();
  };
  useEffect(() => {
    no > 0 && setNotificationActive(true);
  }, [no]);
  return (
    <>
      <ImageBackground
        source={require('../../assets/images/splashBg.png')}
        style={globalStyles.route}
        resizeMode="repeat">
        <View style={styles.homeRoute}>
          <ScrollView>
            <View style={styles.header}>
              <View style={styles.profileIconContainer}>
                <Pressable onPress={() => navigator.navigate('Profile')}>
                  <Image
                    source={require('../../assets/images/profile.png')}
                    style={styles.profileIcon}
                  />
                </Pressable>
              </View>
              <View style={styles.headerInputContainer}>
                {searchIcon && (
                  <Image
                    source={require('../../assets/images/search.png')}
                    style={styles.searchIcon}
                  />
                )}
                <TextInput
                  placeholder="What can we get you?"
                  style={styles.searchInput}
                  onFocus={() => setSearchIcon(false)}
                  onBlur={() => setSearchIcon(true)}
                  ref={searchInputRef}
                />
              </View>
              <View style={styles.profileIconContainer}>
                <Pressable onPress={() => navigator.navigate('Refer')}>
                  <Image
                    source={require('../../assets/images/notificationIcon.png')}
                    style={styles.profileIcon}
                  />
                  {notificationActive && (
                    <View style={styles.notificationActive}>
                      <Text style={styles.notificationActiveText}>{no}</Text>
                    </View>
                  )}
                </Pressable>
              </View>
            </View>
            <View style={styles.address}>
              <Pressable onPress={clearAsyncStorage}>
                <Text>
                  MALhub, Ilorin, Nigeria <ChevronDowm />
                </Text>
              </Pressable>
            </View>
            <View style={styles.welcome}>
              <Text style={styles.welcomeText}>
                Welcome {userLoggedIn && firstname}👋
              </Text>
              <Text style={styles.welcomeTextSub}>Eat more, pay less</Text>
            </View>
            <FoodMenu navigation={navigation} />
            <Popular navigation={navigation} title="Popular" />
            <Popular navigation={navigation} title="Recently Bought" />
            <Popular navigation={navigation} title="Favorites" />
          </ScrollView>
        </View>
      </ImageBackground>
      <ButtomTab navigation={navigation} route={route} />
    </>
  );
};

const styles = StyleSheet.create({
  homeRoute: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    paddingBottom: 70,
  },
  header: {
    paddingTop: 5 + '%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  profileIconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profileIcon: {
    borderRadius: 25,
  },
  headerInputContainer: {
    flex: 4,
    height: 35,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 35 + '%',
    zIndex: 9,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 35,
    flex: 1,
    textAlign: 'center',
    width: 100 + '%',
  },
  notificationActive: {
    position: 'absolute',
    right: -5,
    top: -10,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationActiveText: {
    color: globalStyles.themeColorSolo,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginTop: -2,
  },
  address: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    paddingHorizontal: 2 + '%',
  },
  welcomeText: {
    fontSize: 30,
    fontFamily: 'Poppins-Regular',
  },
  welcomeTextSub: {
    // fontWeight: '700',
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
  },
});
export default Home;
