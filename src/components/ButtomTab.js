import React, { useRef } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import BottomTabCart from '../../assets/images/cart.svg';
import BottomTabHome from '../../assets/images/bottomTabHome.svg';
import BottomTabHomeActive from '../../assets/images/bottomTabHomeActive.svg';
import BottomTabOrder from '../../assets/images/bottomTabOrder.svg';

const ButtomTab = ({ navigation, route }) => {
  const buttomTabRef = useRef(Image);
  return (
    <View style={styles.bottomTab}>
      <View style={styles.bottomTabRelative}>
        <Image
          source={require('../../assets/images/bottomTab.png')}
          style={{
            ...styles.bottomTabImage,
            minWidth: useWindowDimensions().width,
          }}
          resizeMode="stretch"
          ref={buttomTabRef}
        />
      </View>
      <TouchableOpacity
        style={styles.bottomTabCart}
        onPress={() => navigation.navigate('Cart')}>
        <BottomTabCart />
      </TouchableOpacity>
      {route.name === 'Home' ? (
        <Pressable
          style={styles.bottomTabHome}
          onPress={() => navigation.navigate('Home')}>
          <BottomTabHomeActive />
          <Text
            style={{
              ...globalStyles.themeColor,
              ...globalStyles.fontRegular,
            }}>
            Home
          </Text>
        </Pressable>
      ) : (
        <Pressable
          style={styles.bottomTabHome}
          onPress={() => navigation.navigate('Home')}>
          <BottomTabHome />
          <Text style={globalStyles.fontRegular}>Home</Text>
        </Pressable>
      )}
      <Pressable
        style={styles.bottomTabOrder}
        onPress={() => navigation.navigate('Myorders')}>
        <BottomTabOrder />
        <Text style={globalStyles.fontRegular}>My Orders</Text>
      </Pressable>
    </View>
  );
};
export default ButtomTab;

const styles = StyleSheet.create({
  bottomTab: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: 100 + '%',
    textAlign: 'center',
    flex: 1,
    flexDirection: 'row',
    zIndex: 9,
  },
  bottomTabRelative: {
    width: 100 + '%',
  },
  bottomTabCart: {
    position: 'absolute',
  },
  bottomTabHome: {
    alignItems: 'center',
    position: 'absolute',
    left: 15 + '%',
    top: 25 + '%',
  },
  bottomTabOrder: {
    alignItems: 'center',
    position: 'absolute',
    right: 15 + '%',
    top: 25 + '%',
  },
});
