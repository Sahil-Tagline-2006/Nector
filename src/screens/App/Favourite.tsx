import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Add_All_to_Cart,
  Get_User_Cart,
  Get_User_Favorites,
} from '../../firebase/Firebase';
import useZustandStore from '../../zustand/useZustandStore';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeaderSection from '../../components/CustomHeaderSection';
import {colors, fontStyles} from '../../utils/common/styles';
import {FS, SH, SW} from '../../../Scale';
import CustomHorizontalLine from '../../components/CustomHorizontalLine';
import CustomButton from '../../components/CustomButton';
import {Image} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import CustomEmpty from '../../components/CustomEmpty';

const Favourite = () => {
  const navigation = useNavigation();
  const {
    user,
    setUserFavourites,
    Favourites,
    Cart,
    setSingleProduct,
    setLoading,
    setUserCart,
  } = useZustandStore();

  const CustomProductFavouriteComponent = ({item}: any) => {
    const GotoSingleProduct = () => {
      setSingleProduct(item.id);
      navigation.navigate('ShopSingleProduct');
    };
    return <RenderItem item={item} productTouchAction={GotoSingleProduct} />;
  };

  const RenderItem = (props: any) => {
    const {item, productTouchAction} = props;
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={productTouchAction}>
        <Image
          source={item.image}
          style={styles.imageStyle}
          resizeMode="contain"
        />

        <View style={styles.middleTextStyle}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productpcs}>{item.pcs}</Text>
        </View>

        <Text style={styles.productPrice}>${item.price}</Text>

        <IconEntypo
          name="chevron-down"
          size={FS(20)}
          style={styles.productIconShow}
        />
      </TouchableOpacity>
    );
  };

  const Add_favorites_to_cart = async () => {
    setLoading(true);

    try {
      await Add_All_to_Cart(user.details.uid, Cart);
      setTimeout(async () => {
        const favourite = await Get_User_Favorites(user.details.uid);
        setUserFavourites(favourite);
        const cart = await Get_User_Cart(user.details.uid);
        setUserCart(cart);

        setLoading(false);
      }, 1500);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <View style={styles.headerView}>
        <CustomHeaderSection firstIconShow={false} middleText="Favorurite" />
      </View>
      <CustomHorizontalLine marginVertical={0} />

      {/* main Content */}
      <View
        style={{flex: 1, paddingHorizontal: SW(20), paddingVertical: SH(20)}}>
        {Favourites.length === 0 ? (
          <CustomEmpty />
        ) : (
          <FlatList
            ListEmptyComponent={CustomEmpty}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={CustomHorizontalLine}
            data={Favourites}
            keyExtractor={item => item.id}
            renderItem={CustomProductFavouriteComponent}
          />
        )}
      </View>

      <CustomHorizontalLine marginVertical={0} />
      {Favourites.length !== 0 ? (
        <View style={styles.BottomSection}>
          <CustomButton
            text="Add All To Cart"
            actions={Add_favorites_to_cart}
            disabled={Favourites.length === 0 ? true : false}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },

  headerView: {
    paddingHorizontal: SW(20),
    paddingVertical: SW(10),
  },
  BottomSection: {
    paddingHorizontal: SW(20),
    marginBottom: SH(10),
    paddingTop: SH(10),
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SW(10),
    marginVertical: SH(10),
  },
  imageStyle: {
    height: SH(70),
    width: SW(70),
  },
  middleTextStyle: {
    flex: 1,
    marginLeft: SW(10),
    gap: SH(5),
  },
  productName: {
    fontFamily: fontStyles.GIL_BOLD,
    fontSize: FS(16),
  },
  productpcs: {
    fontFamily: fontStyles.GIL_MEDIUM,
    fontSize: FS(14),
    color: colors.LIGHT_TEXT_2,
  },
  productPrice: {
    fontFamily: fontStyles.GIL_MEDIUM,
    fontSize: FS(16),
  },
  productIconShow: {
    transform: [{rotate: '-90deg'}],
  },
});
