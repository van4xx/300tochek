import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const Card = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow);
  }
`;

const ImageContainer = styled.div`
  height: 220px;
  overflow: hidden;
`;

const Image = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl || '/images/placeholder.jpg'});
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  
  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: var(--primary-color);
  line-height: 1.4;
`;

const Description = styled.p`
  color: var(--dark-gray);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const PriceContainer = styled.div`
  margin-top: auto;
`;

const PriceSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: var(--white);
`;

const Price = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Button = styled(Link)`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 0.75rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  &.secondary {
    background-color: transparent;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    
    &:hover {
      background-color: var(--primary-color);
      color: var(--white);
      transform: translateY(-2px);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
  }
`;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const priceOptions = Object.keys(product.price);
  const [selectedQuantity, setSelectedQuantity] = useState(priceOptions[0]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuantity(e.target.value);
  };
  
  return (
    <Card>
      <ImageContainer>
        <Image imageUrl={product.imageUrl} />
      </ImageContainer>
      <Content>
        <Title>{product.title}</Title>
        <Description>{product.description}</Description>
        <PriceContainer>
          <PriceSelect value={selectedQuantity} onChange={handleQuantityChange}>
            {priceOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </PriceSelect>
          <Price>{product.price[selectedQuantity]} ₽</Price>
        </PriceContainer>
        <ButtonContainer>
          <Button to={`/products/${product.id}`} className="secondary">
            Подробнее
          </Button>
          <Button to={`/order/${product.id}?quantity=${encodeURIComponent(selectedQuantity)}`}>
            Заказать
          </Button>
        </ButtonContainer>
      </Content>
    </Card>
  );
};

export default ProductCard; 