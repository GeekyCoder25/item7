import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Back from '../../assets/images/back.svg';
import { globalStyles } from '../styles/globalStyles';

const Empty = ({
  navigation,
  title,
  image,
  contentTitle,
  contentText,
  button,
}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/splashBg.png')}
      style={globalStyles.route}
      resizeMode="repeat">
      <View style={styles.route}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Back />
          </Pressable>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.body}>
          <View>{image}</View>
          <Text style={styles.contentTitle}>{contentTitle || 'Sorry!'}</Text>
          <Text style={styles.contentText}>{contentText}</Text>
        </View>
        <View style={styles.button}>
          <Pressable
            style={styles.buttonBackground}
            onPress={() => navigation.popToTop('Home')}>
            <Text style={styles.buttonBackgroundText}>
              {button || 'Find Food'}
            </Text>
          </Pressable>
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
    paddingHorizontal: 2 + '%',
  },
  header: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    marginTop: 10,
    textAlign: 'center',
  },
  body: {
    flex: 1.5,
    maxHeight: 300,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  contentTitle: { fontFamily: 'Poppins-Bold', fontSize: 22 },
  contentText: { fontFamily: 'Poppins-Regular', fontSize: 18 },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonBackground: {
    backgroundColor: globalStyles.themeColorSolo,
    borderRadius: 8,
    justifyContent: 'center',
    height: 50,
  },
  buttonBackgroundText: {
    justifyContent: 'center',
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
});
export default Empty;
