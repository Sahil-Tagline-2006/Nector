import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {SH} from '../../../../Scale';
import {colors, images} from '../../../utils/common/styles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const imagesList = [
  {id: '1', uri: images.BANNER},
  {id: '2', uri: images.BANNER},
  {id: '3', uri: images.BANNER},
];
const GeneraImageSlider = () => {
  const scrollOffsetValue = useSharedValue<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const AnimatedDot = () => {
    return imagesList.map((item, index) => {
      const isActive = index === currentIndex;
      const animatedDotStyle = useAnimatedStyle(() => {
        return {
          width: withTiming(isActive ? 20 : 8, {duration: 500}),
          backgroundColor: isActive ? colors.THMEM_COLOR : colors.GRAY,
        };
      }, [currentIndex]);
      return (
        <Animated.View
          key={item.id}
          style={[styles.dotstyle, animatedDotStyle]}
        />
      );
    });
  };
  return (
    <View style={styles.mainContainer}>
      <Carousel
        loop={true}
        width={430}
        height={SH(170)}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlay
        autoPlayInterval={2000}
        data={imagesList}
        defaultScrollOffsetValue={scrollOffsetValue}
        onSnapToItem={index => setCurrentIndex(index)}
        renderItem={({item}) => {
          return (
            <View style={styles.carouselItem}>
              <Image
                source={item.uri}
                resizeMode="stretch"
                style={styles.imageStyle}
              />
            </View>
          );
        }}
      />

      <View style={styles.dotcontainer}>
        <AnimatedDot />
      </View>
    </View>
  );
};

export default GeneraImageSlider;

const styles = StyleSheet.create({
  carouselItem: {
    width: Dimensions.get('window').width,
    height: SH(150),
    alignItems: 'center',
    marginTop: 15,
  },
  carouselImage: {
    width: '90%',
    height: '100%',
    borderRadius: SH(10),
  },
  dotcontainer: {
    flexDirection: 'row',
    marginTop: SH(-30),
    justifyContent: 'center',
  },
  dotstyle: {
    height: 8,
    width: 8,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  mainContainer: {
    marginBottom: SH(20),
  },
  imageStyle: {
    height: '100%',
    width: '90%',
  },
});
