import React, { useContext, useState } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Back from '../../assets/images/backWhite.svg';
import Envelope from '../../assets/images/envelope.svg';
import ChevronRight from '../../assets/images/chevron-right.svg';
import Bin from '../../assets/images/bin.svg';
import ProfileSvg from '../../assets/images/profile.svg';
import Wallet from '../../assets/images/wallet.svg';
import ShareAndEarn from '../../assets/images/share-and-earn.svg';
import Promo from '../../assets/images/promo-code.svg';
import Faq from '../../assets/images/faq.svg';
import TextSize from '../../assets/images/text-size.svg';
import Language from '../../assets/images/language.svg';
import Notifications from '../../assets/images/notification.svg';
import Logout from '../../assets/images/logout.svg';
import { AppContext } from '../components/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModalOverlay from '../components/LoadingModalOverlay';

const Profile = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const vw = useWindowDimensions().width;
  const { appContextState, setAppContextState, setEverLoggedIn } =
    useContext(AppContext);
  const { userLoggedIn, userInfo } = appContextState;
  const firstname =
    userInfo.username ||
    userInfo.username ||
    `${userInfo.firstName.charAt(0).toUpperCase()}${userInfo.firstName
      .slice(1, userInfo.firstName.length)
      .toLowerCase()}`;
  const handleLogout = () => {
    handleShowModal();
    setEverLoggedIn(true);
    AsyncStorage.setItem('loggedIn', 'false');
    AsyncStorage.removeItem('phoneNumber');
    setAppContextState({
      userLoggedIn: false,
      userProfileData: {},
      cart: [],
      favorites: [],
      orders: [],
      notifications: {
        no: 0,
        messages: [],
      },
      popular: [],
      recents: [],
      userInfo: [],
    });
    handleShowModal();
  };
  const handleShowModal = () => {
    setModalOpen(prev => !prev);
  };
  return (
    <View style={styles.route}>
      {/* <ScrollView> */}
      <View style={styles.header}>
        <View style={styles.headerNav}>
          <Pressable onPress={() => navigation.goBack()}>
            <Back />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('FAQ')}
            style={styles.headerHelp}>
            <Envelope />
            <Text style={styles.headerHelpText}>Help</Text>
          </Pressable>
        </View>
        <Text style={styles.hello}>
          Hello
          {userLoggedIn ? `, ${firstname}` : ''}
        </Text>
      </View>
      <ImageBackground
        source={require('../../assets/images/splashBg.png')}
        style={{
          ...styles.body,
          borderTopLeftRadius: vw * (10 / 100),
          borderTopRightRadius: vw * (10 / 100),
        }}
        resizeMode="repeat">
        <ScrollView style={styles.scrollView}>
          <Text style={styles.accounts}>Accounts</Text>
          {Links.map(link => (
            <ProfileLinks
              navigation={navigation}
              text={link.text}
              link={link.link}
              Image={link.Image}
              key={link.text}
            />
          ))}
          {userLoggedIn ? (
            <Pressable onPress={handleLogout} style={styles.logout}>
              <View style={styles.link}>
                <View style={styles.linkTextContainer}>
                  <Logout />
                  <Text style={styles.linkText}>Logout</Text>
                </View>
                <View>
                  <ChevronRight />
                </View>
              </View>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={styles.logout}>
              <View style={styles.link}>
                <View style={styles.linkTextContainer}>
                  <Logout />
                  <Text style={styles.linkText}>Login</Text>
                </View>
                <View>
                  <ChevronRight />
                </View>
              </View>
            </Pressable>
          )}
        </ScrollView>
      </ImageBackground>
      <LoadingModalOverlay
        modalOpen={modalOpen}
        handleShowModal={handleShowModal}
      />
      {/* </ScrollView> */}
    </View>
  );
};
const styles = StyleSheet.create({
  route: {
    flex: 1,
  },
  header: {
    paddingVertical: 5 + '%',
    paddingHorizontal: 5 + '%',
    backgroundColor: globalStyles.themeColorSolo,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerHelp: {
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 70,
    borderRadius: 5,
    padding: 5,
  },
  headerHelpText: {
    color: globalStyles.themeColorSolo,
    fontFamily: 'Poppins-SemiBold',
  },
  hello: {
    marginTop: 5 + '%',
    marginBottom: 20 + '%',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  body: {
    display: 'flex',
    minHeight: 100 + '%',
    backgroundColor: '#fff',
    marginTop: -15 + '%',
    overflow: 'hidden',
  },
  scrollView: {
    paddingTop: 10 + '%',
    paddingHorizontal: 5 + '%',
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
  },
  accounts: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  linkTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    marginLeft: 15,
    fontSize: 20,
    fontFamily: 'Raleway-Regular',
  },
  Wallet: {
    borderBottomColor: 'rgba(128, 128, 128, 0.3)',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  Refer: {
    marginTop: 20,
  },

  Home: {
    marginBottom: 300,
  },
  logout: {
    marginBottom: 250,
  },
});
export default Profile;

export const ProfileLinks = ({ navigation, Image, text, link }) => {
  return (
    <Pressable onPress={() => navigation.navigate(link)} style={styles[link]}>
      <View style={styles.link}>
        <View style={styles.linkTextContainer}>
          {<Image />}
          <Text style={styles.linkText}>{text}</Text>
        </View>
        <View>
          <ChevronRight />
        </View>
      </View>
    </Pressable>
  );
};
const Links = [
  {
    Image: Bin,
    text: 'My Orders',
    link: 'Myorders',
  },
  {
    Image: ProfileSvg,
    text: 'My Information',
    link: 'Userinfo',
  },
  {
    Image: Wallet,
    text: 'Go wallet',
    link: 'Wallet',
  },
  {
    Image: ShareAndEarn,
    text: 'Share and Earn',
    link: 'Refer',
  },
  {
    Image: Promo,
    text: 'Promo Codes',
    link: 'Promo',
  },
  {
    Image: Faq,
    text: 'F.A.Q',
    link: 'FAQ',
  },
  {
    Image: TextSize,
    text: 'Text Size',
    link: 'Profile',
  },
  {
    Image: Language,
    text: 'Language',
    link: 'Profile',
  },
  {
    Image: Notifications,
    text: 'Notifications',
    link: 'Notifications',
  },
];
