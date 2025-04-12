import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getProductsByCategory } from '../api';
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
  text-transform: capitalize;
`;

const Breadcrumbs = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const BreadcrumbLink = styled(Link)`
  color: var(--dark-gray);
  
  &:hover {
    color: var(--primary-color);
  }
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 0.5rem;
  color: var(--dark-gray);
`;

const BreadcrumbCurrent = styled.span`
  color: var(--text-color);
  font-weight: 500;
  text-transform: capitalize;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem 0;
  font-size: 1.2rem;
  color: var(--dark-gray);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: rgba(220, 53, 69, 0.1);
  color: var(--error);
  border-radius: 8px;
  margin: 2rem 0;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: var(--dark-gray);
`;

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<Record<string, string | undefined>>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const categoryDisplayName = categoryName ? categoryName.replace(/-/g, ' ') : '';
  
  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryName) {
        setError('Категория не найдена.');
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await getProductsByCategory(categoryName);
        setProducts(data);
      } catch (err) {
        console.error('Ошибка при загрузке продуктов:', err);
        setError('Не удалось загрузить товары. Пожалуйста, попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [categoryName]);
  
  return (
    <div>
      <PageHeader>
        <div className="container">
          <Title>{categoryDisplayName}</Title>
        </div>
      </PageHeader>
      
      <div className="container">
        <Breadcrumbs>
          <BreadcrumbLink to="/">Главная</BreadcrumbLink>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbLink to="/catalog">Каталог</BreadcrumbLink>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbCurrent>{categoryDisplayName}</BreadcrumbCurrent>
        </Breadcrumbs>
        
        {isLoading ? (
          <LoadingMessage>Загрузка товаров...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : products.length === 0 ? (
          <EmptyMessage>
            В данной категории пока нет товаров. Пожалуйста, загляните позже.
          </EmptyMessage>
        ) : (
          <Grid>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default CategoryPage; 