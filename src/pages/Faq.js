import React from 'react';
import {
  ImageBackground,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Back from '../../assets/images/back.svg';

const Faq = ({ navigation }) => {
  const handlePress = () => {};
  return (
    <ImageBackground
      source={require('../../assets/images/splashBg.png')}
      style={globalStyles.route}
      resizeMode="repeat">
      <View onPress={handlePress} style={styles.route}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Back />
          </Pressable>
          <Text style={styles.headerTitle}>FAQ</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>
            Nothing much here, this is not a real customer's service project.
            This is a side project developed by{' '}
            <Pressable
              onPress={() => Linking.openURL('https://toyib.vercel.app')}>
              <Text style={styles.me}>me</Text>
            </Pressable>
            , which was inspired to me by a{' '}
            <Pressable
              onPress={() => Linking.openURL('https://qoreeb.vercel.app')}>
              <Text style={styles.me}>deisgner's</Text>
            </Pressable>{' '}
            design which I found online. It's not functional and ofcourse you
            won't receive any thing if you order, which is why I didn't
            implement the payment platform even though I could. {'\n'}
            {'\n'}Peace 👌
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Faq;

const styles = StyleSheet.create({
  route: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    paddingTop: 5 + '%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 97 + '%',
    alignSelf: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    textAlign: 'center',
    paddingRight: 30,
    flex: 1,
  },
  me: {
    color: 'blue',
    textDecorationLine: 'underline',
    // display: 'flex',
    top: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
  },
  body: {
    width: 95 + '%',
    alignSelf: 'center',
  },
  bodyText: {
    marginTop: 15 + '%',
    fontSize: 22,
    lineHeight: 35,
    fontFamily: 'Poppins-Regular',
  },
});
