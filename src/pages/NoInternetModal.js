import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppContext } from '../components/AppContext';
import { globalStyles } from '../styles/globalStyles';

const NoInternetModal = ({ modalOpen, navigation }) => {
  const [tryingAgain, setTryingAgain] = useState(false);
  const { setInternetCheck, routeActive, apiEndpoint } = useContext(AppContext);
  const [checking, setChecking] = useState(false);
  const handlePress = () => {
    setTryingAgain(true);
    setChecking(true);
    const interval = async () => {
      const res = await fetch(`${apiEndpoint}/api/network`);
      const data = await res.json();
      return data;
    };
    !tryingAgain &&
      interval()
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
    if (!routeActive) {
      navigation.replace('Logo');
    }
  };
  useEffect(() => {
    checking &&
      setTimeout(() => {
        setChecking(false);
      }, 10000);
  }, [checking]);
  return (
    <Modal
      visible={modalOpen}
      animationType="slide"
      transparent
      onRequestClose={handlePress}>
      <Pressable style={styles.overlay} />
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.text}>No Internet Connection</Text>
          <Pressable style={styles.button}>
            {checking ? (
              <ActivityIndicator color={globalStyles.themeColorSolo} />
            ) : (
              <Button
                title="Try Again"
                color={globalStyles.themeColorSolo}
                style={styles.button}
                onPress={handlePress}
              />
            )}
          </Pressable>
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
  text: {
    textAlign: 'center',
    // fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  button: {
    marginTop: 20,
    width: 30 + '%',
    // backgroundColor: globalStyles.themeColorSolo,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
