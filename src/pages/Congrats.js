import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Back from '../../assets/images/back.svg';
import Ballon from '../../assets/images/congrats.svg';
import { globalStyles } from '../styles/globalStyles';

const Congrats = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/splashBg.png')}
      style={globalStyles.route}
      resizeMode="repeat">
      <View style={styles.route}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.popToTop('Home')}>
            <Back />
          </Pressable>
        </View>
        <View style={styles.body}>
          <Ballon />
          <Text style={styles.contentTitle}>Congratulations!</Text>
          <Text style={styles.contentText}>
            You've succesfully made a payment, your food is on the way.
          </Text>
        </View>
        <View style={styles.button}>
          <Pressable
            style={styles.buttonBackground}
            onPress={() => navigation.popToTop('Home')}>
            <Text style={styles.buttonBackgroundText}>Track Order</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  route: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    paddingVertical: 5 + '%',
    paddingHorizontal: 2 + '%',
  },
  header: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    marginTop: 10,
    textAlign: 'center',
  },
  body: {
    flex: 1.5,
    maxHeight: 300,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  contentTitle: { fontFamily: 'Poppins-Bold', fontSize: 22 },
  contentText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    textAlign: 'center',
    width: 90 + '%',
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonBackground: {
    backgroundColor: globalStyles.themeColorSolo,
    borderRadius: 8,
    justifyContent: 'center',
    height: 50,
  },
  buttonBackgroundText: {
    justifyContent: 'center',
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
});
export default Congrats;
