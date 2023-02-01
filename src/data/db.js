export const foodMenus = [
  {
    title: 'A Plate with Chicken',
    icon: require('../../assets/images/aPlateWithChicken.png'),
    image: [
      require('../../assets/images/aPlateWithChicken1.png'),
      require('../../assets/images/aPlateWithChicken2.png'),
    ],
    additionals: [],
    desserts: [],
    drinks: [],
    price: 1000,
    deliveryFee: 500,
    id: 1,
  },
  {
    title: 'A Plate with Beef',
    icon: require('../../assets/images/aPlateWithBeef.png'),
    image: [
      require('../../assets/images/aPlateWithBeef1.png'),
      require('../../assets/images/aPlateWithBeef2.png'),
    ],
    additionals: [],
    desserts: [],
    drinks: [],
    price: 600,
    deliveryFee: 500,
    id: 2,
  },
  {
    title: 'A Plate with Croaker Fish',
    icon: require('../../assets/images/aPlateWithCroakerFish.png'),
    image: [require('../../assets/images/aPlateWithCroakerFish1.png')],
    //   image2: require('../../assets/images/aPlateWithCroakerFish2.png'),
    additionals: [],
    desserts: [],
    drinks: [],
    price: 1150,
    deliveryFee: 500,
    id: 3,
  },
  {
    title: 'A Plate with Fish',
    icon: require('../../assets/images/aPlateWithFish.png'),
    image: [require('../../assets/images/aPlateWithFish1.png')],
    //   image2: require('../../assets/images/aPlateWithFish2.png'),
    additionals: [],
    desserts: [],
    drinks: [],
    price: 750,
    deliveryFee: 500,
    id: 4,
  },
  {
    icon: require('../../assets/images/desserts.png'),
    title: 'Desserts',
    id: 5,
  },
  {
    title: 'Drinks',
    icon: require('../../assets/images/drinksIcon.png'),
    image: [require('../../assets/images/drinks.png')],
    id: 6,
  },
  {
    icon: require('../../assets/images/favourite.png'),
    title: 'Favourites',
    id: 7,
  },
];

export const dessertsData = [
  {
    title: 'Beef Shawarma',
    icon: require('../../assets/images/beefShawarmaIcon.png'),
    image: [require('../../assets/images/BeefShawarma.png')],
    price: 750,
    deliveryFee: 200,
    id: 1,
  },
  {
    title: 'Chicken Shawarma',
    icon: require('../../assets/images/chickenShawarmaIcon.png'),
    image: [require('../../assets/images/ChickenShawarma1.png')],
    price: 750,
    deliveryFee: 200,
    id: 2,
  },
  {
    title: 'Coleslaw',
    icon: require('../../assets/images/coleslawIcon.png'),
    image: [require('../../assets/images/coleslaw1.png')],
    price: 750,
    deliveryFee: 200,
    id: 3,
  },
];

export const DrinksData = [
  {
    title: 'Coke',
    price: '100',
  },
  {
    title: 'Fanta',
    price: '100',
  },
  {
    title: 'Sprite',
    price: '100',
  },
];

export const AllData = [...foodMenus, ...dessertsData, ...DrinksData];
