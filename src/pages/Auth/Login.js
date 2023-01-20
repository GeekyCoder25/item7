import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  useWindowDimensions,
  View,
} from 'react-native';
import Back from '../../../assets/images/back.svg';
import Phone from '../../../assets/images/phone.svg';
import Lock from '../../../assets/images/lock.svg';
import Eye from '../../../assets/images/eyeLogin.svg';
import Google from '../../../assets/images/google.svg';
import { globalStyles } from '../../styles/globalStyles';

const Login = ({ navigation }) => {
  const handleLogin = () => {};
  const vh = useWindowDimensions().height;
  return (
    <ImageBackground
      source={require('../../../assets/images/splashBg.png')}
      style={globalStyles.route}
      resizeMode="repeat">
      <ScrollView style={styles.route}>
        <View style={{ minHeight: vh * (93 / 100) }}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Back />
            </Pressable>
            <View style={styles.headerTitleContainer}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.headerTitle}>Login</Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.textInputContainer}>
              <View style={styles.icon}>
                <Phone />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your phone number or email here"
                placeholderTextColor={'#80808080'}
              />
            </View>
            <View style={styles.textInputContainer}>
              <View style={styles.icon}>
                <Lock />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password here"
                placeholderTextColor={'#80808080'}
              />
              <View style={styles.eye}>
                <Eye />
              </View>
            </View>
            <Text style={styles.TandC}>
              <Text style={styles.TandColor}>Forgot Password?</Text>
            </Text>
            <View style={styles.orContainer}>
              <Text style={styles.hr}>.</Text>
              <Text style={styles.or}>or</Text>
              <Text style={styles.hr}>.</Text>
            </View>
            <View style={styles.googleContainer}>
              <View style={styles.googleIcon}>
                <Google />
              </View>
              <Text style={styles.google}>Log In with Google</Text>
            </View>
          </View>
          <View style={styles.question}>
            <Text style={styles.questionText}>
              No account?{' '}
              <Text
                onPress={() => navigation.replace('Signup')}
                style={styles.questionTextLink}>
                Register{' '}
              </Text>
            </Text>
          </View>
          <View style={styles.button}>
            <Pressable style={styles.buttonBackground} onPress={handleLogin}>
              <Text style={styles.buttonBackgroundText}>Log In </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  route: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    paddingVertical: 5 + '%',
    paddingHorizontal: 2 + '%',
    // backgroundColor: 'red'
  },
  headerTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    marginTop: 10,
    textAlign: 'center',
  },
  logo: {
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 2 + '%',
    marginTop: 30,
  },
  textInputContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  icon: {
    position: 'absolute',
    left: 10,
    zIndex: 9,
    top: 35 + '%',
  },
  textInput: {
    width: 100 + '%',
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    borderWidth: 1,
    alignItems: 'flex-start',
    borderColor: '#808080',
    borderRadius: 8,
    fontFamily: 'Poppins-Regular',
  },
  eye: {
    position: 'absolute',
    right: 10,
    zIndex: 9,
    top: 35 + '%',
  },
  TandC: {
    textAlign: 'left',
    width: 100 + '%',
    fontFamily: 'Poppins-Regular',
  },
  TandColor: {
    color: '#FCB32B',
    textDecorationLine: 'underline',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  or: {
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 10,
  },
  hr: {
    display: 'flex',
    backgroundColor: '#808080',
    height: 1,
    width: 100 + '%',
  },
  googleContainer: {
    flexDirection: 'row',
    marginVertical: 25,
    width: 100 + '%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#808080',
    borderRadius: 8,
    height: 50,
  },
  googleIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 9,
    top: 25 + '%',
  },
  google: {
    fontFamily: 'Poppins-Regular',
  },
  question: {
    alignItems: 'center',
  },
  questionText: {
    fontFamily: 'Poppins-Regular',
  },
  questionTextLink: {
    color: '#FCB32B',
  },
  buttonBackground: {
    backgroundColor: globalStyles.themeColorSolo,
    borderRadius: 8,
    justifyContent: 'center',
    height: 50,
    marginVertical: 30,
    marginBottom: 50,
  },
  buttonBackgroundText: {
    justifyContent: 'center',
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
});
export default Login;
