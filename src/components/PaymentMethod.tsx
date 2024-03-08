import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';
import {PaymentList} from '../screens/PaymentScreen';

interface IPaymentMethodProps {
  method: PaymentList;
  isActive: boolean;
}

const PaymentMethod: React.FC<IPaymentMethodProps> = ({method, isActive}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={[
        styles.container,
        {
          borderColor: isActive
            ? COLORS.primaryOrangeHex
            : COLORS.primaryGreyHex,
          borderWidth: 2,
        },
      ]}>
      {method.isIcon ? (
        <View style={styles.walletItem}>
          <View style={styles.walletWrapper}>
            <CustomIcon
              name="wallet"
              color={COLORS.primaryOrangeHex}
              size={25}
              style={styles.image}
            />
            <Text style={styles.methodText}>{method.name}</Text>
          </View>
          <Text style={styles.walletText}>$100.50</Text>
        </View>
      ) : (
        <View style={styles.methodType}>
          <Image
            source={method.icon as ImageSourcePropType}
            style={styles.image}
          />
          <Text style={styles.methodText}>{method.name}</Text>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  walletItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletWrapper: {
    flexDirection: 'row',
    gap: SPACING.space_15,
    alignItems: 'center',
  },
  methodType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_15,
  },
  methodText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    lineHeight: 20,
  },
  walletText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    lineHeight: 19,
  },
  image: {
    height: 25,
    width: 25,
  },
});

export default PaymentMethod;
