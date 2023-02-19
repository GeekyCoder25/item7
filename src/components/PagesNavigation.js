import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Menu from '../pages/Menu';
import FoodMenuParams from '../pages/FoodMenuParams';
import Desserts from '../pages/Desserts';
import MyOrders from '../pages/MyOrders';
import Drinks from '../pages/Drinks';
import Favourites from '../pages/Favourites';
import DesertsParams from '../pages/DesertsParams';
import Refer from '../pages/Refer';
import Profile from '../pages/Profile';
import Wallet, { Promo } from '../pages/Wallet';
import Payment from '../pages/Payment';
import MoreOptions from '../pages/MoreOptions';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import Checkout from '../pages/Checkout';
import Tip from '../pages/Tip';
import Congrats from '../pages/Congrats';
import { AppContext } from '../components/AppContext';
import Userinfo from '../pages/Userinfo';
import Faq from '../pages/Faq';
import NoInternetModal from '../pages/NoInternetModal';

const PagesNavigation = () => {
  const Stack = createNativeStackNavigator();
  const { appContextState, internetCheck, setRouteActive } =
    useContext(AppContext);
  useEffect(() => {
    setRouteActive(true);
  }, [setRouteActive]);
  const { userLoggedIn } = appContextState;
  return internetCheck === true ? (
    userLoggedIn ? (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Myorders" component={MyOrders} />
        <Stack.Screen name="FoodMenuParams" component={FoodMenuParams} />
        <Stack.Screen name="Desserts" component={Desserts} />
        <Stack.Screen name="DesertsParams" component={DesertsParams} />
        <Stack.Screen name="Drinks" component={Drinks} />
        <Stack.Screen name="Favourites" component={Favourites} />
        <Stack.Screen name="MoreOptions" component={MoreOptions} />
        <Stack.Screen name="Refer" component={Refer} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Userinfo" component={Userinfo} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Tip" component={Tip} />
        <Stack.Screen name="FAQ" component={Faq} />
        <Stack.Screen name="Notifications" component={Refer} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Congrats" component={Congrats} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Promo"
          component={Promo}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    )
  ) : (
    <NoInternetModal />
  );
};
export default PagesNavigation;
