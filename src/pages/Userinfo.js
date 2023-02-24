import React, { useContext, useState } from 'react';
import {
  Pressable,
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Back from '../../assets/images/back.svg';
import { AppContext } from '../components/AppContext';
import { globalStyles } from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import LoadingRoller from '../components/LoadingRoller';

const Userinfo = ({ navigation }) => {
  const { appContextState, setAppContextState, apiEndpoint } =
    useContext(AppContext);
  const { userInfo, phoneNumber } = appContextState;
  const { firstName, lastName, email, username } = userInfo;
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const vw = useWindowDimensions().width;
  const vh = useWindowDimensions().height;
  const ProfileData = [
    {
      title: 'First name',
      titleDatabase: 'firstName',
      value: firstName,
    },
    {
      title: 'Last name',
      titleDatabase: 'lastName',
      value: lastName,
    },
    {
      title: 'Username',
      titleDatabase: 'username',
      value: username,
    },
    {
      title: 'Email',
      titleDatabase: 'email',
      value: email,
    },
    {
      title: 'Phone Number',
      titleDatabase: 'phoneNumber',
      value: phoneNumber,
    },
  ];

  const [formData, setFormData] = useState(userInfo);
  const cancelEdit = () => {
    setIsEditing(false);
  };
  const updateProfile = () => {
    setLoading(true);
    const handleFavoriteFetch = async () => {
      const id = phoneNumber;
      const res = await fetch(`${apiEndpoint}/api/favorites/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInfo: formData }),
      });
      return res.json();
    };
    handleFavoriteFetch()
      .then(() => {
        setAppContextState({
          ...appContextState,
          userInfo: formData,
        });
        setIsEditing(false);
      })
      .catch(err =>
        ToastAndroid.show(`Network Error: ${err.message}`, ToastAndroid.SHORT),
      )
      .finally(() => setLoading(false));
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
          {/* {loading ? ( */}
          {!loading ? (
            <>
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
                    formData={formData}
                    setFormData={setFormData}
                    phoneNumber={phoneNumber}
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
            </>
          ) : (
            <View style={{ height: vh / 1.3 }}>
              <LoadingRoller />
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
    fontSize: 70,
    top: 5,
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
    marginTop: -30,
    paddingTop: 40,
    fontFamily: 'Poppins-SemiBold',
  },
  roller: {
    flex: 1,
    backgroundColor: 'red',
    height: 600,
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

const ProfileItem = ({
  profileItem,
  isEditing,
  formData,
  setFormData,
  phoneNumber,
}) => {
  const [inputFocus, setInputFocus] = useState(false);
  const { title, titleDatabase, value } = profileItem;

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        ...styles.profileItem,
        borderColor: inputFocus ? globalStyles.themeColorSolo : '#fff',
      }}>
      <Text style={styles.title}>
        {title === 'Phone Numer' ? phoneNumber : title}
      </Text>
      {isEditing && title !== 'Phone Number' ? (
        <TextInput
          defaultValue={value}
          style={styles.value}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onChangeText={text =>
            setFormData({ ...formData, [titleDatabase]: text })
          }
        />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );
};
