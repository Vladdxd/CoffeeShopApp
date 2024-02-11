import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {combine} from 'zustand/middleware';
import {
  calculateFullPrice,
  decrementQuantity,
  incrementQuantity,
} from '../store/cart/cart.slice';
import PriceWithButton from '../components/PriceWithButton';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const CartScreen = () => {
  const CoffeList = useSelector((state: RootState) => state.coffeeReducer);
  const BeanList = useSelector((state: RootState) => state.beansReducer);
  const CartState = useSelector((state: RootState) => state.cartReducer);

  const tabBarHeight = useBottomTabBarHeight();
  const idInCart: string[] = React.useMemo(
    () => CartState.cartList.map(item => item.id),
    [CartState],
  );
  const dispatch = useDispatch();

  const productInCart = React.useMemo(() => {
    const combineList = [...CoffeList, ...BeanList];

    return combineList
      .filter(item => {
        return idInCart.includes(item.id);
      })
      .map(item => {
        for (let i = 0; i < CartState.cartList.length; i++) {
          if (item.id === CartState.cartList[i].id)
            return {...item, ...CartState.cartList[i]};
        }
      });
  }, [CoffeList, BeanList, idInCart]);

  const handleIncrement = React.useCallback((id: string, size: string) => {
    dispatch(incrementQuantity({id, size}));
    dispatch(calculateFullPrice());
  }, []);
  const handleDecrement = React.useCallback((id: string, size: string) => {
    dispatch(decrementQuantity({id, size}));
    dispatch(calculateFullPrice());
  }, []);

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView style={styles.ScrollViewContainer}>
        <Header title="Cart" hasProfilePhoto={true} iconName="menu" />
        <View style={styles.itemContainer}>
          {productInCart.length > 0 &&
            productInCart.map(
              product =>
                product && (
                  <CartItem
                    key={product.id.toString()}
                    product={product}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                  />
                ),
            )}
        </View>
        {productInCart[0] && (
          <View style={{marginBottom: tabBarHeight}}>
            <PriceWithButton
              price={CartState.fullPrice}
              priceCurrency={productInCart[0].prices[0].currency}
              textBtn="Pay"
              handlePressOnBtn={() => {}}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    gap: SPACING.space_16,
    marginBottom: SPACING.space_30,
  },
});

export default CartScreen;
