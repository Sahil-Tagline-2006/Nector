import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Shop from '../screens/App/Shop';

const stack = createStackNavigator();
const ShopNavigation = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen name="ShopHome" component={Shop} />
    </stack.Navigator>
  );
};

export default ShopNavigation;
