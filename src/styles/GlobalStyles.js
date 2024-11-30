import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    line-height: 1.5;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  input, textarea {
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* RTL Support */
  html[dir="rtl"] {
    body, button, input, textarea, h1, h2, h3, h4, h5, h6, p, span, a {
      font-family: 'Noto Kufi Arabic', 'Cairo', sans-serif;
      letter-spacing: 0;
    }

    h1, h2, h3, h4, h5, h6 {
      font-weight: 600;
    }

    p, span, a {
      font-weight: 400;
    }

    .app {
      direction: rtl;
    }
  }

  html[dir="ltr"] {
    body, button, input, textarea, h1, h2, h3, h4, h5, h6, p, span, a {
      font-family: 'Poppins', sans-serif;
    }

    h1, h2, h3, h4, h5, h6 {
      font-weight: 600;
    }

    p, span, a {
      font-weight: 400;
    }

    .app {
      direction: ltr;
    }
  }
`;

export default GlobalStyles;
