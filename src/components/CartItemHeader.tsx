import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {CartItemProps} from './CartItem';

const CartItemHeader: React.FC<CartItemProps> = ({product, handleRemove}) => {
  return (
    <>
      <View style={styles.removeBtn}>
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
          source={{
            uri: product.imagelink_square,
          }}
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
    </>
  );
};

export default CartItemHeader;

const styles = StyleSheet.create({
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
  removeBtn: {
    position: 'absolute',
    top: SPACING.space_15,
    right: SPACING.space_15,
  },
});
