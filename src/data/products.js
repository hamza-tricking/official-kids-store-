import game1 from '../assets/game (1).jpg';
import game2 from '../assets/game (2).jpg';
import game3 from '../assets/game (3).jpg';
import game4 from '../assets/game (4).jpg';
import game5 from '../assets/game (5).jpg';
import game6 from '../assets/game (6).jpg';

export const products = [
  {
    id: 1,
    nameKey: 'buildingBlocksName',
    descriptionKey: 'buildingBlocksDescription',
    image: game1,
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewCount: 128,
    badges: ['badgeNew', 'badgeSale'],
    category: 'educational'
  },
  {
    id: 2,
    nameKey: 'artSetName',
    descriptionKey: 'artSetDescription',
    image: game2,
    price: 24.99,
    rating: 5,
    reviewCount: 89,
    badges: ['badgeBestseller'],
    category: 'creative'
  },
  {
    id: 3,
    nameKey: 'scienceKitName',
    descriptionKey: 'scienceKitDescription',
    image: game3,
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.8,
    reviewCount: 156,
    badges: ['badgeSale'],
    category: 'science'
  },
  {
    id: 4,
    nameKey: 'musicalSetName',
    descriptionKey: 'musicalSetDescription',
    image: game4,
    price: 39.99,
    rating: 4.7,
    reviewCount: 94,
    badges: ['badgeNew'],
    category: 'musical'
  },
  {
    id: 5,
    nameKey: 'towerSetName',
    descriptionKey: 'towerSetDescription',
    image: game5,
    price: 19.99,
    rating: 4.6,
    reviewCount: 112,
    category: 'educational'
  },
  {
    id: 6,
    nameKey: 'mathCardsName',
    descriptionKey: 'mathCardsDescription',
    image: game6,
    price: 14.99,
    rating: 4.9,
    reviewCount: 75,
    badges: ['badgeBestseller'],
    category: 'educational'
  }
];
