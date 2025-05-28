import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import {colors, fontStyles, images} from '../../utils/common/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeaderSection from '../../components/CustomHeaderSection';
import {FS, SH, SW} from '../../../Scale';
import CustomLoginInput from '../../components/Inputs/CustomLoginInput';
import CustomNextAction from '../../components/CustomNextAction';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {PhoneValidationSchema} from '../../utils/ValidationSchema';

const PhoneNumber = () => {
  const navigation = useNavigation();

  const gotoOtpVerification = (values: any) => {
    if (values.phone.length === 10) {
      navigation.navigate('OtpVerification');
    }
  };

  const formik = useFormik({
    initialValues: { phone: '' },
    validationSchema: PhoneValidationSchema,
    validateOnChange: true,
    onSubmit: gotoOtpVerification,
  });

  const ValidatePhoneNumber = (text: string) => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    formik.setFieldValue('phone', cleanedText);
  };

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

          <Text style={styles.headtextStyle}>Enter your mobile number</Text>
          <Text style={styles.labelTextStyle}>Mobile Number</Text>

          <CustomLoginInput
            isView={false}
            textChangeAction={ValidatePhoneNumber}
            textValue={formik.values.phone}
          />
          {formik.errors.phone && (
            <Text style={styles.errorText}>{formik.errors.phone}</Text>
          )}
          <CustomNextAction
            showResend={false}
            nextAction={formik.handleSubmit}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PhoneNumber;

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
  errorText: {
    color: 'red',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});
