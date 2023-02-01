import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const LoadingModalOverlay = ({ modalOpen, handleShowModal }) => {
  return (
    <Modal
      visible={modalOpen}
      animationType="slide"
      onRequestClose={handleShowModal}
      transparent>
      <Pressable style={styles.overlay} />
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <ActivityIndicator color={globalStyles.themeColorSolo} />
        </View>
      </View>
    </Modal>
  );
};
export default LoadingModalOverlay;
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#000',
    opacity: 0.5,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
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
