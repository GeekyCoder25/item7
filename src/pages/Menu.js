import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import BackHeaderSearch from '../components/BackHeaderSearch';
import ButtomTab from '../components/ButtomTab';
import { foodMenus } from '../data/db';
import Oval from '../../assets/images/ovalBig.svg';
import { globalStyles } from '../styles/globalStyles';

const Menu = ({ navigation, route }) => {
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
  const vh = useWindowDimensions().height;
  const vw = useWindowDimensions().width;
  return (
    <>
      <ImageBackground
        source={require('../../assets/images/splashBg.png')}
        style={globalStyles.route}
        resizeMode="repeat">
        <View style={styles.menuRoute}>
          <BackHeaderSearch navigation={navigation} />
          <View style={styles.menuContainerAlignment}>
            <View
              style={{
                ...styles.menuContainer,
                minHeight: vh * (80 / 100),
                width: vw,
              }}>
              <Pressable style={styles.foodMenuTitleContainer}>
                <View style={styles.ovalContainer}>
                  <Oval
                    style={styles.ovalMain}
                    width={vw / 2}
                    height={vw / 2}
                  />
                  <Image
                    source={require('../../assets/images/foodMenu.png')}
                    style={styles.ovalImage}
                  />
                  <Text style={styles.foodMenuTitle}>Food Menu</Text>
                </View>
              </Pressable>
              {foodMenus.map(foodMenu => (
                <Pressable
                  onPress={() => handleNavigate(foodMenu)}
                  style={
                    vw > 500
                      ? {
                          ...styles.foodMenuTitleContainer,
                          ...styles['oval' + foodMenu.id],
                        }
                      : {
                          ...styles.foodMenuTitleContainer,
                          ...styles['smOval' + foodMenu.id],
                        }
                  }
                  key={foodMenu.title}>
                  <View style={styles.ovalContainer}>
                    <Oval style={styles.oval} width={vw / 3} height={vw / 3} />
                    <Image source={foodMenu.icon} style={styles.ovalImage} />
                    <Text style={styles.foodMenuTitle}>{foodMenu.title}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
            {/* </ScrollView> */}
          </View>
        </View>
      </ImageBackground>
      <ButtomTab navigation={navigation} route={route} />
    </>
  );
};
export default Menu;

const styles = StyleSheet.create({
  menuRoute: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    paddingBottom: 70,
  },
  menuContainerAlignment: {
    flex: 1,
    justifyContent: 'center',
  },
  menuContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodMenuTitleContainer: {
    position: 'absolute',
  },
  ovalContainer: {
    position: 'relative',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ovalMain: {
    minWidth: 180,
    minHeight: 180,
    position: 'absolute',
  },
  oval: {
    minWidth: 150,
    minHeight: 150,
    position: 'absolute',
  },
  oval1: {
    top: 48 + '%',
    left: 8 + '%',
  },
  smOval1: {
    top: 45 + '%',
    left: 3 + '%',
  },
  oval2: {
    top: 33 + '%',
    left: 15 + '%',
  },
  smOval2: {
    top: 25 + '%',
    left: 10 + '%',
  },
  oval3: {
    top: 26 + '%',
    left: 40 + '%',
  },
  smOval3: {
    top: 17 + '%',
    left: 38 + '%',
  },
  oval4: {
    top: 33 + '%',
    right: 15 + '%',
  },
  smOval4: {
    top: 25 + '%',
    right: 8 + '%',
  },
  oval5: {
    top: 48 + '%',
    right: 8 + '%',
  },
  smOval5: {
    top: 45 + '%',
    right: 3 + '%',
  },
  oval6: {
    top: 61 + '%',
    right: 25 + '%',
  },
  smOval6: {
    top: 62 + '%',
    right: 20 + '%',
  },
  oval7: {
    top: 61 + '%',
    left: 25 + '%',
  },
  smOval7: {
    top: 62 + '%',
    left: 22 + '%',
  },
  foodMenuTitle: {
    textAlign: 'center',
    marginTop: 10,
    width: 95 + '%',
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
});
