import {Image} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, images} from '../utils/common/styles';
import {FS} from '../../Scale';
import ShopNavigation from './ShopNavigation';
import ExoploreNavigation from './ExploreNavigation';
import Favourite from '../screens/App/Favourite';
import AccountNavigation from './AccountNavigation';
import {useFocusEffect} from '@react-navigation/native';
import useZustandStore from '../zustand/useZustandStore';
import Cart from '../screens/App/Cart';

const BottomTab = createBottomTabNavigator();
const CartScreen = Cart;

const HomeNavigation = () => {
  const {Cart} = useZustandStore();
  const [totalBedgeValue, setTotalBedgeValue] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const totalBedgeValue = Cart.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      setTotalBedgeValue(totalBedgeValue);
    }, [Cart]),
  );

  const Bedge = useMemo(() => {
    return totalBedgeValue >= 1 ? '' : undefined;
  }, [Cart, totalBedgeValue]);

  const ScreenOption = ({route}: any) => ({
    headerShown: false,

    tabBarIcon: ({focused, size}) => {
      let iconName;
      iconName =
        route.name === 'Shop'
          ? images.SHOP
          : route.name === 'Explore'
          ? images.EXPOLRE
          : route.name === 'Cart'
          ? images.CART
          : route.name === 'Favourite'
          ? images.FAVOURITE
          : images.ACCOUNT;

      return (
        <Image
          source={iconName}
          resizeMode="contain"
          style={{
            width: size,
            height: size,
            tintColor: focused ? colors.THMEM_COLOR : colors.BLACK,
          }}
        />
      );
    },
    tabBarActiveTintColor: colors.THMEM_COLOR,
    tabBarInactiveTintColor: colors.BLACK,
    tabBarLabelStyle: {
      fontSize: FS(12),
    },
  });
  
  return (
    <BottomTab.Navigator screenOptions={ScreenOption}>
      <BottomTab.Screen name="Shop" component={ShopNavigation} />
      <BottomTab.Screen name="Explore" component={ExoploreNavigation} />
      <BottomTab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: Bedge,
        }}
      />
      <BottomTab.Screen name="Favourite" component={Favourite} />
      <BottomTab.Screen name="Account" component={AccountNavigation} />
    </BottomTab.Navigator>
  );
};

export default HomeNavigation;
