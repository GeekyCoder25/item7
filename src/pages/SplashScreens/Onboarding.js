import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { themeColor } from '../../../app.json';
import { globalStyles } from '../../styles/globalStyles';
const Onboarding = ({
  image,
  heading,
  text,
  splashScreen,
  setSplashScreen,
  nextSplashScreen,
  skipSplashScreen,
}) => {
  const route = useRoute();
  useEffect(() => {
    route.name === 'Onboarding1' && setSplashScreen(1);
    route.name === 'Onboarding2' && setSplashScreen(2);
    route.name === 'Onboarding3' && setSplashScreen(3);
  }, [route.name, setSplashScreen]);
  return (
    <View style={styles.welcome}>
      <View style={styles.welcomeImage}>
        <Image
          source={require('../../../assets/images/splashBg.png')}
          style={styles.imageBg}
        />
        <View style={styles.splashBg}>
          <TouchableHighlight
            underlayColor={'#fff'}
            style={styles.skipContainer}
            onPress={skipSplashScreen}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableHighlight>
          <Image source={image} style={styles.image} resizeMethod="scale" />
        </View>
      </View>
      <View
        style={{
          ...styles.welcomeText,
          borderTopLeftRadius: useWindowDimensions().width / 1.75,
          borderTopRightRadius: useWindowDimensions().width / 1.75,
        }}>
        <View style={styles.welcomeTextContenet}>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.text}>{text}</Text>
          <View style={styles.dotContainer}>
            {splashScreen === 1 ? (
              <View style={styles.dotAcitve} />
            ) : (
              <View style={styles.dot} />
            )}
            {splashScreen === 2 ? (
              <View style={styles.dotAcitve} />
            ) : (
              <View style={styles.dot} />
            )}
            {splashScreen === 3 ? (
              <View style={styles.dotAcitve} />
            ) : (
              <View style={styles.dot} />
            )}
          </View>
          {splashScreen < 3 ? (
            <TouchableOpacity onPress={nextSplashScreen}>
              <Image
                source={require('../../../assets/images/forwardButton.png')}
                style={styles.nextButton}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={skipSplashScreen}
              style={styles.getStarted}>
              <Text style={globalStyles.whiteText}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    justifyContent: 'center',
    flex: 1,
  },
  welcomeImage: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  splashBg: {
    width: 100 + '%',
    height: 100 + '%',
  },
  image: { width: 100 + '%', height: 100 + '%', resizeMode: 'contain' },
  imageBg: {
    position: 'absolute',
    width: 100 + '%',
    height: 100 + '%',
    backgroundColor: '#FFEABF',
  },
  skipContainer: {
    position: 'absolute',
    right: 5 + '%',
    top: 5 + '%',
    zIndex: 9,
  },
  skip: {
    fontFamily: 'Poppins-Regular',
    color: themeColor,
    textDecorationLine: 'underline',
  },
  welcomeText: {
    flex: 1,
    margin: 'auto',
    width: 150 + '%',
    marginLeft: -25 + '%',
    backgroundColor: '#fafafa',
    marginTop: -50,
    // borderTopLeftRadius: 230,
    // borderTopRightRadius: 230,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTextContenet: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    width: 60 + '%',
    maxHeight: 80 + '%',
    minHeight: 300,
  },
  heading: {
    maxWidth: 70 + '%',
    fontSize: 32,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    maxWidth: 222,
    lineHeight: 25,
    textAlign: 'center',
    color: '#808080',
    marginTop: -5 + '%',
  },
  dotContainer: {
    flexDirection: 'row',
    width: 100,
    maxWidth: 30 + '%',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 'auto',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#808080',
  },
  dotAcitve: {
    width: 30,
    height: 7,
    borderRadius: 10,
    backgroundColor: '#FCB32B',
  },
  nextButton: { borderRadius: 180, maxWidth: 66, maxHeight: 66 },
  getStarted: {
    backgroundColor: themeColor,
    width: 100 + '%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
export default Onboarding;
