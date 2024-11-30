import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { LanguageProvider } from './contexts/LanguageContext';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';
import ProductGrid from './components/ProductGrid/ProductGrid';
import Products from './pages/Products';
import Order from './pages/Order/Order';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products/:category" element={<ProductGrid />} />
            <Route path="/product/:id" element={<ProductGrid />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
