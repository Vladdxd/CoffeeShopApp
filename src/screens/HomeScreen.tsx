import React from 'react';
import {
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
  const cateforyRef = React.useRef<ScrollView>(null);

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
          <TouchableOpacity onPress={() => setSearchText('')}>
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

        <ScrollView
          // ref={cateforyRef}
          // onLayout={() =>
          //   // cateforyRef.current?.scrollTo({x: 0, y: 0, animated: true})
          // }
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroller}>
          {categories.map((category: string, index) => (
            <View style={styles.categoryItemContainer} key={index.toString()}>
              <TouchableOpacity
                onPress={() => setCurrentCategory({index, category})}>
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
                  {category}
                </Text>
                {currentCategory.index === index ? (
                  <View style={styles.activeCategory}></View>
                ) : null}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
  },
  categoryItemContainer: {
    // marginRight: SPACING.space_20,
    paddingHorizontal: SPACING.space_15,
  },
  categoryText: {
    fontSize: FONTSIZE.size_14,
    lineHeight: 20,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  activeCategory: {
    width: SPACING.space_10,
    height: SPACING.space_10,
    borderRadius: SPACING.space_12,
    backgroundColor: COLORS.primaryOrangeHex,
    alignSelf: 'center',
    marginTop: SPACING.space_2,
  },
});

export default HomeScreen;
