import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {FS, SH, SW} from '../../Scale';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fontStyles} from '../utils/common/styles';

const CustomHeaderSection = (props: any) => {
  const {
    middleText,
    lastIcon,
    lastIconAction,
    firstIconShow = true,
    firstIcon = 'arrow-back-ios',
    firstIconAction,
    firstalignItems = 'center',
    lastalignItems = 'center',
  } = props;
  const navigation = useNavigation();

  const gotoBack = () => {
    navigation.goBack();
  };

  const handleFirstIconPress = firstIconAction || gotoBack;
  return (
    <View style={styles.container}>
      {/* first icons */}
      <TouchableOpacity
        disabled={firstIconShow ? false : true}
        style={[styles.headerfirstIconsStyles, {alignItems: firstalignItems}]}
        onPress={handleFirstIconPress}>
        {firstIconShow && <Icon name={firstIcon} size={FS(25)} />}
      </TouchableOpacity>

      {/* Header Text */}
      <Text style={styles.middleText}>{middleText}</Text>

      {/* last icons */}
      <TouchableOpacity
        onPress={lastIconAction}
        style={[styles.headerLastIconsStyles, {alignItems: lastalignItems}]}
        disabled={lastIcon ? false : true}>
        <Image
          source={lastIcon}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeaderSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: SH(45),
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  headerfirstIconsStyles: {
    height: SH(45),
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLastIconsStyles: {
    height: SH(45),
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: SH(28),
    width: SW(28),
  },
  middleText: {
    fontSize: FS(20),
    fontFamily: fontStyles.GIL_BOLD,
  },
});
