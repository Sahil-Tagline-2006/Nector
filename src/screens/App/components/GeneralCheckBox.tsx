import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fontStyles} from '../../../utils/common/styles';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {FS, SH} from '../../../../Scale';

const GeneralCheckBox = ({isCheck, filtername, action, initialData}: any) => {
  
  const IsCheckToogle = () => {
    const newFilterData = initialData.map((item:any) => {
      if (item.name === filtername)
        return {name: filtername, isCheck: !isCheck};
      else return item;
    });
    action(newFilterData);
  };

  return (
    <TouchableOpacity onPress={IsCheckToogle} style={styles.clickContainer}>
      <View
        style={[
          styles.checkContainer,
          {
            borderColor: isCheck ? 'transparent' : colors.PLACEHOLDERCOLOR,
            backgroundColor: isCheck ? colors.THMEM_COLOR : 'transparent',
          },
        ]}>
        <IconEntypo
          name="check"
          size={FS(20)}
          color={isCheck ? colors.WHITE : colors.SEARCH_COLOR}
        />
      </View>
      <Text
        style={[
          styles.filternameStyle,
          {color: isCheck ? colors.THMEM_COLOR : colors.BLACK},
        ]}>
        {filtername}
      </Text>
    </TouchableOpacity>
  );
};

export default GeneralCheckBox;

const styles = StyleSheet.create({
  clickContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: SH(10),
  },
  checkContainer: {
    width: FS(25),
    height: FS(25),
    borderWidth: 2,
    borderRadius: 8,
  },
  filternameStyle: {
    fontFamily: fontStyles.GIL_MEDIUM,
    fontSize: FS(16),
  },
});
