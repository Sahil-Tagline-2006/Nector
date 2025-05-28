import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {colors, fontStyles, icons, images} from '../../utils/common/styles';
import {FS, SH, SW} from '../../../Scale';
import CustomFeilds from '../../components/Inputs/CustomFeilds';
import CustomButton from '../../components/CustomButton';
import CustomAskForLogin from '../../components/CustomAskForLogin';
import {useNavigation} from '@react-navigation/native';
import {Formik, useFormik} from 'formik';
import {SignupValidationSchema} from '../../utils/ValidationSchema';
import {
  Create_User_Email_Password,
  Store_User_FireStore,
} from '../../firebase/Firebase';
import {ALERT_TYPE} from 'react-native-alert-notification';
import ShowToast from '../../utils/DisplayToast';
import useZustandStore from '../../zustand/useZustandStore';

const SignUp = () => {
  const navigation = useNavigation();
  const {setUserLogin} = useZustandStore();
  const [passwordSecure, setPasswordSecure] = useState({
    secure: true,
    iscloseeye: true,
  });

  const PasswordToggle = () => {
    setPasswordSecure(prev => ({
      ...prev,
      secure: !prev.secure,
      iscloseeye: !prev.iscloseeye,
    }));
  };

  const gotoLoginPage = () => navigation.goBack();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: SignupValidationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        const userCredential = await Create_User_Email_Password(
          values.email,
          values.password,
        );

        if (userCredential) {
          await Store_User_FireStore(values, userCredential.user.uid);
          setUserLogin({...values, uid: userCredential.user.uid});

          ShowToast(
            ALERT_TYPE.SUCCESS,
            'Success',
            'Congrats! SignUp Succesful!!',
          );
          resetForm();

          setTimeout(() => navigation.navigate('Home'), 1000);
        }
      } catch (error) {
        ShowToast(ALERT_TYPE.DANGER, 'Inform', 'User Already Exists');
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
  } = formik;

  const onChangeFeilds = (value: any, changeFor: string) => {
    const newValue = changeFor === 'email' ? value.toLowerCase() : value;
    setFieldTouched(changeFor, true);
    setFieldValue(changeFor, newValue);
  };

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
            <Text style={styles.headertextStyle}>Sign Up</Text>
            <Text style={styles.labeltextStyle}>
              Enter your credentials to continue
            </Text>

            <View style={styles.mainSelectionView}>
              <CustomFeilds
                label="Username"
                value={values.username}
                textChangeAction={e => onChangeFeilds(e, 'username')}
                placeholder="Enter Your Name..."
                onBlur={handleBlur('username')}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}> {errors.username}</Text>
              )}

              <CustomFeilds
                label="Email"
                value={values.email}
                textChangeAction={e => onChangeFeilds(e, 'email')}
                placeholder="Enter Your Email.."
                isEmail={values.email !== '' && !errors.email}
                EmailIcon={icons.EMAIL_OK}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <CustomFeilds
                label="Password"
                value={values.password}
                textChangeAction={e => onChangeFeilds(e, 'password')}
                placeholder="Enter Your Password.."
                passwordSecure={passwordSecure.secure}
                eyeaction={PasswordToggle}
                isPassword={true}
                PasswordIcon={
                  passwordSecure.iscloseeye ? icons.EYE_CLOSE : icons.EYE
                }
                onBlur={handleBlur('password')}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <View style={styles.privacyPolicyContainer}>
                <Text style={styles.asksimplelogintext}>
                  By continuing you agree to our
                </Text>
                <TouchableOpacity>
                  <Text style={styles.asklogintext}>Terms of Service</Text>
                </TouchableOpacity>
                <Text style={styles.asksimplelogintext}>and</Text>
                <TouchableOpacity>
                  <Text style={styles.asklogintext}>Privacy Policy.</Text>
                </TouchableOpacity>
              </View>

              <CustomButton
                text="Sign Up"
                height={SH(60)}
                actions={handleSubmit}
              />
              <CustomAskForLogin
                simpleLabel="Already have an account?"
                askLabel=" Login"
                actions={gotoLoginPage}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUp;

export default SignUp;

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

  privacyPolicyContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
  asksimplelogintext: {
    fontSize: FS(16),
    color: colors.LIGHT_TEXT_2,
    fontFamily: fontStyles.GIL_MEDIUM,
  },
  asklogintext: {
    fontFamily: fontStyles.GIL_MEDIUM,
    fontSize: FS(16),
    color: colors.THMEM_COLOR,
  },
  errorText: {
    color: 'red',
    marginTop: -18,
    alignSelf: 'flex-end',
  },
});
