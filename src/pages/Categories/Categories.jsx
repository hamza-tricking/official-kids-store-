import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const CategoryCard = styled(Link)`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  text-decoration: none;
  aspect-ratio: 4/3;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    
    .overlay {
      background-color: rgba(0, 0, 0, 0.4);
    }
    
    .content {
      transform: translateY(-5px);
    }
  }
  
  @media (max-width: 768px) {
    aspect-ratio: 3/2;
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  color: white;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const CategoryName = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CategoryDescription = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  max-width: 90%;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Categories = () => {
  const { t } = useLanguage();

  const categories = [
    {
      id: 'educational',
      name: t('categoryEducational'),
      description: t('categoryEducationalDesc'),
      image: '/images/categories/45K2711-non-marring-building-blocks-u-0024.jpg',
      link: '/products/educational'
    },
    {
      id: 'creative',
      name: t('categoryCreative'),
      description: t('categoryCreativeDesc'),
      image: '/images/categories/childrens-educational-toys-thumbnail.jpg',
      link: '/products/creative'
    },
    {
      id: 'musical',
      name: t('categoryMusical'),
      description: t('categoryMusicalDesc'),
      image: '/images/categories/615QUeUo67L._AC_.jpg',
      link: '/products/musical'
    },
    {
      id: 'outdoor',
      name: t('categoryOutdoor'),
      description: t('categoryOutdoorDesc'),
      image: '/images/categories/kids-hula-hooping-outside.jpg',
      link: '/products/outdoor'
    },
    {
      id: 'learning',
      name: t('categoryLearning'),
      description: t('categoryLearningDesc'),
      image: '/images/categories/718yTiyJ3eL.jpg',
      link: '/products/learning'
    },
    {
      id: 'games',
      name: t('categoryGames'),
      description: t('categoryGamesDesc'),
      image: '/images/categories/images.jpeg',
      link: '/products/games'
    }
  ];

  return (
    <PageContainer>
      <Header>
        <Title>{t('categoriesTitle')}</Title>
        <Subtitle>{t('categoriesSubtitle')}</Subtitle>
      </Header>

      <CategoryGrid>
        {categories.map((category, index) => (
          <CategoryCard
            to={category.link}
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CategoryImage src={category.image} alt={category.name} />
            <Overlay className="overlay" />
            <CardContent className="content">
              <CategoryName>{category.name}</CategoryName>
              <CategoryDescription>{category.description}</CategoryDescription>
            </CardContent>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </PageContainer>
  );
};

export default Categories;
