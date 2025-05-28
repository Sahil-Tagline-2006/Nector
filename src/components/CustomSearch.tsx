import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, fontStyles} from '../utils/common/styles';
import {FS, SH, SW} from '../../Scale';
import Icons from 'react-native-vector-icons/FontAwesome';
import IconsAnt from 'react-native-vector-icons/AntDesign';

const CustomSearch = (props: any) => {
  const {closeVisible = false, topSpace = 0, searchAction = e => {}} = props;
  
  return (
    <View style={[styles.searchContainer, {marginTop: topSpace}]}>
      <TouchableOpacity style={styles.searchIconStyle}>
        <Icons name="search" size={FS(18)} />
      </TouchableOpacity>

      <TextInput
        style={styles.inputStyle}
        onChangeText={searchAction}
        placeholderTextColor={colors.LIGHT_TEXT_2}
        placeholder="Search Store"
      />
      {closeVisible && (
        <TouchableOpacity style={styles.clearSearchIcon}>
          <IconsAnt name="close" color={colors.WHITE} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomSearch;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: colors.SEARCH_COLOR,
    flexDirection: 'row',
    height: FS(50),
    borderRadius: 15,
    justifyContent: 'space-around',
    paddingHorizontal: SW(15),
    alignItems: 'center',
    gap: 15,
  },
  inputStyle: {
    flex: 1,
    fontFamily: fontStyles.GIL_SEMIBOLD,
    fontWeight: '600',
    fontSize: FS(15),
  },
  clearSearchIcon: {
    backgroundColor: colors.CLEAR_SEARCH,
    padding: FS(2),
    borderRadius: 50,
  },
  searchIconStyle: {
    marginTop: SH(-5),
  },
});
