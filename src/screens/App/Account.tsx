import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fontStyles, images} from '../../utils/common/styles';
import {FS, SH, SW} from '../../../Scale';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import useZustandStore from '../../zustand/useZustandStore';
import CustomHorizontalLine from '../../components/CustomHorizontalLine';
import CustomButton from '../../components/CustomButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Get_User_Orders} from '../../firebase/Firebase';
import {launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';

const Account = () => {
  const navigation = useNavigation();
  const {user, Orders, setUserOrders, setUserLoginOut, setUserLogin} =
    useZustandStore();
  const [profilePhoto, setProfilePhoto] = useState(user.details.photo);
  const [openDateSelect, setOpenDateSelect] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setInitialData();
    }, []),
  );

  const setInitialData = async () => {
    const data = await Get_User_Orders(user.details.uid);
    setUserOrders(data);
  };

  const Logout = () => {
    Alert.alert('Confirmation', 'Are you sure to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          setUserLoginOut();
        },
        style: 'destructive',
      },
    ]);
  };

  const GotoOrderPage = () => {
    navigation.navigate('AccountOrder');
  };
  const DummyAccontTabs = ({source, label, action}: any) => {
    return (
      <TouchableOpacity style={styles.mainDummyTab} onPress={action}>
        <View style={styles.mainDummyContent}>
          <Image
            source={source}
            style={styles.DummyImage}
            resizeMode="contain"
          />
          <Text style={styles.DummyText}>{label}</Text>

          <IconEntypo name="chevron-right" size={FS(20)} />
        </View>
      </TouchableOpacity>
    );
  };

  const TakeProfilePhoto = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (result.assets) {
        const newUserDetails = {
          ...user.details,
          photo: result?.assets[0]?.uri,
        };
        setUserLogin(newUserDetails);
        // setProfilePhoto(result?.assets[0]?.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const SelectBirthDate = () => {
    setOpenDateSelect(true);
  };
  console.log(user);
  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView style={styles.safearea} showsVerticalScrollIndicator={false}>
        {/* user Detail View */}
        <View style={styles.mainDetailView}>
          <TouchableOpacity onPress={TakeProfilePhoto}>
            <Image
              source={{uri: user.details.photo}}
              style={styles.imageStyle}
              resizeMode="center"
            />
          </TouchableOpacity>
          <View style={{gap: 5}}>
            <View style={styles.mainEditSection}>
              <Text style={styles.usernameStyle}>{user.details.username}</Text>
              <IconEvilIcons
                name="pencil"
                size={FS(35)}
                color={colors.THMEM_COLOR}
                style={styles.editIcon}
              />
            </View>
            <Text style={styles.emailTextstyle}>{user.details.email}</Text>
            {user.details.birthDate === '' ? (
              <TouchableOpacity
                onPress={SelectBirthDate}
                style={styles.selectDateButton}>
                <Text style={styles.selectDateText}>Select BirthDate</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.selectDateText}>{user.details.birthDate}</Text>
            )}
          </View>
        </View>

        <CustomHorizontalLine marginVertical={0} />
        <DummyAccontTabs
          source={images.ORDERS}
          label="Orders"
          action={GotoOrderPage}
        />

        <CustomHorizontalLine marginVertical={0} />

        <DummyAccontTabs source={images.MY_DETAIL} label="My Details" />
        <CustomHorizontalLine marginVertical={0} />

        <DummyAccontTabs
          source={images.DELIVERY_ADDRESS}
          label="Delivery Address"
        />
        <CustomHorizontalLine marginVertical={0} />
        <DummyAccontTabs
          source={images.PAYMENT_METHODS}
          label="Payment Methods"
        />
        <CustomHorizontalLine marginVertical={0} />

        <DummyAccontTabs source={images.PROMO_CARD} label="Promo Cord" />
        <CustomHorizontalLine marginVertical={0} />

        <DummyAccontTabs source={images.NOTIFICATIONS} label="Notifications" />
        <CustomHorizontalLine marginVertical={0} />

        <DummyAccontTabs source={images.HELPS} label="Help" />
        <CustomHorizontalLine marginVertical={0} />

        <DummyAccontTabs source={images.ABOUT} label="About" />
        <CustomHorizontalLine marginVertical={0} />

        <View style={{paddingTop: SH(50), padding: FS(20)}}>
          <CustomButton
            text="Log Out"
            backgroundColor={colors.SEARCH_COLOR}
            color={colors.THMEM_COLOR}
            url={images.LOGOUT}
            haveIcon={true}
            actions={Logout}
          />
        </View>
      </ScrollView>

      <DatePicker
        modal
        mode="date"
        open={openDateSelect}
        date={new Date()}
        onConfirm={date => {
          setOpenDateSelect(false);
          const newUserDetails = {
            ...user.details,
            birthDate: `${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`,
          };
          setUserLogin(newUserDetails);
        }}
        onCancel={() => {
          setOpenDateSelect(false);
        }}
      />
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  imageStyle: {
    height: SH(80),
    width: SH(80),
    borderRadius: 50,
  },
  mainDetailView: {
    padding: FS(25),
    flexDirection: 'row',
    gap: SW(20),
    alignItems: 'center',
  },
  mainEditSection: {
    flexDirection: 'row',
    gap: SW(5),
    alignItems: 'center',
  },
  usernameStyle: {
    fontFamily: fontStyles.GIL_BOLD,
    fontSize: FS(20),
  },
  emailTextstyle: {
    fontFamily: fontStyles.GIL_REGULAR,
    fontSize: FS(16),
  },
  editIcon: {
    marginTop: SH(-10),
  },
  DummyIcon: {
    transform: [{rotate: '-90deg'}],
  },
  mainDummyTab: {
    padding: FS(20),
    gap: 10,
  },
  mainDummyContent: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  DummyImage: {
    height: SH(30),
    width: SH(30),
    marginTop: SH(-3),
  },
  DummyText: {
    fontFamily: fontStyles.GIL_SEMIBOLD,
    fontSize: FS(18),
    flex: 1,
  },

  selectDateButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '60%',
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
  },
  selectDateText: {
    color: colors.WHITE,
    fontFamily: fontStyles.GIL_BOLD,
  },
  DateText: {
    color: colors.LIGHT_TEXT_2,
    fontFamily: fontStyles.GIL_MEDIUM,
    fontSize: FS(16),
  },
});
