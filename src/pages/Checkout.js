/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ToastAndroid,
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Back from '../../assets/images/back.svg';
import Map from '../../assets/images/map.svg';
import Chevron from '../../assets/images/wallet-chevron-right.svg';
import Promo from '../../assets/images/promo-code.svg';
import Radio from '../../assets/images/radio-button.svg';
import RadioSelected from '../../assets/images/radio-button-selected.svg';
import ChevronDark from '../../assets/images/chevron-right.svg';
import { AppContext } from '../components/AppContext';

const Checkout = ({ navigation }) => {
  const [tabActive, setTabActive] = useState(0);
  const [promoCodeInputValue, setPromoCodeInputValue] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const card = 545202151201452301;
  const { appContextState, setAppContextState, apiEndpoint } =
    useContext(AppContext);
  const { phoneNumber, orders, cart, recents } = appContextState;
  const handlePromoApply = () => {
    Alert.alert(`Sorry ☹️ "${promoCodeInputValue}" is an Invalid Promo Code`);
  };
  const handleFetch = async (data, data2) => {
    const id = phoneNumber;
    const res = await fetch(`${apiEndpoint}/api/favorites/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart: [],
        orders: [...orders, ...data],
        recents: [...recents, ...data2],
      }),
    });
    return res.json();
  };
  const handlePay = () => {
    const localOrders = [];
    cart.map(i => {
      if (localOrders.length > 0 && localOrders.includes(i.title)) {
        const index = localOrders.indexOf(i.title);
        localOrders[index - 1] = localOrders[index - 1] + 1 * i.numberOfItem;
      } else {
        i.numberOfItem <= 1
          ? localOrders.push(1)
          : localOrders.push(1 * i.numberOfItem);
        localOrders.push(i.title);
      }
    });
    const localRecents = [];
    cart.map(i => {
      if (localRecents.length > 0 && localRecents.includes(i.title)) {
        const index = localRecents.indexOf(i.title);
        localRecents[index] = i.title;
      } else {
        localRecents.push(i.title);
      }
    });
    handleFetch(localOrders, localRecents)
      .then(
        setAppContextState({
          ...appContextState,
          cart: [],
          orders: [...orders, ...localOrders],
          recents: [...recents, ...localRecents],
        }),
      )
      .then(navigation.navigate('Congrats'))
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));
  };
  return (
    <ImageBackground
      source={require('../../assets/images/splashBg.png')}
      style={globalStyles.route}
      resizeMode="repeat">
      <View style={styles.route}>
        <ScrollView
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Back />
            </Pressable>
            <Text style={styles.headerTitle}>Checkout</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyHeader}>
              {tabActive === 0 ? 'Delivery Details' : 'Pick - up Details'}
            </Text>
            <View style={styles.tabSelector}>
              <Text
                style={tabActive === 0 ? styles.tabActive : styles.notTabActive}
                onPress={() => setTabActive(0)}>
                Delivery
              </Text>
              <Text
                style={tabActive === 1 ? styles.tabActive : styles.notTabActive}
                onPress={() => setTabActive(1)}>
                Pick-up
              </Text>
            </View>
            <View>
              {tabActive === 0 ? (
                <>
                  <View style={styles.location}>
                    <Map />
                    <View style={styles.locationText}>
                      <Text style={styles.locationName}>Home</Text>
                      <Text style={styles.locationAddress}>
                        No. 1 Ilofa Road GRA, Ilorin, Nigeria.
                      </Text>
                    </View>
                    <View style={styles.chevron}>
                      <Chevron />
                    </View>
                  </View>
                  <View style={styles.deliveryTimeContainer}>
                    <Text style={styles.bodyHeader}>Delivery Time</Text>
                    <Text style={styles.deliveryTime}>5-10 min(s)</Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.location}>
                    <Map />
                    <View style={styles.locationText}>
                      <Text style={styles.locationName}>Location</Text>
                      <Text style={styles.locationAddress}>
                        Item7 restaurant, ECWA complex, challenge ilorin
                      </Text>
                    </View>
                    <View style={styles.chevron}>
                      <Chevron />
                    </View>
                  </View>
                  <View style={styles.deliveryTimeContainer}>
                    <Text style={styles.bodyHeader}>Pick - up Time</Text>
                    <Text style={styles.deliveryTime}>5-10 min(s)</Text>
                  </View>
                </>
              )}
            </View>
            <View style={styles.paymentContainer}>
              <Text style={{ ...styles.bodyHeader, marginBottom: 20 }}>
                Payment Method
              </Text>
              <Pressable
                style={styles.paymentMethod}
                onPress={() => setPaymentMethod('card')}>
                {paymentMethod === 'card' ? <RadioSelected /> : <Radio />}
                <Image
                  source={require('../../assets/images/mastercard.png')}
                  style={styles.paymentImage}
                />
                <Text style={styles.cardText}>{card}</Text>
                <Pressable
                  style={styles.chevronDark}
                  onPress={() => navigation.navigate('Wallet')}>
                  <ChevronDark style={styles.chevronDark} />
                </Pressable>
              </Pressable>
              <Pressable
                style={styles.paymentMethod}
                onPress={() => setPaymentMethod('goWallet')}>
                {paymentMethod === 'goWallet' ? <RadioSelected /> : <Radio />}
                <Image
                  source={require('../../assets/images/gowallet.png')}
                  style={styles.paymentImage}
                />
                <Text style={styles.cardText}>Go wallet</Text>
                <Pressable
                  style={styles.chevronDark}
                  onPress={() => navigation.navigate('Wallet')}>
                  <ChevronDark />
                </Pressable>
              </Pressable>
              <Pressable
                style={styles.paymentMethod}
                onPress={() => setPaymentMethod('payOnDelivery')}>
                {paymentMethod === 'payOnDelivery' ? (
                  <RadioSelected />
                ) : (
                  <Radio />
                )}
                <Image
                  source={require('../../assets/images/cash.png')}
                  style={styles.paymentImage}
                />
                <Text style={styles.cardText}>Pay on delivery</Text>
                <View style={styles.chevronDark} />
              </Pressable>
              <View>
                <View style={styles.textInputContainer}>
                  <View style={styles.promoIcon}>
                    <Promo />
                  </View>
                  <TextInput
                    placeholder="Promo Code"
                    style={styles.textInput}
                    onChangeText={val => setPromoCodeInputValue(val)}
                  />
                  <TouchableOpacity
                    style={styles.apply}
                    onPress={handlePromoApply}>
                    <Text
                      style={{
                        ...globalStyles.whiteText,
                        ...globalStyles.fontRegular,
                      }}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.button}>
            <Pressable style={styles.buttonBackground} onPress={handlePay}>
              <Text style={styles.buttonBackgroundText}>Pay now</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  route: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    paddingHorizontal: 2 + '%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 5 + '%',
  },
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    textAlign: 'center',
    paddingRight: 30,
    flex: 1,
  },
  body: {
    flex: 1,
    paddingTop: 30,
  },
  bodyHeader: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  tabSelector: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 15,
    height: 50,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(128, 128, 128, 0.2)',
  },
  tabActive: {
    flex: 1,
    backgroundColor: globalStyles.themeColorSolo,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 5,
    fontFamily: 'Poppins-Regular',
  },
  notTabActive: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Poppins-Regular',
    borderRadius: 5,
  },
  location: {
    backgroundColor: globalStyles.themeColorSolo,
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
    shadowColor: globalStyles.themeColorSolo,
  },
  locationText: {
    marginHorizontal: 10,
    flex: 3,
  },
  locationName: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  locationAddress: {
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 12,
  },
  chevron: {
    flex: 1,
    alignItems: 'flex-end',
  },
  deliveryTimeContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryTime: {
    backgroundColor: globalStyles.themeColorSolo,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 5,
    fontFamily: 'Raleway-Regular',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  paymentContainer: {
    marginVertical: 20,
  },
  textInputContainer: {
    position: 'relative',
    flexDirection: 'row',
    minHeight: 15 + '%',
    marginTop: 15,
  },
  textInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 40,
    paddingRight: 50,
    borderWidth: 1,
    borderColor: '#80808066',
    borderRadius: 10,
    height: 65,
    fontFamily: 'Raleway-Regular',
  },
  promoIcon: {
    position: 'absolute',
    left: 8,
    zIndex: 9,
    top: 32 + '%',
  },
  apply: {
    position: 'absolute',
    right: 8,
    zIndex: 9,
    top: 15 + '%',
    backgroundColor: globalStyles.themeColorSolo,
    color: '#fff',
    height: 70 + '%',
    width: 10 + '%',
    minWidth: 70,
    borderRadius: 10,
    padding: 1 + '%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 30,
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
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#80808066',
    borderRadius: 10,
    height: 65,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  paymentImage: {
    marginLeft: 30,
  },
  cardText: {
    marginLeft: 20,
    fontFamily: 'Poppins-Regular',
  },
  chevronDark: {
    marginLeft: 'auto',
    height: 70 + '%',
    minWidth: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Checkout;
