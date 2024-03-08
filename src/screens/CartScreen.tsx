import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {
  calculateFullPrice,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  setQuantity,
} from '../store/cart/cart.slice';
import PriceWithButton from '../components/PriceWithButton';
import {
  BottomTabScreenProps,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import EmptyListAnimation from '../components/EmptyListAnimation';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootTabParamList} from '../navigators/TabNavigator';
import {RootStackParamList} from '../../App';
import {IProductWithQuantity} from '../interface/data';

export type CartScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Cart'>,
  NativeStackScreenProps<RootStackParamList>
>;

const CartScreen: React.FC<CartScreenProps> = ({navigation}) => {
  const CoffeList = useSelector((state: RootState) => state.coffeeReducer);
  const BeanList = useSelector((state: RootState) => state.beansReducer);
  const CartState = useSelector((state: RootState) => state.cartReducer);

  const tabBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();

  const productInCart: IProductWithQuantity[] = React.useMemo(() => {
    const filteredProductInCart: IProductWithQuantity[] = [
      ...CoffeList,
      ...BeanList,
    ]
      .map(item => {
        for (let i = 0; i < CartState.cartList.length; i++) {
          if (item.id === CartState.cartList[i].id) {
            return {...item, ...CartState.cartList[i]};
          }
        }
        return null; // Return null for items not found in the cart
      })
      .filter(item => item !== null) as IProductWithQuantity[];

    return filteredProductInCart;
  }, [CoffeList, BeanList, CartState.cartList]);

  const handleSetQuantity = React.useCallback(
    (id: string, size: string, quantity: number) => {
      dispatch(setQuantity({id, size, quantity}));
      dispatch(calculateFullPrice());
    },
    [],
  );

  const handleRemove = React.useCallback((id: string) => {
    dispatch(removeFromCart(id));
  }, []);

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {productInCart.length === 0 ? (
        <View style={styles.EmptyContainer}>
          <Header title="Cart" hasProfilePhoto={true} iconName="menu" />
          <EmptyListAnimation title="Your cart is empty" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[styles.ScrollViewContainer]}
          showsVerticalScrollIndicator={false}
          style={{marginBottom: tabBarHeight}}>
          <View>
            <Header title="Cart" hasProfilePhoto={true} iconName="menu" />
            <View style={styles.itemContainer}>
              {productInCart.map(
                product =>
                  product && (
                    <CartItem
                      key={product.id.toString()}
                      product={product}
                      handleSetQuantity={handleSetQuantity}
                      handleRemove={handleRemove}
                    />
                  ),
              )}
            </View>
          </View>
          <PriceWithButton
            price={CartState.fullPrice}
            priceCurrency={productInCart[0].prices[0].currency}
            textBtn="Pay"
            handlePressOnBtn={() => {
              if (CartState.fullPrice === 0) return;
              navigation.push('Payment', {
                productInCart: productInCart,
              });
            }}
          />
        </ScrollView>
      )}
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
    justifyContent: 'space-between',
  },
  EmptyContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  itemContainer: {
    gap: SPACING.space_16,
    marginBottom: SPACING.space_30,
  },
});

export default CartScreen;
