import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaRocket, FaBrain, FaHeart, FaShieldAlt } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.gray[50]} 0%,
    #ffffff 50%,
    ${({ theme }) => theme.colors.gray[50]} 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.primary}33,
      transparent
    );
  }
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
  position: relative;
  padding: 0 1rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary},
    ${({ theme }) => theme.colors.primary}
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shine} 5s linear infinite;
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[600]};
  max-width: 700px;
  margin: 0 auto 4rem;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  perspective: 1000px;
  margin: 0 auto;
  width: 100%;
  max-width: fit-content;
  padding: 1.5rem 0;
`;

const FeatureCard = styled.div`
  flex: 0 0 250px;
  scroll-snap-align: start;
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem 1.5rem;
  border-radius: 30px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.index * 0.2}s;

  &:hover {
    transform: translateY(-15px) rotateX(5deg);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.1),
      0 2px 6px rgba(0, 0, 0, 0.05);

    ${({ theme }) => `
      background: linear-gradient(
        135deg,
        ${theme.colors.primary}08,
        ${theme.colors.secondary}08
      );
    `}

    &::before {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 120%;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.primary}10,
      transparent 70%
    );
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
    transition: all 0.4s ease;
    z-index: -1;
  }
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  background: ${({ theme }) => `linear-gradient(
    135deg,
    ${theme.colors.primary}15,
    ${theme.colors.secondary}15
  )`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  position: relative;
  animation: ${pulse} 3s ease-in-out infinite;
  animation-delay: ${props => props.index * 0.2}s;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.primary}33;
    animation: ${pulse} 2s ease-in-out infinite;
  }

  svg {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.primary};
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40%;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary}33;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  ${FeatureCard}:hover &::after {
    width: 100%;
  }
`;

const FeatureText = styled.p`
  color: ${({ theme }) => theme.colors.gray[600]};
  line-height: 1.8;
  font-size: 1.1rem;
`;

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <FaRocket />,
      id: 'quality'
    },
    {
      icon: <FaBrain />,
      id: 'educational'
    },
    {
      icon: <FaHeart />,
      id: 'affordable'
    },
    {
      icon: <FaShieldAlt />,
      id: 'delivery'
    }
  ];

  return (
    <Section>
      <Container>
        <Title>{t('featuresTitle')}</Title>
        <Subtitle>{t('featuresSubtitle')}</Subtitle>
        <Grid>
          {features.map((feature, index) => (
            <FeatureCard key={index} index={index}>
              <IconWrapper index={index}>
                {feature.icon}
              </IconWrapper>
              <FeatureTitle>
                {t(`feature${feature.id.charAt(0).toUpperCase() + feature.id.slice(1)}Title`)}
              </FeatureTitle>
              <FeatureText>
                {t(`feature${feature.id.charAt(0).toUpperCase() + feature.id.slice(1)}Description`)}
              </FeatureText>
            </FeatureCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Features;
