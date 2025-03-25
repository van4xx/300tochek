import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #1e4dba; /* Более насыщенный синий */
    --primary-light: #3a75e0; /* Светлый оттенок основного цвета */
    --primary-dark: #0f2974; /* Темный оттенок основного цвета */
    --secondary-color: #ff4b1f; /* Более насыщенный оранжевый */
    --secondary-light: #ff7a59; /* Светлый оттенок второго цвета */
    --accent-color: #ffcc00; /* Яркий акцентный цвет */
    --background-color: #f5f8ff; /* Легкий синеватый оттенок фона */
    --background-dark: #e9eeff; /* Более темный фоновый цвет */
    --text-color: #2c3e50; /* Темно-синий для текста */
    --text-light: #6c7a89; /* Светлый оттенок для неосновного текста */
    --light-gray: #e5e9f2;
    --dark-gray: #4d5b6c;
    --white: #ffffff;
    --black: #0a1428;
    --success: #0cce6b;
    --error: #e84855;
    --info: #2196f3;
    --warning: #ff9f43;
    
    /* Размеры и отступы */
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 16px;
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    
    /* Тени */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 8px 20px rgba(0, 0, 0, 0.12);
    
    /* Переходы */
    --transition-fast: 0.2s;
    --transition-normal: 0.3s;
    --transition-slow: 0.5s;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Montserrat', 'Roboto', 'Arial', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: var(--primary-color);
    transition: color var(--transition-normal) ease;
    
    &:hover {
      color: var(--secondary-color);
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  h1 {
    font-size: 2.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  h2 {
    font-size: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
  }

  button {
    cursor: pointer;
    background-color: var(--primary-color);
    color: var(--white);
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius-md);
    font-size: 1rem;
    font-weight: 600;
    transition: all var(--transition-normal) ease;
    box-shadow: var(--shadow-sm);
    
    &:hover {
      background-color: var(--primary-light);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &:disabled {
      background-color: var(--light-gray);
      color: var(--dark-gray);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    
    &.secondary {
      background-color: var(--secondary-color);
      
      &:hover {
        background-color: var(--secondary-light);
      }
    }
    
    &.outline {
      background-color: transparent;
      border: 2px solid var(--primary-color);
      color: var(--primary-color);
      
      &:hover {
        background-color: var(--primary-color);
        color: var(--white);
      }
    }
  }

  input, textarea, select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--light-gray);
    border-radius: var(--border-radius-md);
    font-size: 1rem;
    transition: border-color var(--transition-normal) ease, box-shadow var(--transition-normal) ease;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(30, 77, 186, 0.1);
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
  }

  .section {
    padding: 4rem 0;
  }

  .text-center {
    text-align: center;
  }
  
  .card {
    background-color: var(--white);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    transition: transform var(--transition-normal) ease, box-shadow var(--transition-normal) ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-in {
    animation: fadeIn 0.5s ease forwards;
  }
  
  /* Градиенты для фонов */
  .gradient-primary {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  }
  
  .gradient-secondary {
    background: linear-gradient(135deg, var(--secondary-color), var(--secondary-light));
  }
`;

export default GlobalStyles; 