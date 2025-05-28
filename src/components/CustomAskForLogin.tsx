import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FS} from '../../Scale';
import {colors, fontStyles} from '../utils/common/styles';

const CustomAskForLogin = (props: any) => {
  
  const {simpleLabel, askLabel, actions} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.asksimplelogintext}>{simpleLabel}</Text>
      <TouchableOpacity onPress={actions}>
        <Text style={styles.asklogintext}>{askLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomAskForLogin;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  asksimplelogintext: {
    fontSize: FS(17),
    fontFamily: fontStyles.GIL_MEDIUM,
  },
  asklogintext: {
    fontSize: FS(17),
    fontFamily: fontStyles.GIL_MEDIUM,
    color: colors.THMEM_COLOR,
  },
});
