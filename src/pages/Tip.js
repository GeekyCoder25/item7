import React, { useState } from 'react';
import {
  ImageBackground,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  useWindowDimensions,
} from 'react-native';
import Back from '../../assets/images/back.svg';
import Info from '../../assets/images/info.svg';
import TipIcon from '../../assets/images/tipIcon.svg';
import { globalStyles } from '../styles/globalStyles';
const TipMesaages = [
  {
    message: 'Cheers to you',
    price: 200,
  },
  {
    message: 'You’re great',
    price: 200,
  },
  {
    message: 'Thank you so much',
    price: 200,
  },
  {
    message: 'You’re my hero',
    price: 200,
  },
];

const Tip = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleShowModal = () => {
    setModalOpen(prev => !prev);
  };
  return (
    <>
      <ImageBackground
        source={require('../../assets/images/splashBg.png')}
        style={globalStyles.route}
        resizeMode="repeat">
        <View style={styles.route}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Back />
            </Pressable>
            <Text style={styles.headerTitle}>Show your support with a tip</Text>
            <Text style={styles.headerDesc}>
              Delivery people are critical to our communities at this time. Add
              a tip to say thanks.
              <Text style={styles.info} onPress={handleShowModal}>
                {' '}
                <Info />
              </Text>
            </Text>
          </View>
          <View style={styles.body}>
            {TipMesaages.map(tipmessage => (
              <View style={styles.tipTab} key={tipmessage.message}>
                <Image
                  source={require('../../assets/images/tipIcon.png')}
                  style={styles.tipTabImage}
                />
                <Text style={styles.tipMessage}>{tipmessage.message}</Text>
                <Text style={styles.tipPrice}>
                  <Text style={styles.lineThrough}>N</Text>
                  {tipmessage.price}
                </Text>
              </View>
            ))}
            <View style={styles.tipTab}>
              <Image
                source={require('../../assets/images/tipIcon.png')}
                style={styles.tipTabImage}
              />
              <Text style={styles.tipMessage}>Custom</Text>
              <Text style={styles.tipPrice}>Edit</Text>
            </View>
          </View>
          <View>
            <Text style={styles.hr}>Select a tip</Text>
          </View>
          <View style={styles.button}>
            <Pressable
              style={styles.buttonBackground}
              onPress={() => navigation.navigate('Checkout')}>
              <Text style={styles.buttonBackgroundText}>
                Proceed to Checkout
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
      <Modal
        visible={modalOpen}
        animationType="slide"
        onRequestClose={handleShowModal}
        transparent>
        <Pressable onPress={handleShowModal} style={styles.overlay} />
        <View
          style={{
            ...styles.modal,
            minHeight: useWindowDimensions().height * 0.1,
          }}>
          <Text style={styles.modalHeader}>Say thanks with a tip</Text>
          <Text style={styles.modalText}>
            Tipping is an optional way to say thanks. 100% of your tip goes to
            your courier, and you can customize the price as you deem fit.
          </Text>
          <Pressable style={styles.buttonBackground} onPress={handleShowModal}>
            <Text style={styles.buttonBackgroundText}>OK</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  route: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    paddingVertical: 5 + '%',
    paddingHorizontal: 2 + '%',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    maxWidth: 80 + ' %',
    alignSelf: 'center',
  },
  headerDesc: {
    width: 80 + ' %',
    alignSelf: 'center',
    textAlign: 'center',
    maxWidth: 350,
    fontFamily: 'Raleway-Regular',
    lineHeight: 20,
    display: 'flex',
  },
  info: { marginLeft: 5 },
  body: {
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    marginTop: 50,
  },
  tipTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 90 + '%',
    marginVertical: 15,
  },
  tipTabImage: {
    borderRadius: 50,
  },
  tipMessage: {
    flex: 1,
    marginHorizontal: 25,
    fontFamily: 'Poppins-Regular',
  },
  tipPrice: {
    paddingVertical: 5,
    fontFamily: 'Raleway-SemiBold',
    borderWidth: 0.8,
    borderColor: '#808080',
    borderRadius: 15,
    backgroundColor: '#fff',
    textAlign: 'center',
    width: 70,
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1);',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
  hr: {
    width: 100 + '%',
    marginTop: 30,
    borderTopColor: 'rgba(128, 128, 128, 0.4)',
    borderTopWidth: 0.5,
    textAlign: 'center',
    paddingTop: 30,
    fontFamily: 'Poppins-Regular',
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
  overlay: {
    backgroundColor: '#000',
    opacity: 0.5,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    height: 250,
    position: 'absolute',
    bottom: 0,
    width: 100 + '%',
    justifyContent: 'space-between',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 5 + '%',
    paddingVertical: 30,
  },
  modalHeader: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
    lineHeight: 25,
    width: 85 + '%',
    alignSelf: 'center',
    fontSize: 14,
  },
});

export default Tip;
