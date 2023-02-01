import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Empty from '../components/Empty';
import Heart from '../../assets/images/myOrder.svg';
import { AppContext } from '../components/AppContext';
import { globalStyles } from '../styles/globalStyles';
import Back from '../../assets/images/back.svg';
import Plus from '../../assets/images/plus.svg';
import { AllData } from '../data/db';
import LoadingModalOverlay from '../components/LoadingModalOverlay';
const MyOrders = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { appContextState } = useContext(AppContext);
  const { orders } = appContextState;
  const [myOrderLog, setMyOrderLog] = useState(orders);
  const [orderLogData, setOrderLogData] = useState(orders);

  useEffect(() => {
    const orderTabs = [];
    AllData.forEach(item => {
      orders.includes(item.title) && orderTabs.push(item);
    });
    setOrderLogData(orderTabs);
  }, [orders]);
  const handleShowModal = () => {
    setModalOpen(prev => !prev);
  };
  return myOrderLog ? (
    // <View>
    //   <Text style={styles.big}>Still Working on it </Text>
    // </View>
    <>
      <ImageBackground
        source={require('../../assets/images/splashBg.png')}
        style={globalStyles.route}
        resizeMode="repeat">
        <View style={styles.route}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.bodyContainer}>
              <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Back />
                </Pressable>
                <Text style={styles.headerTitle}>My Orders</Text>
              </View>
              <View style={styles.body}>
                {orderLogData.length > 0 &&
                  orderLogData.map((orderIndex, i) => (
                    <Pressable
                      key={i}
                      onPress={() => {
                        navigation.navigate('FoodMenuParams', orderIndex);
                      }}>
                      <View style={[styles.card]}>
                        <View style={styles.imageContainer}>
                          {/* <Image
                            source={favorite.image[0]}
                            style={styles.image}
                            resizeMode="center"
                          /> */}
                        </View>
                        <Text style={styles.cardTitle}>{orderIndex.title}</Text>
                        <Pressable
                          // onPress={() => handleRemoveFavorite(favorite)}
                          style={styles.minus}>
                          <Plus />
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
      title="My Orders"
      image={<Heart />}
      contentTitle="No orders yet"
      contentText="When you place first order, it will appear here"
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
  bodyContainer: {
    paddingHorizontal: 1 + '%',
    paddingVertical: 20,
    flex: 1,
  },
  header: {
    flex: 1,
    // backgroundColor: 'green',
  },
  headerTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 25,
    // marginTop: -30,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
});
export default MyOrders;
