import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getProductById } from '../api';
import { Product } from '../types';
import ContactForm from '../components/ContactForm';

const PageContainer = styled.div`
  margin-top: 2rem;
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

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  margin-bottom: 3rem;
  background-color: var(--white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  height: auto;
  max-height: 500px;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  line-height: 1.3;
`;

const Description = styled.p`
  color: var(--dark-gray);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const PriceContainer = styled.div`
  margin-top: 2rem;
`;

const PriceTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const PriceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  font-size: 0.95rem;
`;

const PriceTableHead = styled.thead`
  th {
    padding: 0.8rem 1rem;
    text-align: left;
    background-color: var(--light-gray);
    color: var(--dark-gray);
    font-weight: 500;
  }
`;

const PriceTableBody = styled.tbody`
  tr {
    &:nth-child(odd) {
      background-color: rgba(0, 86, 163, 0.05);
    }
    &:hover {
      background-color: rgba(0, 86, 163, 0.1);
    }
  }
  
  td {
    padding: 0.8rem 1rem;
    border-bottom: 1px solid var(--light-gray);
    
    &:last-child {
      font-weight: 700;
      color: var(--secondary-color);
    }
  }
`;

const OrderButtonContainer = styled.div`
  margin-top: 1rem;
`;

const OrderButton = styled(Link)`
  display: inline-block;
  background-color: var(--secondary-color);
  color: var(--white);
  padding: 0.8rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: var(--transition);
  text-decoration: none;
  
  &:hover {
    background-color: var(--accent-color);
    color: var(--primary-color);
    box-shadow: var(--shadow);
    transform: translateY(-2px);
  }
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

const FormSection = styled.section`
  margin-top: 4rem;
  margin-bottom: 4rem;
  background-color: var(--white);
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--primary-color);
`;

const ProductPage: React.FC = () => {
  const { productId } = useParams<Record<string, string | undefined>>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedQuantityForOrder, setSelectedQuantityForOrder] = useState<string>('');
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
          const firstQuantity = Object.keys(productData.price)[0];
          setSelectedQuantityForOrder(firstQuantity || '');
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
  }, [productId]);
  
  if (isLoading) {
    return <LoadingMessage>Загрузка товара...</LoadingMessage>;
  }
  
  if (error || !product) {
    return <ErrorMessage>{error || 'Товар не найден'}</ErrorMessage>;
  }
  
  return (
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
          <BreadcrumbCurrent>{product.title}</BreadcrumbCurrent>
        </Breadcrumbs>
        
        <ProductContainer>
          <ImageContainer>
            <Image src={product.imageUrl} alt={product.title} />
          </ImageContainer>
          
          <ProductInfo>
            <Title>{product.title}</Title>
            <Description>{product.description}</Description>
            
            <PriceContainer>
              <PriceTitle>Цены и тиражи:</PriceTitle>
              <PriceTable>
                <PriceTableHead>
                  <tr>
                    <th>Тираж</th>
                    <th>Цена за тираж</th>
                  </tr>
                </PriceTableHead>
                <PriceTableBody>
                  {Object.entries(product.price).map(([quantity, price]) => (
                    <tr key={quantity} 
                        onClick={() => setSelectedQuantityForOrder(quantity)} 
                        style={{ cursor: 'pointer' }}
                    >
                      <td>{quantity}</td>
                      <td>{price} ₽</td>
                    </tr>
                  ))}
                </PriceTableBody>
              </PriceTable>
              
              <OrderButtonContainer>
                <OrderButton 
                  to={`/order/${product.id}?quantity=${encodeURIComponent(selectedQuantityForOrder)}`}
                  style={!selectedQuantityForOrder ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                >
                  Заказать ({selectedQuantityForOrder || 'Выберите тираж'})
                </OrderButton>
              </OrderButtonContainer>
            </PriceContainer>
          </ProductInfo>
        </ProductContainer>
        
        <FormSection>
          <FormTitle>Оставить заявку на {product.title}</FormTitle>
          <ContactForm productId={product.id} defaultQuantity={selectedQuantityForOrder} />
        </FormSection>
      </PageContainer>
    </div>
  );
};

export default ProductPage; 