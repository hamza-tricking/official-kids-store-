import React, { useState } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding-top: 4rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`;

const FiltersContainer = styled.div`
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
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 0.5rem 1rem;
  flex: 1;
  max-width: 400px;

  input {
    border: none;
    outline: none;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 1rem;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ $active, theme }) => $active ? theme.colors.primary : 'white'};
  color: ${({ $active, theme }) => $active ? 'white' : theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}20;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ProductPrice = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const BuyNowButton = styled(AddToCartButton)`
  background: ${({ theme }) => theme.colors.secondary};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const products = [
  {
    id: 1,
    name: "Premium Educational Building Blocks",
    price: "$29.99",
    description: "High-quality, safe building blocks designed to enhance motor skills, creativity, and spatial awareness. Perfect for ages 3-8.",
    image: "/images/categories/45K2711-non-marring-building-blocks-u-0024.jpg",
    category: "Educational"
  },
  {
    id: 2,
    name: "Complete Learning Adventure Set",
    price: "$49.99",
    description: "Comprehensive learning kit featuring alphabet puzzles, number games, and shape sorting activities. Ideal for preschoolers.",
    image: "/images/categories/childrens-educational-toys-thumbnail.jpg",
    category: "Educational"
  },
  {
    id: 3,
    name: "Baby's First Musical Kit",
    price: "$24.99",
    description: "Safe and durable musical instruments set including xylophone, drums, and bells. Develops rhythm and auditory skills.",
    image: "/images/categories/615QUeUo67L._AC_.jpg",
    category: "Musical"
  },
  {
    id: 4,
    name: "Active Play Starter Pack",
    price: "$19.99",
    description: "Fun outdoor play equipment including jump rope, hula hoop, and catch balls. Perfect for physical development and coordination.",
    image: "/images/categories/kids-hula-hooping-outside.jpg",
    category: "Creative"
  },
  {
    id: 5,
    name: "Brain Teaser Activity Collection",
    price: "$34.99",
    description: "Engaging puzzle set with varying difficulty levels. Enhances problem-solving skills and critical thinking.",
    image: "/images/categories/718yTiyJ3eL.jpg",
    category: "Problem Solving"
  },
  {
    id: 6,
    name: "Early Learning Game Bundle",
    price: "$39.99",
    description: "Collection of educational board games and card sets designed to make learning fun. Great for family bonding.",
    image: "/images/categories/images.jpeg",
    category: "Educational"
  }
];

const categories = ["All", "Educational", "Creative", "Musical", "Problem Solving"];

const Products = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === "All" || product.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageContainer>
      <Header>
        <Title>{t('Our Educational Toys Collection')}</Title>
        <Subtitle>{t('Discover our carefully curated selection of toys that make learning fun')}</Subtitle>
      </Header>

      <FiltersContainer>
        <SearchBar>
          <FaSearch />
          <input
            type="text"
            placeholder={t('Search for toys...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
        <div>
          {categories.map(category => (
            <FilterButton
              key={category}
              $active={activeFilter === category}
              onClick={() => setActiveFilter(category)}
            >
              <FaFilter />
              {t(category)}
            </FilterButton>
          ))}
        </div>
      </FiltersContainer>

      <ProductGrid>
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductPrice>{product.price}</ProductPrice>
              <ProductDescription>{product.description}</ProductDescription>
              <ButtonGroup>
                <AddToCartButton>{t('Add to Cart')}</AddToCartButton>
                <BuyNowButton>{t('Buy Now')}</BuyNowButton>
              </ButtonGroup>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </PageContainer>
  );
};

export default Products;
