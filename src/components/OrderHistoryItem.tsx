import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import {IOrderHistory} from '../store/history/orderHistory.slice';

type OrderHistoryItemProps = {
  orderHistoryItem: IOrderHistory;
};

const OrderHistoryItem: React.FC<OrderHistoryItemProps> = ({
  orderHistoryItem,
}) => {
  return (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Order Data</Text>
          <Text style={styles.dataText}>{orderHistoryItem.orderDate}</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.headerText}>Total Amount</Text>
          <Text style={styles.priceText}>
            {orderHistoryItem.products[0].prices[0].currency}{' '}
            {orderHistoryItem.totalPrice}
          </Text>
        </View>
      </View>
      {orderHistoryItem.products.map(item => {
        const itemPrice = React.useMemo(() => {
          return item.prices
            .reduce(
              (total, item) => total + parseFloat(item.price) * item.quantity,
              0,
            )
            .toFixed(2);
        }, [item]);

        return parseFloat(itemPrice) === 0 ? (
          <></>
        ) : (
          <LinearGradient
            key={item.id}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.linearGradient}>
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.imagelink_square,
                  }}
                />
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.specialIngredient}>
                    {item.special_ingredient}
                  </Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.priceCurrency}>
                  {item.prices[0].currency + ' '}
                  <Text style={styles.price}>{itemPrice}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.sizeContainer}>
              {item.prices
                .filter(el => el.quantity !== 0)
                .map(priceList => (
                  <View key={priceList.size} style={styles.sizeItem}>
                    <View style={styles.itemWrapper}>
                      <View style={styles.priceContainer}>
                        <View style={styles.sizePanel}>
                          <Text
                            style={[
                              styles.currentSize,
                              {
                                fontSize:
                                  item.type === 'Bean'
                                    ? FONTSIZE.size_10
                                    : FONTSIZE.size_16,
                                color:
                                  item.type === 'Bean'
                                    ? COLORS.secondaryLightGreyHex
                                    : COLORS.primaryWhiteHex,
                              },
                            ]}>
                            {priceList.size}
                          </Text>
                        </View>
                        <View style={styles.pricePanel}>
                          <Text
                            style={[
                              styles.priceCurrency,
                              {
                                fontSize: FONTSIZE.size_16,
                                lineHeight: 20,
                              },
                            ]}>
                            {priceList.currency + ' '}
                            <Text style={styles.price}>{priceList.price}</Text>
                          </Text>
                        </View>
                      </View>
                      <View style={styles.quantityContainer}>
                        <Text style={styles.quantitySymbol}>
                          X {}
                          <Text style={styles.quantity}>
                            {priceList.quantity}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.itemWrapper}>
                      <Text style={styles.totalPrice}>
                        {(
                          priceList.quantity * parseFloat(priceList.price)
                        ).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          </LinearGradient>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.space_8,
  },
  headerText: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
  dataText: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
  },
  priceText: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryOrangeHex,
  },
  linearGradient: {
    paddingHorizontal: SPACING.space_18,
    paddingVertical: SPACING.space_12,
    borderRadius: SPACING.space_24,
    marginBottom: SPACING.space_20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: SPACING.space_12,
  },
  infoItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    marginRight: SPACING.space_20,
    width: 57,
    height: 57,
    borderRadius: BORDERRADIUS.radius_15,
    overflow: 'hidden',
  },
  priceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
  price: {
    color: COLORS.primaryWhiteHex,
  },
  name: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    lineHeight: SPACING.space_20,
  },
  specialIngredient: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
  },
  sizeItem: {
    flexDirection: 'row',
    // marginBottom: SPACING.space_10,
    justifyContent: 'space-between',
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_28,
  },
  sizeContainer: {
    gap: SPACING.space_10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_2,
  },
  sizePanel: {
    backgroundColor: COLORS.primaryBlackHex,
    width: 56,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_10,
    borderTopLeftRadius: BORDERRADIUS.radius_10,
  },
  pricePanel: {
    backgroundColor: COLORS.primaryBlackHex,
    minWidth: 85,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: BORDERRADIUS.radius_10,
    borderTopRightRadius: BORDERRADIUS.radius_10,
  },
  currentSize: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantitySymbol: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    // lineHeight: 20,
  },
  quantity: {
    color: COLORS.primaryWhiteHex,
  },
  totalPrice: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    // lineHeight: 20,
  },
});

export default React.memo(OrderHistoryItem, (prevProps, nextProps) => {
  return (
    prevProps.orderHistoryItem.orderDate ===
    nextProps.orderHistoryItem.orderDate
  );
});
