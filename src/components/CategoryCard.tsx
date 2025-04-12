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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: var(--transition);
  height: 100%;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow);
  }
`;

const ImageContainer = styled.div`
  height: 180px;
  overflow: hidden;
  position: relative;
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
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  line-height: 1.4;
`;

const Description = styled.p`
  color: var(--dark-gray);
  font-size: 0.9rem;
  line-height: 1.6;
`;

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Card to={`/catalog/${category.name.toLowerCase().replace(' ', '-')}`}>
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