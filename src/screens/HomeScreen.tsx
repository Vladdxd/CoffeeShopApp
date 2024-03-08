import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {IProduct} from '../interface/data';
import {Dimensions} from 'react-native';

import Header from '../components/Header';
import CustomIcon from '../components/CustomIcon';
import ProductCard from '../components/ProductCard';

import {
  BottomTabScreenProps,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {RootTabParamList} from '../navigators/TabNavigator';
import {CompositeScreenProps} from '@react-navigation/native';

import type {RootState} from '../store/store';
import {useSelector, useDispatch} from 'react-redux';
import CategoryItem from '../components/CategoryItem';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {Product} from '../services/product/product.service';
import {setCoffee} from '../store/coffee/coffee.slice';
import {setBeans} from '../store/beans/beans.slice';

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const getCategories = (list: IProduct[]): string[] => {
  let temp: {
    [key: string]: number;
  } = {};
  list.forEach(item => {
    if (temp[item.name] === undefined) temp[item.name] = 1;
  });
  const categories = Object.keys(temp);
  categories.unshift('All');

  return categories;
};

const getSortedCoffee = (list: IProduct[], currentCategory: string) => {
  return currentCategory === 'All'
    ? list
    : list.filter(item => item.name === currentCategory);
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const tabBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const CoffeeData = useQuery<IProduct[]>({
    queryKey: ['CoffeeList'],
    queryFn: Product.getCoffee,
  });

  const BeanData = useQuery<IProduct[]>({
    queryKey: ['BeanList'],
    queryFn: Product.getBeans,
  });

  const CoffeeList = useSelector((state: RootState) => state.coffeeReducer);

  const cartList = useSelector(
    (state: RootState) => state.cartReducer.cartList,
  );

  const [searchText, setSearchText] = React.useState<string>('');
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<string[]>(() =>
    getCategories([]),
  );

  const [currentCategory, setCurrentCategory] = React.useState({
    index: 0,
    category: categories[0],
  });

  const [sortedCoffee, setSortedCoffee] = React.useState<IProduct[]>([]);

  const categoryRef = React.useRef<FlatList>(null);
  const coffeeRef = React.useRef<FlatList>(null);

  const scrollToSelectedIndex = React.useCallback(
    (ref: React.RefObject<FlatList>, index: number) => {
      ref.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    },
    [],
  );
  const handleSearch = (searchText: string) => {
    if (searchText.length !== 0) {
      setIsSearching(true);
      scrollToSelectedIndex(categoryRef, 0);
      setCurrentCategory({index: 0, category: categories[0]});
      coffeeRef.current?.scrollToOffset({offset: 0, animated: true});
      setSortedCoffee([
        ...CoffeeList.filter(item =>
          item.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      ]);
    } else handleSearchReset();
  };
  const handleSearchReset = () => {
    if (isSearching) {
      coffeeRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });

      setCurrentCategory({index: 0, category: categories[0]});
      scrollToSelectedIndex(categoryRef, 0);
      setSortedCoffee([...CoffeeList]);
      setIsSearching(false);
    }
    searchText.length !== 0 && setSearchText('');
  };
  const handlePressOnCategory = (index: number, item: string) => {
    setCurrentCategory({index, category: item});
    setSortedCoffee([...getSortedCoffee(CoffeeList, item)]);
    scrollToSelectedIndex(categoryRef, index);
    coffeeRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
    isSearching && setIsSearching(false);
  };

  React.useEffect(() => {
    if (BeanData.data) {
      dispatch(setBeans(BeanData.data));
    }
  }, [BeanData.data]);

  React.useEffect(() => {
    if (CoffeeData.data) {
      dispatch(setCoffee(CoffeeData.data));
      setCategories(getCategories(CoffeeData.data));
      setSortedCoffee([
        ...getSortedCoffee(CoffeeData.data, currentCategory.category),
      ]);
    }
  }, [CoffeeData.data]);

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={CoffeeData.isFetching}
            onRefresh={() =>
              queryClient.invalidateQueries({
                queryKey: ['CoffeeList'],
              })
            }
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.ScrollView,
          // {paddingBottom: tabBarHeight},
        ]}>
        {/* App header */}
        <Header
          hasProfilePhoto={true}
          iconName="menu"
          handlePressOnIcon={() => {}}
        />
        <Text style={styles.title}>Find the best{'\n'}coffee for you</Text>
        {/* Search Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => {
              handleSearch(searchText);
            }}>
            <CustomIcon
              style={styles.inputIcon}
              name="search"
              size={20}
              color={
                searchText
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            value={searchText}
            onChangeText={value => {
              setSearchText(value);
              handleSearch(value);
            }}
            placeholder="Find your Coffee..."
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInput}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => handleSearchReset()}>
              <CustomIcon
                style={styles.inputIcon}
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* Category Scroller */}
        <FlatList
          data={categories}
          ref={categoryRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroller}
          renderItem={({item, index}: {item: string; index: number}) => {
            const isActive = currentCategory.category === item;

            return (
              <CategoryItem
                category={item}
                index={index}
                handlePressOnCategory={handlePressOnCategory}
                isActive={isActive}
              />
            );
          }}
        />
        {/* Coffee List */}

        <FlatList
          ref={coffeeRef}
          horizontal
          initialNumToRender={4}
          maxToRenderPerBatch={3}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.categoryText}>No coffee found</Text>
            </View>
          }
          data={sortedCoffee}
          contentContainerStyle={styles.coffeeList}
          keyExtractor={item => item.id}
          renderItem={({item}: {item: IProduct}) => {
            const isExistInCart = cartList.some(
              product => product.id === item.id,
            );

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {id: item.id, type: item.type});
                }}>
                <ProductCard
                  // imageLink={require(item.imagelink_square)}
                  product={item}
                  isExistInCart={isExistInCart}
                  navigation={navigation}
                />
              </TouchableOpacity>
            );
          }}
        />
        {/* Beans List*/}
        <Text style={styles.BeansTitle}>Coffee beans</Text>
        <FlatList
          horizontal
          initialNumToRender={3}
          showsHorizontalScrollIndicator={false}
          data={BeanData.data}
          ListEmptyComponent={
            BeanData.isLoading ? (
              <View style={styles.emptyContainer}>
                <ActivityIndicator size={'large'} />
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.categoryText}>No beans found</Text>
              </View>
            )
          }
          contentContainerStyle={[
            styles.coffeeList,
            {marginBottom: tabBarHeight},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const isExistInCart = cartList.some(
              product => product.id === item.id,
            );

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {id: item.id, type: item.type});
                }}>
                <ProductCard
                  // imageLink={require(item.imagelink_square)}
                  product={item}
                  isExistInCart={isExistInCart}
                  navigation={navigation}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollView: {
    flexGrow: 1,
  },
  title: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    lineHeight: SPACING.space_36,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  inputContainer: {
    margin: SPACING.space_30,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: SPACING.space_18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  textInput: {
    flex: 1,
    height: SPACING.space_20 * 3,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  categoryScroller: {
    paddingHorizontal: SPACING.space_20,
  },
  categoryText: {
    fontSize: FONTSIZE.size_16,
    lineHeight: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryLightGreyHex,
  },
  coffeeList: {
    paddingHorizontal: SPACING.space_30,
    paddingVertical: SPACING.space_20,
    gap: SPACING.space_20,
    // backgroundColor: 'red',
  },
  emptyContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.33,
  },
  BeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
});

export default HomeScreen;
