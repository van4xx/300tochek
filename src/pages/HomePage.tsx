import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCategories, getCategoriesByType, getAllProducts } from '../api';
import { Category, Product } from '../types';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

const Hero = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  padding: 5rem 1rem;
  color: var(--white);
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HeroButton = styled(Link)`
  display: inline-block;
  background-color: var(--secondary-color);
  color: var(--white);
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 107, 0, 0.8);
  }
`;

const Section = styled.section`
  padding: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 100px;
    height: 3px;
    background-color: var(--secondary-color);
    margin: 0.5rem auto 0;
  }
`;

const SubSectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: var(--primary-color);
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background-color: var(--secondary-color);
    margin: 0.5rem 0 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const MoreLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 2rem;
  font-weight: 500;
  color: var(--primary-color);
  
  &:hover {
    text-decoration: underline;
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const FeatureText = styled.p`
  color: var(--dark-gray);
`;

const ServiceCategory = styled.div`
  margin-bottom: 4rem;
`;

const HomePage: React.FC = () => {
  const [printCategories, setPrintCategories] = useState<Category[]>([]);
  const [designCategories, setDesignCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [printCategoriesData, designCategoriesData, productsData] = await Promise.all([
          getCategoriesByType('Печать'),
          getCategoriesByType('Дизайн'),
          getAllProducts()
        ]);
        
        setPrintCategories(printCategoriesData);
        setDesignCategories(designCategoriesData);
        // В будущем здесь можно добавить логику для отбора "featured" продуктов
        setFeaturedProducts(productsData.slice(0, 4));
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div>
      <Hero>
        <HeroTitle>Студия дизайна и печати "300точек"</HeroTitle>
        <HeroSubtitle>
          Мы предлагаем широкий спектр услуг по дизайну и печати рекламной продукции
          высокого качества по доступным ценам
        </HeroSubtitle>
        <HeroButton to="/catalog">Перейти в каталог</HeroButton>
      </Hero>
      
      <div className="container">
        <Section>
          <SectionTitle>Наши услуги</SectionTitle>
          
          {isLoading ? (
            <p className="text-center">Загрузка...</p>
          ) : (
            <>
              <ServiceCategory>
                <SubSectionTitle>Печать</SubSectionTitle>
                <Grid>
                  {printCategories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </Grid>
              </ServiceCategory>
              
              <ServiceCategory>
                <SubSectionTitle>Дизайн</SubSectionTitle>
                <Grid>
                  {designCategories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </Grid>
              </ServiceCategory>
              
              <MoreLink to="/catalog">Посмотреть все услуги</MoreLink>
            </>
          )}
        </Section>
        
        <Section>
          <SectionTitle>Популярные товары</SectionTitle>
          
          {isLoading ? (
            <p className="text-center">Загрузка...</p>
          ) : (
            <>
              <Grid>
                {featuredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Grid>
              <MoreLink to="/catalog">Посмотреть весь каталог</MoreLink>
            </>
          )}
        </Section>
        
        <Section>
          <SectionTitle>Почему мы?</SectionTitle>
          
          <Features>
            <FeatureItem>
              <FeatureIcon>⚡</FeatureIcon>
              <FeatureTitle>Быстрое изготовление</FeatureTitle>
              <FeatureText>
                Мы гарантируем оперативное выполнение заказов в кратчайшие сроки без потери качества
              </FeatureText>
            </FeatureItem>
            
            <FeatureItem>
              <FeatureIcon>🛡️</FeatureIcon>
              <FeatureTitle>Гарантия качества</FeatureTitle>
              <FeatureText>
                Мы используем только современное оборудование и высококачественные материалы
              </FeatureText>
            </FeatureItem>
            
            <FeatureItem>
              <FeatureIcon>💰</FeatureIcon>
              <FeatureTitle>Гибкие цены</FeatureTitle>
              <FeatureText>
                Индивидуальный подход к каждому клиенту и гибкая система скидок при больших тиражах
              </FeatureText>
            </FeatureItem>
          </Features>
        </Section>
      </div>
    </div>
  );
};

export default HomePage; 