import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {IProduct} from '../interface/data';

interface PriceWithButtonProps {
  priceCurrency: string;
  price: number;
  textBtn: string;
  handlePressOnBtn: () => void;
}
const PriceWithButton: React.FC<PriceWithButtonProps> = ({
  priceCurrency,
  price,
  textBtn,
  handlePressOnBtn,
}) => {
  console.log('PriceWithButton render');

  return (
    <View style={styles.container}>
      <View style={styles.containerPrice}>
        <Text style={styles.priceCaption}>Price</Text>
        <Text style={styles.priceCurrency}>
          {priceCurrency + ' '}
          <Text style={styles.price}>{price}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.containerBtn}
        onPress={() => {
          handlePressOnBtn();
        }}>
        <Text style={styles.btnText}> {textBtn}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.space_30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: SPACING.space_20,
    gap: SPACING.space_20,
  },
  containerPrice: {
    alignItems: 'center',
    width: 80,
  },
  priceCaption: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  priceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
  price: {
    color: COLORS.primaryWhiteHex,
  },
  containerBtn: {
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: SPACING.space_20,
    // // paddingHorizontal: 70,
    paddingVertical: SPACING.space_20,
    // flexGrow: 1,
    // flexShrink: 1,
    // maxWidth: '69%',
    // justifyContent: 'center',
    // alignItems: 'center',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // height: SPACING.space_30 * 2,
  },
  btnText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    lineHeight: SPACING.space_20,
  },
});

export default PriceWithButton;
