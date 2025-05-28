import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {colors, fontStyles, images} from '../../utils/common/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeaderSection from '../../components/CustomHeaderSection';
import {FS, SH, SW} from '../../../Scale';
import CustomNextAction from '../../components/CustomNextAction';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Formik, useFormik} from 'formik';
import {OTPValidationSchema} from '../../utils/ValidationSchema';
const OtpVerification = () => {
  const navigation = useNavigation();
  const otpInputRef = useRef(null);

  const gotoSelectLocation = (values: any) => {
    if (values.otp.length === 4) {
      navigation.navigate('SelectLocation');
    }
  };
  const ValidateOTP = (setFieldValue: any, text: any) => {
    text = text.replace(/[^0-9]/g, '');
    setFieldValue('otp', text);
  };
  const formik = useFormik({
    initialValues: {otp: ''},
    validationSchema: OTPValidationSchema,
    validateOnChange: true,
    onSubmit: gotoSelectLocation,
  });
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
          <Text style={styles.headtextStyle}>Enter your 4-digit code</Text>

          <Text style={styles.labelTextStyle}>Code</Text>

          <TextInput
            contextMenuHidden={true}
            placeholder="- - - -"
            ref={otpInputRef}
            style={styles.otpInputFeild}
            keyboardType="numeric"
            autoFocus={true}
            maxLength={4}
            value={formik.values.otp}
            onChangeText={e => ValidateOTP(formik.setFieldValue, e)}
            placeholderTextColor={colors.BLACK}
          />
          {formik.errors.otp && (
            <Text style={styles.errorText}>{formik.errors.otp}</Text>
          )}

          <CustomNextAction
            showResend={true}
            nextAction={formik.handleSubmit}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SCREEN_COLOR,
  },
  safeareaContainer: {
    flex: 1,
  },
  headtextStyle: {
    fontFamily: fontStyles.GIL_SEMIBOLD,
    fontWeight: 'bold',
    fontSize: FS(26),
    marginTop: SH(40),
  },
  labelTextStyle: {
    fontFamily: fontStyles.GIL_SEMIBOLD,
    fontWeight: 'bold',
    fontSize: FS(16),
    marginTop: SH(30),
    color: colors.LIGHT_TEXT_2,
    marginBottom: SH(5),
  },
  keyboardAwareStyle: {
    flex: 1,
    paddingHorizontal: SW(20),
  },
  otpInputFeild: {
    borderBottomWidth: 1,
    borderColor: colors.INPUT_BORDER,
    height: SH(60),
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
