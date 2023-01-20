import React, { useContext, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Back from '../../assets/images/back.svg';
import { dessertsData, DrinksData } from '../data/db';
import { globalStyles } from '../styles/globalStyles';
import Minus from '../../assets/images/minus.svg';
import Plus from '../../assets/images/plus.svg';
import Add from '../../assets/images/addyellow.svg';
import { AppContext } from '../components/AppContext';
const MoreOptions = ({ navigation }) => {
  const [foodMenuTabActive] = useState(2);
  const [foodMenuTabSelected, setFoodMenuTabSelected] = useState(2);
  const { appContextState } = useContext(AppContext);
  const { userLoggedIn } = appContextState;
  // useEffect(() => {
  //   const handleTabActive = () => {
  //     foodMenuTabActive === dessertsData.length - 1
  //       ? setFoodMenuTabActive(0)
  //       : setFoodMenuTabActive(prev => prev + 1);
  //   };
  //   !foodMenuTabSelected &&
  //     dessertsData.length > 1 &&
  //     setTimeout(handleTabActive, 5000);
  //   return clearTimeout(handleTabActive);
  // }, [foodMenuTabActive]);
  const vh = useWindowDimensions().height;
  return (
    <ImageBackground
      source={require('../../assets/images/splashBg.png')}
      style={globalStyles.route}
      resizeMode="repeat">
      <View style={styles.route}>
        <ScrollView style={styles.scrollView}>
          <View
            style={{
              ...styles.body,
              minHeight: vh * (98 / 100),
            }}>
            <View style={styles.header}>
              <Pressable onPress={() => navigation.goBack()}>
                <Back />
              </Pressable>
              <Text style={styles.headerTitle}>
                Complete your order with these
              </Text>
            </View>
            <View style={styles.bodyContent}>
              {dessertsData
                .slice(foodMenuTabActive, foodMenuTabActive + 1)
                .map(dessert => (
                  <AddmoreTab
                    setFoodMenuTabSelected={setFoodMenuTabSelected}
                    dessert={dessert}
                    key={dessert.id}
                  />
                ))}
              {DrinksData.slice(foodMenuTabActive, foodMenuTabActive + 1).map(
                dessert => (
                  <AddmoreTab
                    image={require('../../assets/images/drinks.png')}
                    dessert={dessert}
                    button="Customize"
                    navigation={navigation}
                    key={dessert.title}
                  />
                ),
              )}
            </View>
            <View style={styles.buttonsContainer}>
              <Pressable
                style={styles.buttonBackground}
                onPress={() => {
                  userLoggedIn
                    ? navigation.navigate('Cart')
                    : navigation.navigate('Login');
                }}>
                {foodMenuTabSelected ? (
                  <Text style={styles.buttonBackgroundText}>No, Thanks</Text>
                ) : (
                  <Text style={styles.buttonBackgroundText}>Continue</Text>
                )}
              </Pressable>
            </View>
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
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  body: {
    paddingHorizontal: 2 + '%',
    paddingVertical: 20,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  bodyContent: {
    marginTop: 10 + '%',
    flex: 1,
  },
  addMoreContainer: {
    borderBottomColor: '#80808066',
    borderBottomWidth: 1,
    paddingBottom: 20,
    marginTop: 5 + '%',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    borderBottomColor: '#80808066',
    borderBottomWidthWidth: 10,
  },
  addMoreTile: {
    fontFamily: 'Poppins-SemiBold',
  },
  addMoreText: {
    fontFamily: 'Raleway-SemiBold',
  },
  linethrough: {
    textDecorationLine: 'line-through',
  },
  addNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    borderRadius: 13,
    borderColor: '#808080',
    borderWidth: 1,
    paddingVertical: 2,
  },
  addNowButtonPlus: {
    marginTop: 3,
  },
  addNowButtonText: {
    fontFamily: 'Poppins-Regular',
    marginLeft: 3,
    fontSize: 10,
  },
  numberofItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberOfItemText: {
    marginTop: -5,
    marginHorizontal: 15,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  numberOfItemPriceText: {
    fontSize: 20,
    marginTop: 15,
    fontFamily: 'Raleway-SemiBold',
  },
  customize: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    maxWidth: 98 + '%',
  },
  buttonBackground: {
    width: 100 + '%',
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
export default MoreOptions;

const AddmoreTab = ({
  dessert,
  image,
  button,
  navigation,
  setFoodMenuTabSelected,
}) => {
  const [numberOfItem, setNumberOfItem] = useState(0);
  const handleIncrement = () => {
    numberOfItem < 20
      ? setNumberOfItem(prev => prev + 1)
      : Alert.alert('Maximum Order is 20 at a time!');
    setFoodMenuTabSelected(false);
  };
  const handleDecrement = () => {
    numberOfItem > 0 && setNumberOfItem(prev => prev - 1);
    numberOfItem === 1 && setFoodMenuTabSelected(true);
  };
  return (
    <View style={styles.addMoreContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={dessert.image ? dessert.image[0] : image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.addMoreTile}>{dessert.title}</Text>
          <Text style={styles.addMoreText}>
            <Text style={styles.linethrough}>N</Text>
            {dessert.price}
          </Text>
        </View>
        <View>
          {button ? (
            <Pressable
              onPress={() =>
                navigation.navigate('Drinks', { image, ...dessert })
              }>
              <Text style={{ ...styles.addNowButton, ...styles.customize }}>
                Customize
              </Text>
            </Pressable>
          ) : !numberOfItem ? (
            <Pressable
              style={styles.addNowButton}
              onPress={() => handleIncrement(setFoodMenuTabSelected)}>
              <View style={styles.addNowButtonPlus}>
                <Add />
              </View>
              <Text style={styles.addNowButtonText}>Add now</Text>
            </Pressable>
          ) : (
            <View style={styles.numberofItems}>
              <TouchableOpacity onPress={handleDecrement}>
                <Minus />
              </TouchableOpacity>
              <Text style={styles.numberOfItemText}>{numberOfItem}</Text>
              <TouchableOpacity
                onPress={() => handleIncrement(setFoodMenuTabSelected)}>
                <Plus />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
