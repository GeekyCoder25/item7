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
import React, { useState } from 'react';
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

const Drinks = ({ route, navigation }) => {
  const [extrasExpanded, setExtasExpanded] = useState(true);

  const vh = useWindowDimensions().height;

  return (
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
                      <Choose data={data} key={data.title} />
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
                    ToastAndroid.show(
                      `${route.params.title} has been added to your cart sucessfully 🤗`,
                      ToastAndroid.SHORT,
                    )
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
                  onPress={() => navigation.replace('Cart')}>
                  <Text style={styles.buyButtonText}>Buy Now</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
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

export const Choose = ({ data }) => {
  const [numberOfItem, setNumberOfItem] = useState(0);
  const [selected, setSelected] = useState(false);

  const handleSelected = () => {
    setSelected(!selected);
    selected ? setNumberOfItem(0) : setNumberOfItem(1);
  };
  const handleIncrement = () => {
    numberOfItem < 20
      ? setNumberOfItem(prev => prev + 1)
      : Alert.alert('Maximum Order is 20 at a time!');
    numberOfItem > -1 ? setSelected(true) : setSelected(false);
  };
  const handleDecrement = () => {
    numberOfItem > 0 && setNumberOfItem(prev => prev - 1);
    console.log(numberOfItem);
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
