import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../../contexts/LanguageContext';
import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import Features from '../../components/Features/Features';
import ProductGrid from '../../components/Products/ProductGrid';
import Testimonials from '../../components/Testimonials/Testimonials';
import Stats from '../../components/Stats/Stats';
import Newsletter from '../../components/Newsletter/Newsletter';
import Footer from '../../components/Footer/Footer';

const HomeContainer = styled.div`
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
`;

const Home = () => {
  const { isRTL } = useLanguage();

  return (
    <HomeContainer $isRTL={isRTL}>
      <main>
        <Hero />
        <Features />
        <Categories />
        <ProductGrid />
        <Stats />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </HomeContainer>
  );
};

export default Home;