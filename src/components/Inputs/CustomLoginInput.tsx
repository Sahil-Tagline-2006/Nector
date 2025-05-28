import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SH} from '../../../Scale';
import CountryPicker from 'rn-country-picker';
import {TextInput} from 'react-native-gesture-handler';
import {colors, images} from '../../utils/common/styles';

const CustomLoginInput = (props: any) => {
  const {isView, textChangeAction, textValue} = props;
  
  return (
    <View style={styles.countryMainContainer}>
      <CountryPicker
        disable={isView}
        animationType={'slide'}
        language="en"
        containerStyle={styles.pickerStyle}
        pickerTitleStyle={styles.pickerTitleStyle}
        selectedCountryTextStyle={styles.selectedCountryTextStyle}
        countryNameTextStyle={styles.countryNameTextStyle}
        pickerTitle={'Country Picker'}
        searchBarPlaceHolder={'Search......'}
        backButtonImage={images.BACK}
        searchButtonImage={images.SEARCH}
        hideCountryFlag={false}
        hideCountryCode={false}
        searchBarStyle={styles.searchBarStyle}
        countryCode={'91'}
      />

      {!isView && (
        <TextInput
          contextMenuHidden={true}
          value={textValue}
          maxLength={10}
          style={styles.phoneInput}
          keyboardType="numeric"
          autoFocus={true}
          onChangeText={textChangeAction}
        />
      )}
    </View>
  );
};

export default CustomLoginInput;

const styles = StyleSheet.create({
  countryMainContainer: {
    borderBottomWidth: 1,
    borderColor: colors.INPUT_BORDER,
    height: SH(60),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerTitleStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  pickerStyle: {
    height: 40,
    width: 60,
    marginVertical: 0,
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'transparant',
    borderRadius: 5,
    fontSize: 16,
    color: 'red',
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    color: '#000',
    textAlign: 'right',
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: 'right',
  },
  searchBarStyle: {
    flex: 1,
  },
  phoneInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    marginLeft: -10,
  },
});
