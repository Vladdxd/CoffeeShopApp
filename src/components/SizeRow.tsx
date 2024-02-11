import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import IconBtn from './IconBtn';
import {IProductWithQuantity} from '../interface/data';

interface SizeRowProps {
  el: {
    size: string;
    price: string;
    currency: string;
    quantity: number;
  };
  product: IProductWithQuantity;
  handleIncrement: (id: string, size: string) => void;
  handleDecrement: (id: string, size: string) => void;
}

const SizeRow: React.FC<SizeRowProps> = ({
  el,
  product,
  handleIncrement,
  handleDecrement,
}) => {
  console.log('SizeRow render');

  return (
    <View key={el.size} style={styles.sizeItem}>
      <View style={styles.priceContainer}>
        <View style={styles.currentSizeContainer}>
          <Text style={styles.currentSize}>{el.size}</Text>
        </View>
        <Text style={styles.priceCurrency}>
          {el.currency + ' '}
          <Text style={styles.price}>{el.price}</Text>
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => {
            handleDecrement(product.id, el.size);
          }}>
          <IconBtn
            name="minus"
            color={COLORS.primaryWhiteHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
        <View style={styles.currentQuantityContainer}>
          <Text style={styles.currentQuantity}>{el.quantity}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleIncrement(product.id, el.size);
          }}>
          <IconBtn
            name="add"
            color={COLORS.primaryWhiteHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sizeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    gap: SPACING.space_18,
    marginBottom: SPACING.space_8,
  },
  currentSizeContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: BORDERRADIUS.radius_10,
    height: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: SPACING.space_36 * 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // gap: SPACING.space_18,
    flexGrow: 1,
    // marginRight: SPACING.space_18,
  },
  currentSize: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    gap: SPACING.space_18,
  },
  currentQuantityContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: BORDERRADIUS.radius_10,
    height: SPACING.space_30,
    minWidth: SPACING.space_30 * 1.66,
    paddingHorizontal: SPACING.space_20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
  },
  currentQuantity: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
});

export default React.memo(SizeRow, (prevProps, nextProps) => {
  return prevProps.el.quantity === nextProps.el.quantity;
});
