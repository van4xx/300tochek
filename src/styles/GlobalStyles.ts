import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Roboto:wght@400;700&display=swap');

  :root {
    --primary-color: #0056a3;
    --secondary-color: #ff7f11;
    --accent-color: #ffc857;
    --background-color: #f8f9fa;
    --text-color: #343a40;
    --light-gray: #dee2e6;
    --dark-gray: #6c757d;
    --white: #ffffff;
    --black: #000000;
    --success: #28a745;
    --error: #dc3545;
    --shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease-in-out;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.7;
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: var(--primary-color);
    transition: var(--transition);
    
    &:hover {
      color: var(--secondary-color);
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.3;
    color: var(--primary-color);
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.2rem; }
  h5 { font-size: 1rem; }
  h6 { font-size: 0.875rem; }

  p {
    margin-bottom: 1rem;
  }

  button {
    cursor: pointer;
    background-color: var(--primary-color);
    color: var(--white);
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
    transition: var(--transition);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    &:hover {
      background-color: var(--secondary-color);
      box-shadow: var(--shadow);
      transform: translateY(-2px);
    }
    
    &:disabled {
      background-color: var(--dark-gray);
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }
  }

  input, textarea, select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--light-gray);
    border-radius: 4px;
    font-size: 1rem;
    font-family: 'Montserrat', sans-serif;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(0, 86, 163, 0.25);
    }
  }

  textarea {
    resize: vertical;
    min-height: 150px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .section {
    padding: 4rem 0;
  }

  .text-center {
    text-align: center;
  }
  
  .loading-placeholder {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loadingAnimation 1.5s infinite linear;
  }
  
  @keyframes loadingAnimation {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export default GlobalStyles; 