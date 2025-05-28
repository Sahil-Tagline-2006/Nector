import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {colors, fontStyles, images} from '../utils/common/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FS, SH, SW} from '../../Scale';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import {useEffect, useState} from 'react';
import useZustandStore from '../zustand/useZustandStore';

const Welcome = () => {
  const navigation = useNavigation();

  const GotoSignIn = () => {
    navigation.replace('SignIn');
  };

  return (
    <ImageBackground source={images.BACKGROUND_IMAGE} style={styles.backImage}>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.contentContainer}>
          <Image
            source={images.CONTENT_WELCOME_IMAGE}
            style={styles.contentContainerMainImage}
            resizeMode="contain"
          />

          <Text style={styles.welcomTextStyle}>
            Welcome {'\n'}to our store
          </Text>
          <Text style={styles.smallLabelTextStyle}>
            Ger your groceries in as fast as one hour
          </Text>

          <CustomButton
            actions={GotoSignIn}
            haveIcon={false}
            height={SH(70)}
            width={'90%'}
            backgroundColor={colors.THMEM_COLOR}
            text="Get Started"
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backImage: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  contentContainer: {
    gap: SH(30),
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SH(15),
  },
  contentContainerMainImage: {
    height: SH(58),
    width: SW(48),
    marginTop: 30,
  },
  welcomTextStyle: {
    color: colors.WHITE,
    fontSize: FS(48),
    textAlign: 'center',
    lineHeight:55,
    fontFamily: fontStyles.GIL_SEMIBOLD
  },
  smallLabelTextStyle: {
    color: '#FCFCFCB2',
    fontSize: FS(16),
    fontWeight: '400',
    marginTop:SH(-20),
    fontFamily: fontStyles.GIL_MEDIUM,
  },
});
