import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCategoriesByType, getAllProducts } from '../api';
import { Category, Product } from '../types';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

const Hero = styled.section`
  background: linear-gradient(rgba(0, 86, 163, 0.6), rgba(0, 86, 163, 0.6)), url('/images/hero-bg.jpg') center/cover no-repeat;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: var(--white);
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: var(--white);
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButton = styled(Link)`
  background-color: var(--secondary-color);
  color: var(--white);
  padding: 0.8rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 500;
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background-color: var(--accent-color);
    color: var(--primary-color);
    box-shadow: var(--shadow);
    transform: translateY(-2px);
  }
`;

const Section = styled.section`
  padding: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  color: var(--primary-color);
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: var(--secondary-color);
    margin: 1rem auto 0;
    border-radius: 2px;
  }
`;

const SubSectionTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 2.5rem;
  color: var(--primary-color);
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: var(--secondary-color);
    margin: 0.8rem 0 0;
    border-radius: 2px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
`;

const MoreLink = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  font-weight: 500;
  color: var(--secondary-color);
  text-decoration: underline;
  transition: var(--transition);
  
  &:hover {
    color: var(--primary-color);
    text-decoration: none;
  }
`;

const MoreLinkContainer = styled.div`
  text-align: center;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
`;

const FeatureItem = styled.div`
  text-align: center;
  padding: 2.5rem 2rem;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: var(--shadow);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const FeatureText = styled.p`
  color: var(--dark-gray);
  font-size: 0.95rem;
`;

const ServiceCategory = styled.div`
  margin-bottom: 5rem;
`;

const HomePage: React.FC = () => {
  const [printCategories, setPrintCategories] = useState<Category[]>([]);
  const [designCategories, setDesignCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [printCategoriesData, designCategoriesData, productsData] = await Promise.all([
          getCategoriesByType('Печать'),
          getCategoriesByType('Дизайн'),
          getAllProducts()
        ]);
        
        setPrintCategories(printCategoriesData.slice(0, 4)); // Показываем только 4 категории
        setDesignCategories(designCategoriesData.slice(0, 4)); // Показываем только 4 категории
        // Отбираем "популярные" продукты (например, первые 4)
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
        <HeroTitle>300точек</HeroTitle>
        <HeroSubtitle>
          Ваш надежный партнер в мире дизайна и качественной печати. Создаем уникальные решения для вашего бизнеса.
        </HeroSubtitle>
        <HeroButton to="/catalog">Наши Услуги</HeroButton>
      </Hero>
      
      <div className="container">
        <Section>
          <SectionTitle>Наши услуги</SectionTitle>
          
          {isLoading ? (
            <div className="text-center">Загрузка...</div>
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
              
              <MoreLinkContainer>
                <MoreLink to="/catalog">Посмотреть все услуги</MoreLink>
              </MoreLinkContainer>
            </>
          )}
        </Section>
        
        <Section>
          <SectionTitle>Популярные товары</SectionTitle>
          
          {isLoading ? (
            <div className="text-center">Загрузка...</div>
          ) : (
            <>
              <Grid>
                {featuredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Grid>
              <MoreLinkContainer>
                <MoreLink to="/catalog">Перейти в каталог</MoreLink>
              </MoreLinkContainer>
            </>
          )}
        </Section>
        
        <Section>
          <SectionTitle>Почему выбирают нас?</SectionTitle>
          
          <Features>
            <FeatureItem>
              <FeatureIcon>⚡</FeatureIcon>
              <FeatureTitle>Быстро и точно в срок</FeatureTitle>
              <FeatureText>
                Гарантируем оперативное выполнение заказов в кратчайшие сроки без потери качества.
              </FeatureText>
            </FeatureItem>
            
            <FeatureItem>
              <FeatureIcon>💎</FeatureIcon>
              <FeatureTitle>Высокое качество</FeatureTitle>
              <FeatureText>
                Используем современное оборудование и лучшие материалы для безупречного результата.
              </FeatureText>
            </FeatureItem>
            
            <FeatureItem>
              <FeatureIcon>💡</FeatureIcon>
              <FeatureTitle>Креативный подход</FeatureTitle>
              <FeatureText>
                Разрабатываем уникальные дизайны, которые помогут вашему бренду выделиться.
              </FeatureText>
            </FeatureItem>
          </Features>
        </Section>
      </div>
    </div>
  );
};

export default HomePage; 