import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { categories } from '../../config/categories';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaBars, FaTimes } from 'react-icons/fa';
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
  padding: ${props => props.$scrolled ? '0.8rem 2rem' : '1rem 2rem'};
  background: ${props => props.$scrolled 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(10px);
  box-shadow: ${props => props.$scrolled 
    ? '0 4px 20px rgba(0,0,0,0.1)' 
    : '0 2px 4px rgba(0,0,0,0.05)'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${slideDown} 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${props => props.$scrolled ? '0.6rem 1rem' : '0.8rem 1rem'};
  }

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
    animation: ${shine} ${props => props.$scrolled ? '1.5s' : '3s'} linear infinite;
    opacity: ${props => props.$scrolled ? '1' : '0'};
    transition: opacity 0.6s ease;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: ${props => props.$scrolled ? '1.4rem' : '1.5rem'};
  font-weight: bold;
  animation: ${float} 3s ease-in-out infinite;
  transform-origin: center center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${props => props.$scrolled ? '1.2rem' : '1.3rem'};
  }
  
  span {
    background: linear-gradient(
      45deg,
      ${({ theme, $scrolled }) => $scrolled 
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

const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    .dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  text-align: center;

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
  left: 0;
  background: white;
  border-radius: 12px;
  padding: 1rem 0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 100;
  margin-top: 0.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: static;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    transform: none;
    padding: 0;
    margin: 0.5rem 0;
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
  text-align: left;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}10`};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(5px);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${props => props.$scrolled ? '1.8rem' : '2rem'};
  align-items: center;
  justify-content: center;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    top: 0;
    ${props => props.$isRTL ? 'right' : 'left'}: 0;
    height: 100vh;
    width: 80%;
    max-width: 400px;
    flex-direction: column;
    background: white;
    padding: 2rem;
    gap: 1.5rem;
    transform: translateX(${props => props.$isOpen ? '0' : props.$isRTL ? '100%' : '-100%'});
    box-shadow: ${props => props.$isOpen ? '0 0 50px rgba(0,0,0,0.1)' : 'none'};
    z-index: 1000;
    overflow-y: auto;
    justify-content: flex-start;
  }
`;

const MobileOverlay = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    opacity: ${props => props.$isOpen ? 1 : 0};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
    z-index: 999;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
`;

const LanguageToggle = styled.button`
  background: none;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav $scrolled={isScrolled} $isRTL={isRTL}>
      <Logo to="/" $scrolled={isScrolled}>
        <span>BabyBloom</span>
      </Logo>

      <NavLinks $scrolled={isScrolled} $isOpen={isOpen} $isRTL={isRTL}>
        <NavItem>
          <NavLink to="/">{t('home')}</NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/categories">{t('categories')}</NavLink>
          <Dropdown className="dropdown">
            {categories.map(category => (
              <DropdownItem key={category.id} to={category.link}>
                {category.title}
              </DropdownItem>
            ))}
          </Dropdown>
        </NavItem>
        
        <NavItem>
          <NavLink to="/products">{t('products')}</NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/about">{t('about')}</NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/contact">{t('contact')}</NavLink>
        </NavItem>
      </NavLinks>

      <Actions>
        <IconButton>
          <img src={cartIcon} alt="Cart" />
        </IconButton>
        <LanguageToggle onClick={() => console.log('Toggle language')}>
          {isRTL ? 'EN' : 'عربي'}
        </LanguageToggle>
        <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </Actions>

      {isOpen && <MobileOverlay onClick={() => setIsOpen(false)} />}
    </Nav>
  );
};

export default Navbar;
