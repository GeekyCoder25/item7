import React, { useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';
import Back from '../../assets/images/back.svg';

const BackHeader = ({ navigation }) => {
  const [searchIcon, setSearchIcon] = useState(true);
  const searchInputRef = useRef(TextInput);
  return (
    <View style={styles.header}>
      {/* <View style={styles.back}> */}
      <Pressable onPress={() => navigation.goBack()} style={styles.back}>
        <Back />
      </Pressable>
      {/* </View> */}
      <View style={styles.headerInputContainer}>
        {searchIcon && (
          <Image
            source={require('../../assets/images/search.png')}
            style={styles.searchIcon}
          />
        )}
        <TextInput
          placeholder="What can we get you?"
          style={styles.searchInput}
          onFocus={() => setSearchIcon(false)}
          onBlur={() => setSearchIcon(true)}
          ref={searchInputRef}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: 45,
    paddingVertical: 10 + '%',
    paddingHorizontal: 2 + '%',
  },
  back: {
    width: 50,
  },
  headerInputContainer: {
    flex: 4,
    height: 35,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 25 + '%',
    top: 32 + '%',
    zIndex: 9,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 45,
    flex: 1,
    textAlign: 'center',
    width: 100 + '%',
  },
});
export default BackHeader;
