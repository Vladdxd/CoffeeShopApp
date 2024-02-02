import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import CustomIcon from './CustomIcon';
import GradientIcon from './GradientIcon';
import ProfileIcon from './ProfileIcon';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <GradientIcon
        name="menu"
        color={COLORS.primaryWhiteHex}
        size={SPACING.space_18}
      />
      <Text style={styles.title}>{title}</Text>
      <ProfileIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_30,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    lineHeight: 36,
    fontWeight: '600',
  },
});

export default Header;
