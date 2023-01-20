import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Back from '../../assets/images/back.svg';
import Eye from '../../assets/images/eye.svg';
import EyeClosed from '../../assets/images/eyeClosed.svg';
import WalletPlus from '../../assets/images/wallet-plus.svg';
import WalletChevron from '../../assets/images/wallet-chevron-right.svg';
import Promo from '../../assets/images/promo-code.svg';

const Wallet = ({ navigation }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [promoCodeInputValue, setPromoCodeInputValue] = useState('');
  const walletAmount = 500;
  const handlePromoApply = () => {
    Alert.alert(`Sorry ☹️ "${promoCodeInputValue}" is an Invalid Promo Code`);
  };
  return (
    <ImageBackground
      source={require('../../assets/images/splashBg.png')}
      style={globalStyles.route}
      resizeMode="repeat">
      <View style={styles.route}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Back />
          </Pressable>
          <Text style={styles.headerTitle}>Wallet</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.card}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>Go Cash</Text>
              <Pressable onPress={() => setShowBalance(prev => !prev)}>
                <View style={styles.showBalance}>
                  <View style={styles.showBalanceEye}>
                    {showBalance ? <EyeClosed /> : <Eye />}
                  </View>
                  <Text style={styles.showBalance}>
                    {showBalance ? 'Hide' : 'Show'} balance
                  </Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.balanceContainer}>
              <View style={styles.balance}>
                <Text style={styles.balanceText}>
                  {showBalance ? (
                    `NGN${walletAmount}${
                      walletAmount.toString().indexOf('.') === -1 ? '.00' : ''
                    }`
                  ) : (
                    <Text style={styles.asteriks}>*****</Text>
                  )}
                </Text>
                <TouchableOpacity
                  style={styles.addFunds}
                  onPress={() => navigation.navigate('Payment')}>
                  <View style={styles.plus}>
                    <WalletPlus />
                  </View>
                  <Text style={styles.addFundsText}>Add funds</Text>
                </TouchableOpacity>
              </View>
              <Pressable onPress={() => navigation.navigate('Payment')}>
                <WalletChevron />
              </Pressable>
            </View>
          </View>
          <View>
            <Text style={styles.promoHeader}>Promo Code</Text>
            <View style={styles.textInputContainer}>
              <View style={styles.promoIcon}>
                <Promo />
              </View>
              <TextInput
                placeholder="Promo Code"
                style={styles.textInput}
                onChangeText={val => setPromoCodeInputValue(val)}
              />
              <TouchableOpacity style={styles.apply} onPress={handlePromoApply}>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  route: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    paddingVertical: 5 + '%',
    paddingHorizontal: 5 + '%',
  },
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    marginVertical: 30,
  },
  card: {
    backgroundColor: globalStyles.themeColorSolo,
    borderRadius: 10,
    padding: 20,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  showBalance: {
    fontFamily: 'Poppins-Regular',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#fff',
  },
  showBalanceEye: {
    marginRight: 10,
    marginTop: -3,
  },

  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceText: {
    marginVertical: 10,
    fontFamily: 'Raleway-SemiBold',
    color: '#fff',
    fontSize: 30,
  },
  asteriks: {
    fontFamily: 'Raleway-Bold',
  },
  addFunds: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  plus: {
    paddingRight: 10,
  },
  addFundsText: {
    fontFamily: 'Poppins-SemiBold',
    color: globalStyles.themeColorSolo,
    marginTop: 5,
  },
  promoHeader: {
    marginTop: 50,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
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
});
export default Wallet;
