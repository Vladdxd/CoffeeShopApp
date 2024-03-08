import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Product} from '../services/product/product.service';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {IProduct} from '../interface/data';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import ImageBGInfo from '../components/ImageBGInfo';
import PriceWithButton from '../components/PriceWithButton';
import {useDispatch} from 'react-redux';
import {addToCart, calculateFullPrice} from '../store/cart/cart.slice';
type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

type Sizes = string[];
const getSizes = (data: IProduct): Sizes => {
  return data.prices.map(price => price.size);
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({navigation, route}) => {
  const {id, type} = route.params;

  const dispatch = useDispatch();
  const {data, isFetching} = useQuery<IProduct>({
    queryKey: ['ProductById'],
    queryFn: () => Product.getProductById(id, type),
  });

  const [sizes, setSizes] = React.useState<string[]>([]);
  const [currentSizeIndex, setCurrentSizeIndex] = React.useState<number>(0);

  React.useLayoutEffect(() => {
    if (data) {
      setSizes(getSizes(data));
    }
  }, [data]);

  if (isFetching)
    return (
      <View style={styles.ScreenContainer}>
        <Text style={{textAlign: 'center', color: COLORS.primaryOrangeHex}}>
          Loading...
        </Text>
      </View>
    );
  if (!data) return <Text>404</Text>;

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewContainer}>
        <ImageBGInfo
          iconName="left"
          product={data}
          handlePressOnIcon={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.sizeTitle}>Size</Text>
        <View style={styles.sizeContainer}>
          {sizes.map((size, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={[
                styles.sizeItem,
                {
                  borderColor: COLORS.primaryOrangeHex,
                  borderWidth: index === currentSizeIndex ? SPACING.space_2 : 0,
                },
              ]}
              onPress={() => {
                setCurrentSizeIndex(index);
              }}>
              <Text
                style={[
                  styles.sizeText,
                  {
                    color:
                      index === currentSizeIndex
                        ? COLORS.primaryOrangeHex
                        : COLORS.secondaryLightGreyHex,
                    fontSize:
                      data.type === 'Bean'
                        ? FONTSIZE.size_14
                        : FONTSIZE.size_16,
                  },
                ]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <PriceWithButton
          handlePressOnBtn={() => {
            dispatch(
              addToCart({
                ...data,
                size: sizes[currentSizeIndex],
              }),
            );
            dispatch(calculateFullPrice());
          }}
          price={+data.prices[currentSizeIndex].price}
          priceCurrency={data.prices[currentSizeIndex].currency}
          textBtn="Add to cart"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewContainer: {
    flexGrow: 1,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.space_30,
    marginBottom: SPACING.space_30,
    gap: SPACING.space_24,
  },
  sizeTitle: {
    // marginTop: SPACING.space_24,
    marginBottom: SPACING.space_12,
    paddingHorizontal: SPACING.space_30,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
  sizeItem: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: SPACING.space_12,
    paddingVertical: SPACING.space_8,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:
      (Dimensions.get('window').width -
        SPACING.space_30 * 2 -
        SPACING.space_24 * 2) *
      0.33,
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
});

export default DetailsScreen;
