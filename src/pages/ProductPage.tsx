import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getProductById } from '../api';
import { Product } from '../types';
import ContactForm from '../components/ContactForm';

interface ProductPageParams {
  productId: string;
}

const PageContainer = styled.div`
  margin-top: 2rem;
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

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 400px;
`;

const Image = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl || '/images/placeholder.jpg'});
  background-size: cover;
  background-position: center;
`;

const ProductInfo = styled.div``;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const Description = styled.p`
  color: var(--dark-gray);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const PriceContainer = styled.div`
  margin-bottom: 2rem;
`;

const PriceTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const PriceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const PriceTableHead = styled.thead`
  background-color: var(--primary-color);
  color: var(--white);
  
  th {
    padding: 1rem;
    text-align: left;
  }
`;

const PriceTableBody = styled.tbody`
  tr {
    &:nth-child(odd) {
      background-color: var(--light-gray);
    }
  }
  
  td {
    padding: 1rem;
    border-bottom: 1px solid var(--light-gray);
  }
`;

const OrderButton = styled(Link)`
  display: inline-block;
  background-color: var(--secondary-color);
  color: var(--white);
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 107, 0, 0.8);
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
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const ProductPage: React.FC = () => {
  const { productId } = useParams<ProductPageParams>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<string>('');
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
          setSelectedQuantity(Object.keys(productData.price)[0]);
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
          <BreadcrumbLink to={`/catalog/${product.category.toLowerCase()}`}>
            {product.category}
          </BreadcrumbLink>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbCurrent>{product.title}</BreadcrumbCurrent>
        </Breadcrumbs>
        
        <ProductContainer>
          <ImageContainer>
            <Image imageUrl={product.imageUrl} />
          </ImageContainer>
          
          <ProductInfo>
            <Title>{product.title}</Title>
            <Description>{product.description}</Description>
            
            <PriceContainer>
              <PriceTitle>Цены:</PriceTitle>
              <PriceTable>
                <PriceTableHead>
                  <tr>
                    <th>Тираж</th>
                    <th>Цена</th>
                  </tr>
                </PriceTableHead>
                <PriceTableBody>
                  {Object.entries(product.price).map(([quantity, price]) => (
                    <tr key={quantity}>
                      <td>{quantity}</td>
                      <td>{price} ₽</td>
                    </tr>
                  ))}
                </PriceTableBody>
              </PriceTable>
              
              <OrderButton to={`/order/${product.id}?quantity=${selectedQuantity}`}>
                Заказать
              </OrderButton>
            </PriceContainer>
          </ProductInfo>
        </ProductContainer>
        
        <FormSection>
          <FormTitle>Заказать {product.title}</FormTitle>
          <ContactForm productId={product.id} defaultQuantity={selectedQuantity} />
        </FormSection>
      </PageContainer>
    </div>
  );
};

export default ProductPage; 