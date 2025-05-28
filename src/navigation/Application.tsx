import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React, {use, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Welcome from '../screens/Welcome';
import {hideSplash} from 'react-native-splash-view';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import SignIn from '../screens/Authentication/SignIn';
import PhoneNumber from '../screens/Authentication/PhoneNumber';
import OtpVerification from '../screens/Authentication/OtpVerification';
import SelectLocation from '../screens/Authentication/SelectLocation';
import Login from '../screens/Authentication/Login';
import SignUp from '../screens/Authentication/SignUp';
import useZustandStore from '../zustand/useZustandStore';
import HomeNavigation from './HomeNavigation';
import SingleExplore from '../screens/App/SingleExplore';
import SingleProduct from '../screens/App/SingleProduct';
import OrderComplete from '../screens/App/OrderComplete';
import {colors} from '../utils/common/styles';

const Stack = createStackNavigator();
const Application = () => {
  const {user, isLoading} = useZustandStore();

  // hide splash  screen
  useEffect(() => {
    setTimeout(() => {
      hideSplash();
    }, 1000);
    // setUserLoginOut()
  }, []);

  const Loader = () => {
    return (
      <Modal transparent={true} visible={isLoading} animationType="fade">
        <View style={styles.LoaderMain}>
          <View>
            <ActivityIndicator size={'large'} />
            <Text style={styles.LoadingText}>Loading...</Text>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={[]}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {user.isLogin ? (
              <>
                <Stack.Screen name="Home" component={HomeNavigation} />
                <Stack.Screen name="ExploreSingle" component={SingleExplore} />
                <Stack.Screen
                  name="ShopSingleProduct"
                  component={SingleProduct}
                />
                <Stack.Screen name="OrderComplete" component={OrderComplete} />
              </>
            ) : (
              <>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
                <Stack.Screen
                  name="OtpVerification"
                  component={OtpVerification}
                />
                <Stack.Screen
                  name="SelectLocation"
                  component={SelectLocation}
                />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </>
            )}
          </Stack.Navigator>
        </SafeAreaView>
      </SafeAreaProvider>
      <Loader />
    </NavigationContainer>
  );
};

export default Application;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  LoaderMain: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoadingText: {
    color: colors.WHITE,
  },
});
