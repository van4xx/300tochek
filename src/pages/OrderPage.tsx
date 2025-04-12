import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getProductById } from '../api';
import { Product } from '../types';
import ContactForm from '../components/ContactForm';

const PageContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 4rem;
`;

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

const Breadcrumbs = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: var(--dark-gray);
`;

const BreadcrumbLink = styled(Link)`
  color: var(--dark-gray);
  text-decoration: none;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 0.5rem;
`;

const BreadcrumbCurrent = styled.span`
  color: var(--text-color);
  font-weight: 500;
`;

const OrderContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const OrderSummary = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 2rem;
  position: sticky;
  top: 100px; /* Учитываем высоту хедера */
  
  @media (max-width: 992px) {
    position: static;
    margin-bottom: 2rem;
  }
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  border-bottom: 2px solid var(--secondary-color);
  padding-bottom: 0.5rem;
`;

const SummaryItem = styled.div`
  margin-bottom: 1rem;
`;

const SummaryLabel = styled.span`
  display: block;
  font-weight: 500;
  color: var(--dark-gray);
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
`;

const SummaryValue = styled.span`
  font-weight: 700;
  color: var(--text-color);
  font-size: 1.1rem;
`;

const SummaryPrice = styled(SummaryValue)`
  color: var(--secondary-color);
  font-size: 1.4rem;
`;

const OrderFormSection = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 2rem;
`;

const Steps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--light-gray);
`;

const Step = styled.div<{ active?: boolean }>`
  text-align: center;
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--dark-gray)'};
  font-weight: ${props => props.active ? '700' : '500'};
  
  span {
    display: block;
    font-size: 0.9rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  text-align: left;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 5rem 0;
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

const OrderPage: React.FC = () => {
  const { productId } = useParams<Record<string, string | undefined>>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quantityParam = queryParams.get('quantity');
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Не указан ID товара.');
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        const productData = await getProductById(parseInt(productId));
        
        if (productData) {
          setProduct(productData);
          const priceOptions = Object.keys(productData.price);
          // Устанавливаем тираж из URL или первый доступный
          setQuantity(quantityParam && priceOptions.includes(decodeURIComponent(quantityParam)) 
            ? decodeURIComponent(quantityParam) 
            : priceOptions[0] || '');
        } else {
          setError('Товар не найден.');
        }
      } catch (err) {
        console.error('Ошибка при загрузке товара:', err);
        setError('Не удалось загрузить информацию о товаре. Пожалуйста, попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId, quantityParam]);
  
  if (isLoading) {
    return <LoadingMessage>Загрузка данных заказа...</LoadingMessage>;
  }
  
  if (error || !product) {
    return <ErrorMessage>{error || 'Товар не найден'}</ErrorMessage>;
  }
  
  const price = product.price[quantity] || 0;
  
  return (
    <div>
      <PageHeader>
        <div className="container">
          <Title>Оформление заказа</Title>
          <Subtitle>
            Пожалуйста, проверьте детали вашего заказа и заполните контактную информацию.
          </Subtitle>
        </div>
      </PageHeader>
      
      <div className="container">
        <PageContainer>
          <Breadcrumbs>
            <BreadcrumbLink to="/">Главная</BreadcrumbLink>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbLink to="/catalog">Каталог</BreadcrumbLink>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbLink to={`/catalog/${product.category.toLowerCase().replace(/ /g, '-')}`}>
              {product.category}
            </BreadcrumbLink>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbLink to={`/products/${product.id}`}>
              {product.title}
            </BreadcrumbLink>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbCurrent>Оформление заказа</BreadcrumbCurrent>
          </Breadcrumbs>
          
          <OrderContent>
            <OrderSummary>
              <SummaryTitle>Ваш заказ</SummaryTitle>
              <SummaryItem>
                <SummaryLabel>Товар</SummaryLabel>
                <SummaryValue>{product.title}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Категория</SummaryLabel>
                <SummaryValue>{product.category}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Выбранный тираж</SummaryLabel>
                <SummaryValue>{quantity || 'Не выбран'}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Стоимость</SummaryLabel>
                <SummaryPrice>{price > 0 ? `${price} ₽` : '-'}</SummaryPrice>
              </SummaryItem>
            </OrderSummary>
            
            <OrderFormSection>
              <Steps>
                <Step active><span>Шаг 1:</span> Детали заказа</Step>
                <Step active><span>Шаг 2:</span> Контактная информация</Step>
                <Step><span>Шаг 3:</span> Подтверждение</Step>
              </Steps>
              <FormTitle>Заполните ваши данные</FormTitle>
              <ContactForm productId={product.id} defaultQuantity={quantity} />
            </OrderFormSection>
          </OrderContent>
        </PageContainer>
      </div>
    </div>
  );
};

export default OrderPage; 