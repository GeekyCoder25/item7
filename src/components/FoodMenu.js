import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Oval from '../../assets/images/oval.svg';
import { foodMenus } from '../data/db';

const FoodMenu = ({ navigation }) => {
  const handleNavigate = foodMenu => {
    if (foodMenu.title === 'Desserts') {
      navigation.navigate('Desserts');
    } else if (foodMenu.title === 'Drinks') {
      navigation.navigate('Drinks', foodMenu);
    } else if (foodMenu.title === 'Favourites') {
      navigation.navigate('Favourites');
    } else {
      navigation.navigate('FoodMenuParams', foodMenu);
    }
  };
  return (
    <View style={styles.foodMenuFullContainer}>
      <View style={styles.foodMenuContainer}>
        <Text style={styles.foodMenuContainerHeader}>Food Menu</Text>
        <Pressable onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.foodMenuContainerText}>See all</Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{ ...styles.foodMenu, minWidth: useWindowDimensions().width }}>
          {foodMenus.map(foodMenu => (
            <Pressable
              onPress={() => handleNavigate(foodMenu)}
              style={styles.foodMenuTitleContainer}
              key={foodMenu.title}>
              <View style={styles.ovalContainer}>
                <Oval style={styles.oval} />
                <Image source={foodMenu.icon} />
              </View>
              <Text style={styles.foodMenuTitle}>{foodMenu.title}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default FoodMenu;

const styles = StyleSheet.create({
  foodMenuFullContainer: {
    marginTop: 2 + '%',
  },
  foodMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2 + '%',
  },
  foodMenuContainerHeader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  foodMenuContainerText: {
    color: globalStyles.themeColorSolo,
    fontFamily: 'Poppins-Regular',
  },
  foodMenu: {
    flexDirection: 'row',
    marginVertical: 30,
    justifyContent: 'space-evenly',
  },
  foodMenuTitleContainer: {
    marginRight: 10,
  },
  ovalContainer: {
    position: 'relative',
    height: 70,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  oval: {
    width: 100 + '%',
    height: 100 + '%',
    position: 'absolute',
  },
  foodMenuTitle: {
    maxWidth: 106,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});
