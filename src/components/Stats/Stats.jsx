import React from 'react';
import styled from 'styled-components';
import { FaUsers, FaSmile, FaTrophy, FaGlobeAmericas } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

const Section = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: white;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  text-align: center;
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;

const Number = styled.h3`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Label = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const Stats = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: <FaUsers />,
      ...t('stats.happyParents')
    },
    {
      icon: <FaSmile />,
      ...t('stats.kidsLearning')
    },
    {
      icon: <FaTrophy />,
      ...t('stats.awards')
    },
    {
      icon: <FaGlobeAmericas />,
      ...t('stats.countries')
    }
  ];

  return (
    <Section>
      <Container>
        <Grid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <IconWrapper>{stat.icon}</IconWrapper>
              <Number>{stat.number}</Number>
              <Label>{stat.label}</Label>
            </StatCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Stats;
