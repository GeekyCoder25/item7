import React, { useContext, useEffect, useRef, useState } from 'react';
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
  Alert,
} from 'react-native';
import Back from '../../../assets/images/back.svg';
import Phone from '../../../assets/images/phone.svg';
import Lock from '../../../assets/images/lock.svg';
import Eye from '../../../assets/images/eyeLogin.svg';
import Google from '../../../assets/images/google.svg';
import { globalStyles } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext } from '../../components/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const passwordInputRef = useRef(TextInput);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dot, setDot] = useState('.');
  const { setAppContextState, apiEndpoint, networkCheck } =
    useContext(AppContext);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
  });
  const handleLogin = () => {
    setLoading(true);
    editInput();
    const emptyInputCheck = [];
    Object.values(formData).forEach(value =>
      emptyInputCheck.push(value === ''),
    );
    if (emptyInputCheck.includes(true)) {
      setErrorMessage('Please input all required fields');
      setLoading(false);
    } else {
      const loginAccount = async () => {
        networkCheck();
        const res = await fetch(`${apiEndpoint}/api/auth/user`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
      };
      loginAccount()
        .then(data => {
          if (typeof data === 'string') {
            setErrorMessage(data);
            setLoading(false);
          } else {
            setSuccessMessage('Login Successful');
            saveAsyncStorage(data);
          }
        })
        .catch(err => {
          console.log(err);
          setErrorMessage(
            "Couldn't connect to server, check your internet connection",
          );
          setLoading(false);
        });
    }
  };
  const saveAsyncStorage = async data => {
    try {
      const userProfileData = data.data;
      await AsyncStorage.setItem('loggedIn', 'true');
      await AsyncStorage.setItem('phoneNumber', userProfileData.phoneNumber);
      const fetchUserData = async () => {
        const id = userProfileData.phoneNumber;
        const res = await fetch(`${apiEndpoint}/api/userData/${id}`);
        return await res.json();
      };
      await fetchUserData().then(result => {
        setAppContextState({
          userLoggedIn: true,
          ...result,
        });
        navigation.replace('Home');
      });
    } catch (err) {
      console.log(err);
    }
  };
  const vh = useWindowDimensions().height;
  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };
  const editInput = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };
  useEffect(() => {
    loading
      ? setTimeout(() => {
          dot === '....' ? setDot('.') : setDot(dot + '.');
        }, 1000)
      : setDot('.');
  }, [loading, dot]);
  const handleGoogleClick = () => {
    Alert.alert('Still in Development');
  };
  return (
    <ImageBackground
      source={require('../../../assets/images/splashBg.png')}
      style={globalStyles.route}
      resizeMode="repeat">
      <ScrollView style={styles.route}>
        <View style={{ minHeight: vh * (93 / 100) }}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.navigate('Signup')}>
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
                placeholder="Enter your phone number here"
                placeholderTextColor={'#80808080'}
                onChangeText={text => {
                  setFormData(prev => {
                    return { ...prev, phoneNumber: text };
                  });
                  editInput();
                }}
                keyboardType="phone-pad"
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
                name="password"
                secureTextEntry={showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => {
                  setFormData(prev => {
                    return { ...prev, password: text };
                  });
                  editInput();
                }}
                ref={passwordInputRef}
              />
              <Pressable style={styles.eye} onPress={handleShowPassword}>
                <Eye />
              </Pressable>
            </View>
            <View style={styles.errorMessage}>
              {errorMessage && (
                <>
                  <Icon
                    name="warning"
                    size={15}
                    color={globalStyles.themeColorSolo}
                  />
                  <Text style={styles.errorMessageText}>
                    {errorMessage},{' '}
                    {errorMessage.includes('exist') && (
                      <Text
                        onPress={() => navigation.replace('Signup')}
                        style={styles.questionTextLink}>
                        Sign up
                      </Text>
                    )}
                  </Text>
                </>
              )}
              {successMessage && (
                <Icon name="check-circle" size={20} color="green" />
              )}
              <Text style={styles.successMessageText}>{successMessage}</Text>
            </View>
            <Pressable
              onPress={() => Alert.alert('Sorry, No backup email set yet')}
              style={styles.TandC}>
              <Text style={styles.TandColor}>Forgot Password?</Text>
            </Pressable>
            <View style={styles.orContainer}>
              <Text style={styles.hr}>.</Text>
              <Text style={styles.or}>or</Text>
              <Text style={styles.hr}>.</Text>
            </View>
            <Pressable
              onPress={handleGoogleClick}
              style={styles.googleContainer}>
              <View style={styles.googleIcon}>
                <Google />
              </View>
              <Text style={styles.google}>Log In with Google</Text>
            </Pressable>
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
            <Pressable
              style={styles.buttonBackground}
              onPress={loading ? null : handleLogin}>
              {!loading ? (
                <Text style={styles.buttonBackgroundText}>Log In </Text>
              ) : (
                <Text style={styles.buttonBackgroundText}>
                  Logging In
                  <Text style={styles.dots}>{dot}</Text>
                </Text>
              )}
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
    height: 100 + '%',
    position: 'absolute',
    right: 0,
    paddingHorizontal: 15,
    zIndex: 9,
    justifyContent: 'center',
  },
  errorMessage: {
    flexDirection: 'row',
    top: -20,
  },
  errorMessageText: {
    marginLeft: 5,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: globalStyles.themeColorSolo,
    textAlign: 'center',
  },
  successMessageText: {
    marginLeft: 5,
    fontSize: 13,
    marginTop: 2,
    fontFamily: 'Poppins-Regular',
    color: 'green',
    textAlign: 'center',
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
  dots: {
    fontSize: 30,
    marginBottom: 500,
  },
});
export default Login;
