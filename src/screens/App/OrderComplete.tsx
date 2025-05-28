import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fontStyles, images} from '../../utils/common/styles';
import {FS, SW} from '../../../Scale';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const OrderComplete = () => {
  const navigation=useNavigation();

  const GoToHomePage=()=>{
    navigation.replace("Home")
  }
  return (
    <ImageBackground
      source={images.LOGIN_BACK}
      style={styles.backimageStyle}
      resizeMode="stretch">
      <View style={styles.orderContentViewMain}>
        <View style={styles.imagesContainer}>
          <Image source={images.ORDER_COMPLETE_GIF} style={styles.GIFImage} />
          <Image source={images.COMPLETE_CHECK} style={styles.SimpleImage} />
        </View>
        <Text style={styles.MainText}>Your Order has been{'\n'} accepted</Text>
        <Text style={styles.ChildText}>
          Your items has been placcd and is on{'\n'} it’s way to being processed
        </Text>
      </View>

      <View style={styles.ActionContainer}>
        <CustomButton text="Track Order" />
        <CustomButton
          actions={GoToHomePage}
          text="Back to home"
          backgroundColor="transparent"
          color={colors.BLACK}
        />
      </View>
    </ImageBackground>
  );
};

export default OrderComplete;

const styles = StyleSheet.create({
  backimageStyle: {
    flex: 1,
    backgroundColor: colors.SCREEN_COLOR,
  },
  orderContentViewMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  imagesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  GIFImage: {
    height: FS(200),
    width: FS(200),
  },
  SimpleImage: {
    height: FS(100),
    width: FS(100),
    position: 'absolute',
  },
  MainText: {
    fontFamily: fontStyles.GIL_SEMIBOLD,
    fontSize: FS(24),
    textAlign: 'center',
  },
  ChildText: {
    fontFamily: fontStyles.GIL_MEDIUM,
    fontSize: FS(16),
    textAlign: 'center',
    color: colors.LIGHT_TEXT_2,
  },
  ActionContainer: {
    paddingHorizontal: SW(20),
  },
});
