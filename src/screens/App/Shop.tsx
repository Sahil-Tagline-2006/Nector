import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useZustandStore from '../../zustand/useZustandStore';
import {colors, fontStyles, images} from '../../utils/common/styles';
import CustomSearch from '../../components/CustomSearch';
import {FS, SH, SW} from '../../../Scale';
import GeneraImageSlider from './components/GeneraImageSlider';
import {
  CustomGroceriesListContainer,
  CustomProductListContainer,
  CustomProductSectionList,
} from '../../components/CustomProductSectionList';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback,  useState} from 'react';
import {
  Get_User_Cart,
  Get_User_Favorites,
  Get_User_Orders,
  Store_User_Cart,
} from '../../firebase/Firebase';

const DummyGroceriesList = [
  {
    id: 1,
    name: 'Pulses',
    image: images.PLUSE,
    color: '#fef1e4',
  },
  {
    id: 2,
    name: 'Rice',
    image: images.RICE,
    color: '#e5f3ea',
  },
];
const Shop = () => {
  const navigation = useNavigation();
  const [total_quantity,setTotalQuantity]=useState(0)

  const {
    user,
    Cart,
    products,
    setSingleProduct,
    filterProducts,
    setUserFavourites,
    setUserCart,
    setUserOrders,
  } = useZustandStore();

  useFocusEffect(
    useCallback(() => {
      setInitialData();
    }, []),
  );


  const setInitialData = async () => {
    const favourite = await Get_User_Favorites(user.details.uid);
    const cart = await Get_User_Cart(user.details.uid);
    const orders = await Get_User_Orders(user.details.uid);

    setUserFavourites(favourite);
    setUserOrders(orders);
    setUserCart(cart);
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
      const favourite = await Get_User_Cart(user.details.uid);
      setUserCart(favourite);
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
  return (
    <SafeAreaView style={styles.safecontainer} edges={['top']}>
      <View style={styles.safecontainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* header  */}
          <View style={styles.headerContainer}>
            <Image
              source={images.COLOR_CARROT}
              style={styles.headerImage}
              resizeMode="stretch"
            />

            <View style={styles.userName}>
              <Image source={images.LOCATION_HEADER} />
              <Text style={styles.userNameStyle} numberOfLines={1}>
                {user.details.username}
              </Text>
            </View>
            <CustomSearch searchAction={filterProduct} />
          </View>

          {/* image slider */}
          <GeneraImageSlider />

          {/* Exclusive Offer section */}
          <CustomProductSectionList
            SectionLabel="Exclusive Offer"
            ProductList={products}
            renderComponent={CustomProductSectionListrenderComponent}
          />

          {/* Best Selling offer Section */}
          <CustomProductSectionList
            SectionLabel="Best Selling"
            ProductList={products}
            renderComponent={CustomProductSectionListrenderComponent}
          />

          {/* Grocerires Section */}
          <CustomProductSectionList
            SectionLabel="Groceries"
            ProductList={DummyGroceriesList}
            renderComponent={CustomGroceriesListContainer}
          />

          {/* Remaining Section */}
          <CustomProductSectionList
            SectionLabel="Groceries"
            isSectionLabelDisplay={false}
            ProductList={products}
            renderComponent={CustomProductSectionListrenderComponent}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Shop;

const styles = StyleSheet.create({
  safecontainer: {
    backgroundColor: colors.WHITE,
    flex: 1,
    paddingTop: SH(10),
  },
  headerContainer: {
    paddingHorizontal: SH(20),
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SH(15),
  },
  headerImage: {
    height: FS(30),
    width: SW(25),
  },
  userName: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: SW(5),
    width: '90%',
    marginBottom: SH(10),
  },
  userNameStyle: {
    fontSize: FS(18),
    color: colors.HOME_USER_COLOR,
    fontFamily: fontStyles.GIL_SEMIBOLD,
  },
});
