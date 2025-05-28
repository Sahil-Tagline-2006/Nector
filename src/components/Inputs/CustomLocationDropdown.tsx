import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {colors, fontStyles, images} from '../../utils/common/styles';
import {SH} from '../../../Scale';

const CustomLocationDropdown = (props:any) => {
  const {label, placeholder}=props;
  return (
    <View>
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.countryMainContainer}>
        <TextInput
          style={styles.inputTextStyle}
          placeholder={placeholder}          
          placeholderTextColor={colors.PLACEHOLDERCOLOR}
        />

        <Image source={images.DORP_DOWN} />
      </View>
    </View>
  );
};

export default CustomLocationDropdown;

const styles = StyleSheet.create({
  countryMainContainer: {
    borderBottomWidth: 1,
    borderColor: colors.INPUT_BORDER,
    height: SH(50),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputTextStyle: {
    flex: 1,
    height: '100%',
    fontSize: SH(18),
    fontFamily: fontStyles.GIL_MEDIUM,
    fontWeight: '400',
  },
  labelText: {
    fontWeight: 'bold',
    fontFamily: fontStyles.GIL_SEMIBOLD,
    color: colors.LIGHT_TEXT_2,
    fontSize: SH(16),
  },
});
