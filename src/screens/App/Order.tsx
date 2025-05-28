import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {orderType} from '../../utils/common/types';
import {colors, fontStyles, images} from '../../utils/common/styles';
import {FS, SH, SW} from '../../../Scale';
import useZustandStore from '../../zustand/useZustandStore';
import CustomHeaderSection from '../../components/CustomHeaderSection';
import CustomHorizontalLine from '../../components/CustomHorizontalLine';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Delete_User_Order, Get_User_Orders} from '../../firebase/Firebase';
import CustomEmpty from '../../components/CustomEmpty';
import { SafeAreaView } from 'react-native-safe-area-context';

const Order = () => {
  const navigation = useNavigation();
  const {Orders, user, setUserOrders, setLoading} = useZustandStore();

  const GotoOrderViewPage = (products: any) => {
    navigation.navigate('AccountOrders', {products});
  };

  const DeleteOrders = async (order: orderType) => {
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
          await Delete_User_Order(order, user.details.uid);
          const data = await Get_User_Orders(user.details.uid);
          setUserOrders(data);
          setLoading(false);
        },
        style: 'destructive',
      },
    ]);
  };

  const OrderRender = () => {
    return (
      <ScrollView
        contentContainerStyle={{paddingVertical: 10}}
        showsVerticalScrollIndicator={false}>
        {Orders.map((ele: orderType, index: number) => {
          const time = `${new Date(ele.orderAt).getDate()}-${
            new Date(ele.orderAt).getMonth() + 1
          }-${new Date(ele.orderAt).getFullYear()}`;

          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => GotoOrderViewPage(ele.products)}
                style={styles.mainOrderProductContainer}>
                <View style={styles.commonImageContainer}>
                  <Image
                    resizeMode="cover"
                    source={images.BANANAS}
                    style={styles.commonImageStyle}
                  />
                  <Image
                    resizeMode="cover"
                    source={images.PEPSI}
                    style={[
                      styles.commonImageStyle,
                      {position: 'absolute', top: 20},
                    ]}
                  />
                  <View
                    style={[
                      styles.commonImageStyle,
                      {
                        position: 'absolute',
                        top: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Text
                      style={{
                        color: colors.WHITE,
                        fontFamily: fontStyles.GIL_BOLD,
                      }}>
                      +2
                    </Text>
                  </View>
                </View>

                <View style={styles.contentOrderMainView}>
                  <View style={styles.contentContainerText}>
                    <Text style={styles.contentTextTitle}>Order At </Text>
                    <Text style={styles.contentTextValue}>{time}</Text>
                  </View>
                  <View style={styles.contentContainerText}>
                    <Text style={styles.contentTextTitle}>Total Price</Text>
                    <Text style={styles.contentTextValue}>
                      ${ele.totalPrice}
                    </Text>
                  </View>
                  <View style={styles.contentContainerText}>
                    <Text style={styles.contentTextTitle}>Total Quantity</Text>
                    <Text style={styles.contentTextValue}>
                      {ele.totalQuantity}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeStyle}
                onPress={() => DeleteOrders(ele)}>
                <Icon name="close" size={FS(18)} color={colors.WHITE} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <View style={styles.headerView}>
        <CustomHeaderSection firstIconShow={true} middleText="My Orders" />
      </View>
      <CustomHorizontalLine marginVertical={0} />

      <View style={styles.orderViewMain}>
        {Orders.length === 0 ? <CustomEmpty title="Order" /> : <OrderRender />}
      </View>
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  orderViewMain: {
    backgroundColor: colors.SEARCH_COLOR,
    flex: 1,
    paddingHorizontal: FS(20),
  },
  mainOrderProductContainer: {
    backgroundColor: colors.WHITE,
    height: FS(100),
    borderRadius: 10,
    marginVertical: SH(10),
    borderLeftWidth: 6,
    borderLeftColor: colors.REVIEW,
    flexDirection: 'row',
    paddingRight: SW(10),
  },
  commonImageStyle: {
    height: FS(40),
    width: FS(40),
    borderRadius: 50,
    backgroundColor: colors.LIGHT_TEXT_2,
    borderWidth: 2,
    borderColor: colors.WHITE,
  },
  commonImageContainer: {
    margin: 10,
  },
  contentOrderMainView: {
    justifyContent: 'center',
    gap: 5,
    flex: 1,
  },
  contentContainerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentTextTitle: {
    fontFamily: fontStyles.GIL_SEMIBOLD,
    fontSize: FS(17),
    color: colors.LIGHT_TEXT_2,
  },
  contentTextValue: {
    fontFamily: fontStyles.GIL_SEMIBOLD,
    fontSize: FS(17),
    color: colors.BLACK,
  },
  mainContainer: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },

  headerView: {
    paddingHorizontal: SW(20),
    paddingVertical: SW(10),
  },

  removeStyle: {
    position: 'absolute',
    backgroundColor: 'red',
    right: 0,
    zIndex: 999,
    borderRadius: 20,
  },
});
