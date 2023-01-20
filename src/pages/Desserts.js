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
import { globalStyles } from '../styles/globalStyles';
import BackHeaderSearch from '../components/BackHeaderSearch';
import Oval from '../../assets/images/ovalBig.svg';
import ButtomTab from '../components/ButtomTab';
import { dessertsData } from '../data/db';

const Desserts = ({ navigation, route }) => {
  const vh = useWindowDimensions().height;
  const vw = useWindowDimensions().width;

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/splashBg.png')}
        style={globalStyles.route}
        resizeMode="repeat">
        <View style={styles.route}>
          <BackHeaderSearch navigation={navigation} />
          <View style={styles.menuContainerAlignment}>
            <View
              style={{
                ...styles.menuContainer,
                minHeight: vh * (80 / 100),
                width: vw,
              }}>
              {dessertsData.map(foodMenu => (
                <Pressable
                  onPress={() => navigation.navigate('DesertsParams', foodMenu)}
                  style={{
                    ...styles.foodMenuTitleContainer,
                    ...styles['oval' + foodMenu.id],
                  }}
                  key={foodMenu.title}>
                  <View style={styles.ovalContainer}>
                    <Oval style={styles.oval} width={vw / 3} height={vw / 3} />
                    <Image source={foodMenu.icon} style={styles.ovalImage} />
                    <Text style={styles.foodMenuTitle}>{foodMenu.title}</Text>
                  </View>
                </Pressable>
              ))}
              <Text style={styles.text}>Desserts</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <ButtomTab navigation={navigation} route={route} />
    </>
  );
};
export default Desserts;
const styles = StyleSheet.create({
  route: {
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
    maxHeight: 200,
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
  oval: {
    minWidth: 150,
    minHeight: 150,
    position: 'absolute',
  },
  oval1: {
    left: 10 + '%',
    top: 25 + '%',
  },
  oval2: {
    right: 10 + '%',
    top: 25 + '%',
  },
  oval3: {
    top: 45 + '%',
  },
  foodMenuTitle: {
    textAlign: 'center',
    marginTop: 10,
    width: 95 + '%',
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
  text: {
    position: 'absolute',
    top: 75 + '%',
    fontFamily: 'Poppins-Regular',
    fontSize: 30,
  },
});
