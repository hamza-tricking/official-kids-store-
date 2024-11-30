import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { categories } from '../../config/categories';
import { useLanguage } from '../../contexts/LanguageContext';

const Section = styled.section`
  padding: 6rem 2rem;
  background: #ffffff;
  direction: ${props => props.isRTL ? 'rtl' : 'ltr'};
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
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[400]};
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled(Link)`
  position: relative;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    
    img {
      transform: scale(1.1);
    }
    
    h3 {
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const CategoryTitle = styled.h3`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  margin: 0;
  font-size: 1.2rem;
  text-align: center;
  transition: background 0.3s ease;
`;

const Categories = () => {
  const { t, isRTL } = useLanguage();

  return (
    <Section id="categories" isRTL={isRTL}>
      <Container>
        <Title>
          {isRTL ? (
            <>{t('exploreCategories').split(' ').reverse().join(' ')}</>
          ) : (
            <>{t('exploreCategories')}</>
          )}
        </Title>
        <Subtitle>
          {t('categoriesSubtitle')}
        </Subtitle>
        <Grid>
          {categories.map((category) => (
            <CategoryCard key={category.id} to={category.link}>
              <CategoryImage src={category.image} alt={t(`categoryTitles.${category.id}`)} />
              <CategoryTitle>{t(`categoryTitles.${category.id}`)}</CategoryTitle>
            </CategoryCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Categories;
