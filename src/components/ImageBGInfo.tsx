import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from './Header';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {IProduct} from '../interface/data';
import DetailIcon from './DetailIcon';
import CustomIcon from './CustomIcon';
import GradientIcon from './GradientIcon';
import {useDispatch, useSelector} from 'react-redux';
import {addToFavorites} from '../store/favorites/favorites.slice';
import {RootState} from '../store/store';

interface ImageBGInfoProps {
  handlePressOnIcon?: () => void;
  product: IProduct;
  iconName?: string;
}

const ImageBGInfo: React.FC<ImageBGInfoProps> = ({
  handlePressOnIcon,
  product,
  iconName,
}) => {
  const dispatch = useDispatch();
  const [showDescription, setShowDescription] = React.useState<boolean>(false);
  const [isFavorites, setIsFavorites] = React.useState<boolean>(false);
  const favoritesList = useSelector(
    (state: RootState) => state.favoritesReducer,
  );

  console.log('favoritesList', favoritesList);

  React.useEffect(() => {
    setIsFavorites(favoritesList.includes(product.id));
  });
  return (
    <>
      <ImageBackground
        style={styles.imageContainer}
        source={require('../assets/coffee_assets/americano/portrait/americano_pic_1_portrait.png')}>
        <View
          style={[
            styles.containerHeader,
            {
              justifyContent: iconName ? 'space-between' : 'flex-end',
            },
          ]}>
          {iconName && handlePressOnIcon && (
            <TouchableOpacity
              onPress={() => {
                handlePressOnIcon();
              }}>
              <GradientIcon
                name={iconName}
                color={COLORS.primaryWhiteHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              dispatch(addToFavorites(product));
            }}>
            <GradientIcon
              name={'like'}
              color={
                isFavorites ? COLORS.primaryRedHex : COLORS.primaryWhiteHex
              }
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.overlayContainer}>
            <View style={styles.infoContainerRow}>
              <View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.specialIngredient}>
                  {product.special_ingredient}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <DetailIcon
                  iconSize={
                    product.type === 'Bean'
                      ? FONTSIZE.size_18
                      : FONTSIZE.size_30
                  } // FONTSIZE.size_18 : FONTSIZE.size_24
                  iconName={product.type === 'Bean' ? 'bean' : 'beans'}
                  content={product.type}
                />
                <DetailIcon
                  iconSize={FONTSIZE.size_20}
                  iconName={product.type === 'Bean' ? 'location' : 'drop'}
                  content={product.ingredients}
                />
              </View>
            </View>

            <View style={styles.infoContainerRow}>
              <View style={styles.ratingContainer}>
                <CustomIcon
                  name="star"
                  color={COLORS.primaryOrangeHex}
                  size={FONTSIZE.size_16}
                />
                <Text style={styles.averageRating}>
                  {product.average_rating}
                </Text>
                <Text style={styles.ratingsCount}>
                  ({product.ratings_count})
                </Text>
              </View>
              <View style={styles.infoPanel}>
                <Text style={styles.roasted}>{product.roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>Description</Text>
        <TouchableOpacity
          onPress={() => {
            setShowDescription(!showDescription);
          }}>
          <Text
            style={styles.descriptionText}
            numberOfLines={showDescription ? 0 : 3}>
            {product.description}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    // border,
    // aspectRatio: 1,
  },
  containerHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_30,
  },
  infoContainer: {},
  overlayContainer: {
    justifyContent: 'space-between',
    paddingVertical: SPACING.space_18,
    paddingHorizontal: SPACING.space_30,
    backgroundColor: COLORS.secondaryBlackRGBA,
    borderTopRightRadius: SPACING.space_24,
    borderTopLeftRadius: SPACING.space_24,
  },
  infoContainerRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  productName: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  specialIngredient: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
  roasted: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    gap: SPACING.space_20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: SPACING.space_15,
  },
  averageRating: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginHorizontal: SPACING.space_4,
  },
  ratingsCount: {
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  infoPanel: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: SPACING.space_15,
    height: 55,
    width: 55 * 2 + SPACING.space_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainer: {
    paddingHorizontal: SPACING.space_30,
    paddingBottom: SPACING.space_28,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
    marginVertical: SPACING.space_15,
  },
  descriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});

export default React.memo(ImageBGInfo, (prevProps, nextProps) => {
  return (
    prevProps.product.name === nextProps.product.name &&
    prevProps.product.special_ingredient ===
      nextProps.product.special_ingredient
  );
});
