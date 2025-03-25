import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getProductById } from '../api';
import { Product } from '../types';
import ContactForm from '../components/ContactForm';

interface OrderPageParams {
  productId: string;
}

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
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.8;
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
`;

const OrderSummary = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--light-gray);
  
  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.span`
  font-weight: 500;
`;

const SummaryValue = styled.span`
  font-weight: 700;
  color: var(--primary-color);
`;

const FormContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
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
  const { productId } = useParams<OrderPageParams>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quantityParam = queryParams.get('quantity');
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<string>(quantityParam || '');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const productData = await getProductById(parseInt(productId));
        
        if (productData) {
          setProduct(productData);
          if (!quantityParam && productData) {
            setQuantity(Object.keys(productData.price)[0]);
          }
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
    return <LoadingMessage>Загрузка данных...</LoadingMessage>;
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
            Заполните форму ниже, и мы свяжемся с вами для уточнения деталей заказа
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
            <BreadcrumbLink to={`/catalog/${product.category.toLowerCase()}`}>
              {product.category}
            </BreadcrumbLink>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbLink to={`/products/${product.id}`}>
              {product.title}
            </BreadcrumbLink>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbCurrent>Заказ</BreadcrumbCurrent>
          </Breadcrumbs>
          
          <OrderSummary>
            <SummaryTitle>Информация о заказе</SummaryTitle>
            <SummaryItem>
              <SummaryLabel>Товар:</SummaryLabel>
              <SummaryValue>{product.title}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Тираж:</SummaryLabel>
              <SummaryValue>{quantity}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Цена:</SummaryLabel>
              <SummaryValue>{price} ₽</SummaryValue>
            </SummaryItem>
          </OrderSummary>
          
          <FormContainer>
            <ContactForm productId={product.id} defaultQuantity={quantity} />
          </FormContainer>
        </PageContainer>
      </div>
    </div>
  );
};

export default OrderPage; 