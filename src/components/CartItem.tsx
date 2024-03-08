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
import CustomIcon from './CustomIcon';
import CartItemHeader from './CartItemHeader';

export interface CartItemProps {
  product: IProductWithQuantity;
  handleSetQuantity: (id: string, size: string, quantity: number) => void;
  handleRemove: (id: string) => void;
}
const CartItem: React.FC<CartItemProps> = ({
  product,
  handleSetQuantity,
  handleRemove,
}) => {
  return (
    <LinearGradient
      key={product.id}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.linearGradientContainer}>
      {/* <View style={styles.removeBtn}>
        <TouchableOpacity
          onPress={() => {
            handleRemove(product.id);
          }}>
          <CustomIcon name="close" size={FONTSIZE.size_16} />
        </TouchableOpacity>
      </View>
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
      </View> */}
      <CartItemHeader
        product={product}
        handleRemove={handleRemove}
        handleSetQuantity={handleSetQuantity}
      />
      <View style={styles.sizeContainer}>
        {product.prices.map(el => (
          <SizeRow
            handleSetQuantity={handleSetQuantity}
            key={el.size}
            el={el}
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
  removeBtn: {
    position: 'absolute',
    top: SPACING.space_15,
    right: SPACING.space_15,
  },
});

export default React.memo(CartItem, (prev, next) => {
  if (prev.product.id !== next.product.id) {
    return false;
  }

  for (let i = 0; i < prev.product.prices.length; i++) {
    if (prev.product.prices[i].size !== next.product.prices[i].size) {
      return false;
    }
    if (prev.product.prices[i].quantity !== next.product.prices[i].quantity) {
      return false;
    }
  }

  return true;
});
