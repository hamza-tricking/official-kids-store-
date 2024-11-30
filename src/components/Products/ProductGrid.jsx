import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import ProductCard from './ProductCard';
import { products as productData } from '../../data/products';

const Section = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[400]};
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const ViewAllButton = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 500;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ProductGrid = () => {
  const { t, isRTL } = useLanguage();
  
  // Transform product data with translations
  const products = productData.map(product => ({
    ...product,
    name: t(product.nameKey),
    description: t(product.descriptionKey),
    badges: product.badges?.map(badge => t(badge)) || []
  }));

  return (
    <Section $isRTL={isRTL}>
      <Container>
        <Title>{t('featuredProducts')}</Title>
        <Subtitle>{t('productsSubtitle')}</Subtitle>
        <Grid>
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
        <ViewAllButton to="/products">
          {t('viewAllProducts')}
        </ViewAllButton>
      </Container>
    </Section>
  );
};

export default ProductGrid;
