export interface ICoffee {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: any; // NodeRequire
  imagelink_portrait: any;
  ingredients: string;
  special_ingredient: string;
  prices: {size: string; price: string; currency: string}[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
}
