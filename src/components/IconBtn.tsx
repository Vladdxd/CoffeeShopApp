import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomIcon from './CustomIcon';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';

interface IconBtnProps {
  name: string;
  size: number;
  color: string;
}

const IconBtn: React.FC<IconBtnProps> = ({name, size, color}) => {
  return (
    <View style={styles.container}>
      <CustomIcon name={name} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_10,
    // padding: SPACING.space_10,
    width: SPACING.space_30,
    height: SPACING.space_30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconBtn;
