import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:categoryName" element={<CategoryPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/order/:productId" element={<OrderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
