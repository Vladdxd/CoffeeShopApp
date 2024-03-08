import React from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Header from '../components/Header';
import OrderHistoryItem from '../components/OrderHistoryItem';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import PopUpAnimation from '../components/PopUpAnimation';
import EmptyListAnimation from '../components/EmptyListAnimation';

const OrderHistoryScreen = () => {
  const orderHistoryList = useSelector(
    (state: RootState) => state.orderHistoryReducer,
  );
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = React.useState(false);

  return (
    <View style={[styles.screenContainer]}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {orderHistoryList.length === 0 ? (
        <View style={styles.EmptyContainer}>
          <Header
            title="Order History"
            hasProfilePhoto={true}
            iconName="menu"
          />
          <EmptyListAnimation title="Your history is empty" />
        </View>
      ) : (
        <>
          {showAnimation ? (
            <PopUpAnimation
              style={styles.LottieAnimation}
              source={require('../lottie/download.json')}
            />
          ) : (
            <></>
          )}
          <Header
            hasProfilePhoto={true}
            iconName="menu"
            title="Order History"
          />
          <FlatList
            keyExtractor={item => item.orderDate}
            contentContainerStyle={[
              styles.flatList,
              {paddingBottom: tabBarHeight + 20},
            ]}
            data={orderHistoryList}
            renderItem={({item}) => (
              <OrderHistoryItem orderHistoryItem={item} />
            )}
            ListFooterComponent={
              <TouchableOpacity
                style={[styles.downloadBtn]}
                onPress={() => {
                  setShowAnimation(true);
                  setTimeout(() => {
                    setShowAnimation(false);
                  }, 2500);
                }}>
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            }
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  EmptyContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  flatList: {
    paddingHorizontal: SPACING.space_30,
    gap: SPACING.space_12,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  downloadBtn: {
    paddingHorizontal: SPACING.space_30,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_30 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  downloadText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
  },
  LottieAnimation: {
    flex: 1,
  },
});

export default OrderHistoryScreen;
