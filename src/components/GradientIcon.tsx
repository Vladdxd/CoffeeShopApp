import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CustomIcon from './CustomIcon';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SPACING} from '../theme/theme';

interface GradientIconProps {
  name: string;
  color: string;
  size: number;
}

const GradientIcon: React.FC<GradientIconProps> = ({name, color, size}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.linearGradient}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <CustomIcon name={name} size={size} color={color} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    backgroundColor: COLORS.secondaryDarkGreyHex,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: SPACING.space_12,
    overflow: 'hidden',
    width: SPACING.space_36,
    height: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GradientIcon;
