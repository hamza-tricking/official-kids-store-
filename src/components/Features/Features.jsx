import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaGraduationCap, FaShieldAlt, FaMagic } from 'react-icons/fa';

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #6c757d;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #FF6B6B, #4ECDC4);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    
    &::before {
      opacity: 1;
    }
    
    .icon {
      transform: scale(1.1) rotate(5deg);
      color: #4ECDC4;
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 2.8rem;
  color: #FF6B6B;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  .icon {
    transition: all 0.3s ease;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: #6c757d;
  line-height: 1.6;
  font-size: 1.1rem;
  max-width: 300px;
  margin: 0 auto;
`;

const Features = () => {
  const { t, isRTL } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    { 
      icon: <FaGraduationCap className="icon" />, 
      title: t('featureEducationalTitle'), 
      description: t('featureEducationalDescription') 
    },
    { 
      icon: <FaShieldAlt className="icon" />, 
      title: t('featureSafetyTitle'), 
      description: t('featureSafetyDescription') 
    },
    { 
      icon: <FaMagic className="icon" />, 
      title: t('featureInnovativeTitle'), 
      description: t('featureInnovativeDescription') 
    }
  ];

  return (
    <FeaturesSection>
      <Container>
        <Header>
          <Title
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {t('featuresTitle')}
          </Title>
          <Subtitle
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('featuresSubtitle')}
          </Subtitle>
        </Header>
        
        <Grid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <IconWrapper>{feature.icon}</IconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </Grid>
      </Container>
    </FeaturesSection>
  );
};

export default Features;
