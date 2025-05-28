import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useZustandStore from '../../zustand/useZustandStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, fontStyles, images} from '../../utils/common/styles';
import {FS, SH, SW} from '../../../Scale';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useEffect, useLayoutEffect, useState} from 'react';
import {
  Delete_User_Cart,
  Delete_User_Favorites,
  Get_User_Cart,
  Get_User_Favorites,
  Store_User_Cart,
  Store_User_Favorites,
} from '../../firebase/Firebase';
import {cartType, productType} from '../../utils/common/types';
import {useNavigation} from '@react-navigation/native';

const SingleProduct = () => {
  const dummy = `Apples are nutritious. Apples may be good for weight loss.apples may be good for your heart. As part of a healtful and varied Diet. Apples are nutritious. Apples may be good for weight loss. apples may be good for your heart. As part of a healtful and varied Diet.`;
  const navigation = useNavigation();
  const {
    singleProduct,
    user,
    Favourites,
    Cart,
    setUserFavourites,
    setUserCart,
    DeleteProductCart,
    setLoading,
  } = useZustandStore();
  const inset = useSafeAreaInsets();
  const [showProductDetail, setShowProuductDetails] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [inCart, setInCart] = useState(false);

  const SetFavouriteData = async () => {
    if (!isFavorite) {
      await Store_User_Favorites(singleProduct, user.details.uid);
    } else {
      await Delete_User_Favorites(singleProduct, user.details.uid);
    }

    const favourite = await Get_User_Favorites(user.details.uid);
    setUserFavourites(favourite);
  };

  useLayoutEffect(() => {
    CheckIsFavorite();
  }, []);

  useEffect(() => {
    SetInitialProductQuantity();
  }, [Cart]);

  const CheckIsFavorite = async () => {
    Favourites.forEach((element: productType) => {
      if (element.id === singleProduct?.id) setIsFavorite(true);
    });
  };

  const SetInitialProductQuantity = async () => {
    Cart.forEach((element: cartType) => {
      if (element.id === singleProduct?.id) {
        setQuantity(element.quantity);
        setInCart(true);
        setLoading(false);
      }
    });
  };

  const NutritionReviewComponent = ({
    children,
    label,
    isBottomLineVisible = true,
  }: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.nutritionsSection,
          {borderBottomWidth: isBottomLineVisible ? 1 : 0},
        ]}>
        <Text style={styles.productdetailNameStyle}>{label}</Text>
        <View style={styles.nutritionsEndSection}>
          {children}
          <IconEntypo name="chevron-right" size={FS(20)} />
        </View>
      </TouchableOpacity>
    );
  };

  const ToggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    SetFavouriteData();
  };

  const QuantityAction = async (action: string) => {
    if (action === 'PLUS') {
      setQuantity(quantity + 1);
      setInCart(true);
      AddToCart(false, action);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        AddToCart(false, action);
      } else {
        setInCart(false);
        await Delete_User_Cart(singleProduct, user.details.uid);
        DeleteProductCart(singleProduct?.id);
        setQuantity(0);
      }
    }
  };

  const AddToCart = async (isGoBack = true, action = 'PLUS') => {
    if (isGoBack) setLoading(true);
    setInCart(true);
    await Store_User_Cart(
      {
        ...singleProduct,
        quantity: action === 'PLUS' ? quantity + 1 : quantity - 1,
      },
      user.details.uid,
    );

    const favourite = await Get_User_Cart(user.details.uid);
    setUserCart(favourite);
  };

  const ReviewStar = () =>
    Array.from({length: 5}).map((e, i) => (
      <IconEntypo name="star" size={FS(18)} color={colors.REVIEW} key={i} />
    ));
  return (
    <>
      <ScrollView
        contentContainerStyle={{backgroundColor: '#F2F3F2'}}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.contentUpperView, {marginTop: inset.top}]}>
          <View style={styles.imageShadowWrapper}>
            <Image
              source={singleProduct?.image}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>
        </View>
        {/* Detail Section */}

        <View style={styles.detailSectionMain}>
          <View style={styles.detailNameSection}>
            <Text style={styles.detailNameStyle}>{singleProduct?.name}</Text>
            <TouchableOpacity onPress={ToggleFavorite}>
              {!isFavorite ? (
                <IconFeather
                  name="heart"
                  size={FS(25)}
                  color={colors.LIGHT_TEXT}
                />
              ) : (
                <IconAntDesign
                  name="heart"
                  size={FS(25)}
                  color={colors.REVIEW}
                />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.pcsStyle}>{singleProduct?.pcs}</Text>

          {/* action Section */}
          <View style={styles.actionSection}>
            {inCart && (
              <View style={styles.actionContainer}>
                <TouchableOpacity onPress={QuantityAction.bind(this, 'MINUS')}>
                  <IconEntypo
                    name="minus"
                    size={FS(30)}
                    color={colors.LIGHT_TEXT}
                  />
                </TouchableOpacity>
                <Text style={styles.actionText}>{quantity}</Text>
                <TouchableOpacity onPress={QuantityAction.bind(this, 'PLUS')}>
                  <IconEntypo
                    name="plus"
                    size={FS(30)}
                    color={colors.THMEM_COLOR}
                  />
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.detailNameStyle}>${singleProduct?.price}</Text>
          </View>

          {/* Product Detail section */}
          <View style={styles.productDetailSection}>
            <TouchableOpacity
              style={styles.productDetailActionLabel}
              onPress={() => setShowProuductDetails(!showProductDetail)}>
              <Text style={styles.productdetailNameStyle}>Product Detail</Text>
              <IconEntypo
                name="chevron-down"
                size={FS(20)}
                style={{
                  transform: [{rotate: showProductDetail ? '0deg' : '-90deg'}],
                }}
              />
            </TouchableOpacity>
            {showProductDetail && (
              <Text style={styles.productDetailText}>
                {dummy.concat(dummy).concat(dummy).concat(dummy).concat(dummy)}
              </Text>
            )}
          </View>

          {/* Nutritions Section */}
          <NutritionReviewComponent label="Nutritions">
            <View style={styles.nutritionGramContainer}>
              <Text style={styles.nutritionGramText}>100gr</Text>
            </View>
          </NutritionReviewComponent>

          {/* Review Section */}
          <NutritionReviewComponent isBottomLineVisible={false} label="Review">
            <View style={styles.reviewContainer}>
              <ReviewStar />
            </View>
          </NutritionReviewComponent>
        </View>
      </ScrollView>

      {!inCart && (
        <View style={styles.actionPlaceView}>
          <CustomButton
            text="Add To Basket"
            height={SH(60)}
            actions={AddToCart}
          />
        </View>
      )}

      <View style={[styles.topHeader, {marginTop: inset.top}]}>
        <View style={styles.container}>
          {/* first icons */}
          <TouchableOpacity
            style={styles.headerfirstIconsStyles}
            onPress={() => navigation.goBack()}>
            <Icon
              name={'arrow-back-ios'}
              size={FS(25)}
              style={{marginRight: SW(-10)}}
            />
          </TouchableOpacity>

          {/* last icons */}
          <TouchableOpacity style={styles.headerLastIconsStyles}>
            <Image
              source={images.UPLOAD}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#F2F3F2',
    flex: 1,
  },
  contentLayoutMainView: {
    flex: 1,
  },
  favoriteImageStyle: {
    height: SH(35),
    width: SW(28),
  },
  backgroundCurveView: {
    height: '45%',
    backgroundColor: '#F2F3F2',
    borderEndEndRadius: 25,
    borderEndStartRadius: 25,
  },
  contentLayout: {
    flex: 1,
  },
  contentUpperView: {
    zIndex: 999,
    height: SH(350),
    backgroundColor: '#F2F3F2',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  productImage: {
    height: '70%',
    width: '70%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  imageShadowWrapper: {
    height: '100%',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  detailSectionMain: {
    paddingTop: SH(40),
    marginTop: SH(-20),
    height: '100%',
    paddingHorizontal: SW(20),
    backgroundColor: colors.WHITE,
  },
  detailNameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 999,
  },
  detailNameStyle: {
    fontSize: FS(24),
    fontFamily: fontStyles.GIL_BOLD,
  },
  pcsStyle: {
    color: colors.LIGHT_TEXT_2,
    fontSize: FS(16),
    marginTop: SH(5),
    fontFamily: fontStyles.GIL_MEDIUM,
  },
  actionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: SH(100),
    borderBottomColor: '#E2E2E2B2',
    borderBottomWidth: 1,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '40%',
  },
  actionText: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    fontSize: FS(20),
    borderColor: '#e2e2e2',
  },
  productDetailSection: {
    borderBottomWidth: 1,
    borderColor: '#E2E2E2B2',
    paddingVertical: SH(15),
  },
  productDetailActionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productdetailNameStyle: {
    fontSize: FS(16),
    fontFamily: fontStyles.GIL_SEMIBOLD,
  },
  productDetailText: {
    color: colors.LIGHT_TEXT_2,
    fontFamily: fontStyles.GIL_MEDIUM,
    fontSize: FS(13),
    lineHeight: SH(18),
    marginTop: SH(10),
  },
  nutritionsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#E2E2E2B2',
    paddingVertical: SH(15),
  },
  nutritionsEndSection: {
    flex: 1,
    height: 20,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  nutritionGramContainer: {
    height: SH(25),
    width: SW(45),
    backgroundColor: colors.NUTRITION_GRAM,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  nutritionGramText: {
    color: colors.LIGHT_TEXT_2,
    fontSize: FS(12),
  },
  reviewContainer: {
    flexDirection: 'row',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: SH(45),
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: SW(20),
  },
  headerfirstIconsStyles: {
    height: SH(45),
    width: '13%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 10,
  },
  headerLastIconsStyles: {
    borderRadius: 10,
    backgroundColor: '#F2F3F2',
    height: SH(45),
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: SH(25),
    width: SW(25),
  },
  middleText: {
    fontSize: FS(20),
    fontFamily: fontStyles.GIL_BOLD,
  },
  actionPlaceView: {
    height: FS(100),
    paddingHorizontal: SW(20),
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  topHeader: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    top: 5,
  },
});
