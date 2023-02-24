import React, { useContext, useEffect } from 'react';
import {
  Clipboard,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Close from '../../assets/images/xmark.svg';
import Box from '../../assets/images/referBox.svg';
import { AppContext } from '../components/AppContext';

const Refer = ({ navigation }) => {
  const { appContextState, setAppContextState, apiEndpoint } =
    useContext(AppContext);
  const { inviteCode, phoneNumber } = appContextState;
  const referAmount = 100;

  useEffect(() => {
    const handleFavoriteFetch = async () => {
      const id = phoneNumber;
      const res = await fetch(`${apiEndpoint}/api/favorites/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appContextState),
      });
      return res.json();
    };
    handleFavoriteFetch()
      .then(setAppContextState(appContextState))
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ImageBackground
      source={require('../../assets/images/splashBg.png')}
      style={globalStyles.route}
      resizeMode="repeat">
      <View style={styles.route}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Close />
          </Pressable>
        </View>
        <View style={styles.body}>
          <View>
            <Box />
          </View>
          <Text style={styles.contentText}>
            Get <Text style={globalStyles.fontBold}>N{referAmount}.00 </Text>for
            each friend you refer
          </Text>
          <Text style={globalStyles.fontRegular}>Share your invite code</Text>
          <View style={styles.inviteCodeContainer}>
            <Text style={globalStyles.fontBold}>{inviteCode}</Text>
            <Pressable
              onPress={() => {
                Clipboard.setString(inviteCode);
                ToastAndroid.show('Copied to Clipboard', ToastAndroid.SHORT);
              }}>
              <Text style={styles.share}>Share</Text>
            </Pressable>
          </View>
          <Text style={styles.referTextGuide}>
            Share your code with friends to give them N200 off items (limited to
            N30 per order), valid for 15 days on orders above N1,000. When they
            place their first order, you'll get N100 off items, valid for 7 days
            on orders above N1,000.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  route: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    paddingVertical: 5 + '%',
    paddingHorizontal: 5 + '%',
  },
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    marginTop: 10,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  inviteCodeContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#808080',
    width: 100 + '%',
    height: 48,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  contentText: {
    marginVertical: 10,
    marginTop: 30,
    fontFamily: 'Poppins-Regular',
  },
  share: {
    color: '#FCB32B',
    fontFamily: 'Poppins-SemiBold',
  },
  referTextGuide: {
    lineHeight: 30,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
    marginTop: 30,
  },
});
export default Refer;
