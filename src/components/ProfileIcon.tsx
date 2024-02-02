import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';

const ProfileIcon = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require('../assets/app_images/avatar.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    // width: SPACING.space_36,
    // height: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: SPACING.space_36,
    height: SPACING.space_36,
  },
});

export default ProfileIcon;
