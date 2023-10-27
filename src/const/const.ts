interface Location {
  city: string;
  id: number;
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

export const isAuthorized = false;
