import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from '../store';

export interface Location {
  city: string;
  id: number;
}
export interface Offers {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage?: string;
  city: CityLocation;
  location: HotelsPoints;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}
export interface OfferDetails {
  bedrooms: number;
  city: Hotels;
  description: string;
  goods: string[];
  host: CommentsUser;
  id: string;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: HotelsPoints;
  maxAdults: number;
  price: number;
  rating: number;
  title: string;
  type: string;
}
export interface OffersLocation {
  location: HotelsPoints;
}
interface CityLocation {
  name: string;
  location: HotelsPoints;
}
interface Hotels {
  city: string;
  points: HotelsPoints;
}
export interface HotelsPoints {
  latitude: number;
  longitude: number;
  zoom: number;
}
export const pinsSize: PinsSizes = { iconSize: [40, 40], iconAnchor: [20, 40] };

export interface PinsSizes {
  iconSize: [number, number];
  iconAnchor: [number, number];
}
export const locations: Location[] = [
  {
    city: 'Paris',
    id: 893394,
  },
  {
    city: 'Cologne',
    id: 602643,
  },
  {
    city: 'Brussels',
    id: 116101,
  },
  {
    city: 'Amsterdam',
    id: 655490,
  },
  {
    city: 'Hamburg',
    id: 678138,
  },
  {
    city: 'Dusseldorf',
    id: 307075,
  },
];

const QuantityOfThings = {
  MAX_RATING: 5,
  REQUEST_TIMEOUT: 5000,
  MIN_COMMENT_LENGTH: 50,
  MAX_COMMENT_LENGTH: 300,
} as const;

export default QuantityOfThings;

export const urlForPins: string[] = ['/img/pin.svg', '/img/pin-active.svg'];

export interface Comments {
  comment: string;
  date: string;
  id: string;
  rating: number;
  user: CommentsUser;
  userName?: string;
  userRating?: string;
  userMessage?: string;
}
export interface CommentsUser {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}
export interface offerID {
  id: string;
}
export const startCity = 'Paris';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const sortListsItems: SortListsItems[] = [
  {
    text: 'Popular',
    value: 'popular',
  },
  {
    text: 'Price: low to high',
    value: 'lth',
  },
  {
    text: 'Price: high to low',
    value: 'htl',
  },
  {
    text: 'Top Rated First',
    value: 'top',
  },
];

interface SortListsItems {
  text: string;
  value: string;
}

export enum APIRoutes {
  Offers = '/offers',
  Title = '/title',
  Login = '/login',
  Comments = '/comments',
  Favorite = '/favorite',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
export type AuthData = {
  login: string;
  password: string;
  email?: string;
  avatarUrl?: string;
};
export type UserID = {
  id: string;
};
export type UserData = {
  id: string;
  email: string;
  token: string;
  avatarUrl?: string;
  emailUser?: string;
  isPro: boolean;
};
export type DetailMessageType = {
  type: string;
  message: string;
};
export type userDataType = {
  email: string;
  avatarUrl: string;
};
export interface NearByOffersInterface {}

export const ImageSize: ImageSizeInt = {
  imageHeight: '200',
  imageWidth: '260',
};
interface ImageSizeInt {
  imageHeight: string;
  imageWidth: string;
}
