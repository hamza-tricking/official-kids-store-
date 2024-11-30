import React, { useState } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaStar } from 'react-icons/fa';

const Section = styled.section`
  padding: 6rem 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.gray[50]} 0%,
    #ffffff 50%,
    ${({ theme }) => theme.colors.gray[50]} 100%
  );
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.gray[600]};
  max-width: 600px;
  margin: 0 auto;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  direction: ${props => props.isRTL ? 'rtl' : 'ltr'};
`;

const SearchIcon = styled(FaSearch)`
  color: ${({ theme }) => theme.colors.gray[400]};
  margin: ${props => props.isRTL ? '0 0 0 0.5rem' : '0 0.5rem 0 0'};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
  transform: perspective(1000px) translateZ(0);
  
  &:hover {
    transform: perspective(1000px) translateZ(20px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductContent = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 1rem;
  height: 2.7em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #ffc107;
`;

const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 50px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 1rem;
  border-radius: 50px;
  background: ${({ type, theme }) => {
    switch(type) {
      case 'new': return theme.colors.primary;
      case 'sale': return theme.colors.error;
      default: return theme.colors.gray[500];
    }
  }};
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProductGrid = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample products data - replace with your actual data
  const products = [
    {
      id: 1,
      name: t('buildingBlocksName'),
      description: t('buildingBlocksDesc'),
      price: 29.99,
      image: '/src/assets/building-blocks.jpg',
      rating: 5,
      category: 'educational',
      badge: 'new'
    },
    {
      id: 2,
      name: t('artSetName'),
      description: t('artSetDesc'),
      price: 24.99,
      image: '/src/assets/art-set.jpg',
      rating: 4,
      category: 'creative',
      badge: 'sale'
    },
    {
      id: 3,
      name: t('scienceKitName'),
      description: t('scienceKitDesc'),
      price: 34.99,
      image: '/src/assets/science-kit.jpg',
      rating: 5,
      category: 'science'
    },
    {
      id: 4,
      name: t('musicalSetName'),
      description: t('musicalSetDesc'),
      price: 39.99,
      image: '/src/assets/musical-set.jpg',
      rating: 4,
      category: 'musical'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product) => {
    navigate('/product/' + product.id, { state: { product } });
  };

  return (
    <Section>
      <Container>
        <Header>
          <Title>{t('productsTitle')}</Title>
          <Subtitle>{t('productsSubtitle')}</Subtitle>
        </Header>

        <FilterSection>
          <SearchBar>
            <SearchIcon isRTL={isRTL} />
            <SearchInput
              type="text"
              placeholder={t('searchProducts')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              isRTL={isRTL}
            />
          </SearchBar>
        </FilterSection>

        <Grid>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              onClick={() => handleProductClick(product)}
            >
              {product.badge && <Badge type={product.badge}>{t('badge' + product.badge.charAt(0).toUpperCase() + product.badge.slice(1))}</Badge>}
              <ProductImage src={product.image} alt={product.name} />
              <ProductContent>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>${product.price}</ProductPrice>
                <ProductFooter>
                  <Rating>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} color={i < product.rating ? '#ffc107' : '#e4e5e9'} />
                    ))}
                  </Rating>
                  <AddToCartButton>
                    <FaShoppingCart />
                    {t('addToCart')}
                  </AddToCartButton>
                </ProductFooter>
              </ProductContent>
            </ProductCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default ProductGrid;
