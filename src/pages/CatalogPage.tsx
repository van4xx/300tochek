import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCategories, getCategoriesByType } from '../api';
import { Category } from '../types';
import CategoryCard from '../components/CategoryCard';

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
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.8;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin: 3rem 0 2rem;
  position: relative;
  color: var(--primary-color);
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background-color: var(--secondary-color);
    margin: 0.5rem 0 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
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

const CategorySection = styled.section`
  margin-bottom: 4rem;
`;

const CatalogPage: React.FC = () => {
  const [printCategories, setPrintCategories] = useState<Category[]>([]);
  const [designCategories, setDesignCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [printData, designData] = await Promise.all([
          getCategoriesByType('Печать'),
          getCategoriesByType('Дизайн')
        ]);
        
        setPrintCategories(printData);
        setDesignCategories(designData);
      } catch (err) {
        console.error('Ошибка при загрузке категорий:', err);
        setError('Не удалось загрузить каталог. Пожалуйста, попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  return (
    <div>
      <PageHeader>
        <div className="container">
          <Title>Каталог продукции</Title>
          <Subtitle>
            Изучите наш обширный каталог продукции для дизайна и печати.
            От визиток до широкоформатных баннеров — у нас есть всё для вашего бизнеса.
          </Subtitle>
        </div>
      </PageHeader>
      
      <div className="container">
        {isLoading ? (
          <LoadingMessage>Загрузка категорий...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <>
            <CategorySection>
              <SectionTitle>Печать</SectionTitle>
              <Grid>
                {printCategories.map(category => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </Grid>
            </CategorySection>
            
            <CategorySection>
              <SectionTitle>Дизайн</SectionTitle>
              <Grid>
                {designCategories.map(category => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </Grid>
            </CategorySection>
          </>
        )}
      </div>
    </div>
  );
};

export default CatalogPage; 