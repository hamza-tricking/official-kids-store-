import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { categories } from '../../config/categories';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
// Import icons
import facebookIcon from '../../assets/facebook.svg';
import instagramIcon from '../../assets/instagram.svg';
import cartIcon from '../../assets/cart.svg';

const slideDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    transform: translateY(-50%);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const shine = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-2px) rotate(0.5deg);
  }
  75% {
    transform: translateY(2px) rotate(-0.5deg);
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.scrolled ? '0.8rem 2rem' : '1rem 2rem'};
  background: ${props => props.scrolled 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(10px);
  box-shadow: ${props => props.scrolled 
    ? '0 4px 20px rgba(0,0,0,0.1)' 
    : '0 2px 4px rgba(0,0,0,0.05)'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  direction: ${props => props.isRTL ? 'rtl' : 'ltr'};
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${slideDown} 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.primary}
    );
    background-size: 200% auto;
    animation: ${shine} ${props => props.scrolled ? '1.5s' : '3s'} linear infinite;
    opacity: ${props => props.scrolled ? '1' : '0'};
    transition: opacity 0.6s ease;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: ${props => props.scrolled ? '1.4rem' : '1.5rem'};
  font-weight: bold;
  animation: ${float} 3s ease-in-out infinite;
  transform-origin: center center;
  
  span {
    background: linear-gradient(
      45deg,
      ${({ theme, scrolled }) => scrolled 
        ? `${theme.colors.primary}, ${theme.colors.secondary}`
        : `${theme.colors.secondary}, ${theme.colors.primary}`}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Poppins', sans-serif;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${props => props.scrolled ? '1.8rem' : '2rem'};
  align-items: center;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavItem = styled.div`
  position: relative;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(-50%);
  }

  &:hover, &.active {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => `${theme.colors.primary}10`};
    
    &:after {
      width: 80%;
    }
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  ${props => props.isRTL ? 'right' : 'left'}: 0;
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.large};
  padding: 0.5rem;
  min-width: 200px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: translateY(${({ isOpen }) => (isOpen ? '10px' : '0')});
  transition: all 0.3s ease;
  text-align: ${props => props.isRTL ? 'right' : 'left'};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}15;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavSocial = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SocialLink = styled.a`
  img {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const CartIcon = styled.div`
  position: relative;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LanguageButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
`;

const CashOnDelivery = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  font-size: 0.9rem;
  margin-right: 1rem;
`;

const Navbar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t, isRTL } = useLanguage();

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, []);

  return (
    <Nav isRTL={isRTL} scrolled={scrolled}>
      <Logo scrolled={scrolled}>
        <span>🎯 BabyBloom</span>
      </Logo>

      <NavLinks scrolled={scrolled}>
        <NavItem>
          <NavLink to="/" className="active">{t('home')}</NavLink>
        </NavItem>
        
        <NavItem 
          onMouseEnter={() => setIsCategoryOpen(true)}
          onMouseLeave={() => setIsCategoryOpen(false)}
        >
          <NavLink to="/categories">{t('categories')}</NavLink>
          <Dropdown isOpen={isCategoryOpen} isRTL={isRTL}>
            {categories.map((category) => (
              <DropdownItem key={category.id} to={category.link}>
                {t(`categoryTitles.${category.id}`)}
              </DropdownItem>
            ))}
          </Dropdown>
        </NavItem>

        <NavItem>
          <NavLink to="/featured">{t('featured')}</NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/sale">{t('sale')}</NavLink>
        </NavItem>
      </NavLinks>

      <NavSocial>
        <CashOnDelivery>{t('cashOnDelivery')}</CashOnDelivery>
        <LanguageButton onClick={toggleLanguage}>
          {language === 'en' ? 'عربي' : 'English'}
        </LanguageButton>
        <SocialLink href="https://facebook.com/babybloom" target="_blank">
          <img src={facebookIcon} alt="Facebook" />
        </SocialLink>
        <SocialLink href="https://instagram.com/babybloom" target="_blank">
          <img src={instagramIcon} alt="Instagram" />
        </SocialLink>
        <CartIcon>
          <img src={cartIcon} alt={t('cart')} />
          <CartCount>0</CartCount>
        </CartIcon>
      </NavSocial>
    </Nav>
  );
};

export default Navbar;
