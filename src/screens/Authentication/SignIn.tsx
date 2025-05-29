import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, fontStyles, images} from '../../utils/common/styles';
import {FS, SH} from '../../../Scale';
import CustomButton from '../../components/CustomButton';
import CustomLoginInput from '../../components/Inputs/CustomLoginInput';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  Firebase_Facebook_Auth,
  Firebase_Google_Auth,
} from '../../firebase/Firebase';
import useZustandStore from '../../zustand/useZustandStore';
import ShowToast from '../../utils/DisplayToast';
import {ALERT_TYPE} from 'react-native-alert-notification';
import {DRIVE, IOS_CLIENT_ID, WEB_CLIENT_ID} from "@env";
import {
  AccessToken,  
  LoginManager, 
  AuthenticationToken,
} from 'react-native-fbsdk-next';
import {sha256} from 'react-native-sha256';

GoogleSignin.configure({
  webClientId:WEB_CLIENT_ID,
  iosClientId:IOS_CLIENT_ID,
  scopes: [DRIVE],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  profileImageSize: 120,
});
const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
}; 


const SignIn = () => {
  const navigation = useNavigation();
  const {setUserLogin} = useZustandStore(); 

  const GotoPhoneLoginPage = () => {
    navigation.navigate('PhoneNumber');
  };
  const GotoLoginPage = () => {
    navigation.navigate('Login');
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await GoogleLogin();
      if (response.type === 'success') {
        const isauthscuccess = await Firebase_Google_Auth(
          response.data.idToken?.toString(),
        );
        setUserLogin({
          email: isauthscuccess.user.email,
          password: '',
          uid: isauthscuccess.user.uid,
          username: isauthscuccess.user.displayName,
        });
        ShowToast(ALERT_TYPE.SUCCESS, 'Success', 'Congrats! Login Succesful!!');
        setTimeout(() => {
          navigation.navigate('Home');
        }, 1000);
      }
    } catch (apiError) {
      console.log('error=' + apiError);
    } finally {
    }
  };

  const handleFacebookLogin = async () => {
    try {
      if (Platform.OS === 'android') {
        const result = await LoginManager.logInWithPermissions([
          'public_profile',
          'email',
        ]);
        if (result.isCancelled) {
          return;
        }

        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          return;
        }

        const isauthscuccess = await Firebase_Facebook_Auth(
          data.accessToken?.toString(),
        );
        setUserLogin({
          email: isauthscuccess.user.email,
          password: '',
          uid: isauthscuccess.user.uid,
          username: isauthscuccess.user.displayName,
        });
        ShowToast(ALERT_TYPE.SUCCESS, 'Success', 'Congrats! Login Succesful!!');
        setTimeout(() => {
          navigation.navigate('Home');
        }, 1000);
      } else {
        const nonce = '123456';
        const nonceSha256 = await sha256(nonce);
        const result = await LoginManager.logInWithPermissions(
          ['public_profile', 'email'],
          'limited',
          nonceSha256,
        );

        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }

        // Once signed in, get the users AuthenticationToken
        const data = await AuthenticationToken.getAuthenticationTokenIOS();

        if (!data) {
          throw 'Something went wrong obtaining authentication token';
        }
        const isauthscuccess = await Firebase_Facebook_Auth(
          data.authenticationToken?.toString(),
          nonce
        );
        setUserLogin({
          email: isauthscuccess.user.email,
          password: '',
          uid: isauthscuccess.user.uid,
          username: isauthscuccess.user.displayName,
        });
        ShowToast(ALERT_TYPE.SUCCESS, 'Success', 'Congrats! Login Succesful!!');
        setTimeout(() => {
          navigation.navigate('Home');
        }, 1000);
      }
    } catch (error) {
      Alert.alert('Facebook Login Error', error.message);
    }
  };
  return (
    <ImageBackground
      style={styles.container}
      source={images.LOGIN_BACK}
      resizeMode="stretch">
      <Image
        source={images.LOGIN_HEADER}
        style={styles.backimage}
        resizeMode="stretch"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.headingText}>
          Get your groceries{'\n'}with nectar
        </Text>

        <TouchableOpacity activeOpacity={0} onPress={GotoPhoneLoginPage}>
          <CustomLoginInput isView={true} />
        </TouchableOpacity>

        <View style={styles.socialLoginContainer}>
          <Text style={styles.dummyText}>Or connect with social media</Text>

          <View style={styles.socialButtonsContainer}>
            <CustomButton
              actions={GotoLoginPage}
              height={SH(60)}
              width={'100%'}
              haveIcon={true}
              url={images.GOOGLE}
              backgroundColor={'tomato'}
              text="Continue with Email"
            />
            <CustomButton
              actions={handleGoogleLogin}
              haveIcon={true}
              url={images.GOOGLE}
              backgroundColor={colors.GOOGLE}
              height={SH(60)}
              width={'100%'}
              text="Continue with Google"
            />
            <CustomButton
              actions={handleFacebookLogin}
              haveIcon={true}
              url={images.FACEBOOK}
              height={SH(60)}
              backgroundColor={colors.FACEBOOK}
              width={'100%'}
              text="Continue with Facebook"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SCREEN_COLOR,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
  headingText: {
    fontSize: FS(26),
    color: '#030303',
    lineHeight: 35,
    fontFamily: fontStyles.GIL_SEMIBOLD,
  },
  backimage: {
    height: '40%',
    width: '100%',
  },

  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagStyle: {
    marginTop: -2,
  },
  countryCodeText: {
    fontWeight: '400',
    fontFamily: fontStyles.GIL_MEDIUM,
    fontSize: FS(16),
  },

  dummyText: {
    color: colors.LIGHT_TEXT,
    fontSize: FS(14),
    fontWeight: 'bold',
    fontFamily: fontStyles.GIL_MEDIUM,
    textAlign: 'center',
  },
  socialLoginContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  socialButtonsContainer: {
    gap: SH(15),
  },
});
