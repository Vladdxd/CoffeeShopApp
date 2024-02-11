import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import {addToFavorites} from '../store/favorites/favorites.slice';
import {useDispatch} from 'react-redux';
import GradientIcon from './GradientIcon';
import {IProduct} from '../interface/data';

interface ProductHeaderProps {
  iconName?: string;
  handlePressOnIcon?: () => void;
  product: IProduct;
  isFavorites: boolean;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  iconName,
  handlePressOnIcon,
  product,
  isFavorites,
}) => {
  const dispatch = useDispatch();
  console.log('header render');

  return (
    <View
      style={[
        styles.containerHeader,
        // {
        //   justifyContent: true ? 'space-between' : 'flex-end',
        // },
      ]}>
      {iconName && handlePressOnIcon && (
        <TouchableOpacity
          onPress={() => {
            handlePressOnIcon();
          }}>
          <GradientIcon
            name={iconName}
            color={COLORS.primaryWhiteHex}
            size={FONTSIZE.size_16}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          dispatch(addToFavorites(product));
        }}>
        <GradientIcon
          name={'like'}
          color={isFavorites ? COLORS.primaryRedHex : COLORS.primaryWhiteHex}
          size={FONTSIZE.size_16}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  containerHeader: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_30,
  },
});
