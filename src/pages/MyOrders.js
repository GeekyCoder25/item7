import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Empty from '../components/Empty';
import Heart from '../../assets/images/myOrder.svg';

const MyOrders = ({ navigation }) => {
  const [myOrderLog, setMyOrderLog] = useState(null);
  return myOrderLog ? (
    <></>
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

const styles = StyleSheet.create({});
export default MyOrders;
