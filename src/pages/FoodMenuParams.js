import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Back from '../../assets/images/back.svg';
import Like from '../../assets/images/heart.svg';
import LikeActive from '../../assets/images/heartActive.svg';
import Tab from '../../assets/images/foodMenuTabIcon.svg';
import TabActive from '../../assets/images/foodMenuTabIconActive.svg';
import Minus from '../../assets/images/minus.svg';
import Plus from '../../assets/images/plus.svg';
import ChevronDown from '../../assets/images/chevron-down.svg';
import ChevronUp from '../../assets/images/chevron-up.svg';
import { globalStyles } from '../styles/globalStyles';
import ExtraPlus from '../../assets/images/extrasAdd.svg';
import ExtrasListIcon from '../../assets/images/extrasListIcon.svg';
import ExtrasListIconActive from '../../assets/images/extrasListIconActive.svg';
import LinearGradient from 'react-native-linear-gradient';

const FoodMenuParams = ({ route, navigation }) => {
  const [heartActive, setHeartActive] = useState(false);
  const [foodMenuTabActive, setFoodMenuTabActive] = useState(0);
  const [numberOfItem, setNumberOfItem] = useState(1);
  const [extrasExpanded, setExtasExpanded] = useState(true);

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
  const handleFavorite = () => {
    setHeartActive(!heartActive);
    heartActive
      ? ToastAndroid.show('Removed from Favorites', ToastAndroid.SHORT)
      : ToastAndroid.show('Added to Favorites', ToastAndroid.SHORT);
  };
  const extrasData = [
    {
      title: 'Extra Fish',
      price: '200',
    },
    {
      title: 'Extra Rice',
      price: '200',
    },
    {
      title: 'Extra Beef',
      price: '50',
    },
    {
      title: 'Extra Plantain',
      price: '200',
    },
  ];
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
                    foodMenuTabActive === route.params.image.indexOf(image) ? (
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
              <View style={styles.extras}>
                <View style={styles.extrasHeader}>
                  <Text style={styles.extrasHeaderText}>Extras</Text>
                  <Pressable
                    onPress={() => setExtasExpanded(!extrasExpanded)}
                    style={styles.chevron}>
                    {extrasExpanded ? <ChevronDown /> : <ChevronUp />}
                  </Pressable>
                </View>
                {extrasExpanded && (
                  <View>
                    {extrasData.map(data => (
                      <Extras data={data} key={data.title} />
                    ))}
                  </View>
                )}
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
                  onPress={() => navigation.navigate('MoreOptions')}>
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
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
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
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    maxWidth: 98 + '%',
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
export default FoodMenuParams;

const Extras = ({ data }) => {
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
