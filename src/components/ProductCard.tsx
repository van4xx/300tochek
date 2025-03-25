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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  height: 200px;
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
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const Description = styled.p`
  color: var(--dark-gray);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const PriceContainer = styled.div`
  margin-top: auto;
`;

const PriceSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  font-size: 0.9rem;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled(Link)`
  flex: 1;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 86, 163, 0.8);
  }
  
  &.secondary {
    background-color: transparent;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    
    &:hover {
      background-color: rgba(0, 86, 163, 0.1);
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
          <Button to={`/order/${product.id}?quantity=${selectedQuantity}`}>
            Заказать
          </Button>
        </ButtonContainer>
      </Content>
    </Card>
  );
};

export default ProductCard; 