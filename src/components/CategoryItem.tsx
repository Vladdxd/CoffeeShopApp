import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

interface CategoryItemProps {
  category: string;
  index: number;
  handlePressOnCategory: (index: number, category: string) => void;
  isActive: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  index,
  handlePressOnCategory,
  isActive,
}) => {
  return (
    <View style={styles.categoryItemContainer} key={index.toString()}>
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => {
          handlePressOnCategory(index, category);
        }}>
        <Text
          style={[
            styles.categoryText,
            {
              color: isActive
                ? COLORS.primaryOrangeHex
                : COLORS.primaryLightGreyHex,
            },
          ]}>
          {category}
        </Text>
        {isActive ? <View style={styles.activeCategory}></View> : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryScroller: {
    paddingHorizontal: SPACING.space_20,
    // marginBottom: SPACING.space_20,
  },
  categoryItemContainer: {
    // marginRight: SPACING.space_20,
    paddingHorizontal: SPACING.space_15,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryText: {
    fontSize: FONTSIZE.size_16,
    lineHeight: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryLightGreyHex,
  },
  activeCategory: {
    width: SPACING.space_10,
    height: SPACING.space_10,
    borderRadius: SPACING.space_12,
    backgroundColor: COLORS.primaryOrangeHex,
    // alignSelf: 'center',
    marginTop: SPACING.space_2,
  },
});

export default React.memo(CategoryItem, (prevProps, nextProps) => {
  return prevProps.isActive === nextProps.isActive;
});

// export default React.memo(CategoryItem);
