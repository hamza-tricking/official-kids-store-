import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import game1 from '../../assets/game (1).jpg';
import game2 from '../../assets/game (2).jpg';
import game3 from '../../assets/game (3).jpg';

// Keyframes
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
  25% { transform: translate3d(-20px, -20px, 50px) rotateX(5deg) rotateY(-5deg); }
  50% { transform: translate3d(0, 0, 100px) rotateX(10deg) rotateY(5deg); }
  75% { transform: translate3d(20px, 20px, 50px) rotateX(5deg) rotateY(10deg); }
  100% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 20px, -50px);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const magicSparkle = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 0, -100px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    -45deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary},
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.primary}
  );
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  direction: ${props => props.isRTL ? 'rtl' : 'ltr'};
  perspective: 1000px;
  transform-style: preserve-3d;
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  max-width: 800px;
  z-index: 2;
  opacity: 0;
  animation: ${scaleIn} 0.5s ease forwards;
  animation-delay: 0.5s;
  transform-style: preserve-3d;
  perspective: 1000px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease forwards;
  animation-delay: 0.7s;
  transform-style: preserve-3d;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  .magic-text {
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.accent},
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.accent}
    );
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: ${magicSparkle} 3s linear infinite;
    font-weight: 700;
    display: inline-block;
    padding: 0 0.5rem;
    transform: translateZ(50px);
    will-change: background-position;
    text-shadow: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease forwards;
  animation-delay: 0.9s;
  transform: translateZ(30px);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const HeroCTA = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease forwards;
  animation-delay: 1.1s;
  transform: translateZ(40px);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const CTAButton = styled(Link)`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transform: translateZ(0);
  backface-visibility: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  ${({ primary, theme }) => primary ? `
    background: white;
    color: ${theme.colors.primary};

    &:hover {
      transform: translateY(-3px) translateZ(20px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
  ` : `
    background: transparent;
    color: white;
    border: 2px solid white;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-3px) translateZ(20px);
    }
  `}
`;

const Card3D = styled.div`
  position: absolute;
  width: 220px;
  height: 220px;
  perspective: 1500px;
  transform-style: preserve-3d;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);

  &:nth-child(1) {
    top: 15%;
    left: 8%;
    transform: rotate(-5deg);
  }

  &:nth-child(2) {
    top: 30%;
    left: 50%;
    transform: translateX(-50%) rotate(0deg);
    z-index: 2;
    width: 260px;
    height: 260px;
  }

  &:nth-child(3) {
    top: 20%;
    right: 8%;
    transform: rotate(5deg);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  animation: ${float} 8s ease-in-out infinite;

  &:hover {
    transform: rotateY(180deg);
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.2)
    );
    pointer-events: none;
  }
`;

const CardFront = styled(CardFace)`
  background: white;
  transform: rotateY(0deg);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.2)
    );
  }
`;

const CardBack = styled(CardFace)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.secondary},
    ${({ theme }) => theme.colors.primary}
  );
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: rotate(45deg);
    animation: ${shimmer} 3s linear infinite;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);

  ${CardFront}:hover & {
    transform: scale(1.2);
  }
`;

const ParallaxWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform-style: preserve-3d;
`;

const Hero = () => {
  const { t, isRTL } = useLanguage();
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!parallaxRef.current) return;
      
      const cards = parallaxRef.current.querySelectorAll('.card-3d');
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      cards.forEach((card, index) => {
        const factor = (index + 1) * 0.02;
        const rotateY = (clientX - centerX) * factor;
        const rotateX = (centerY - clientY) * factor;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <HeroSection isRTL={isRTL}>
      <ParallaxWrapper ref={parallaxRef}>
        <Card3D className="card-3d">
          <CardInner>
            <CardFront>
              <ProductImage src={game1} alt="Toy 1" />
            </CardFront>
            <CardBack>
              {t('buildingBlocksName')}
            </CardBack>
          </CardInner>
        </Card3D>
        <Card3D className="card-3d">
          <CardInner>
            <CardFront>
              <ProductImage src={game2} alt="Toy 2" />
            </CardFront>
            <CardBack>
              {t('artSetName')}
            </CardBack>
          </CardInner>
        </Card3D>
        <Card3D className="card-3d">
          <CardInner>
            <CardFront>
              <ProductImage src={game3} alt="Toy 3" />
            </CardFront>
            <CardBack>
              {t('scienceKitName')}
            </CardBack>
          </CardInner>
        </Card3D>
      </ParallaxWrapper>
      
      <HeroContent>
        <HeroTitle>
          {t('heroTitle')} <span className="magic-text">{t('heroTitleHighlight')}</span>
        </HeroTitle>
        <HeroSubtitle>
          {t('heroDescription')}
        </HeroSubtitle>
        <HeroCTA>
          <CTAButton to="/categories" primary>
            {t('categories')}
          </CTAButton>
          <CTAButton to="/products">
            {t('products')}
          </CTAButton>
        </HeroCTA>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
