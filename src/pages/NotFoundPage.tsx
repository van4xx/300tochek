import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
  text-shadow: 3px 3px 0 var(--light-gray), 6px 6px 0 var(--secondary-color);
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: var(--dark-gray);
  margin-bottom: 2rem;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  background-color: var(--secondary-color);
  color: var(--white);
  padding: 0.8rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 500;
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  
  &:hover {
    background-color: var(--accent-color);
    color: var(--primary-color);
    box-shadow: var(--shadow);
    transform: translateY(-2px);
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <Title>404</Title>
      <Message>Упс! Страница, которую вы ищете, не найдена.</Message>
      <HomeButton to="/">Вернуться на главную</HomeButton>
    </Container>
  );
};

export default NotFoundPage; 