/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  ImageBackground,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Animated,
  Vibration,
} from 'react-native';
import Empty from '../components/Empty';
import CartImage from '../../assets/images/cartImage.svg';
import Back from '../../assets/images/back.svg';
import Chevron from '../../assets/images/chevron-right.svg';
import Minus from '../../assets/images/cartMinus.svg';
import Plus from '../../assets/images/plus.svg';
import Delete from '../../assets/images/deleteCart.svg';
import { globalStyles } from '../styles/globalStyles';
const Cart = ({ navigation }) => {
  const [cartLog, setCartLog] = useState(null);
  const [allDelete, setAllDelete] = useState(true);
  const [showtip, setShowtip] = useState(true);
  useEffect(() => {
    cartItems.length > 0 && setCartLog(cartItems);
    setTimeout(() => {
      setAllDelete(true);
      // console.log(typeof cartItems);
    }, 2000);
  }, [allDelete]);
  return cartLog ? (
    <ImageBackground
      source={require('../../assets/images/splashBg.png')}
      style={globalStyles.route}
      resizeMode="repeat">
      <Pressable onPress={() => setAllDelete(false)} style={styles.route}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Back />
          </Pressable>
          <Text style={styles.headerTitle}>Cart</Text>
        </View>
        <ScrollView
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
          style={styles.body}>
          <View>
            {cartLog.slice(0, cartLog.length - 1).map(cart => (
              <CartItem
                cart={cart}
                key={cart.id}
                navigation={navigation}
                allDelete={allDelete}
                setAllDelete={setAllDelete}
                cartLog={cartLog}
                setCartLog={setCartLog}
              />
            ))}
          </View>
          <View style={styles.checkout}>
            <View style={[styles.checkoutTab, styles.foodCosts]}>
              <Text style={globalStyles.fontRegular}>Food costs</Text>
              <Text style={styles.foodCostsPrice}>
                <Text style={styles.lineThrough}>N</Text>
                {cartLog
                  .slice(cartLog.length - 1, cartLog.length)
                  .map(cart => cart.totalAmount)
                  .toLocaleString()}
              </Text>
            </View>
            <View style={[styles.checkoutTab, styles.delivery]}>
              <Text style={globalStyles.fontRegular}>Delivery</Text>
              <Text style={globalStyles.fontBold}>
                {cartLog.slice(cartLog.length - 1, cartLog.length).map(cart =>
                  cart.deliveryFee === 'free' ? (
                    'Free'
                  ) : (
                    <Text key={cart.deliveryFee}>
                      <Text style={styles.lineThrough}>N</Text>
                      {cart.deliveryFee.toLocaleString()}
                    </Text>
                  ),
                )}
              </Text>
            </View>
            <View style={styles.total}>
              <Text style={styles.totalText}>Sub Total</Text>
              <Text style={styles.totalTextPrice}>
                <Text style={styles.lineThrough}>N</Text>
                {cartLog
                  .slice(cartLog.length - 1, cartLog.length)
                  .map(
                    cart =>
                      cart.totalAmount +
                      (cart.deliveryFee === 'free' ? 0 : cart.deliveryFee),
                  )
                  .toLocaleString()}
              </Text>
            </View>
            <View style={styles.button}>
              <Pressable
                style={styles.buttonBackground}
                onPress={() =>
                  showtip
                    ? navigation.navigate('Tip')
                    : navigation.navigate('Checkout')
                }>
                <Text style={styles.buttonBackgroundText}>Checkout</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </Pressable>
    </ImageBackground>
  ) : (
    <Empty
      navigation={navigation}
      title="Cart"
      image={<CartImage />}
      contentText="You currently do not have any item"
    />
  );
};

const styles = StyleSheet.create({
  route: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    paddingTop: 5 + '%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 97 + '%',
    alignSelf: 'center',
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
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    flex: 1,
    width: 95 + '%',
    maxHeight: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 3 + '%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  elevation: {
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 100 + '%',
    transform: [{ rotateZ: '90deg' }],
  },
  textContainer: {
    flex: 3,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  cardDetails: {
    fontFamily: 'Poppins-Regular',
    color: 'rgba(128, 128, 128, 0.5)',
  },
  cardPrice: {
    fontFamily: 'Poppins-SemiBold',
  },
  lineThroughColored: {
    textDecorationLine: 'line-through',
    color: globalStyles.themeColorSolo,
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
  counterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  chevron: {
    flex: 1,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  counter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterText: {
    marginTop: -5,
    fontFamily: 'Poppins-Regular',
  },
  delete: { flex: 0, marginHorizontal: 20, position: 'absolute', right: -5 },
  checkout: {
    backgroundColor: '#fff',
    paddingTop: 15,
    marginVertical: 70,
    borderRadius: 10,
    alignSelf: 'center',
    width: 95 + '%',
  },
  checkoutTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(128, 128, 128, 0.5)',
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    paddingBottom: 15,
    marginHorizontal: 15,
  },
  foodCostsPrice: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 18,
  },
  delivery: {
    paddingTop: 15,
  },
  total: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  totalText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  totalTextPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: globalStyles.themeColorSolo,
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
});

export default Cart;

const CartItem = ({
  cart,
  navigation,
  allDelete,
  setAllDelete,
  cartLog,
  setCartLog,
}) => {
  const [numberOfItem, setNumberOfItem] = useState(1);
  const [deleteCard, setDeleteCard] = useState(false);
  useEffect(() => {
    setNumberOfItem(cart.numberOfItem);
    allDelete === false && setDeleteCard(false);
  }, [allDelete, cart.numberOfItem]);
  const handleIncrement = () => {
    numberOfItem < 20
      ? setNumberOfItem(prev => prev + 1)
      : Alert.alert('Maximum Order is 20 at a time!');
  };
  const handleDecrement = () => {
    numberOfItem > 0 && setNumberOfItem(prev => prev - 1);
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
    }).start();
  };

  return (
    <Animated.View key={cart.id} style={styles.cardContainer}>
      <Pressable
        onPress={() => deleteCard === false && setAllDelete(false)}
        onLongPress={() => {
          setAllDelete(false);
          setAllDelete(true);
          setDeleteCard(prev => !prev);
          Vibration.vibrate(50);
        }}
        style={
          deleteCard && allDelete
            ? { transform: [{ translateX: -80 }], flex: 1 }
            : { transform: [{ translateX: 0 }], flex: 1 }
        }>
        <View style={[styles.card, styles.elevation]}>
          <View style={styles.imageContainer}>
            <Image
              source={cart.image[1]}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>
              {cart.numberOfItem > 1
                ? `${cart.numberOfItem} ${cart.titlePlural}`
                : cart.title}
            </Text>
            <Text style={styles.cardDetails}>
              {cart.additionals || cart.desserts || cart.drinks
                ? 'Mixed with '
                : ''}
              {cart.additionals && (
                <>
                  {cart.additionals
                    .slice(0, cart.additionals.length - 1)
                    .map(addition => (
                      <Text key={addition}>
                        {addition}
                        {cart.additionals.indexOf(addition) !==
                        cart.additionals.length - 2
                          ? ', '
                          : ' and '}
                      </Text>
                    ))}
                  {cart.additionals
                    .slice(cart.additionals.length - 1, cart.additionals.length)
                    .map(addition => (
                      <Text key={addition}>{addition}</Text>
                    ))}
                </>
              )}
              {cart.additionals && cart.desserts ? ' with ' : ''}
              {cart.desserts
                ?.slice(0, cart.desserts.length - 1)
                .map(dessert => (
                  <Text key={dessert}>
                    {dessert}
                    {cart.desserts.indexOf(dessert) !== cart.desserts.length - 2
                      ? ', '
                      : ' and '}
                  </Text>
                ))}
              {cart.desserts
                ?.slice(cart.desserts.length - 1, cart.desserts.length)
                .map(dessert => (
                  <Text key={dessert}>{dessert}</Text>
                ))}
              {(cart.additionals || cart.desserts) && cart.drinks
                ? ' with '
                : ''}
              {cart.drinks?.slice(0, cart.drinks.length - 1).map(drink => (
                <Text key={drink}>
                  {drink}
                  {cart.drinks.indexOf(drink) !== cart.drinks.length - 2
                    ? ', '
                    : ' and '}
                </Text>
              ))}
              {cart.drinks
                ?.slice(cart.drinks.length - 1, cart.drinks.length)
                .map(drink => (
                  <Text key={drink}>{drink}</Text>
                ))}
              .
            </Text>
            <Text style={styles.cardPrice}>
              <Text style={styles.lineThroughColored}>N</Text> {cart.price}
            </Text>
          </View>
          <View style={styles.counterContainer}>
            <Pressable
              style={styles.chevron}
              onPress={() => navigation.navigate('FoodMenuParams', cart)}>
              <Chevron width={20} height={20} />
            </Pressable>
            <View style={styles.counter}>
              <TouchableOpacity onPress={handleDecrement}>
                <Minus width={30} height={30} />
              </TouchableOpacity>
              <Text style={styles.counterText}>{numberOfItem}</Text>
              <TouchableOpacity onPress={handleIncrement}>
                <Plus width={35} height={35} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
      {deleteCard && allDelete && (
        <Pressable
          onPress={() => setCartLog(cartLog.filter(i => i.id !== cart.id))}
          style={styles.delete}>
          <Delete />
        </Pressable>
      )}
    </Animated.View>
  );
};
const cartItems = [
  {
    title: 'A Plate with Chicken',
    titlePlural: 'Plates with Chicken',
    additionals: ['extra rice', 'extra beef'],
    desserts: ['coleslaw', 'beef', 'shawarma'],
    drinks: ['fanta', 'Coke'],
    price: 5000,
    numberOfItem: 5,
    image: [
      require('../../assets/images/aPlateWithChicken1.png'),
      require('../../assets/images/aPlateWithChicken2.png'),
    ],
    id: 1,
  },
  {
    title: 'A Plate with Chicken',
    titlePlural: 'Plates with Chicken',
    additionals: ['extra rice', 'extra beef'],
    desserts: ['coleslaw', 'beef', 'shawarma'],
    drinks: ['fanta', 'Coke'],
    price: 5000,
    numberOfItem: 1,
    image: [
      require('../../assets/images/aPlateWithChicken1.png'),
      require('../../assets/images/aPlateWithChicken2.png'),
    ],
    id: 2,
  },
  {
    title: 'A Plate with Chicken',
    titlePlural: 'Plates with Chicken',
    additionals: ['extra rice', 'extra beef'],
    desserts: ['coleslaw', 'beef', 'shawarma'],
    drinks: ['fanta', 'Coke'],
    price: 5000,
    numberOfItem: 1,
    image: [
      require('../../assets/images/aPlateWithChicken1.png'),
      require('../../assets/images/aPlateWithChicken2.png'),
    ],
    id: 3,
  },
  {
    title: 'A Plate with Chicken',
    titlePlural: 'Plates with Chicken',
    additionals: ['extra rice', 'extra beef'],
    desserts: ['coleslaw', 'beef', 'shawarma'],
    drinks: ['fanta', 'Coke'],
    price: 5000,
    numberOfItem: 1,
    image: [
      require('../../assets/images/aPlateWithChicken1.png'),
      require('../../assets/images/aPlateWithChicken2.png'),
    ],
    id: 4,
  },
  {
    title: 'A Plate with Chicken',
    titlePlural: 'Plates with Chicken',
    additionals: ['extra rice', 'extra beef'],
    desserts: ['coleslaw', 'beef', 'shawarma'],
    drinks: ['fanta', 'Coke'],
    price: 5000,
    numberOfItem: 1,
    image: [
      require('../../assets/images/aPlateWithChicken1.png'),
      require('../../assets/images/aPlateWithChicken2.png'),
    ],
    id: 5,
  },
  {
    title: 'A Plate with Chicken',
    titlePlural: 'Plates with Chicken',
    additionals: ['extra rice', 'extra beef'],
    desserts: ['coleslaw', 'beef', 'shawarma'],
    drinks: ['fanta', 'Coke'],
    price: 5000,
    numberOfItem: 1,
    image: [
      require('../../assets/images/aPlateWithChicken1.png'),
      require('../../assets/images/aPlateWithChicken2.png'),
    ],
    id: 6,
  },
  {
    title: 'A Plate with Chicken',
    titlePlural: 'Plates with Chicken',
    additionals: ['extra rice', 'extra beef'],
    desserts: ['coleslaw', 'beef', 'shawarma'],
    drinks: ['fanta', 'Coke'],
    price: 5000,
    numberOfItem: 1,
    image: [
      require('../../assets/images/aPlateWithChicken1.png'),
      require('../../assets/images/aPlateWithChicken2.png'),
    ],
    id: 7,
  },
  {
    totalAmount: 10000,
    deliveryFee: 500,
  },
];
