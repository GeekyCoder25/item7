import React, { useContext, useEffect, useState } from 'react';
import {
  Pressable,
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import Back from '../../assets/images/back.svg';
import { AppContext } from '../components/AppContext';
import { globalStyles } from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const Userinfo = ({ navigation }) => {
  const { appContextState, setAppContextState, apiEndpoint } =
    useContext(AppContext);
  const { userProfileData } = appContextState;
  const { firstName, lastName, email, phoneNumber, username } = userProfileData;
  const [isEditing, setIsEditing] = useState(false);
  const [allFocus, setAllFocus] = useState(true);
  const vw = useWindowDimensions().width;
  const ProfileData = [
    {
      title: 'First name',
      value: firstName,
    },
    {
      title: 'Last name',
      value: lastName,
    },
    {
      title: 'Username',
      value: username,
    },
    {
      title: 'Email',
      value: email,
    },
    {
      title: 'Phone Number',
      value: phoneNumber,
    },
  ];

  const cancelEdit = () => {
    setIsEditing(false);
  };
  const updateProfile = () => {
    setIsEditing(false);
  };
  return (
    <ImageBackground
      source={require('../../assets/images/splashBg.png')}
      style={globalStyles.route}
      resizeMode="repeat">
      <View style={styles.route}>
        <ScrollView
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Back />
            </Pressable>
            <Text style={styles.headerTitle}>User Profile</Text>
          </View>
          {!isEditing && (
            <Pressable
              onPress={() => setIsEditing(true)}
              style={styles.editIcon}>
              <Icon name="edit" size={25} color={globalStyles.themeColorSolo} />
            </Pressable>
          )}
          <View>
            <View style={styles.userIconContianer}>
              <View
                style={{
                  ...styles.userIcon,
                  width: vw / 2.5,
                  height: vw / 2.5,
                  borderRadius: vw / 4,
                }}>
                <Text style={styles.userIconText}>
                  {firstName.charAt(0)}
                  {lastName.charAt(0)}
                </Text>
              </View>
            </View>
            {ProfileData.map(profileItem => (
              <ProfileItem
                key={profileItem.title}
                profileItem={profileItem}
                isEditing={isEditing}
                allFocus={allFocus}
                setAllFocus={setAllFocus}
              />
            ))}
          </View>
          {isEditing && (
            <View style={styles.buttonsContainer}>
              <Pressable style={styles.cartButton} onPress={cancelEdit}>
                <LinearGradient
                  style={styles.cartButtonLinear}
                  start={{ x: 0.0, y: 0.25 }}
                  end={{ x: 0.5, y: 1 }}
                  colors={['#f78b3f', '#fcb943']}>
                  <Text style={styles.buyButtonText}>Cancel</Text>
                </LinearGradient>
              </Pressable>
              <Pressable style={styles.buyButton} onPress={updateProfile}>
                <Text style={styles.buyButtonText}>Update Profile</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  route: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    paddingVertical: 5 + '%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 97 + '%',
    alignSelf: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    textAlign: 'center',
    paddingRight: 30,
    flex: 1,
  },
  scrollview: {
    paddingHorizontal: 2 + '%',
  },
  editIcon: {
    alignSelf: 'flex-end',
    marginRight: 25,
  },
  userIconContianer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15 + '%',
    marginBottom: 40,
  },
  userIcon: {
    backgroundColor: 'pink',
    maxWidth: 180,
    maxHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIconText: {
    fontSize: 60,
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  profileItem: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 95 + '%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    elevation: 10,
    shadowColor: 'rgba(0,0,0,0.1)',
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
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
export default Userinfo;

const ProfileItem = ({ profileItem, isEditing, allFocus, setAllFocus }) => {
  const [inputFocus, setInputFocus] = useState(false);
  useEffect(() => {
    console.log(allFocus);
    setInputFocus(false);
  }, [allFocus]);
  return isEditing ? (
    <Pressable
      onPress={() => {
        setAllFocus(true);
        setAllFocus(false);
        setInputFocus(true);
      }}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        ...styles.profileItem,

        borderColor:
          inputFocus && !allFocus ? globalStyles.themeColorSolo : '#fff',
      }}>
      <Text style={styles.title}>{profileItem.title}</Text>
      {isEditing && profileItem.title !== 'Phone Number' ? (
        <TextInput
          defaultValue={profileItem.value}
          style={styles.value}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
      ) : (
        <Text style={styles.value}>{profileItem.value}</Text>
      )}
    </Pressable>
  ) : (
    <View style={styles.profileItem}>
      <Text style={styles.title}>{profileItem.title}</Text>
      {isEditing && profileItem.title !== 'Phone Number' ? (
        <TextInput
          defaultValue={profileItem.value}
          style={styles.value}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
      ) : (
        <Text style={styles.value}>{profileItem.value}</Text>
      )}
    </View>
  );
};
