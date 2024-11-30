import React, { useState } from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';
import { useLanguage } from '../../contexts/LanguageContext';
// Import product images from assets
import game1 from '../../assets/game (1).jpg';
import game2 from '../../assets/game (2).jpg';
import game3 from '../../assets/game (3).jpg';
import game4 from '../../assets/game (4).jpg';
import game5 from '../../assets/game (5).jpg';
import game6 from '../../assets/game (6).jpg';

const Section = styled.section`
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.colors.gray[100]};
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.gray[400]};
  max-width: 600px;
  margin: 0 auto;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ active, theme }) => 
    active ? theme.colors.primary : 'white'};
  color: ${({ active }) => active ? 'white' : 'inherit'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.small};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const ProductGrid = () => {
  const { t, isRTL } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(t('filterAll'));

  const productData = {
    buildingBlocks: {
      id: 1,
      image: game1,
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.5,
      reviewCount: 128,
      badges: ["new", "sale"]
    },
    artSet: {
      id: 2,
      image: game2,
      price: 24.99,
      rating: 5,
      reviewCount: 89,
      badges: ["bestseller"]
    },
    scienceKit: {
      id: 3,
      image: game3,
      price: 34.99,
      originalPrice: 44.99,
      rating: 4.8,
      reviewCount: 156,
      badges: ["sale"]
    },
    musicalSet: {
      id: 4,
      image: game4,
      price: 39.99,
      rating: 4.7,
      reviewCount: 94,
      badges: ["new"]
    },
    towerSet: {
      id: 5,
      image: game5,
      price: 19.99,
      rating: 4.6,
      reviewCount: 112,
      badges: []
    },
    mathCards: {
      id: 6,
      image: game6,
      price: 14.99,
      rating: 4.9,
      reviewCount: 75,
      badges: ["bestseller"]
    }
  };

  const products = Object.entries(productData).map(([key, data]) => ({
    ...data,
    name: t(`${key}Name`),
    category: t(`${key}Category`),
    badges: data.badges.map(badge => t(`badge${badge.charAt(0).toUpperCase() + badge.slice(1)}`))
  }));

  const filters = [
    t('filterAll'),
    t('filterEducational'),
    t('filterCreative'),
    t('filterMusical')
  ];

  const filteredProducts = activeFilter === t('filterAll')
    ? products
    : products.filter(product => product.category === activeFilter);

  return (
    <Section id="products">
      <Container>
        <Header>
          <Title>{t('productsTitle')}</Title>
          <Subtitle>
            {t('productsSubtitle')}
          </Subtitle>
        </Header>

        <FilterContainer>
          {filters.map(filter => (
            <FilterButton
              key={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </FilterButton>
          ))}
        </FilterContainer>

        <Grid>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default ProductGrid;
