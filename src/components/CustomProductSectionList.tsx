import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/Entypo';
import {FS, SH, SW} from '../../Scale';
import {colors, fontStyles} from '../utils/common/styles';
import useZustandStore from '../zustand/useZustandStore';
import {useNavigation} from '@react-navigation/native';
import CustomEmpty from './CustomEmpty';

const CustomProductSectionList = (props: any) => {
  const {
    SectionLabel,
    ProductList,
    renderComponent,
    isSectionLabelDisplay = true,
    numColumns = 0,
    isHorizontal = true,
  } = props;

  return (
    <View style={{marginTop: isSectionLabelDisplay ? 0 : 20}}>
      {isSectionLabelDisplay && (
        <View style={styles.sectionTextContainer}>
          <Text style={styles.sectionMainText}>{SectionLabel}</Text>
          <Text style={styles.sectionSeeAllText}>See all</Text>
        </View>
      )}
      {ProductList.length === 0 ? (
        <CustomEmpty />
      ) : (
        <FlatList
          data={ProductList}
          numColumns={numColumns}
          horizontal={isHorizontal}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.centerContentStyle}
          renderItem={renderComponent}
        />
      )}
    </View>
  );
};

const CustomProductListContainer = (props: any) => {
  const {item, productTouchAction, plusIconAction} = props;
  
  return (
    <TouchableOpacity
      style={styles.productBackContainer}
      onPress={productTouchAction}>
      <View style={styles.productVisibleContainer}>
        <Image
          source={item.image}
          style={styles.productImageStyle}
          resizeMode="contain"
        />

        <View style={styles.productDetailsContainer}>
          <View>
            <Text style={styles.productDetailName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.productpsc}>{item.pcs}</Text>
          </View>
          <View style={styles.productDetailsBottomActionContainer}>
            <Text style={styles.productDetailsBottomPrices}>${item.price}</Text>
            <TouchableOpacity
              style={styles.productDetailsBottomActionStyle}
              onPress={plusIconAction}>
              <IconAntDesign name="plus" size={20} color={colors.WHITE} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CustomGroceriesListContainer = ({item}: any) => {
  return (
    <TouchableOpacity
      style={[styles.groceriesContainer, {backgroundColor: item.color}]}>
      <Image source={item.image} style={styles.groceriesImageStyle} />
      <Text style={styles.groceriesText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export {
  CustomProductListContainer,
  CustomProductSectionList,
  CustomGroceriesListContainer,
};

const styles = StyleSheet.create({
  centerContentStyle: {
    marginHorizontal: SW(15),
  },
  sectionTextContainer: {
    marginTop: SH(25),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SW(20),
    alignItems: 'center',
    marginBottom: SH(10),
  },
  sectionMainText: {
    fontWeight: '600',
    fontSize: FS(24),
    fontFamily: fontStyles.GIL_SEMIBOLD,
  },
  sectionSeeAllText: {
    fontSize: FS(16),
    fontFamily: fontStyles.GIL_SEMIBOLD,
    fontWeight: '600',
    color: colors.THMEM_COLOR,
  },

  productBackContainer: {
    height: FS(250),
    width: SW(180),
    padding: 10,
  },
  productVisibleContainer: {
    height: '100%',
    borderRadius: FS(20),
    borderWidth: 1,
    borderColor: colors.BORDER,
    padding: FS(15),
  },
  productImageStyle: {
    height: '50%',
    width: '80%',
    padding: FS(20),
    alignSelf:"center"
  },
  productDetailsContainer: {
    height: '50%',
    justifyContent: 'space-between',
  },
  productDetailName: {
    fontFamily: fontStyles.GIL_BOLD,
    fontWeight: '600',
    lineHeight: 25,
    fontSize: FS(16),
  },
  productpsc: {
    fontFamily: fontStyles.GIL_MEDIUM,
    fontWeight: '400',
    color: colors.LIGHT_TEXT_2,
    fontSize: FS(14),
  },
  productDetailsBottomActionContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  productDetailsBottomPrices: {
    fontFamily: fontStyles.GIL_SEMIBOLD,
    fontWeight: '600',
    lineHeight: 25,
    fontSize: FS(16),
    alignItems: 'center',
  },
  productDetailsBottomActionStyle: {
    backgroundColor: colors.THMEM_COLOR,
    padding: SH(10),
    borderRadius: '30%',
  },
  groceriesContainer: {
    width: SW(250),
    height: FS(100),
    marginHorizontal: SW(10),
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 10,
    marginTop: 10,
  },
  groceriesImageStyle: {
    height: SH(71),
    width: SW(71),
  },
  groceriesText: {
    fontSize: FS(20),
    fontFamily: fontStyles.GIL_SEMIBOLD,
  },
});
