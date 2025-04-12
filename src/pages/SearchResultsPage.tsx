import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getAllProducts } from '../api'; // Для простоты будем искать по всем продуктам
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const PageHeader = styled.div`
  background-color: var(--primary-color);
  color: var(--white);
  padding: 3rem 0;
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--white);
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem 0;
  font-size: 1.2rem;
  color: var(--dark-gray);
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: var(--dark-gray);
`;

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Ошибка загрузки продуктов для поиска", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!isLoading && products.length > 0 && searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const results = products.filter(product => 
        product.title.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery) ||
        product.category.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, products, isLoading]);

  return (
    <div>
      <PageHeader>
        <div className="container">
          <Title>Результаты поиска</Title>
          <Subtitle>Вы искали: "{searchQuery}"</Subtitle>
        </div>
      </PageHeader>
      
      <div className="container">
        {isLoading ? (
          <LoadingMessage>Поиск...</LoadingMessage>
        ) : filteredProducts.length > 0 ? (
          <Grid>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        ) : (
          <NoResultsMessage>
            По вашему запросу "{searchQuery}" ничего не найдено.
          </NoResultsMessage>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage; 