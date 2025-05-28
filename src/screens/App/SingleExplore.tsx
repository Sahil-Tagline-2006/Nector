import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomHeaderSection from '../../components/CustomHeaderSection';
import {colors, fontStyles, images} from '../../utils/common/styles';
import {FS, SH, SW} from '../../../Scale';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import useZustandStore from '../../zustand/useZustandStore';
import {
  CustomProductListContainer,
  CustomProductSectionList,
} from '../../components/CustomProductSectionList';
import CustomSearch from '../../components/CustomSearch';
import RBSheet from 'react-native-raw-bottom-sheet';
import GeneralCheckBox from './components/GeneralCheckBox';
import CustomButton from '../../components/CustomButton';
import {
  Get_User_Cart,
  Get_User_Favorites,
  Store_User_Cart,
} from '../../firebase/Firebase';
import CustomEmpty from '../../components/CustomEmpty';

const {height}: any = Dimensions.get('window');

let toogleFlagForSheet = false;

const SingleExplore = () => {
  const rbRef = useRef(null);
  const inset = useSafeAreaInsets();
  const {name} = useRoute().params;
  const navigation = useNavigation();
  const {filterProducts, user, Cart, setUserFavourites, setUserCart} =
    useZustandStore();
  const {products, setSingleProduct} = useZustandStore();

  const [categorie, setCategorie] = useState([
    {
      name: 'Eggs',
      isCheck: false,
    },
    {
      name: 'Noodles & Pasta',
      isCheck: false,
    },
    {
      name: 'Chips & Crisps',
      isCheck: false,
    },
    {
      name: 'Fast Food',
      isCheck: false,
    },
  ]);
  
  const [brand, setBrand] = useState([
    {
      name: 'Individual Callection',
      isCheck: false,
    },
    {
      name: 'Cocola',
      isCheck: false,
    },
    {
      name: 'Ifad',
      isCheck: false,
    },
    {
      name: 'Kazi Farmas',
      isCheck: false,
    },
  ]);

  useFocusEffect(
    useCallback(() => {
      setInitialData();
    }, []),
  );

  const setInitialData = async () => {
    const data = await Get_User_Favorites(user.details.uid);
    console.log(data);
    setUserFavourites(data);
  };

  const CustomProductSectionListrenderComponent = ({item}: any) => {
    const GotoSingleProduct = () => {
      setSingleProduct(item.id);
      navigation.navigate('ShopSingleProduct');
    };
    const AddToCart = async () => {
      const exsistedProductInCart = Cart.find(ele => ele.id === item.id);
      const response = await Store_User_Cart(
        {
          ...item,
          quantity: exsistedProductInCart
            ? exsistedProductInCart.quantity + 1
            : 1,
        },
        user.details.uid,
      );
      const data = await Get_User_Cart(user.details.uid);
      setUserCart(data);
    };
    return (
      <CustomProductListContainer
        item={item}
        productTouchAction={GotoSingleProduct}
        plusIconAction={AddToCart}
      />
    );
  };

  const filterProduct = (hint: string) => {
    filterProducts(hint);
  };

  const ToggleFilter = () => {
    if (toogleFlagForSheet) {
      rbRef.current.close();
    } else {
      rbRef.current.open();
    }
    toogleFlagForSheet = !toogleFlagForSheet;
  };
  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <View
        style={[
          styles.mainHeaderContainer,
          {marginVertical: SH(10), paddingHorizontal: 10},
        ]}>
        <CustomHeaderSection
          middleText={name}
          lastIcon={images.FILTER}
          lastIconAction={ToggleFilter}
        />
      </View>
      <View style={styles.mainHeaderContainer}>
        <CustomSearch searchAction={filterProduct} />
      </View>

      <View style={styles.mainListView}>
        {products.length === 0 ? (
          <CustomEmpty />
        ) : (
          <CustomProductSectionList
            SectionLabel="Best Selling"
            ProductList={products}
            isSectionLabelDisplay={false}
            numColumns={2}
            isHorizontal={false}
            renderComponent={CustomProductSectionListrenderComponent}
          />
        )}
      </View>

      <RBSheet
        ref={rbRef}
        useNativeDriver={false}
        height={height}
        customStyles={{
          draggableIcon: {
            backgroundColor: '#000',
          },
          wrapper:{
            backgroundColor:"transparent"
          }
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View style={{marginTop: inset.top, flex: 1}}>
          <View style={styles.BottomSearchContainer}>
            <CustomHeaderSection
              middleText="Filters"
              firstIcon="close"
              firstIconAction={ToggleFilter}
            />
          </View>

          <View style={styles.BottomContentMainContainer}>
            <View>
              <View style={styles.BottomContentContainer}>
                <Text
                  style={{
                    fontFamily: fontStyles.GIL_SEMIBOLD,
                    fontSize: FS(24),
                  }}>
                  Categories
                </Text>
                <View>
                  {categorie.map((item, index) => (
                    <GeneralCheckBox
                      action={setCategorie}
                      initialData={categorie}
                      key={index}
                      filtername={item.name}
                      isCheck={item.isCheck}
                    />
                  ))}
                </View>
              </View>
              <View style={styles.BottomContentContainer}>
                <Text
                  style={{
                    fontFamily: fontStyles.GIL_SEMIBOLD,
                    fontSize: FS(24),
                  }}>
                  Brand
                </Text>
                <View>
                  {brand.map((item, index) => (
                    <GeneralCheckBox
                      action={setBrand}
                      initialData={brand}
                      key={index}
                      filtername={item.name}
                      isCheck={item.isCheck}
                    />
                  ))}
                </View>
              </View>
            </View>

            <CustomButton text="Apply Filter" />
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default SingleExplore;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  mainListView: {
    flex: 1,
  },
  mainHeaderContainer: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: SW(20),
    gap: 10,
  },
  BottomSearchContainer: {
    margin: 10,
  },
  BottomContentMainContainer: {
    flex: 1,
    backgroundColor: colors.SEARCH_COLOR,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 30,
    justifyContent: 'space-between',
  },
  BottomContentContainer: {
    marginVertical: SH(10),
    gap: SH(15),
  },
});
