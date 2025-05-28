import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeaderSection from '../../components/CustomHeaderSection';
import CustomHorizontalLine from '../../components/CustomHorizontalLine';
import {colors} from '../../utils/common/styles';
import {SH, SW} from '../../../Scale';
import CustomEmpty from '../../components/CustomEmpty';
import {RenderCartItem} from './Cart';
import {useRoute} from '@react-navigation/native';

const OrderView = () => {
  const {products}: any = useRoute().params;

  const CustomRenderOrders = ({item}: any) => {
    return (
      <RenderCartItem isActionDisplay={false} item={item} disabled={true} />
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <View style={styles.headerView}>
        <CustomHeaderSection firstIconShow={true} middleText="My Order" />
      </View>
      <CustomHorizontalLine marginVertical={0} />

      {/* main Content */}
      <View style={styles.OrderListMainView}>
        <FlatList
          ListEmptyComponent={CustomEmpty}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={CustomHorizontalLine}
          data={products}
          keyExtractor={item => item.id}
          renderItem={CustomRenderOrders}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderView;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  headerView: {
    paddingHorizontal: SW(20),
    paddingVertical: SW(10),
  },

  OrderListMainView: {
    flex: 1,
    paddingHorizontal: SW(20),
    paddingVertical: SH(20),
  },
});
