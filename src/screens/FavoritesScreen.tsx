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
import {BORDERRADIUS, COLORS, SPACING} from '../theme/theme';
import Header from '../components/Header';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import ImageBGInfo from '../components/ImageBGInfo';
import LinearGradient from 'react-native-linear-gradient';
import {
  BottomTabScreenProps,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootTabParamList} from '../navigators/TabNavigator';
import {RootStackParamList} from '../../App';
import EmptyListAnimation from '../components/EmptyListAnimation';

export type FavoritesScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Favorites'>,
  NativeStackScreenProps<RootStackParamList>
>;

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({navigation}) => {
  const CoffeList = useSelector((state: RootState) => state.coffeeReducer);
  const BeanList = useSelector((state: RootState) => state.beansReducer);
  const FavoritesList = useSelector(
    (state: RootState) => state.favoritesReducer,
  );
  const tabBarHeight = useBottomTabBarHeight();

  const productInFavorites = React.useMemo(() => {
    const combineList = [...CoffeList, ...BeanList];

    return combineList.filter(item => {
      return FavoritesList.includes(item.id);
    });
  }, [CoffeList, BeanList, FavoritesList]);

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {productInFavorites.length === 0 ? (
        <View style={styles.EmptyContainer}>
          <Header title="Favorites" hasProfilePhoto={true} iconName="menu" />
          <EmptyListAnimation title="Your favorites list is empty" />
        </View>
      ) : (
        <>
          <Header hasProfilePhoto={true} iconName="menu" title="Favorites" />
          <FlatList
            contentContainerStyle={[
              styles.flatListContainer,
              {paddingBottom: tabBarHeight},
            ]}
            keyExtractor={item => item.id}
            data={productInFavorites}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {id: item.id, type: item.type});
                }}>
                <LinearGradient
                  style={styles.itemContainer}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}>
                  <ImageBGInfo product={item} />
                </LinearGradient>
              </TouchableOpacity>
            )}
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
  scrollViewContainer: {
    flexGrow: 1,
  },
  flatListContainer: {
    paddingHorizontal: SPACING.space_30,
    gap: SPACING.space_28,
  },
  itemContainer: {
    height: 575,
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
  },
  EmptyContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default FavoritesScreen;
