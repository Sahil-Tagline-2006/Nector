import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeaderSection from '../../components/CustomHeaderSection';
import CustomSearch from '../../components/CustomSearch';
import {colors, fontStyles, images} from '../../utils/common/styles';
import {FS, SH, SW} from '../../../Scale';
import {useNavigation} from '@react-navigation/native';
import CustomEmpty from '../../components/CustomEmpty';

const dummyList = [
  {
    id: 1,
    name: 'Frash Fruits& Vegetable',
    image: images.ALLVEG,
    bg: '#eef7f1',
    br: '#91cda6',
  },
  {
    id: 2,
    name: 'Cooking Oil& Ghee',
    image: images.ALLFRUITS,
    bg: '#fef6ed',
    br: '#fabd7c',
  },
  {
    id: 3,
    name: 'Meat & Fish',
    image: images.ALLFISH,
    bg: '#fde7e4',
    br: '#f7a593',
  },
  {
    id: 4,
    name: 'Bakery & Snacks',
    image: images.ALLBUN,
    bg: '#f4ebf7',
    br: '#d3b0e0',
  },
  {
    id: 5,
    name: 'Dairy & Eggs',
    image: images.ALLDAIRY,
    bg: '#fef8e5',
    br: '#fde598',
  },
  {
    id: 6,
    name: 'Beverages',
    image: images.ALLPEPSI,
    bg: '#edf7fc',
    br: '#b7dff5',
  },
];

const Explore = () => {
  const navigation = useNavigation();
  const [filterDummnyList, setFilterDummnyList] = useState(dummyList);

  const RenderItem = ({item, action}: any) => {
    return (
      <TouchableOpacity style={styles.backContainer} onPress={action}>
        <View
          style={[
            styles.mainProductContainer,
            {backgroundColor: item.bg, borderColor: item.br},
          ]}>
          <Image
            source={item.image}
            style={styles.imageStyle}
            resizeMode="contain"
          />
          <Text style={styles.textStyle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemComponent = ({item}: any) => {
    const GotoSingleExplore = () => {
      navigation.navigate('ExploreSingle', {
        name: item.name,
      });
    };
    return <RenderItem item={item} action={GotoSingleExplore} />;
  };

  const filterProduct = (hint: string) => {
    let filterProducts;
    if (hint === '') {
      filterProducts = dummyList;
    } else {
      filterProducts = dummyList.filter((item: any) =>
        item.name.toLocaleLowerCase().includes(hint.toLocaleLowerCase()),
      );
    }
    setFilterDummnyList(filterProducts);
  };
  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <CustomHeaderSection firstIconShow={false} middleText="Find Products" />
      <View style={styles.searchBarView}>
        <CustomSearch topSpace={SH(15)} searchAction={filterProduct} />
      </View>

      {filterDummnyList.length === 0 ? (
        <CustomEmpty />
      ) : (
        <FlatList
          data={filterDummnyList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItemComponent}
        />
      )}
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  imageStyle: {
    height: '70%',
    width: '70%',
  },
  searchBarView: {
    paddingBottom: SH(20),
  },
  mainContainer: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: SW(20),
    flex: 1,
  },
  backContainer: {
    height: FS(200),
    width: '50%',
    padding: FS(10),
  },
  mainProductContainer: {
    borderWidth: 1,
    borderRadius: 20,
    height: '100%',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  textStyle: {
    height: '30%',
    textAlign: 'center',
    fontSize: FS(16),
    fontFamily: fontStyles.GIL_BOLD,
  },
});
