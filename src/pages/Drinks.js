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
import Minus from '../../assets/images/minus.svg';
import ChevronDown from '../../assets/images/chevron-down.svg';
import ChevronUp from '../../assets/images/chevron-up.svg';
import { globalStyles } from '../styles/globalStyles';
import ExtrasListIcon from '../../assets/images/extrasListIcon.svg';
import ExtrasListIconActive from '../../assets/images/extrasListIconActive.svg';
import ExtraPlus from '../../assets/images/extrasAdd.svg';
import LinearGradient from 'react-native-linear-gradient';
import { DrinksData } from '../data/db';
import { AppContext } from '../components/AppContext';
import LoadingModalOverlay from '../components/LoadingModalOverlay';

const Drinks = ({ route, navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [price, setPrice] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [numberOfItem, setNumberOfItem] = useState(1);
  const [extrasExpanded, setExtasExpanded] = useState(true);
  const { appContextState, setAppContextState, apiEndpoint } =
    useContext(AppContext);
  const { phoneNumber, cart } = appContextState;
  const [addedPrice, setAddedPrice] = useState([]);
  const vh = useWindowDimensions().height;
  const cartData = [
    ...cart,
    {
      title: route.params.title,
      price: addedPrice,
      deliveryFee: route.params.deliveryFee || 0,
      numberOfItem: numberOfItem,
      drinks: drinks,
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
  useEffect(() => {
    if (price.length < 1) {
      setAddedPrice(0);
    } else if (price.length < 2) {
      setAddedPrice(price[0]);
    } else {
      setAddedPrice(price.reduce((a, b) => a + b));
    }
  }, [price]);
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
              </View>
              <View
                style={{
                  ...styles.contentContainer,
                  minHeight: vh * (93 / 100),
                }}>
                <Text style={styles.title}>Drinks and Co</Text>
                <View style={styles.imageContainer}>
                  <Image
                    source={route.params.image[0] || route.params.image}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.extras}>
                  <View style={styles.extrasHeader}>
                    <Text style={styles.extrasHeaderText}>
                      Choose your choice
                    </Text>
                    <Pressable
                      onPress={() => setExtasExpanded(!extrasExpanded)}
                      style={styles.chevron}>
                      {extrasExpanded ? <ChevronDown /> : <ChevronUp />}
                    </Pressable>
                  </View>
                  {extrasExpanded && (
                    <View>
                      {DrinksData.map(data => (
                        <Choose
                          data={data}
                          key={data.title}
                          drinks={drinks}
                          setDrinks={setDrinks}
                          price={price}
                          setPrice={setPrice}
                        />
                      ))}
                    </View>
                  )}
                </View>
                <View>
                  <Text style={styles.extrasHeaderText}>
                    Special Instructions
                  </Text>
                  {/* eslint-disable-next-line react-native/no-inline-styles */}
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Add a note (e.g Choose any other soda flavour if there its not listed above)"
                      placeholderTextColor={'#80808080'}
                      textAlignVertical="top"
                    />
                  </View>
                </View>
                <View style={styles.buttonsContainer}>
                  <Pressable
                    style={styles.cartButton}
                    onPress={() =>
                      drinks.length >= 1
                        ? handleAddToCart()
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
                        : Alert.alert('Select at least a drink')
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
                      drinks.length >= 1
                        ? handleAddToCart()
                            .then(navigation.navigate('Cart'))
                            .catch(err => {
                              console.log(err);
                              ToastAndroid.show(
                                'No internet Connection',
                                ToastAndroid.SHORT,
                              );
                            })
                        : Alert.alert('Select at least a drink')
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
    maxHeight: 200,
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
  },
  extrasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  extrasHeaderText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 28,
  },
  chevron: {
    minWidth: 30,
    minHeight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extrasContentContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  extrasContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
export default Drinks;

export const Choose = ({ data, price, setPrice, drinks, setDrinks }) => {
  const [numberOfItem, setNumberOfItem] = useState(0);
  const [selected, setSelected] = useState(false);

  const handleSelected = () => {
    setSelected(!selected);
    selected ? handleDecrement() : handleIncrement();
  };
  const handleIncrement = () => {
    if (numberOfItem < 20) {
      setNumberOfItem(prev => prev + 1);
      if (numberOfItem > 0 && drinks.includes(data.title)) {
        const index = drinks.indexOf(data.title);
        drinks[index - 1] = numberOfItem + 1;
      } else {
        drinks.push(1);
        drinks.push(data.title);
      }
      setDrinks(oldArray => [...oldArray]);
      price.push(data.price);
      setPrice(oldArray => [...oldArray]);
    } else {
      Alert.alert('Maximum Order is 20 at a time!');
    }
    numberOfItem > -1 ? setSelected(true) : setSelected(false);
  };
  const handleDecrement = () => {
    if (numberOfItem > 0) {
      setNumberOfItem(prev => prev - 1);
    }
    if (numberOfItem > 1 && drinks.includes(data.title)) {
      const index = drinks.indexOf(data.title);
      drinks[index - 1] = numberOfItem - 1;
    } else {
      const index = drinks.indexOf(data.title);
      drinks.splice(index - 1, 2);
    }
    setDrinks(oldArray => [...oldArray]);
    price.pop(data.price);
    setPrice(oldArray => [...oldArray]);
    numberOfItem > 1 ? setSelected(true) : setSelected(false);
  };
  return (
    <View style={styles.extrasContentContainer}>
      <View style={styles.extrasContent}>
        {selected ? (
          <TouchableOpacity onPress={handleSelected}>
            <ExtrasListIconActive />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleSelected}>
            <ExtrasListIcon />
          </TouchableOpacity>
        )}
        <Pressable onPress={handleSelected}>
          <View style={styles.extrasContentText}>
            <Text style={styles.extrasTitle}>{data.title}</Text>
            <Text style={styles.extrasPrice}>
              <Text style={styles.lineThrough}>N</Text> {data.price}
            </Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.extrasContentCounter}>
        <TouchableOpacity onPress={handleDecrement}>
          <Minus />
        </TouchableOpacity>
        <Text style={styles.extrasContentCounterText}>{numberOfItem}</Text>
        <TouchableOpacity onPress={handleIncrement}>
          <ExtraPlus />
        </TouchableOpacity>
      </View>
    </View>
  );
};
