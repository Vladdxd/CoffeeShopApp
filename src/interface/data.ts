import {ImageProps, ImageSourcePropType} from 'react-native';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: string; // ImageSourcePropType
  imagelink_portrait: string;
  ingredients: string;
  special_ingredient: string;
  prices: {size: string; price: string; currency: string}[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
}
export interface IProductWithQuantity extends IProduct {
  prices: {
    size: string;
    price: string;
    currency: string;
    quantity: number;
  }[];
}
