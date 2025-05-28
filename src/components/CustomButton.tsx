import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fontStyles} from '../utils/common/styles';
import {FS, SH, SW} from '../../Scale';

const CustomButton = (props: any) => {
  const {
    text,
    actions,
    height = SH(70),
    width,
    backgroundColor = colors.THMEM_COLOR,
    haveIcon,
    url,
    lastSectionDisplay = false,
    lastSectionText = 0,
    color = colors.WHITE,
    disabled = false,
  } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.buttonStyle,
        {
          height,
          width,
          backgroundColor: disabled ? colors.CLEAR_SEARCH : backgroundColor,
        },
      ]}
      onPress={actions}>
      <View style={styles.commomAligns}>
        {haveIcon && (
          <Image source={url} resizeMode="contain" style={styles.iconsStyle} />
        )}
      </View>
      <Text style={[styles.innerButtonTextStyle, {color}]}>{text}</Text>
      <View style={styles.commomAligns}>
        {lastSectionDisplay && (
          <View style={styles.LastTextContainer}>
            <Text style={styles.LastText}>${lastSectionText}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SW(20),
    marginVertical: SH(7),
  },
  innerButtonTextStyle: {
    fontWeight: '600',
    fontSize: FS(18),
    color: colors.WHITE,
    fontFamily: fontStyles.GIL_SEMIBOLD,
  },
  commomAligns: {
    height: SH(40),
    width: SW(30),
    justifyContent: 'center',
  },
  iconsStyle: {
    height: SH(30),
    width: SW(30),
  },
  LastTextContainer: {
    height: SH(30),
    width: SW(55),
    marginLeft: SW(-24),
    backgroundColor: colors.BUTTON_LAST_TEXT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  LastText: {
    color: '#FCFCFC',
    fontSize: FS(14),
    fontFamily: fontStyles.GIL_BOLD,
  },
});
