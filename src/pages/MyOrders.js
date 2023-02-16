import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Empty from '../components/Empty';
import Heart from '../../assets/images/myOrder.svg';
import { AppContext } from '../components/AppContext';
import { globalStyles } from '../styles/globalStyles';
import Back from '../../assets/images/back.svg';
import { AllData } from '../data/db';
import LoadingModalOverlay from '../components/LoadingModalOverlay';
const MyOrders = ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { appContextState } = useContext(AppContext);
  const [myOrderLog, setMyOrderLog] = useState([]);
  const { orders } = appContextState;

  useEffect(() => {
    const orderTabs = [];
    AllData.forEach(item => {
      orders.includes(item.title) &&
        orderTabs.push({
          ...item,
          numberOfItem: orders[orders.indexOf(item.title) - 1],
        });
    });
    setMyOrderLog(orderTabs);
  }, [orders]);
  const handleShowModal = () => {
    setModalOpen(prev => !prev);
  };

  return myOrderLog.length > 0 ? (
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
                {myOrderLog.length > 0 &&
                  myOrderLog.map(order => (
                    <Order
                      order={order}
                      key={order.title}
                      myOrderLog={myOrderLog}
                      setMyOrderLog={setMyOrderLog}
                      navigation={navigation}
                    />
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
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
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
    // alignItems: 'center',
  },
  orderStatus: {
    fontFamily: 'Poppins-SemiBold',
  },
  cardDetails: {
    flexDirection: 'row',
  },
  imageContainer: {
    // flex: 1,
    // marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  image: {
    maxWidth: 100 + '%',
    maxHeight: 80 + '%',
    width: 100,
    height: 100,
    transform: [{ rotateZ: '90deg' }],
  },
  cardTitle: {
    justifyContent: 'center',
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
  price: {
    fontSize: 12,
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    color: globalStyles.themeColorSolo,
  },
  sub: {
    alignItems: 'flex-end',
    transform: [{ translateY: -55 }],
  },
  subTotal: { fontFamily: 'Raleway-SemiBold', fontSize: 18 },
  subButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  track: {
    borderColor: 'rgba(0, 0 , 0, .5)',
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  trackText: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
    transform: [{ translateY: 1 }],
  },
  confirm: {
    borderColor: globalStyles.themeColorSolo,
    backgroundColor: globalStyles.themeColorSolo,
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 8,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  confirmText: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    transform: [{ translateY: 1 }],
  },
});
export default MyOrders;

export const Order = ({ myOrderLog, order, navigation, setMyOrderLog }) => {
  const [orderStatus, setOrderStatus] = useState(0);
  // const { appContextState, setAppContextState, apiEndpoint } =
  //   useContext(AppContext);
  // const { userProfileData, orders } = appContextState;

  const handleRemove = async () => {
    try {
      Alert.alert('U never receive your order na');
      // let tempOrders = await myOrderLog.filter(i => i !== order);
      // tempOrders = [
      //   ...tempOrders.map(i => {
      //     return i.title;
      //   }),
      // ];
      // setAppContextState({ ...appContextState, orders: tempOrders });
      // const id = await userProfileData.phoneNumber;
      // const res = await fetch(`${apiEndpoint}/api/favorites/${id}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     orders: tempOrders,
      //   }),
      // });
      // return res;
    } catch {
      ToastAndroid.show('Network Error', ToastAndroid.SHORT);
    }
  };
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('FoodMenuParams', order);
      }}>
      <View style={[styles.card]}>
        <View>
          <Text style={styles.orderStatus}>
            {orderStatus === 0 ? 'Awaiting delivery' : 'Delivered'}
          </Text>
        </View>
        <View style={[styles.cardDetails]}>
          <View style={styles.imageContainer}>
            {order.image && (
              <Image
                source={order.image[0]}
                style={styles.image}
                resizeMode="center"
              />
            )}
          </View>
          <View>
            <Text style={styles.cardTitle}>{order.title}</Text>
            <Text style={styles.price}>
              <Text style={styles.lineThrough}>N</Text>{' '}
              <Text>
                {order.price} x {order.numberOfItem}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.sub}>
          <View>
            <Text style={styles.subTotal}>
              Total:{' '}
              <Text>
                <Text style={styles.lineThrough}>N</Text>{' '}
                <Text>{order.price * order.numberOfItem}</Text>
              </Text>
            </Text>
          </View>
          <View style={styles.subButtons}>
            {orderStatus === 0 ? (
              <TouchableOpacity
                style={styles.track}
                onPress={() => {
                  Alert.alert(
                    "You won't see anything, u pay? wey u wan dey tack order",
                  );
                }}>
                <Text style={styles.trackText}>Track Order</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.track} onPress={handleRemove}>
                <Text style={styles.trackText}>Remove</Text>
              </TouchableOpacity>
            )}
            {orderStatus === 0 ? (
              <TouchableOpacity
                style={styles.confirm}
                onPress={() => {
                  setOrderStatus(1);
                }}>
                <Text style={styles.confirmText}>Confirm Delivery</Text>
              </TouchableOpacity>
            ) : (
              <Pressable style={styles.confirm}>
                <Text style={styles.confirmText}>Delivered</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};
