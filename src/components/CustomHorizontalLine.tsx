import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/common/styles';
import {SH} from '../../Scale';

const CustomHorizontalLine = (props: any) => {
  const {marginVertical = SH(20)} = props;
  return <View style={[styles.lineStyle, {marginVertical}]} />;
};

export default CustomHorizontalLine;

const styles = StyleSheet.create({
  lineStyle: {
    borderColor: colors.INPUT_BORDER,
    borderTopWidth: 1,
    marginVertical: SH(20),
  },
});
