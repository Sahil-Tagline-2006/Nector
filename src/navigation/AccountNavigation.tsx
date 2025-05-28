
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Account from '../screens/App/Account';
import OrderView from '../screens/App/OrderView';
import Order from '../screens/App/Order';

const stack = createStackNavigator();
const AccountNavigation = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen name="AccountHome" component={Account} />
      <stack.Screen name="AccountOrder" component={Order} />
      <stack.Screen name="AccountOrders" component={OrderView} />
    </stack.Navigator>
  );
};

export default AccountNavigation;

