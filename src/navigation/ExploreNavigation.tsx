import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Explore from '../screens/App/Explore';

const stack = createStackNavigator();
const ExoploreNavigation = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen name="ExploreHome" component={Explore} />
    </stack.Navigator>
  );
};

export default ExoploreNavigation;
