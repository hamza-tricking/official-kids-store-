import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUsers, FaSmile, FaTrophy, FaGlobeAmericas } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary}, 
    ${({ theme }) => theme.colors.secondary}
  );
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 3rem 1.5rem;
  }
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 1.5rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${props => props.$index * 0.2}s;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1.5rem;
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: white;
  opacity: 0.9;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.$index * 0.5}s;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const Number = styled.h3`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
  background: linear-gradient(45deg, white, rgba(255,255,255,0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.2rem;
  }
`;

const Label = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 500;
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
  }
`;

const Stats = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: <FaUsers />,
      number: "10K+",
      label: t('stats.happyParents')
    },
    {
      icon: <FaSmile />,
      number: "15K+",
      label: t('stats.kidsLearning')
    },
    {
      icon: <FaTrophy />,
      number: "50+",
      label: t('stats.awards')
    },
    {
      icon: <FaGlobeAmericas />,
      number: "25+",
      label: t('stats.countries')
    }
  ];

  return (
    <Section>
      <Container>
        <Grid>
          {stats.map((stat, index) => (
            <StatCard key={index} $index={index}>
              <IconWrapper $index={index}>{stat.icon}</IconWrapper>
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
