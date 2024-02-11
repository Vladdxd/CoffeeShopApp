import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface DetailIconProps {
  iconName: string;
  iconSize: number;
  content: string;
}

const DetailIcon: React.FC<DetailIconProps> = ({
  iconName,
  content,
  iconSize,
}) => {
  console.log('!DetailIcon render');

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CustomIcon
          name={iconName}
          color={COLORS.primaryOrangeHex}
          size={iconSize}
        />
      </View>
      <Text style={styles.ingredients}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SPACING.space_15,
  },
  wrapper: {
    minHeight: SPACING.space_30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ingredients: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    lineHeight: SPACING.space_20,
    color: COLORS.secondaryLightGreyHex,
  },
});

export default React.memo(DetailIcon, (prevProps, nextProps) => {
  return (
    prevProps.iconName === nextProps.iconName &&
    prevProps.content === nextProps.content
  );
});
