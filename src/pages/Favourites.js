import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Empty from '../components/Empty';
import Heart from '../../assets/images/favouriteImage.svg';
import { AppContext } from '../components/AppContext';
import { globalStyles } from '../styles/globalStyles';
import Back from '../../assets/images/back.svg';
import Xmark from '../../assets/images/xmarkcolor.svg';
import { AllData } from '../data/db';
import LoadingModalOverlay from '../components/LoadingModalOverlay';

const Favourites = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { appContextState, setAppContextState, apiEndpoint } =
    useContext(AppContext);
  const { favorites, phoneNumber } = appContextState;
  const [favoriteLog, setFavoriteLog] = useState(favorites);
  const [favoriteLogData, setFavoriteLogData] = useState([]);

  useEffect(() => {
    const favoriteTabs = [];
    AllData.forEach(item => {
      favorites.includes(item.title) && favoriteTabs.push(item);
    });
    setFavoriteLogData(favoriteTabs);
  }, [favorites]);
  const handleFavoriteFetch = async data => {
    const id = phoneNumber;

    const res = await fetch(`${apiEndpoint}/api/favorites/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favorites: data }),
    });
    return res.json();
  };
  const handleRemoveFavorite = favorite => {
    handleShowModal();
    const updatedFavorites = [];
    favoriteLogData
      .filter(i => i.title !== favorite.title)
      .forEach(i => updatedFavorites.push(i.title));
    handleFavoriteFetch(updatedFavorites)
      .then(i => {
        setAppContextState({
          ...appContextState,
          favorites: updatedFavorites,
        });
        setFavoriteLog(updatedFavorites);
        handleShowModal();
        ToastAndroid.show(
          `${favorite.title} removed from Favorites`,
          ToastAndroid.SHORT,
        );
      })
      .catch(err => {
        handleShowModal();
        console.log(err.message);
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };
  const handleShowModal = () => {
    setModalOpen(prev => !prev);
  };
  return favoriteLog.length > 0 ? (
    <>
      <ImageBackground
        source={require('../../assets/images/splashBg.png')}
        style={globalStyles.route}
        resizeMode="repeat">
        <View style={styles.route}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Back />
                </Pressable>
                <Text style={styles.headerTitle}>Favorites</Text>
              </View>
              <View style={styles.body}>
                {favoriteLogData.length > 0 &&
                  favoriteLogData.map(favorite => (
                    <Pressable
                      key={favorite.title}
                      onPress={() => {
                        navigation.navigate('FoodMenuParams', favorite);
                      }}>
                      <View style={[styles.card]}>
                        <View style={styles.imageContainer}>
                          <Image
                            source={favorite.image[0]}
                            style={styles.image}
                            resizeMode="center"
                          />
                        </View>
                        <Text style={styles.cardTitle}>{favorite.title}</Text>
                        <Pressable
                          onPress={() => handleRemoveFavorite(favorite)}
                          style={styles.minus}>
                          <Xmark width="45" />
                        </Pressable>
                      </View>
                    </Pressable>
                  ))}
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
  ) : (
    <Empty
      navigation={navigation}
      title="Favourites"
      image={<Heart />}
      contentText="You currently do not have a favourite"
      button="Add a favourite"
    />
  );
};

const styles = StyleSheet.create({
  route: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    paddingVertical: 5 + '%',
    paddingHorizontal: 2 + '%',
  },
  body: {
    paddingHorizontal: 1 + '%',
    paddingVertical: 20,
    flex: 1,
  },
  header: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    // marginTop: 5,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
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
    width: 100 + '%',
    maxHeight: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 3 + '%',
    marginVertical: 10,
    alignSelf: 'center',
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: 90 + '%',
    maxHeight: 80 + '%',
    width: 100,
    height: 100,
  },
  cardTitle: {
    flex: 3,
    justifyContent: 'center',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  minus: {
    minWidth: 20,
  },
});
export default Favourites;
