import { OffersList } from '../const/const';

export const offers: OffersList[] = [
  {
    city: 'Amsterdam',
    offers: [
      {
        imageSrc: 'img/apartment-01.jpg',
        price: 120,
        name: 'Beautiful & luxurious apartment at great location',
        rating: 80,
        type: 'Apartment',
        isPremium: true,
        location: 'Amsterdam',
        id: 218321738217641,
      },
      {
        imageSrc: 'img/room.jpg',
        price: 80,
        name: 'Wood and stone place',
        rating: 50,
        type: 'Room',
        isPremium: false,
        location: 'Cologne',
        id: 21832173567621,
      },
      {
        imageSrc: 'img/apartment-02.jpg',
        price: 132,
        name: 'Canal View Prinsengracht',
        rating: 60,
        type: 'Apartment',
        isPremium: false,
        location: 'Cologne',
        id: 218321711,
      },
    ],
    points: [
      {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        id: 218321738217641,
      },
      {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        id: 21832173567621,
      },
      {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        id: 218321711,
      },
    ],
  },
  {
    city: 'Paris',
    offers: [
      {
        imageSrc: 'img/apartment-03.jpg',
        price: 180,
        name: 'Nice, cozy, warm big bed apartment',
        rating: 100,
        type: 'Apartment',
        isPremium: true,
        location: 'Cologne',
        id: 2183217323423485,
      },
      {
        imageSrc: 'img/room.jpg',
        price: 80,
        name: 'Wood and stone place',
        rating: 50,
        type: 'Room',
        isPremium: false,
        id: 2183217323423487,
      },
    ],
    points: [
      {
        latitude: 48.8495,
        longitude: 2.332,
        id: 2183217323423487,
      },
      {
        latitude: 48.8697,
        longitude: 2.3332,
        id: 2183217323423485,
      },
    ],
  },
  {
    city: 'Brussels',
    offers: [
      {
        imageSrc: 'img/apartment-03.jpg',
        price: 180,
        name: 'Nice, cozy, warm big bed apartment',
        rating: 100,
        type: 'Apartment',
        isPremium: true,
        location: 'Cologne',
        id: 2183217323423487,
      },
    ],
    points: [
      {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        id: 2183217323423487,
      },
    ],
  },
  {
    city: 'Hamburg',
    offers: [
      {
        imageSrc: 'img/apartment-03.jpg',
        price: 180,
        name: 'Nice, cozy, warm big bed apartment',
        rating: 100,
        type: 'Apartment',
        isPremium: true,
        location: 'Cologne',
        id: 2183217323423487,
      },
    ],
    points: [
      {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        id: 2183217323423487,
      },
    ],
  },
  {
    city: 'Dusseldorf',
    offers: [
      {
        imageSrc: 'img/room.jpg',
        price: 80,
        name: 'Wood and stone place',
        rating: 50,
        type: 'Room',
        isPremium: false,
        id: 2183217323423485,
      },
    ],
    points: [
      {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        id: 2183217323423485,
      },
    ],
  },
  {
    city: 'Cologne',
    offers: [
      {
        imageSrc: 'img/room.jpg',
        price: 80,
        name: 'Wood and stone place',
        rating: 50,
        type: 'Room',
        isPremium: false,
        id: 2183217323423483,
      },
    ],
    points: [
      {
        latitude: 50.9312,
        longitude: 6.9492,
        id: 2183217323423483,
      },
    ],
  },
];
