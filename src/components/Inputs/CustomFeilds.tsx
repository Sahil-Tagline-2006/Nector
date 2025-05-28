import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fontStyles} from '../../utils/common/styles';
import {FS, SH} from '../../../Scale';
import {TextInput} from 'react-native-gesture-handler';
import Icons from "react-native-vector-icons/Entypo"

const CustomFeilds = (props: any) => {

  // Just for your improvement, not necessary. Use cleaner structure.
  // here when declaring function, this destructure looks very bac
  // use blow instead.
  const {
    label,
    placeholder,
    isPassword = false,
    passwordSecure = false,
    isEmail = false,
    eyeaction,
    PasswordIcon,
    EmailIcon,
    value,
    textChangeAction,
    keyboardType = 'default',
    onBlur,
  } = props;

  return (
    <View>
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.countryMainContainer}>
        <TextInput
          onBlur={onBlur}
          keyboardType={keyboardType}
          value={value}
          onChangeText={textChangeAction}
          style={styles.inputTextStyle}
          placeholder={placeholder}
          placeholderTextColor={colors.PLACEHOLDERCOLOR}
          secureTextEntry={passwordSecure}
        />

        {isPassword && (
          <TouchableOpacity onPress={eyeaction}>
            <Icons name={PasswordIcon} size={FS(20)} />
          </TouchableOpacity>
        )}
        {isEmail && (
          <Icons name={EmailIcon} size={FS(20)} color={colors.THMEM_COLOR} />
        )}
      </View>
    </View>
  );
};

export default CustomFeilds;

const styles = StyleSheet.create({
  labelText: {
    fontWeight: 'bold',
    fontFamily: fontStyles.GIL_SEMIBOLD,
    color: colors.LIGHT_TEXT_2,
    fontSize: SH(16),
  },
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
});
