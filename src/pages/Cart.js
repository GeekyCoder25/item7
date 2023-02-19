/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react';
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
import { AppContext } from '../components/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import LoadingModalOverlay from '../components/LoadingModalOverlay';
import LoadingRoller from '../components/LoadingRoller';
const Cart = ({ navigation }) => {
  const [allDelete, setAllDelete] = useState(true);
  const { appContextState, setAppContextState, apiEndpoint, showTip } =
    useContext(AppContext);
  const { cart: mainCart, phoneNumber } = appContextState;
  const [cartLog, setCartLog] = useState(mainCart);
  const [totalPrice, setTotalPrice] = useState([0]);
  const [deliveryFee, setDeliveryFee] = useState([0]);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          const id = phoneNumber || AsyncStorage.getItem('phoneNumer');
          const res = await fetch(`${apiEndpoint}/api/userData/${id}`);
          const data = await res.json();
          if (isActive) {
            await setAppContextState({ ...appContextState, ...data });
            setCartLog(data.cart);
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      };

      fetchUser();

      return () => {
        isActive = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  useEffect(() => {
    if (cartLog.length > 0) {
      const tempTotalPrice = [];
      cartLog.map(i => {
        tempTotalPrice.push(i.price * i.numberOfItem);
      });
      setTotalPrice(tempTotalPrice.reduce((a, b) => a + b));
    }
  }, [cartLog, totalPrice]);
  useEffect(() => {
    if (cartLog.length > 0) {
      const tempDeliveryPrice = [];
      cartLog.map(i => {
        tempDeliveryPrice.push(
          typeof i.deliveryFee === 'string' ? 0 : i.deliveryFee,
        );
      });
      setDeliveryFee(tempDeliveryPrice.reduce((a, b) => a + b));
    }
  }, [cartLog]);
  useEffect(() => {
    setTimeout(() => {
      setAllDelete(true);
    }, 2000);
    return () => {
      setAppContextState({ ...appContextState, cart: cartLog });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartLog]);
  return cartLog.length > 0 ? (
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
        {loading ? (
          <LoadingRoller />
        ) : (
          <ScrollView
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
            }}
            style={styles.body}>
            <View>
              {cartLog.map(cart => (
                <CartItem
                  key={cart._id}
                  cart={cart}
                  navigation={navigation}
                  allDelete={allDelete}
                  setAllDelete={setAllDelete}
                  cartLog={cartLog}
                  setCartLog={setCartLog}
                  phoneNumber={phoneNumber}
                  apiEndpoint={apiEndpoint}
                />
              ))}
            </View>
            <View style={styles.checkout}>
              <View style={[styles.checkoutTab, styles.foodCosts]}>
                <Text style={globalStyles.fontRegular}>Food costs</Text>
                <Text style={styles.foodCostsPrice}>
                  <Text style={styles.lineThrough}>N</Text>
                  {totalPrice.toLocaleString()}
                </Text>
              </View>
              <View style={[styles.checkoutTab, styles.delivery]}>
                <Text style={globalStyles.fontRegular}>Delivery</Text>
                <Text style={globalStyles.fontBold}>
                  {deliveryFee < 1 ? (
                    'Free'
                  ) : (
                    <>
                      <Text style={styles.lineThrough}>N</Text>
                      {deliveryFee.toLocaleString()}
                    </>
                  )}
                </Text>
              </View>
              <View style={styles.total}>
                <Text style={styles.totalText}>Sub Total</Text>
                <Text style={styles.totalTextPrice}>
                  <Text style={styles.lineThrough}>N</Text>
                  {(totalPrice + deliveryFee).toLocaleString()}
                </Text>
              </View>
              <View style={styles.button}>
                <Pressable
                  style={styles.buttonBackground}
                  onPress={() =>
                    showTip
                      ? navigation.navigate('Tip')
                      : navigation.navigate('Checkout')
                  }>
                  <Text style={styles.buttonBackgroundText}>Checkout</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        )}
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
    justifyContent: 'center',
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
  phoneNumber,
  apiEndpoint,
}) => {
  const [numberOfItem, setNumberOfItem] = useState(1);
  const [deleteCard, setDeleteCard] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setNumberOfItem(cart.numberOfItem);
    allDelete === false && setDeleteCard(false);
  }, [allDelete, cart.numberOfItem]);
  const fetchUserData = async () => {
    const id = phoneNumber;
    const res = await fetch(`${apiEndpoint}/api/userData/${id}`);
    return await res.json();
  };

  const handleUpdateCart = async param => {
    const id = phoneNumber;
    const res = await fetch(`${apiEndpoint}/api/cart/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: cart._id,
        numberOfItem: numberOfItem + param,
      }),
    });
    return await res.json();
  };

  const handleDeleteCart = async () => {
    const id = phoneNumber;
    const res = await fetch(`${apiEndpoint}/api/cart/${id}/${cart._id}`, {
      method: 'DELETE',
    });
    return (
      res.status === 204 && setCartLog(cartLog.filter(i => i._id !== cart._id))
    );
  };

  const handleIncrement = async () => {
    if (numberOfItem < 20) {
      handleShowModal();
      setNumberOfItem(prev => prev + 1);
      handleUpdateCart(1).catch(err => console.log(err));
      fetchUserData()
        .then(result => {
          setCartLog(result.cart);
          handleShowModal();
        })
        .catch(err => console.log(err));
    } else {
      Alert.alert('Maximum Order is 20 at a time!');
    }
  };

  const handleDecrement = () => {
    if (numberOfItem > 1) {
      handleShowModal();
      setNumberOfItem(prev => prev - 1);
      handleUpdateCart(-1).catch(err => console.log(err));
      fetchUserData()
        .then(result => {
          setCartLog(result.cart);
          handleShowModal();
        })
        .catch(err => console.log(err));
    } else {
      handleDeleteCart();
    }
  };

  const imagePath = () => {
    const i = cart.title.toLowerCase();
    if (i === 'a plate with chicken') {
      return [require('../../assets/images/aPlateWithChicken2.png')];
    } else if (i === 'a plate with beef') {
      return [
        require('../../assets/images/aPlateWithBeef1.png'),
        require('../../assets/images/aPlateWithBeef2.png'),
      ];
    } else if (i === 'a plate with croaker fish') {
      return [require('../../assets/images/aPlateWithCroakerFish1.png')];
    } else if (i === 'a plate with fish') {
      return [require('../../assets/images/aPlateWithFish1.png')];
    } else if (i === 'beef shawarma') {
      return [require('../../assets/images/BeefShawarma.png')];
    } else if (i === 'chicken shawarma') {
      return [require('../../assets/images/ChickenShawarma1.png')];
    } else if (i === 'coleslaw') {
      return [require('../../assets/images/coleslaw1.png')];
    } else if (i === 'drinks') {
      return [require('../../assets/images/drinks.png')];
    } else {
      return [
        require('../../assets/images/aPlateWithChicken2.png'),
        require('../../assets/images/aPlateWithChicken1.png'),
      ];
    }
  };
  const titlePlural = cart.title
    .replace('A', numberOfItem)
    .replace('plate', 'plates')
    .replace('Plate', 'plates');
  const handleShowModal = () => {
    setModalOpen(prev => !prev);
  };
  const handleNavigate = () => {
    const result = imagePath();
    cart = { ...cart, image: result };
    if (cart.title === 'Desserts') {
      navigation.navigate('Desserts');
    } else if (cart.title === 'Drinks') {
      navigation.navigate('Drinks', cart);
    } else if (cart.title === 'Favourites') {
      navigation.navigate('Favourites');
    } else {
      navigation.navigate('FoodMenuParams', cart);
    }
  };
  return (
    <>
      <View key={cart.id} style={styles.cardContainer}>
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
                source={imagePath()[0]}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>
                {cart.numberOfItem > 1
                  ? // ? `${numberOfItem} ${cart.titlePlural}`
                    titlePlural
                  : cart.title}
              </Text>
              <Text style={styles.cardDetails}>
                {cart.additionals.length > 0 ||
                cart.desserts.length > 1 ||
                cart.drinks.length > 99
                  ? 'Mixed with '
                  : ''}
                {cart.additionals && (
                  <>
                    {cart.additionals
                      .slice(0, cart.additionals.length - 1)
                      .map((addition, i) => (
                        <Text key={i}>
                          {addition}
                          {cart.additionals.indexOf(addition) % 2 !== 0
                            ? ','
                            : ''}{' '}
                        </Text>
                      ))}
                    {cart.additionals
                      .slice(
                        cart.additionals.length - 1,
                        cart.additionals.length,
                      )
                      .map(addition => (
                        <Text key={addition}>{addition}</Text>
                      ))}
                  </>
                )}
                {cart.additionals.length > 0 &&
                (cart.desserts.length === 0 || cart.drinks.length === 0)
                  ? '.'
                  : ''}
                {cart.additionals.length > 0 &&
                (cart.desserts.length > 0 || cart.drinks.length > 0)
                  ? 'with'
                  : ''}
                {cart.desserts
                  ?.slice(0, cart.desserts.length - 1)
                  .map((dessert, i) => (
                    <Text key={i}>
                      {dessert}
                      {cart.desserts.indexOf(dessert) !==
                      cart.desserts.length - 2
                        ? ', '
                        : ' and '}
                    </Text>
                  ))}
                {cart.desserts
                  ?.slice(cart.desserts.length - 1, cart.desserts.length)
                  .map(dessert => (
                    <Text key={dessert}>{dessert}</Text>
                  ))}
                {(cart.additionals.length > 0 || cart.desserts.length > 0) &&
                cart.drinks.length > 0
                  ? ' with '
                  : ''}
                {cart.drinks
                  ?.slice(0, cart.drinks.length - 1)
                  .map((drink, i) => (
                    <Text key={i}>
                      {drink}
                      {drink.length > 2 && ','}
                      {cart.drinks.indexOf(drink) !== cart.drinks.length - 2
                        ? ' '
                        : ' '}
                    </Text>
                  ))}
                {cart.drinks
                  ?.slice(cart.drinks.length - 1, cart.drinks.length)
                  .map(drink => (
                    <Text key={drink}>{drink}</Text>
                  ))}
                {cart.additionals.length > 0 ||
                  cart.desserts.length > 0 ||
                  (cart.drinks.length > 0 && '.')}
              </Text>
              <Text style={styles.cardPrice}>
                <Text style={styles.lineThroughColored}>N</Text>{' '}
                {(cart.price * numberOfItem).toLocaleString()}
              </Text>
            </View>
            <View style={styles.counterContainer}>
              <Pressable style={styles.chevron} onPress={handleNavigate}>
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
          <Pressable onPress={handleDeleteCart} style={styles.delete}>
            <Delete />
          </Pressable>
        )}
      </View>
      <LoadingModalOverlay
        modalOpen={modalOpen}
        handleShowModal={handleShowModal}
      />
    </>
  );
};
