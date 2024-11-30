import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const PageContainer = styled.div`
  padding: 8rem 2rem 4rem 2rem; 
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(135deg, #fef6f6 0%, #ffeef8 100%);
  
  @media (max-width: 768px) {
    padding: 7rem 1rem 2rem 1rem;
  }
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  background: linear-gradient(120deg, #FF6B6B, #FF8E8E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: linear-gradient(90deg, #FF6B6B, #FF8E8E);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.gray[600]};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CategoryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CategoryCard = styled(motion(Link))`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  aspect-ratio: 4/3;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(255, 107, 107, 0.2);
    
    .overlay {
      background-color: rgba(0, 0, 0, 0.3);
    }
    
    .content {
      transform: translateY(-10px);
    }

    img {
      transform: scale(1.1);
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
  transition: transform 0.5s ease;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, 
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  transition: all 0.3s ease;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2.5rem;
  color: white;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const CategoryName = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const CategoryDescription = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 90%;
  line-height: 1.5;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1rem;
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <PageContainer>
      <Header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>{t('categoriesTitle')}</Title>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('categoriesSubtitle')}
        </Subtitle>
      </Header>

      <CategoryGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            to={category.link}
            variants={cardVariants}
          >
            <CategoryImage src={category.image} alt={category.name} className="image" />
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
