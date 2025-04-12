import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-left: auto; // Размещаем справа
  
  @media (max-width: 1200px) { // Примерная точка для изменения макета
    margin-left: 1rem;
  }
  
  @media (max-width: 992px) { // Когда переходим в мобильное меню
    width: 100%;
    margin-left: 0;
    margin-top: 1rem;
    order: 10; // Отправляем в конец мобильного меню
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid var(--light-gray);
  border-radius: 20px 0 0 20px;
  font-size: 0.9rem;
  outline: none;
  transition: var(--transition);
  min-width: 200px;
  
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 86, 163, 0.2);
  }
  
  @media (max-width: 992px) {
    flex-grow: 1; // Растягиваем инпут в мобильном меню
  }
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: var(--white);
  border: 1px solid var(--primary-color);
  border-left: none;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  font-size: 0.9rem;
  transition: var(--transition);
  // Убираем стили кнопки по умолчанию
  text-transform: none;
  letter-spacing: normal;
  font-weight: normal;
  font-family: 'Montserrat', sans-serif;
  
  &:hover {
    background-color: var(--secondary-color);
    border-color: var(--secondary-color);
    box-shadow: none;
    transform: none;
  }
`;

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery(''); // Очищаем поле после поиска
    }
  };

  return (
    <SearchForm onSubmit={handleSearch}>
      <SearchInput 
        type="text" 
        placeholder="Поиск по сайту..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchButton type="submit">Найти</SearchButton>
    </SearchForm>
  );
};

export default SearchBar; 