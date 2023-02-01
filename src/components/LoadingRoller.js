import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const LoadingRoller = () => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <ActivityIndicator color={globalStyles.themeColorSolo} />
      </View>
    </View>
  );
};
export default LoadingRoller;

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    height: 100 + '%',
    width: 100 + '%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: 15 + '%',
    maxWidth: 70,
    paddingHorizontal: 5 + '%',
    paddingVertical: 20,
    borderRadius: 8,
    elevation: 10,
  },
});
