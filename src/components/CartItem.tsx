import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {IProduct, IProductWithQuantity} from '../interface/data';
import IconBtn from './IconBtn';
import {calculateFullPrice} from '../store/cart/cart.slice';
import {useDispatch} from 'react-redux';
import SizeRow from './SizeRow';

interface CartItemProps {
  product: IProductWithQuantity;
  handleIncrement: (id: string, size: string) => void;
  handleDecrement: (id: string, size: string) => void;
}
const CartItem: React.FC<CartItemProps> = ({
  product,
  handleIncrement,
  handleDecrement,
}) => {
  console.log('!CartItem render');
  const dispatch = useDispatch();
  return (
    <LinearGradient
      key={product.id}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.linearGradientContainer}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.imageWrapper}
          resizeMode="cover"
          source={require('../assets/coffee_assets/americano/square/americano_pic_1_square.png')}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.specialIngredient}>
            {product.special_ingredient}
          </Text>
          <View style={styles.roastedContainer}>
            <Text style={styles.roasted}>{product.roasted}</Text>
          </View>
        </View>
      </View>
      <View style={styles.sizeContainer}>
        {product.prices.map(el => (
          <SizeRow
            key={el.size}
            el={el}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            product={product}
          />
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradientContainer: {
    marginHorizontal: SPACING.space_30,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: SPACING.space_20,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
  },
  textWrapper: {},
  name: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  specialIngredient: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  roastedContainer: {
    marginTop: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_20 * 2,
    paddingHorizontal: SPACING.space_16,
  },
  roasted: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  sizeContainer: {
    marginTop: SPACING.space_10,
    paddingHorizontal: SPACING.space_4,
  },
  // sizeItem: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   // justifyContent: 'space-between',
  //   gap: SPACING.space_18,
  //   marginBottom: SPACING.space_8,
  // },
  // currentSizeContainer: {
  //   backgroundColor: COLORS.primaryBlackHex,
  //   borderRadius: BORDERRADIUS.radius_10,
  //   height: SPACING.space_36,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   minWidth: SPACING.space_36 * 2,
  // },
  // priceContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-around',
  //   // gap: SPACING.space_18,
  //   flexGrow: 1,
  //   // marginRight: SPACING.space_18,
  // },
  // currentSize: {
  //   fontFamily: FONTFAMILY.poppins_medium,
  //   fontSize: FONTSIZE.size_16,
  //   color: COLORS.primaryWhiteHex,
  // },
  // priceCurrency: {
  //   fontFamily: FONTFAMILY.poppins_semibold,
  //   fontSize: FONTSIZE.size_16,
  //   color: COLORS.primaryOrangeHex,
  // },
  // price: {
  //   color: COLORS.primaryWhiteHex,
  // },
  // quantityContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   // justifyContent: 'center',
  //   gap: SPACING.space_18,
  // },
  // currentQuantityContainer: {
  //   backgroundColor: COLORS.primaryBlackHex,
  //   borderRadius: BORDERRADIUS.radius_10,
  //   height: SPACING.space_30,
  //   minWidth: SPACING.space_30 * 1.66,
  //   paddingHorizontal: SPACING.space_20,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderWidth: 2,
  //   borderColor: COLORS.primaryOrangeHex,
  // },
  // currentQuantity: {
  //   fontFamily: FONTFAMILY.poppins_semibold,
  //   fontSize: FONTSIZE.size_16,
  //   color: COLORS.primaryWhiteHex,
  // },
});

export default React.memo(
  CartItem,
  (prev, next) => JSON.stringify(prev.product) === JSON.stringify(next.product),
);
