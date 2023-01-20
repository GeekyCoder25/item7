import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Empty from '../components/Empty';
import Heart from '../../assets/images/favouriteImage.svg';

const Favourites = ({ navigation }) => {
  const [favoriteLog, setFavoriteLog] = useState(null);
  return favoriteLog ? (
    <></>
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

const styles = StyleSheet.create({});
export default Favourites;
