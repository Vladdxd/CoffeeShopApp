import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ImageSourcePropType,
  ToastAndroid,
} from 'react-native';
import {IProduct} from '../interface/data';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';
import IconBtn from './IconBtn';
import {useDispatch} from 'react-redux';
import {addToCart, calculateFullPrice} from '../store/cart/cart.slice';
import {HomeScreenProps} from '../screens/HomeScreen';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface ProductCardProps {
  product: IProduct;
  isExistInCart: boolean;
  navigation: HomeScreenProps['navigation'];
  // imageLink: ImageSourcePropType;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isExistInCart,
  navigation,
}) => {
  const dispatch = useDispatch();

  return (
    <LinearGradient
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.linearGradientContainer}>
      <ImageBackground
        source={{
          uri: product.imagelink_square,
        }}
        resizeMode="cover"
        style={styles.cardImage}>
        <View style={styles.ratingContainer}>
          <CustomIcon
            name="star"
            size={FONTSIZE.size_12}
            color={COLORS.primaryOrangeHex}
          />
          <Text style={styles.rating}>{product.average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.cardTitle}>{product.name}</Text>
      <Text style={styles.cardSubtitle}>{product.special_ingredient}</Text>
      <View style={styles.cardFooterRow}>
        <Text style={styles.priceCurrency}>
          {product.prices[2].currency + ' '}
          <Text style={styles.price}>{product.prices[2].price}</Text>
        </Text>

        {isExistInCart ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Cart');
            }}>
            <IconBtn
              name="cart"
              color={COLORS.primaryWhiteHex}
              size={FONTSIZE.size_10}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              dispatch(addToCart(product));
              dispatch(calculateFullPrice());
              ToastAndroid.showWithGravity(
                `${product.name} added to cart`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
            }}>
            <IconBtn
              name="add"
              color={COLORS.primaryWhiteHex}
              size={FONTSIZE.size_10}
            />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  ratingContainer: {
    backgroundColor: COLORS.primaryBlackRGBA,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_4,
    position: 'absolute',
    top: 0,
    right: 0,
    paddingVertical: SPACING.space_2,
    paddingHorizontal: SPACING.space_10,
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
  },
  rating: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    lineHeight: SPACING.space_20,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_15,
  },
  cardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  cardSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  priceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
  },
  price: {
    color: COLORS.primaryWhiteHex,
  },
});

export default React.memo(ProductCard, (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.product) === JSON.stringify(nextProps.product) &&
    prevProps.isExistInCart === nextProps.isExistInCart
  );
});
