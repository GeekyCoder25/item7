import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppContext } from '../components/AppContext';
import { globalStyles } from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NoInternetModal = ({ modalOpen, navigation }) => {
  const [tryingAgain, setTryingAgain] = useState(false);
  const { setInternetCheck, routeActive, apiEndpoint } = useContext(AppContext);
  const [checking, setChecking] = useState(false);
  useEffect(() => {
    setInternetCheck(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePress = () => {
    setTryingAgain(true);
    setChecking(true);
    const fetchFunc = async () => {
      const res = await fetch(`${apiEndpoint}/api/network`);
      const data = await res.json();
      return data;
    };
    if (!routeActive) {
      navigation.replace('Logo');
    } else if (!tryingAgain) {
      fetchFunc()
        .then(data => {
          setInternetCheck(data.network);
          setTryingAgain(false);
          setChecking(false);
        })
        .catch(err => {
          console.log('err', err);
          setTryingAgain(false);
          setChecking(false);
        });
    }
  };
  // useEffect(() => {
  //   checking &&
  //     setTimeout(() => {
  //       setChecking(false);
  //     }, 10000);
  // }, [checking]);
  return (
    <Modal
      visible={modalOpen}
      animationType="slide"
      transparent
      onRequestClose={handlePress}>
      <Pressable style={styles.overlay} />
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.face}>
            <Icon
              name="sentiment-very-dissatisfied"
              size={85}
              color={globalStyles.themeColorSolo}
            />
          </View>
          <Text style={styles.text}>No Internet Connection</Text>
          {checking ? (
            <ActivityIndicator
              color={globalStyles.themeColorSolo}
              style={styles.activity}
              size="large"
            />
          ) : (
            <Pressable style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>Try Again</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default NoInternetModal;
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#000',
    opacity: 0.5,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    height: 100 + '%',
    width: 100 + '%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: 90 + '%',
    maxWidth: 700,
    paddingHorizontal: 5 + '%',
    paddingVertical: 20,
    borderRadius: 8,
    elevation: 10,
  },
  face: {
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  activity: {
    marginVertical: 20,
  },
  button: {
    marginVertical: 20,
    height: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalStyles.themeColorSolo,
    alignSelf: 'center',
    elevation: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
});
