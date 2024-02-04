import React from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStore} from '../store/store';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Header from '../components/Header';
import CustomIcon from '../components/CustomIcon';
import {ICoffee} from '../interface/data';
import CoffeeCard from '../components/CoffeeCard';

interface TempObject {
  [key: string]: number;
}
const getCategories = (list: ICoffee[]): string[] => {
  let temp: TempObject = {};
  list.forEach(item => {
    if (temp[item.name] === undefined) temp[item.name] = 1;
  });
  const categories = Object.keys(temp);
  categories.unshift('All');
  console.log(categories);

  return categories;
};

const getSortedCoffee = (
  list: ICoffee[],
  currentCategory: string,
  searchText: string,
) => {
  if (currentCategory === 'All') {
    console.log('seacrh text', searchText.length);

    return searchText.length === 0
      ? list
      : list.filter(item => item.name.includes(searchText));
  }
  const temp = list.filter(item => item.name === currentCategory);
  return temp;
};

const HomeScreen = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const [searchText, setSearchText] = React.useState<string>('');
  const [categories, setCategories] = React.useState<string[]>(() =>
    getCategories(CoffeeList),
  );
  const [currentCategory, setCurrentCategory] = React.useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = React.useState<ICoffee[]>(() =>
    getSortedCoffee(CoffeeList, currentCategory.category, searchText),
  );
  const categoryRef = React.useRef<FlatList>(null);

  console.log(sortedCoffee.length);

  const scrollToSelectedCategory = (index: number) => {
    categoryRef.current!.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollView}>
        {/* App header */}
        <Header />
        <Text style={styles.title}>Find the best{'\n'}coffee for you</Text>

        {/* Search Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => {
              setSortedCoffee(
                getSortedCoffee(
                  CoffeeList,
                  currentCategory.category,
                  searchText,
                ),
              );
              // setSearchText('');
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
            onChangeText={value => setSearchText(value)}
            placeholder="Find your Coffee..."
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInput}
          />
        </View>

        {/* Category Scroller */}

        <FlatList
          data={categories}
          ref={categoryRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroller}
          renderItem={({item, index}: {item: string; index: number}) => (
            <View style={styles.categoryItemContainer} key={index.toString()}>
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => {
                  setCurrentCategory({index, category: item});
                  setSortedCoffee([
                    ...getSortedCoffee(CoffeeList, item, searchText),
                  ]);
                  scrollToSelectedCategory(index);
                }}>
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color:
                        currentCategory.index === index
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryLightGreyHex,
                    },
                  ]}>
                  {item}
                </Text>
                {currentCategory.index === index ? (
                  <View style={styles.activeCategory}></View>
                ) : null}
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Coffee List */}

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.coffeeList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity>
              <CoffeeCard coffee={item} />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    // padding: 30,
  },
  ScrollView: {
    flex: 1,
  },
  title: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontWeight: '600',
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
    marginBottom: SPACING.space_20,
    // flex: 0,
    // flexGrow: 0,
    // flexShrink: 0,
  },
  categoryItemContainer: {
    marginRight: SPACING.space_20,
    paddingHorizontal: SPACING.space_15,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryText: {
    fontSize: FONTSIZE.size_16,
    lineHeight: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  activeCategory: {
    width: SPACING.space_10,
    height: SPACING.space_10,
    borderRadius: SPACING.space_12,
    backgroundColor: COLORS.primaryOrangeHex,
    // alignSelf: 'center',
    marginTop: SPACING.space_2,
  },
  coffeeList: {
    paddingHorizontal: SPACING.space_30,
    paddingVertical: SPACING.space_20,
    gap: SPACING.space_20,
    backgroundColor: 'red',
  },
});

export default HomeScreen;
