import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { FaHeart, FaStar, FaMagic, FaRocket, FaChild, FaBook, FaPuzzlePiece, FaBrain } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import game1 from '../../assets/game (1).jpg';
import game2 from '../../assets/game (2).jpg';
import game4 from '../../assets/game (4).jpg';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(2deg); }
  75% { transform: translateY(15px) rotate(-2deg); }
`;

const sparkle = keyframes`
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
  50% { transform: scale(1.5) rotate(180deg); opacity: 0.2; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const AboutContainer = styled.div`
  padding: 0;
  overflow: hidden;
  background: linear-gradient(135deg, #fef6f6 0%, #ffeef8 100%);
`;

const ParallaxSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/pattern.svg') repeat;
    opacity: 0.1;
    animation: ${pulse} 10s ease-in-out infinite;
  }
`;

const ParallaxContent = styled(motion.div)`
  text-align: center;
  z-index: 2;
  padding: 2rem;
`;

const MainTitle = styled(motion.h1)`
  font-size: 5rem;
  background: linear-gradient(120deg, #FF6B6B, #FF8E8E, #FFB4B4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  position: relative;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #FF6B6B;
  font-size: 2rem;
  cursor: pointer;
  animation: ${float} 2s ease-in-out infinite;
`;

const StorySection = styled(motion.section)`
  padding: 8rem 2rem;
  background: white;
  position: relative;
  z-index: 2;
`;

const StoryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
  align-items: center;
`;

const StoryContent = styled(motion.div)`
  padding: 2rem;
`;

const StoryTitle = styled(motion.h2)`
  font-size: 3rem;
  color: #FF6B6B;
  margin-bottom: 2rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #FF6B6B, #FF8E8E);
    border-radius: 2px;
  }
`;

const StoryText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 1.5rem;
`;

const StoryImage = styled(motion.div)`
  position: relative;
  height: 400px;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,107,107,0.2), rgba(255,142,142,0.2));
    z-index: 1;
  }
`;

const ValuesSection = styled(motion.section)`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #fff6f6 0%, #fff0f8 100%);
  position: relative;
  overflow: hidden;
`;

const ValuesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 2;
`;

const ValueCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #FF6B6B, #FF8E8E);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const IconBox = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  transform: rotate(45deg);
  animation: ${float} 6s ease-in-out infinite;

  svg {
    transform: rotate(-45deg);
  }
`;

const MissionSection = styled(motion.section)`
  padding: 8rem 2rem;
  background: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/pattern.svg') repeat;
    opacity: 0.05;
    animation: ${pulse} 15s ease-in-out infinite;
  }
`;

const MissionContent = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
`;

const MissionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  background: linear-gradient(120deg, #FF6B6B, #FF8E8E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 4rem;
  text-align: center;
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
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  margin-top: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const StatCard = styled(motion.div)`
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 107, 107, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 142, 142, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 45px rgba(255, 107, 107, 0.15);

    &::before {
      opacity: 1;
    }

    h3 {
      transform: scale(1.1);
    }
  }

  h3 {
    font-size: 3rem;
    color: #FF6B6B;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
  }

  p {
    color: ${({ theme }) => theme.colors.gray[600]};
    font-size: 1.2rem;
  }
`;

const ImpactImage = styled(motion.div)`
  position: relative;
  height: 500px;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,107,107,0.2), rgba(255,142,142,0.2));
    z-index: 1;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ImpactQuote = styled(motion.div)`
  text-align: center;
  max-width: 800px;
  margin: 6rem auto 0;
  padding: 3rem;
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 8rem;
    color: rgba(255, 107, 107, 0.1);
    font-family: serif;
  }

  p {
    font-size: 1.5rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.gray[600]};
    font-style: italic;
    margin-bottom: 1.5rem;
  }

  cite {
    font-size: 1.1rem;
    color: #FF6B6B;
    font-weight: bold;
    font-style: normal;
  }
`;

const About = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const stats = [
    { number: "1000+", label: "Happy Children" },
    { number: "50+", label: "Educational Toys" },
    { number: "100%", label: "Safety Tested" },
    { number: "24/7", label: "Support" }
  ];

  const values = [
    {
      icon: <FaChild />,
      title: "Child-Centered",
      description: "Every product is designed with your child's development in mind."
    },
    {
      icon: <FaBook />,
      title: "Educational Focus",
      description: "Learning through play is our core philosophy."
    },
    {
      icon: <FaPuzzlePiece />,
      title: "Creative Growth",
      description: "Fostering imagination and problem-solving skills."
    },
    {
      icon: <FaBrain />,
      title: "Cognitive Development",
      description: "Supporting mental growth at every stage."
    }
  ];

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <AboutContainer>
      <ParallaxSection>
        <ParallaxContent
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <MainTitle
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Inspiring Young Minds
          </MainTitle>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontSize: '1.5rem', color: '#666', marginBottom: '2rem' }}
          >
            Where Learning Meets Wonder
          </motion.p>
        </ParallaxContent>
        <ScrollIndicator
          onClick={scrollToContent}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          ↓
        </ScrollIndicator>
      </ParallaxSection>

      <StorySection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <StoryContainer>
          <StoryContent>
            <StoryTitle
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Story
            </StoryTitle>
            <StoryText
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              BabyBloom began with a simple yet powerful vision: to transform early education 
              through engaging, purposeful play. We believe that every child deserves the 
              opportunity to learn, grow, and bloom in their own unique way.
            </StoryText>
            <StoryText
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Today, we continue to innovate and create educational toys that spark imagination, 
              foster development, and make learning an adventure. Each product is thoughtfully 
              designed to grow with your child, providing endless opportunities for discovery and joy.
            </StoryText>
          </StoryContent>
          <StoryImage
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src={game1} alt="Children playing with educational toys" />
          </StoryImage>
        </StoryContainer>
      </StorySection>

      <ValuesSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <ValuesGrid>
          {values.map((value, index) => (
            <ValueCard
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <IconBox>{value.icon}</IconBox>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#FF6B6B' }}>
                {value.title}
              </h3>
              <p style={{ color: '#666' }}>{value.description}</p>
            </ValueCard>
          ))}
        </ValuesGrid>
      </ValuesSection>

      <MissionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <MissionContent>
          <MissionTitle
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Global Impact
          </MissionTitle>
          <ImpactGrid>
            <StatsContainer>
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </StatCard>
              ))}
            </StatsContainer>
            <ImpactImage
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img src={game4} alt="Children learning and playing with educational toys" />
            </ImpactImage>
          </ImpactGrid>
          <ImpactQuote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p>
              "Every child deserves the opportunity to learn, grow, and discover their potential through play. 
              At BabyBloom, we're committed to making this vision a reality for children around the world."
            </p>
            <cite>- Sarah Johnson, Founder of BabyBloom</cite>
          </ImpactQuote>
        </MissionContent>
      </MissionSection>

      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #FF6B6B, #FF8E8E)',
          transformOrigin: '0%',
          scaleX
        }}
      />
    </AboutContainer>
  );
};

export default About;
