const theme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#FFE66D',
    background: '#FFFFFF',
    text: '#2D3436',
    gray: {
      100: '#F8FAFC',
      200: '#E2E8F0',
      300: '#94A3B8',
      400: '#64748B',
    }
  },
  gradients: {
    primary: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
  },
  borderRadius: {
    small: '10px',
    medium: '15px',
    large: '20px',
    full: '9999px',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.05)',
    large: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },
  typography: {
    fontFamily: "'Quicksand', sans-serif",
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  }
};

export default theme;
