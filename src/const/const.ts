interface Location {
  city: string;
  id: number;
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
export const pinsSize = { iconSize: [40, 40], iconAnchor: [20, 40] };

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
