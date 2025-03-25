import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const Card = styled(Link)`
  display: block;
  background-color: var(--white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    z-index: 1;
  }
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
`;

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Card to={`/catalog/${category.name.toLowerCase()}`}>
      <ImageContainer>
        <Image imageUrl={category.imageUrl} />
      </ImageContainer>
      <Content>
        <Title>{category.name}</Title>
        <Description>{category.description}</Description>
      </Content>
    </Card>
  );
};

export default CategoryCard; 