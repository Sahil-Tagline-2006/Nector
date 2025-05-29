import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fontStyles, icons, images} from '../../utils/common/styles';
import {FS, SH, SW} from '../../../Scale';
import CustomFeilds from '../../components/Inputs/CustomFeilds';
import CustomButton from '../../components/CustomButton';
import CustomAskForLogin from '../../components/CustomAskForLogin';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {LoginValidationSchema} from '../../utils/ValidationSchema';
import {
  Get_User_From_FireStore,
  SignIn_User_Email_Password,
} from '../../firebase/Firebase';
import {ALERT_TYPE} from 'react-native-alert-notification';
import ShowToast from '../../utils/DisplayToast';
import useZustandStore from '../../zustand/useZustandStore';

const Login = () => {
  const navigation = useNavigation();
  const {setUserLogin, user} = useZustandStore();

  const [passwordSecure, setPasswordSecure] = useState({
    secure: true,
    iscloseeye: true,
  });

  const PasswordToggle = () => {
    setPasswordSecure({
      ...passwordSecure,
      secure: !passwordSecure.secure,
      iscloseeye: !passwordSecure.iscloseeye,
    });
  };

  const onChangeFeilds = (
    value: any,
    setFieldTouched: any,
    setFieldValue: any,
    changeFor: string,
  ) => {
    value = changeFor === 'email' ? value.toLowerCase() : value;
    setFieldTouched(changeFor, true);
    setFieldValue(changeFor, value);
  };

  const gotoSignUpPage = () => {
    navigation.navigate('SignUp');
  };

  const SignInUser = async (values: any, {resetForm}: any) => {
    try {
      const userCredential = await SignIn_User_Email_Password(
        values.email,
        values.password,
      );
      if (userCredential || userCredential.user.uid) {
        const userData = await Get_User_From_FireStore(userCredential.user.uid);
        setUserLogin({
          ...values,
          uid: userCredential.user.uid,
          username: userData._data.username,
          birthDate: user.details.birthDate,
          photo: user.details.photo,
        });
        ShowToast(ALERT_TYPE.SUCCESS, 'Success', 'Congrats! Login Succesful!!');
        resetForm();

        setTimeout(() => {
          navigation.navigate('Home');
        }, 1000);
      }
    } catch (error) {
      ShowToast(ALERT_TYPE.DANGER, 'Validation', 'Invalid Login credentials');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
    validateOnChange: true,
    onSubmit(values, formikHelpers) {
      SignInUser(values, formikHelpers);
    },
  });
  return (
    <ImageBackground
      style={styles.container}
      source={images.LOGIN_BACK}
      resizeMode="stretch">
      <SafeAreaView style={styles.safeareaContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAwareStyle}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <Image source={images.COLOR_CARROT} style={styles.topImage} />

            <Text style={styles.headertextStyle}>Login</Text>
            <Text style={styles.labeltextStyle}>
              Enter your emails and password
            </Text>

            <View style={styles.mainSelectionView}>
              <CustomFeilds
                keyboardType="email-address"
                label="Email"
                value={formik.values.email}
                textChangeAction={e =>
                  onChangeFeilds(
                    e,
                    formik.setFieldTouched,
                    formik.setFieldValue,
                    'email',
                  )
                }
                onBlur={formik.handleBlur('email')}
                placeholder="Enter Your Email.."
                isEmail={formik.values.email !== '' && !formik.errors.email}
                EmailIcon={icons.EMAIL_OK}
              />
              {formik.errors.email && formik.touched.email && (
                <Text style={styles.errorText}>{formik.errors.email}</Text>
              )}

              <CustomFeilds
                label="Password"
                value={formik.values.password}
                textChangeAction={e =>
                  onChangeFeilds(
                    e,
                    formik.setFieldTouched,
                    formik.setFieldValue,
                    'password',
                  )
                }
                onBlur={formik.handleBlur('password')}
                placeholder="Enter Your Password.."
                passwordSecure={passwordSecure.secure}
                eyeaction={PasswordToggle}
                isPassword={true}
                PasswordIcon={
                  passwordSecure.iscloseeye ? icons.EYE_CLOSE : icons.EYE
                }
              />
              {formik.errors.password && formik.touched.password && (
                <Text style={styles.errorText}>{formik.errors.password}</Text>
              )}

              <Text style={styles.forgotPasswordstyle}>Forgot Password?</Text>

              <CustomButton
                text="Log In"
                height={SH(60)}
                actions={formik.handleSubmit}
              />

              <CustomAskForLogin
                simpleLabel="Don’t have an account?"
                askLabel=" Singup"
                actions={gotoSignUpPage}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SCREEN_COLOR,
  },
  safeareaContainer: {
    flex: 1,
    paddingHorizontal: SW(20),
  },
  keyboardAwareStyle: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topImage: {
    alignSelf: 'center',
    marginTop: SH(25),
    marginBottom: SH(50),
  },
  headertextStyle: {
    fontFamily: fontStyles.GIL_SEMIBOLD,
    fontWeight: 'bold',
    fontSize: FS(26),
    marginTop: SH(25),
  },
  labeltextStyle: {
    fontFamily: fontStyles.GIL_MEDIUM,
    fontWeight: '400',
    fontSize: FS(16),
    marginTop: SH(10),
    color: colors.LIGHT_TEXT_2,
  },
  mainSelectionView: {
    gap: SH(30),
    marginVertical: SH(30),
  },
  forgotPasswordstyle: {
    fontSize: FS(16),
    fontWeight: '400',
    textAlign: 'right',
    fontFamily: fontStyles.GIL_MEDIUM,
  },
  errorText: {
    color: 'red',
    marginTop: -18,
    alignSelf: 'flex-end',
  },
});
