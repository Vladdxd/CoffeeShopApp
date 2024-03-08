import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../theme/theme';

interface PopUpAnimationProps {
  source: string;
  style: any;
}

const PopUpAnimation: React.FC<PopUpAnimationProps> = ({source, style}) => {
  return (
    <View style={styles.container}>
      <LottieView style={style} autoPlay loop={false} source={source} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondaryBlackRGBA,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 100,
  },
});

export default PopUpAnimation;
