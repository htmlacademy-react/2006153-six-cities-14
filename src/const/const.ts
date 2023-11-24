import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from '../store';
interface Location {
  city: string;
  id: number;
}
export interface OffersList {
  city: string;
  offers: Offers[];
  points: HotelsPoints[];
}
export interface Offers {
  imageSrc: string;
  price: number;
  name: string;
  rating: number;
  type: string;
  isPremium: boolean;
  location?: string;
  id: number;
}
export interface Hotels {
  city: string;
  points: HotelsPoints[];
}
export interface HotelsPoints {
  latitude: number;
  longitude: number;
  id: number;
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

const Quantity = {
  cards: 5,
} as const;

export default Quantity;

export const isAuthorized = true;

export const urlForPins: string[] = ['/img/pin.svg', '/img/pin-active.svg'];

export interface Comments {
  userName: string;
  rating: number;
  message: string;
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
}
