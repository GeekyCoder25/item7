import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { AllData } from '../data/db';
import { globalStyles } from '../styles/globalStyles';
import { AppContext } from './AppContext';
const Popular = ({ navigation, title }) => {
  const [selectedTab, setSelectedTab] = useState([]);
  const { appContextState } = useContext(AppContext);
  const { width: screenWidth } = useWindowDimensions();
  useEffect(() => {
    const popularTabs = [
      {
        image: [
          require('../../assets/images/aPlateWithChicken1.png'),
          require('../../assets/images/aPlateWithChicken2.png'),
        ],
        title: 'A Plate with Chicken',
        price: 1000,
        deliveryFee: 500,
      },
      {
        image: [require('../../assets/images/ChickenShawarma1.png')],
        title: 'Chicken Shawarma',
        price: 1200,
        deliveryFee: 500,
      },
      {
        image: [require('../../assets/images/BeefShawarma.png')],
        title: 'Beef Shawarma',
        price: 2700,
        deliveryFee: 500,
      },
      {
        image: [require('../../assets/images/aPlateWithCroakerFish1.png')],
        title: 'A Plate with Croaker Fish',
        price: 1150,
        deliveryFee: 500,
      },
      {
        image: [require('../../assets/images/aPlateWithFish1.png')],
        title: 'A Plate with Fish',
        price: 1150,
        deliveryFee: 500,
      },
      {
        image: [
          require('../../assets/images/aPlateWithBeef1.png'),
          require('../../assets/images/aPlateWithBeef2.png'),
        ],
        title: 'A Plate with Beef',
        price: 600,
        deliveryFee: 500,
      },
    ];
    if (title === 'Popular') {
      setSelectedTab(popularTabs);
    } else if (title === 'Favorites') {
      let favorites = appContextState.favorites;
      favorites = favorites.map(i => i.toLowerCase());
      const favoriteTabs = [];
      AllData.forEach(popular => {
        favorites.includes(popular.title.toLowerCase()) &&
          favoriteTabs.push(popular);
      });
      setSelectedTab(favoriteTabs.reverse());
    } else if (title === 'Recently Bought') {
      const recentTabs = [];
      let recents = appContextState.recents;
      recents = recents.map(i => i.toLowerCase());
      AllData.forEach(data => {
        recents.includes(data.title.toLowerCase()) && recentTabs.push(data);
      });
      setSelectedTab(recentTabs);
    }
  }, [appContextState.favorites, appContextState.recents, title]);
  return (
    selectedTab.length > 0 && (
      <View style={styles.foodMenuFullContainer}>
        <View style={styles.foodMenuContainer}>
          <Text style={styles.foodMenuContainerHeader}>{title}</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ ...styles.foodMenu, minWidth: screenWidth }}>
            {selectedTab.map(foodMenu => (
              <Pressable
                onPress={() => navigation.navigate('FoodMenuParams', foodMenu)}
                style={styles.foodMenuTitleContainer}
                key={foodMenu.title}>
                <View style={styles.popularContainer}>
                  <Image
                    source={foodMenu.image[0]}
                    style={styles.popularImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.foodMenuTitle}>{foodMenu.title}</Text>
                <Text style={styles.popularPrice}>
                  <Text style={styles.lineThrough}>N</Text> {foodMenu.price}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  );
};
export default Popular;
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
  },
  foodMenuTitleContainer: {
    marginHorizontal: 10,
  },
  popularContainer: {
    width: 200,
    height: 128,
  },
  popular: {
    width: 100 + '%',
    height: 100 + '%',
  },
  popularImage: {
    borderRadius: 10,
    width: 100 + '%',
    height: 100 + '%',
    backgroundColor: '#fff',
  },
  foodMenuTitle: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  popularPrice: {
    color: globalStyles.themeColorSolo,
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold',
  },
  lineThrough: {
    fontFamily: 'Raleway-SemiBold',
    textDecorationLine: 'line-through',
  },
});
