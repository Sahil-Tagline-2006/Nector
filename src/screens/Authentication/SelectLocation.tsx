import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeaderSection from '../../components/CustomHeaderSection';
import {colors, fontStyles, images} from '../../utils/common/styles';
import {FS, SH, SW} from '../../../Scale';
import CustomLocationDropdown from '../../components/Inputs/CustomLocationDropdown';
import CustomButton from '../../components/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const SelectLocation = () => {
  const navigation=useNavigation();

  const gotoLogin=()=>{
    navigation.navigate("Login");
  }
  return (
    <ImageBackground
      style={styles.container}
      source={images.LOGIN_BACK}
      resizeMode="stretch">
      <SafeAreaView style={styles.safeareaContainer}>
        <CustomHeaderSection />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAwareStyle}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>

            <Image source={images.LOCATION} style={styles.locationImageStyle} resizeMode='stretch'/>

            <Text style={styles.headertextStyle}>Select Your Location</Text>
            <Text style={styles.labeltextStyle}>
              Swithch on your location to stay in tune with{'\n'}
              what’s happening in your area
            </Text>

            <View style={styles.mainSelectionView}>
              <CustomLocationDropdown
                label="Your Zone"
                placeholder="Your Zone..."
              />
              <CustomLocationDropdown
                label="Your Area"
                placeholder="Types of your area"
              />
              <CustomButton
                text="Submit"
                height={SH(70)}
                actions={gotoLogin}
                backgroundColor={colors.THMEM_COLOR}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SCREEN_COLOR,
  },
  safeareaContainer: {
    flex: 1,
  },
  keyboardAwareStyle: {
    flex: 1,
    paddingHorizontal: SW(20),
  },
  locationImageStyle: {
    alignSelf: 'center',
    height: SH(170),
    width: SW(220),
    marginTop: SH(30),
  },
  headertextStyle: {
    fontFamily: fontStyles.GIL_SEMIBOLD,
    fontWeight: 'bold',
    fontSize: FS(26),
    marginTop: SH(25),
    alignSelf: 'center',
  },
  labeltextStyle: {
    fontFamily: fontStyles.GIL_MEDIUM,
    fontWeight: '400',
    fontSize: FS(16),
    marginTop: SH(10),
    alignSelf: 'center',
    textAlign: 'center',
    color: colors.LIGHT_TEXT_2,
  },
  mainSelectionView: {
    gap: SH(30),
    marginTop: SH(70),
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
