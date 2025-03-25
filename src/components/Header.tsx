import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: var(--white);
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all var(--transition-normal) ease;

  &:hover {
    box-shadow: var(--shadow-lg);
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem var(--spacing-lg);
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  position: relative;
  transition: transform var(--transition-normal) ease;
  
  span {
    color: var(--secondary-color);
    font-weight: 800;
  }
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: var(--accent-color);
    border-radius: 50%;
    bottom: 5px;
    right: -10px;
  }
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    overflow: hidden;
    margin-top: ${({ isOpen }) => (isOpen ? '1rem' : '0')};
    transition: all var(--transition-normal) ease;
  }
`;

const NavItem = styled.div`
  position: relative;
  margin-left: 2rem;
  
  @media (max-width: 768px) {
    margin: 0.5rem 0;
    padding: 0.5rem 0;
    width: 100%;
  }
`;

const NavLink = styled(Link)<{ isActive?: boolean }>`
  color: ${props => props.isActive ? 'var(--primary-color)' : 'var(--text-color)'};
  font-weight: 600;
  position: relative;
  padding: 0.5rem 0;
  
  &:after {
    content: '';
    position: absolute;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 3px;
    bottom: -5px;
    left: 0;
    background-color: var(--secondary-color);
    transition: width var(--transition-normal) ease;
    border-radius: 2px;
  }
  
  &:hover {
    color: var(--primary-color);
    
    &:after {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    display: block;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--light-gray);
    width: 100%;
    
    &:after {
      bottom: 0;
    }
  }
`;

const DropdownButton = styled.div<{ isOpen: boolean }>`
  color: var(--text-color);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  position: relative;
  
  &:after {
    content: '';
    display: inline-block;
    margin-left: 0.5rem;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--text-color);
    transition: transform var(--transition-normal) ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
  
  &:hover {
    color: var(--primary-color);
    
    &:after {
      border-top-color: var(--primary-color);
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--light-gray);
    width: 100%;
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 5px);
  left: -1rem;
  background-color: var(--white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  width: 230px;
  padding: ${({ isOpen }) => (isOpen ? '0.75rem 0' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: all var(--transition-normal) ease;
  z-index: 10;
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: 1.5rem;
    width: 10px;
    height: 10px;
    background-color: var(--white);
    transform: rotate(45deg);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    position: static;
    width: 100%;
    box-shadow: none;
    padding-left: 1rem;
    border-radius: 0;
    
    &:before {
      display: none;
    }
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1.25rem;
  color: var(--text-color);
  text-decoration: none;
  transition: all var(--transition-normal) ease;
  font-weight: 500;
  position: relative;
  
  &:hover {
    background-color: var(--background-dark);
    color: var(--primary-color);
    padding-left: 1.5rem;
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 5px;
    left: 1.25rem;
    background-color: var(--secondary-color);
    transition: width var(--transition-normal) ease;
  }
  
  &:hover:after {
    width: 20px;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-normal) ease;
  
  &:hover {
    background-color: var(--background-dark);
    transform: none;
    box-shadow: none;
  }
  
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false);
  const [isDesignMenuOpen, setIsDesignMenuOpen] = useState(false);
  
  const printMenuRef = useRef<HTMLDivElement>(null);
  const designMenuRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const togglePrintMenu = () => {
    setIsPrintMenuOpen(!isPrintMenuOpen);
    if (isDesignMenuOpen) setIsDesignMenuOpen(false);
  };
  
  const toggleDesignMenu = () => {
    setIsDesignMenuOpen(!isDesignMenuOpen);
    if (isPrintMenuOpen) setIsPrintMenuOpen(false);
  };
  
  // Закрытие выпадающих меню при клике вне них
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (printMenuRef.current && !printMenuRef.current.contains(event.target as Node)) {
        setIsPrintMenuOpen(false);
      }
      
      if (designMenuRef.current && !designMenuRef.current.contains(event.target as Node)) {
        setIsDesignMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Закрытие мобильного меню при переходе по ссылке
  useEffect(() => {
    setIsMenuOpen(false);
    setIsPrintMenuOpen(false);
    setIsDesignMenuOpen(false);
  }, [location]);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <span>300</span>точек
        </Logo>
        
        <MenuButton onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </MenuButton>
        
        <Nav isOpen={isMenuOpen}>
          <NavItem>
            <NavLink to="/" isActive={location.pathname === '/'}>
              Главная
            </NavLink>
          </NavItem>
          
          <NavItem ref={printMenuRef}>
            <DropdownButton onClick={togglePrintMenu} isOpen={isPrintMenuOpen}>
              Печать
            </DropdownButton>
            <DropdownMenu isOpen={isPrintMenuOpen}>
              <DropdownItem to="/catalog/poligrafia">Полиграфия</DropdownItem>
              <DropdownItem to="/catalog/nakleiki">Наклейки</DropdownItem>
              <DropdownItem to="/catalog/marketpleisy">Маркетплейсы</DropdownItem>
              <DropdownItem to="/catalog/naruzhnaya-reklama">Наружная реклама</DropdownItem>
              <DropdownItem to="/catalog/upakovka">Упаковка</DropdownItem>
              <DropdownItem to="/catalog/aksessuary">Аксессуары</DropdownItem>
            </DropdownMenu>
          </NavItem>
          
          <NavItem ref={designMenuRef}>
            <DropdownButton onClick={toggleDesignMenu} isOpen={isDesignMenuOpen}>
              Дизайн
            </DropdownButton>
            <DropdownMenu isOpen={isDesignMenuOpen}>
              <DropdownItem to="/catalog/firmennyj-stil">Фирменный стиль</DropdownItem>
              <DropdownItem to="/catalog/web-dizajn">Веб-дизайн</DropdownItem>
              <DropdownItem to="/catalog/illyustracii">Иллюстрации</DropdownItem>
              <DropdownItem to="/catalog/dizajn-upakovki">Дизайн упаковки</DropdownItem>
              <DropdownItem to="/catalog/brendirovanie">Брендирование</DropdownItem>
            </DropdownMenu>
          </NavItem>
          
          <NavItem>
            <NavLink to="/catalog" isActive={location.pathname === '/catalog'}>
              Каталог
            </NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink to="/about" isActive={location.pathname === '/about'}>
              О нас
            </NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink to="/contacts" isActive={location.pathname === '/contacts'}>
              Контакты
            </NavLink>
          </NavItem>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 