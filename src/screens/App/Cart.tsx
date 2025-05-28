import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeaderSection from '../../components/CustomHeaderSection';
import CustomHorizontalLine from '../../components/CustomHorizontalLine';
import {FlatList} from 'react-native-gesture-handler';
import {FS, SH, SW} from '../../../Scale';
import CustomButton from '../../components/CustomButton';
import {colors, fontStyles, images} from '../../utils/common/styles';
import {useNavigation} from '@react-navigation/native';
import useZustandStore from '../../zustand/useZustandStore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {
  Delete_User_Cart,
  Store_User_Cart,
  Store_User_Orders,
} from '../../firebase/Firebase';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomEmpty from '../../components/CustomEmpty';
import {orderType} from '../../utils/common/types';
import GenerateId from 'generate-unique-id';

const {height}: any = Dimensions.get('window');
let toogleFlagForSheet = false;

const Cart = () => {
  const rbRef: any = useRef(null);
  const navigation = useNavigation();
  const [cartTotal, setCartTotal] = useState('');
  const {
    user,
    setLoading,
    Cart,
    setSingleProduct,
    cartActions,
    DeleteProductCart,
    setUserCart,
  } = useZustandStore();

  useEffect(() => {
    let Cart_total: any = 0;
    let Cart_total_Quantity = 0;
    Cart.map(element => {
      Cart_total += parseFloat(element.price * element.quantity);
      Cart_total_Quantity += element.quantity;
    });
    setCartTotal(Cart_total.toFixed(2));
  }, [Cart]);

  const CustomProductCartComponent = ({item}: any) => {
    const DeleteProductFromCart = async () => {
      Alert.alert('Confirmation', 'Are you sure to remove?', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: async () => {
            setLoading(true);
            await Delete_User_Cart(item, user.details.uid);
            DeleteProductCart(item.id);
            setLoading(false);
          },
          style: 'destructive',
        },
      ]);
    };

    const QuantityAction = async (action: string) => {
      cartActions(item.id, action);
      if (action === 'PLUS') {
        const response = await Store_User_Cart(
          {...item, quantity: item.quantity + 1},
          user.details.uid,
        );
      } else {
        if (item.quantity > 1) {
          const response = await Store_User_Cart(
            {...item, quantity: item.quantity - 1},
            user.details.uid,
          );
        } else {
          DeleteProductFromCart();
        }
      }
    };

    const GotoSingleProduct = () => {
      setSingleProduct(item.id);
      navigation.navigate('ShopSingleProduct');
    };
    return (
      <RenderCartItem
        item={item}
        DeleteProductAction={DeleteProductFromCart}
        QuantityAction={QuantityAction}
        ContainerAction={GotoSingleProduct}
      />
    );
  };

  const ToggleFilter = () => {
    if (toogleFlagForSheet) {
      rbRef.current?.close();
    } else {
      rbRef.current?.open();
    }
    toogleFlagForSheet = !toogleFlagForSheet;
  };

  const DummyCheckOutContainer = ({children, title}: any) => {
    return (
      <View style={styles.DummyDetailContainer}>
        <Text style={styles.DummyTitle}>{title}</Text>
        <View style={styles.DummyChildContainer}>{children}</View>
        <IconEntypo
          name="chevron-down"
          size={FS(20)}
          style={styles.DummyIcon}
        />
      </View>
    );
  };

  const Place_Order = async () => {
    rbRef.current?.close();
    setTimeout(async () => {
      setLoading(true);

      const order: orderType = {
        orderAt: new Date().toISOString().toString(),
        products: Cart,
        totalPrice: parseFloat(cartTotal).toFixed(2),
        totalQuantity: Cart.length,
        id: GenerateId({
          length: 28,
          useLetters: false,
          includeSymbols: ['@', '#', '|'],
          excludeSymbols: ['0'],
        }),
      };
      Cart.forEach(async ele => {
        await Delete_User_Cart(ele, user.details.uid);
      });
      const response = await Store_User_Orders(order, user.details.uid);

      setTimeout(async () => {
        navigation.replace('OrderComplete');
        setLoading(false);

        // set cart Empty
        setUserCart([]);
      }, 1000);
    }, 500);
  };

  const ClearCart = async () => {
    Alert.alert('Confirmation', 'Are you sure to clear cart?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          setLoading(true);

          Cart.forEach(async ele => {
            await Delete_User_Cart(ele, user.details.uid);
          });
          // set cart Empty
          setUserCart([]);
          setLoading(false);
        },
        style: 'destructive',
      },
    ]);
  };
  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <View style={styles.headerView}>
        <CustomHeaderSection
          firstIconShow={false}
          middleText="My Cart"
          lastIcon={Cart.length === 0 ? null : images.DELETE}
          lastIconAction={ClearCart}
        />
      </View>
      <CustomHorizontalLine marginVertical={0} />

      {/* main Content */}
      <View style={styles.CartListMainView}>
        {Cart.length === 0 ? (
          <CustomEmpty />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={CustomHorizontalLine}
            data={Cart}
            keyExtractor={item => item.id}
            renderItem={CustomProductCartComponent}
          />
        )}
      </View>

      <CustomHorizontalLine marginVertical={0} />
      {Cart.length !== 0 ? (
        <View style={styles.BottomSection}>
          <CustomButton
            text="Go to Checkout"
            actions={ToggleFilter}
            lastSectionText={cartTotal}
            disabled={Cart.length === 0 ? true : false}
            lastSectionDisplay={Cart.length === 0 ? false : true}
          />
        </View>
      ) : null}

      {/* Bottom Sheet */}
      <RBSheet
        ref={rbRef}
        useNativeDriver={false}
        height={height * 0.65}
        customStyles={{
          draggableIcon: {
            backgroundColor: '#000',
          },
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          container: {
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
            borderWidth: 1,
          },
        }}
        customModalProps={{
          animationType: 'fade',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View style={styles.checkOutContainer}>
          <Text style={styles.CheckOutText}>Checkout</Text>
          <TouchableOpacity onPress={ToggleFilter}>
            <Icon name="close" size={FS(25)} />
          </TouchableOpacity>
        </View>
        <CustomHorizontalLine marginVertical={0} />
        <View style={styles.allDetailView}>
          <DummyCheckOutContainer title="Delivery">
            <Text style={styles.DummydynamicText}>Select Method</Text>
          </DummyCheckOutContainer>
          <CustomHorizontalLine marginVertical={0} />
          <DummyCheckOutContainer title="Pament">
            <Image source={images.CARD} style={styles.BottomPaymentImage} />
          </DummyCheckOutContainer>
          <CustomHorizontalLine marginVertical={0} />
          <DummyCheckOutContainer title="Promo Code">
            <Text style={styles.DummydynamicText}>Pick discount</Text>
          </DummyCheckOutContainer>
          <CustomHorizontalLine marginVertical={0} />
          <DummyCheckOutContainer title="Total Cost">
            <Text style={styles.DummydynamicText}>${cartTotal}</Text>
          </DummyCheckOutContainer>
          <CustomHorizontalLine marginVertical={0} />

          {/* term and condition */}
          <View
            style={[styles.privacyPolicyContainer, {marginVertical: SH(20)}]}>
            <Text style={styles.asksimplelogintext}>
              By placing an order you agree to our
            </Text>
            <View style={styles.privacyPolicyContainer}>
              <TouchableOpacity>
                <Text style={styles.asklogintext}>Terms</Text>
              </TouchableOpacity>
              <Text style={styles.asksimplelogintext}>and</Text>
              <TouchableOpacity>
                <Text style={styles.asklogintext}>Conditions</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Order Button */}
          <CustomButton text="Place Order" actions={Place_Order} />
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export const RenderCartItem = (props: any) => {
  const {
    item,
    DeleteProductAction,
    QuantityAction,
    isActionDisplay = true,
    ContainerAction,
    disabled = false,
  } = props;
  return (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={ContainerAction}
      disabled={disabled}>
      <Image
        source={item.image}
        style={styles.imageStyle}
        resizeMode="contain"
      />

      <View style={styles.contentView}>
        <View style={styles.productNamecontainer}>
          <Text style={styles.productName}>{item.name}</Text>
          {isActionDisplay && (
            <TouchableOpacity onPress={DeleteProductAction}>
              <Icon name="close" size={FS(25)} color={'#B3B3B3'} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.productpcs}>{item.pcs}</Text>
        <View style={styles.BottomPriceLabel}>
          {/* Actions/ */}
          {isActionDisplay && (
            <View style={styles.ActionContainer}>
              <TouchableOpacity onPress={QuantityAction.bind(this, 'MINUS')}>
                <IconEntypo
                  name="minus"
                  size={FS(25)}
                  color={'#B3B3B3'}
                  style={styles.ActionButtonStyle}
                />
              </TouchableOpacity>
              <Text style={styles.quantityStyle}>{item.quantity}</Text>
              <TouchableOpacity onPress={QuantityAction.bind(this, 'PLUS')}>
                <IconEntypo
                  name="plus"
                  size={FS(25)}
                  color={colors.THMEM_COLOR}
                  style={styles.ActionButtonStyle}
                />
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.productName}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Cart;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  headerView: {
    paddingVertical: SH(10),
  },
  BottomSection: {
    paddingHorizontal: SW(20),
    marginBottom: SH(10),
    paddingTop: SH(10),
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SW(15),
  },
  imageStyle: {
    height: SH(70),
    width: SW(70),
  },
  productName: {
    fontFamily: fontStyles.GIL_BOLD,
    fontSize: FS(18),
  },
  productpcs: {
    fontFamily: fontStyles.GIL_MEDIUM,
    fontSize: FS(16),
    color: colors.LIGHT_TEXT_2,
  },
  middleTextStyle: {
    flex: 1,
    marginLeft: SW(10),
    gap: SH(5),
  },
  contentView: {
    flex: 1,
  },
  productNamecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SH(4),
  },
  BottomPriceLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  ActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SH(10),
    width: '50%',
  },
  ActionButtonStyle: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    fontSize: FS(20),
    borderColor: '#e2e2e2',
  },
  quantityStyle: {
    fontFamily: fontStyles.GIL_BOLD,
    fontSize: FS(18),
  },
  checkOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SW(30),
  },
  CheckOutText: {
    fontSize: FS(24),
    fontFamily: fontStyles.GIL_SEMIBOLD,
  },
  DummyDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SH(20),
    gap: SW(5),
  },
  DummyTitle: {
    fontSize: FS(18),
    color: colors.LIGHT_TEXT_2,
    fontFamily: fontStyles.GIL_SEMIBOLD,
  },
  DummyChildContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  DummyIcon: {
    transform: [{rotate: '-90deg'}],
  },
  DummydynamicText: {
    fontSize: FS(16),
    fontFamily: fontStyles.GIL_MEDIUM,
  },
  allDetailView: {
    flex: 1,
    paddingHorizontal: SW(30),
  },
  privacyPolicyContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
  asksimplelogintext: {
    fontSize: FS(16),
    color: colors.LIGHT_TEXT_2,
    fontFamily: fontStyles.GIL_SEMIBOLD,
  },
  asklogintext: {
    fontFamily: fontStyles.GIL_SEMIBOLD,
    fontSize: FS(16),
    color: colors.BLACK,
  },

  CartListMainView: {
    flex: 1,
    paddingHorizontal: SW(20),
    paddingVertical: SH(20),
  },
  BottomPaymentImage: {
    height: SH(25),
    width: SW(25),
  },
});
