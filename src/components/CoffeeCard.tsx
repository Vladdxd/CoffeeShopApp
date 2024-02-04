import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {ICoffee} from '../interface/data';
import LinearGradient from 'react-native-linear-gradient';
import {BORDERRADIUS, COLORS, SPACING} from '../theme/theme';
import {useStore} from '../store/store';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface CoffeeCardProps {
  coffee: ICoffee;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({coffee}) => {
  const FavoritesList = useStore((state: any) => state.FavoritesList);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.linearGradient}></LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    // backgroundColor: COLORS.primaryGreyHex,
  },
  linearGradient: {
    width: 140,
    height: 250,
  },
});

export default CoffeeCard;
