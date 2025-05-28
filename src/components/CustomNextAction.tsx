import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fontStyles, images} from '../utils/common/styles';
import CustomButton from './CustomButton';
import {FS, SH} from '../../Scale';

type Proptypes = {
  showResend: boolean;
  nextAction: () => void;
};

const CustomNextAction = (props: Proptypes) => {
  const {showResend, nextAction} = props;
  
  return (
    <View style={styles.actionMainView}>
      <View style={styles.rowView}>
        <TouchableOpacity>
          {showResend && (
            <Text style={styles.resendTextStyles}>Resend Code</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={nextAction}>
          <Image source={images.NEXT_ACTION} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomNextAction;

const styles = StyleSheet.create({
  actionMainView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resendTextStyles: {
    color: colors.THMEM_COLOR,
    fontWeight: '400',
    fontSize: FS(18),
    fontFamily: fontStyles.GIL_MEDIUM,
  },
});
