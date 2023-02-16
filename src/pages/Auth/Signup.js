import React, { useContext, useEffect, useState } from 'react';
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
import User from '../../../assets/images/user.svg';
import Phone from '../../../assets/images/phone.svg';
import Lock from '../../../assets/images/lock.svg';
import Eye from '../../../assets/images/eyeLogin.svg';
import Google from '../../../assets/images/google.svg';
import { globalStyles } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext } from '../../components/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dot, setDot] = useState('.');
  const { setAppContextState, apiEndpoint } = useContext(AppContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    // firstName: 'Nice',
    // lastName: 'Nice',
    // password: '251101',
    // confirmPassword: '251101',
    // phoneNumber: '9073002596',
  });
  const vh = useWindowDimensions().height;
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
  const saveAsyncStorage = async data => {
    try {
      const userProfileData = data.data;
      await AsyncStorage.setItem('loggedIn', 'true');
      await AsyncStorage.setItem('phoneNumber', userProfileData.phoneNumber);
      const fetchUserData = async () => {
        const id = userProfileData.phoneNumber;
        const hiddenData = {
          phoneNumber: id,
          userInfo: {
            firstName: userProfileData.firstName,
            lastName: userProfileData.lastName,
            email: '',
          },
        };
        const res = await fetch(`${apiEndpoint}/api/userData/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hiddenData),
        });
        return await res.json();
      };
      await fetchUserData()
        .then(result => {
          setAppContextState({
            userLoggedIn: true,
            userProfileData,
            ...result,
          });
          setLoading(false);
          navigation.replace('Home');
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const handleCreateAccount = () => {
    setLoading(true);
    editInput();
    const emptyInputCheck = [];
    Object.values(formData).forEach(value =>
      emptyInputCheck.push(value === ''),
    );
    if (emptyInputCheck.includes(true)) {
      setErrorMessage('Please input all required fields');
      setLoading(false);
    } else if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords doesn't match");
      setLoading(false);
    } else {
      const signupaccount = async () => {
        const res = await fetch(`${apiEndpoint}/api/auth/new-user`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
      };
      signupaccount()
        .then(data => {
          if (typeof data === 'string') {
            setErrorMessage(data);
            setLoading(false);
          } else {
            saveAsyncStorage(data);
            setSuccessMessage(data.success);
            // setLoading(false);
          }
        })
        .catch(err => {
          setErrorMessage('Server Error');
          setLoading(false);
          console.log(err);
        });
    }
  };
  return (
    <ImageBackground
      source={require('../../../assets/images/splashBg.png')}
      style={globalStyles.route}
      resizeMode="repeat">
      <ScrollView style={styles.route}>
        <View style={{ minHeight: vh * (93 / 100) }}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Back />
            </Pressable>
            <View style={styles.headerTitleContainer}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.headerTitle}>Register</Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.textInputContainer}>
              <View style={styles.icon}>
                <User />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your first name here"
                placeholderTextColor={'#80808080'}
                onChangeText={text => {
                  setFormData(prev => {
                    return { ...prev, firstName: text };
                  });
                  editInput();
                }}
                name="firstName"
              />
            </View>
            <View style={styles.textInputContainer}>
              <View style={styles.icon}>
                <User />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your last name here"
                placeholderTextColor={'#80808080'}
                onChangeText={text => {
                  setFormData(prev => {
                    return { ...prev, lastName: text };
                  });
                  editInput();
                }}
                name="lastName"
              />
            </View>
            <View style={styles.textInputContainer}>
              <View style={styles.icon}>
                <Phone />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your phone number here"
                keyboardType="phone-pad"
                placeholderTextColor={'#80808080'}
                onChangeText={text => {
                  setFormData(prev => {
                    return { ...prev, phoneNumber: text };
                  });
                  editInput();
                }}
                name="phoneNumber"
              />
            </View>
            <View style={styles.textInputContainer}>
              <View style={styles.icon}>
                <Lock />
              </View>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={'#80808080'}
                secureTextEntry={showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Create your password"
                onChangeText={text => {
                  setFormData(prev => {
                    return { ...prev, password: text };
                  });
                  editInput();
                }}
                name="password"
              />
              <Pressable onPress={() => setShowPassword(prev => !prev)}>
                <View style={styles.eye}>
                  <Eye />
                </View>
              </Pressable>
            </View>
            <View style={styles.textInputContainer}>
              <View style={styles.icon}>
                <Lock />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Confirm your password"
                placeholderTextColor={'#80808080'}
                secureTextEntry={showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => {
                  setFormData(prev => {
                    return { ...prev, confirmPassword: text };
                  });
                  editInput();
                }}
                name="confirmPassword"
              />
              <Pressable onPress={() => setShowConfirmPassword(prev => !prev)}>
                <View style={styles.eye}>
                  <Eye />
                </View>
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
                    {errorMessage}
                    {errorMessage.includes('another') && (
                      <Text>
                        ,{' '}
                        <Text
                          onPress={() => navigation.replace('Login')}
                          style={styles.questionTextLink}>
                          Login
                        </Text>
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
            <Text style={styles.TandC}>
              By proceeding, you’ve agreed to our{'\n'}
              <Text style={styles.TandColor}>
                Terms of service and Privacy policy
              </Text>
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
              <Text style={styles.google}>Continue with Google</Text>
            </View>
          </View>
          <View style={styles.question}>
            <Text style={styles.questionText}>
              Have an account?{' '}
              <Text
                onPress={() => navigation.replace('Login')}
                style={styles.questionTextLink}>
                Sign In
              </Text>
            </Text>
          </View>
          <View style={styles.button}>
            <Pressable
              style={styles.buttonBackground}
              onPress={loading ? null : handleCreateAccount}>
              <Text style={styles.buttonBackgroundText}>
                Register
                {loading && (
                  <Text>
                    ing
                    <Text style={styles.dots}>{dot}</Text>
                  </Text>
                )}
              </Text>
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
    textAlign: 'center',
    width: 90 + '%',
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
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  dots: {
    fontSize: 30,
    marginBottom: 500,
  },
});
export default Signup;
