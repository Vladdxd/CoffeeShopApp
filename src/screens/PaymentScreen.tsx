import React from 'react';
import {
  ImageSourcePropType,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Header from '../components/Header';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import PaymentMethod from '../components/PaymentMethod';
import CustomIcon from '../components/CustomIcon';
import LinearGradient from 'react-native-linear-gradient';
import PriceWithButton from '../components/PriceWithButton';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {CompositeScreenProps} from '@react-navigation/native';
import {RootTabParamList} from '../navigators/TabNavigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {addToHistory} from '../store/history/orderHistory.slice';
import {initialState, setCartState} from '../store/cart/cart.slice';
import PopUpAnimation from '../components/PopUpAnimation';

// export type PaymentScreenProps = NativeStackScreenProps<
//   RootStackParamList,
//   'Payment'
// >;

type PaymentScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'Payment'>,
  BottomTabScreenProps<RootTabParamList>
>;

export type PaymentList = {
  name: string;
  icon: ImageSourcePropType | string;
  isIcon: boolean;
};

const PaymentList: PaymentList[] = [
  {
    name: 'Wallet',
    icon: 'wallet',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const PaymentScreen: React.FC<PaymentScreenProps> = ({navigation, route}) => {
  const [paymentMode, setPaymentMode] = React.useState<string>('Credit Card');
  const [showAnimation, setShowAnimation] = React.useState<boolean>(false);
  const price = useSelector((state: RootState) => state.cartReducer.fullPrice);
  const {productInCart} = route.params;
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    setShowAnimation(true);
    dispatch(
      addToHistory({
        totalPrice: price,
        products: productInCart,
      }),
    );
    dispatch(setCartState(initialState));
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('OrderHistory');
    }, 3000);
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/successful.json')}
        />
      ) : (
        <></>
      )}
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Header
          hasProfilePhoto={false}
          iconName="left"
          title="Payment"
          handlePressOnIcon={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.screenWrapper}>
          <View style={styles.methodContainer}>
            <TouchableOpacity
              onPress={() => {
                setPaymentMode('Credit Card');
              }}>
              <View
                style={[
                  styles.CreditCardContainer,
                  {
                    borderColor:
                      paymentMode == 'Credit Card'
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryGreyHex,
                  },
                ]}>
                <Text style={styles.CreditCardTitle}>Credit Card</Text>
                <View style={styles.CreditCardBG}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.LinearGradientStyle}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
                    <View style={styles.CreditCardRow}>
                      <CustomIcon
                        name="chip"
                        size={FONTSIZE.size_20 * 2}
                        color={COLORS.primaryOrangeHex}
                      />
                      <CustomIcon
                        name="visa"
                        size={FONTSIZE.size_30 * 2}
                        color={COLORS.primaryWhiteHex}
                      />
                    </View>
                    <View style={styles.CreditCardNumberContainer}>
                      <Text style={styles.CreditCardNumber}>3879</Text>
                      <Text style={styles.CreditCardNumber}>8923</Text>
                      <Text style={styles.CreditCardNumber}>6745</Text>
                      <Text style={styles.CreditCardNumber}>4638</Text>
                    </View>
                    <View style={styles.CreditCardRow}>
                      <View style={styles.CreditCardNameContainer}>
                        <Text style={styles.CreditCardNameSubtitle}>
                          Card Holder Name
                        </Text>
                        <Text style={styles.CreditCardNameTitle}>
                          Robert Evans
                        </Text>
                      </View>
                      <View style={styles.CreditCardDateContainer}>
                        <Text style={styles.CreditCardNameSubtitle}>
                          Expiry Date
                        </Text>
                        <Text style={styles.CreditCardNameTitle}>02/30</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              </View>
            </TouchableOpacity>
            {PaymentList.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setPaymentMode(item.name);
                }}>
                <PaymentMethod
                  method={item}
                  isActive={paymentMode === item.name}
                />
              </TouchableOpacity>
            ))}
          </View>
          <PriceWithButton
            textBtn={`Pay from ${paymentMode}`}
            price={price}
            priceCurrency="$"
            handlePressOnBtn={handleButtonClick}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  screenWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: SPACING.space_16,
  },
  LottieAnimation: {
    flex: 1,
  },
  methodContainer: {
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_30,
  },
  CreditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
  },
  CreditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft: SPACING.space_10,
  },
  CreditCardBG: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_25,
  },
  LinearGradientStyle: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  CreditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CreditCardNumberContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  CreditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_4 + SPACING.space_2,
  },
  CreditCardNameSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CreditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  CreditCardNameContainer: {
    alignItems: 'flex-start',
  },
  CreditCardDateContainer: {
    alignItems: 'flex-end',
  },
});

export default PaymentScreen;
