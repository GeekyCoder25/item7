import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Back from '../../assets/images/back.svg';
import Like from '../../assets/images/heart.svg';
import LikeActive from '../../assets/images/heartActive.svg';
import Tab from '../../assets/images/foodMenuTabIcon.svg';
import TabActive from '../../assets/images/foodMenuTabIconActive.svg';
import Minus from '../../assets/images/minus.svg';
import Plus from '../../assets/images/plus.svg';
import { globalStyles } from '../styles/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import { AppContext } from '../components/AppContext';
import LoadingModalOverlay from '../components/LoadingModalOverlay';

const DesertsParams = ({ route, navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [heartActive, setHeartActive] = useState(false);
  const [foodMenuTabActive, setFoodMenuTabActive] = useState(0);
  const [numberOfItem, setNumberOfItem] = useState(1);
  const [additionals, setAdditionals] = useState('');
  const { appContextState, setAppContextState, apiEndpoint } =
    useContext(AppContext);
  const { phoneNumber, cart, favorites } = appContextState;
  useEffect(() => {
    const handleTabActive = () => {
      foodMenuTabActive === route.params.image.length - 1
        ? setFoodMenuTabActive(0)
        : setFoodMenuTabActive(prev => prev + 1);
    };
    route.params.image.length > 1 && setTimeout(handleTabActive, 5000);
    return clearTimeout(handleTabActive);
  }, [foodMenuTabActive, route.params.image.length]);
  const handleIncrement = () =>
    numberOfItem < 20
      ? setNumberOfItem(prev => prev + 1)
      : Alert.alert('Maximum Order is 20 at a time!');
  const handleDecrement = () =>
    numberOfItem > 1 && setNumberOfItem(prev => prev - 1);
  const vh = useWindowDimensions().height;
  const cartData = [
    ...cart,
    {
      desserts: [additionals],
      title: route.params.title,
      price: route.params.price,
      deliveryFee: route.params.deliveryFee || 0,
      numberOfItem: numberOfItem,
    },
  ];

  const handleAddToCart = async () => {
    handleShowModal();
    const id = phoneNumber;
    const res = await fetch(`${apiEndpoint}/api/cart/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartData),
    });
    await res.json();
  };
  const handleShowModal = () => {
    setModalOpen(prev => !prev);
  };

  const handleFavoriteFetch = async data => {
    const id = phoneNumber;
    const res = await fetch(`${apiEndpoint}/api/favorites/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favorites: data }),
    });
    return res.json();
  };
  const handleFavorite = async () => {
    handleShowModal();
    if (!heartActive) {
      handleFavoriteFetch([...favorites, route.params.title])
        .then(() => {
          setHeartActive(!heartActive);
          setAppContextState({
            ...appContextState,
            favorites: [...favorites, route.params.title],
          });
          handleShowModal();
          ToastAndroid.show('Added to Favorites', ToastAndroid.SHORT);
        })
        .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));
    } else {
      const updatedFavorites = favorites.filter(i => i !== route.params.title);
      handleFavoriteFetch([...updatedFavorites])
        .then(i => {
          setHeartActive(!heartActive);
          setAppContextState({
            ...appContextState,
            favorites: [...updatedFavorites],
          });
          handleShowModal();
          ToastAndroid.show('Removed from Favorites', ToastAndroid.SHORT);
        })
        .catch(err => {
          handleShowModal();
          console.log(err.message);
          // ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    }
  };
  return (
    <>
      <ImageBackground
        source={require('../../assets/images/splashBg.png')}
        style={globalStyles.route}
        resizeMode="repeat">
        <View style={styles.FoodMenuParams}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Back />
                </Pressable>
                <Pressable onPress={handleFavorite}>
                  {heartActive ? <LikeActive /> : <Like />}
                </Pressable>
              </View>
              <View
                style={{
                  ...styles.contentContainer,
                  minHeight: vh * (93 / 100),
                }}>
                <Text style={styles.title}>{route.params.title}</Text>
                <Text style={styles.price}>
                  <Text style={styles.lineThrough}>N</Text> {route.params.price}
                </Text>
                <View style={styles.imageContainer}>
                  <Image
                    source={route.params.image[foodMenuTabActive]}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <View style={styles.tab}>
                    {route.params.image.map(image =>
                      foodMenuTabActive ===
                      route.params.image.indexOf(image) ? (
                        <TabActive key={image} />
                      ) : (
                        <Tab key={image} />
                      ),
                    )}
                  </View>
                </View>
                <View style={styles.numberofItemsContainer}>
                  <View style={styles.numberofItems}>
                    <TouchableOpacity onPress={handleDecrement}>
                      <Minus />
                    </TouchableOpacity>
                    <Text style={styles.numberOfItemText}>{numberOfItem}</Text>
                    <TouchableOpacity onPress={handleIncrement}>
                      <Plus />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.numberOfItemPriceText}>
                    <Text style={styles.lineThrough}>N</Text>{' '}
                    {route.params.price * numberOfItem}
                  </Text>
                </View>
                <View>
                  <Text style={styles.extrasHeaderText}>
                    Special Instructions
                  </Text>
                  {/* eslint-disable-next-line react-native/no-inline-styles */}
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      style={styles.textInput}
                      placeholder=" Add a note (e.g Choose the bigger one for me)"
                      placeholderTextColor={'#80808080'}
                      textAlignVertical="top"
                      onChangeText={text => setAdditionals(text)}
                    />
                  </View>
                </View>
                <View style={styles.buttonsContainer}>
                  <Pressable
                    style={styles.cartButton}
                    onPress={() =>
                      handleAddToCart()
                        .then(() => {
                          setAppContextState({
                            ...appContextState,
                            cart: cartData,
                          });
                          setNumberOfItem(1);
                          handleShowModal();
                          ToastAndroid.show(
                            `${route.params.title} has been added to your cart sucessfully 🤗`,
                            ToastAndroid.SHORT,
                          );
                        })
                        .catch(err => {
                          console.log(err);
                          handleShowModal();
                          ToastAndroid.show(
                            'No internet Connection',
                            ToastAndroid.SHORT,
                          );
                        })
                    }>
                    <LinearGradient
                      style={styles.cartButtonLinear}
                      start={{ x: 0.0, y: 0.25 }}
                      end={{ x: 0.5, y: 1 }}
                      colors={['#f78b3f', '#fcb943']}>
                      <Text style={styles.buyButtonText}>Add to Cart</Text>
                    </LinearGradient>
                  </Pressable>
                  <Pressable
                    style={styles.buyButton}
                    onPress={() =>
                      handleAddToCart()
                        .then(navigation.navigate('Cart'))
                        .catch(err => {
                          console.log(err);
                          ToastAndroid.show(
                            'No internet Connection',
                            ToastAndroid.SHORT,
                          );
                        })
                    }>
                    <Text style={styles.buyButtonText}>Buy Now</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
      <LoadingModalOverlay
        modalOpen={modalOpen}
        handleShowModal={handleShowModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  FoodMenuParams: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
  },
  body: {
    paddingHorizontal: 2 + '%',
    paddingVertical: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginVertical: 10,
  },
  price: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 18,
    marginVertical: 5,
    color: globalStyles.themeColorSolo,
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70 + '%',
    height: 280,
  },
  image: {
    marginVertical: 25,
    borderRadius: 20,
    maxWidth: 70 + '%',
    maxHeight: 180,
  },
  tab: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-around',
  },
  numberofItemsContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  numberofItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberOfItemText: {
    marginTop: -5,
    marginHorizontal: 15,
    fontSize: 25,
    fontFamily: 'Poppins-Regular',
  },
  numberOfItemPriceText: {
    fontSize: 20,
    marginTop: 15,
    fontFamily: 'Raleway-SemiBold',
  },
  extras: {
    marginTop: 10 + '%',
    width: 95 + '%',
    flex: 1,
  },
  extrasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  extrasHeaderText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    marginTop: 50,
  },
  chevron: {
    minWidth: 30,
    minHeight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extrasContentContainer: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    marginVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  extrasContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // backgroundColor: 'green',
  },
  extrasContentText: {
    marginLeft: 30,
    marginTop: -5,
  },
  extrasContentCounter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  extrasContentCounterText: {
    marginTop: -18,
    fontSize: 20,
    fontFamily: 'Raleway-SemiBold',
  },
  extrasTitle: {
    fontFamily: 'Poppins-Regular',
  },
  extrasPrice: {
    fontFamily: 'Raleway-SemiBold',
  },
  textInput: {
    width: 100 + '%',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginVertical: 30,
    height: 80,
    borderWidth: 0.5,
    alignItems: 'flex-start',
    borderColor: 'rgba(128, 128, 128, 0.5);',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    maxWidth: 98 + '%',
    position: 'absolute',
    bottom: 0,
  },
  cartButton: {
    flex: 1,
  },
  cartButtonLinear: {
    justifyContent: 'center',
    height: 60,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buyButton: {
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: globalStyles.themeColorSolo,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
});
export default DesertsParams;
