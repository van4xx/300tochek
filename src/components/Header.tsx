import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const HeaderContainer = styled.header`
  background-color: var(--white);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  text-decoration: none;
  
  span {
    color: var(--secondary-color);
    margin-right: 5px;
  }
`;

const NavAndSearchWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: auto;

  @media (max-width: 992px) {
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    margin-left: 0;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 992px) {
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
    align-items: flex-start;
  }
`;

const NavItem = styled.div`
  position: relative;
  margin-left: 2rem;
  
  @media (max-width: 992px) {
    margin: 0;
    width: 100%;
  }
`;

const NavLinkBase = styled(Link)`
  color: var(--text-color);
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: var(--transition);
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: var(--secondary-color);
    transition: var(--transition);
  }
  
  &:hover {
    color: var(--secondary-color);
  }

  &:hover:after, &.active:after {
    width: 100%;
  }
  
  @media (max-width: 992px) {
    display: block;
    padding: 0.8rem 0;
    width: 100%;
    border-bottom: 1px solid var(--light-gray);
    
    &:after {
      display: none;
    }
  }
`;

const DropdownButton = styled.div`
  color: var(--text-color);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  transition: var(--transition);
  
  &:after {
    content: '▼';
    font-size: 0.6rem;
    margin-left: 0.5rem;
    transition: var(--transition);
  }
  
  &:hover {
    color: var(--secondary-color);
  }
  
  &.open:after {
    transform: rotate(180deg);
  }
  
  @media (max-width: 992px) {
    padding: 0.8rem 0;
    width: 100%;
    border-bottom: 1px solid var(--light-gray);
    justify-content: space-between;
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 10px);
  left: -10px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: var(--shadow);
  min-width: 220px;
  padding: 0.5rem 0;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(10px)')};
  transition: var(--transition);
  z-index: 10;
  
  @media (max-width: 992px) {
    position: static;
    width: 100%;
    box-shadow: none;
    margin-left: 1rem;
    border: none;
    padding: 0;
    background-color: transparent;
    opacity: 1;
    visibility: visible;
    transform: none;
    max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1.5rem;
  color: var(--text-color);
  text-decoration: none;
  transition: var(--transition);
  font-size: 0.95rem;
  
  &:hover {
    background-color: var(--light-gray);
    color: var(--primary-color);
  }
  
  @media (max-width: 992px) {
    padding: 0.8rem 0 0.8rem 1rem;
    border-bottom: 1px solid var(--light-gray);
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0;
  
  @media (max-width: 992px) {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

// Категории для выпадающих меню
const printCategories = [
  { name: 'Полиграфия', path: '/catalog/poligrafia' },
  { name: 'Наклейки', path: '/catalog/nakleiki' },
  { name: 'Маркетплейсы', path: '/catalog/marketpleisy' },
  { name: 'Наружная реклама', path: '/catalog/naruzhnaya-reklama' },
  { name: 'Упаковка', path: '/catalog/upakovka' },
  { name: 'Аксессуары', path: '/catalog/aksessuary' },
];

const designCategories = [
  { name: 'Фирменный стиль', path: '/catalog/firmennyj-stil' },
  { name: 'Веб-дизайн', path: '/catalog/web-dizajn' },
  { name: 'Иллюстрации', path: '/catalog/illyustracii' },
  { name: 'Дизайн упаковки', path: '/catalog/dizajn-upakovki' },
  { name: 'Брендирование', path: '/catalog/brendirovanie' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false);
  const [isDesignMenuOpen, setIsDesignMenuOpen] = useState(false);
  
  const printMenuRef = useRef<HTMLDivElement>(null);
  const designMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsPrintMenuOpen(false);
    setIsDesignMenuOpen(false);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Закрываем остальные меню при открытии/закрытии основного меню на мобильных
    if (window.innerWidth <= 992) {
      setIsPrintMenuOpen(false);
      setIsDesignMenuOpen(false);
    }
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
  
  // Закрытие меню при смене роута
  useEffect(() => {
    closeAllMenus();
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
        
        <NavAndSearchWrapper isOpen={isMenuOpen}>
          <Nav>
            <NavItem>
              <NavLinkBase to="/" className={location.pathname === '/' ? 'active' : ''}>
                Главная
              </NavLinkBase>
            </NavItem>
            
            <NavItem ref={printMenuRef}>
              <DropdownButton onClick={togglePrintMenu} className={isPrintMenuOpen ? 'open' : ''}>
                Печать
              </DropdownButton>
              <DropdownMenu isOpen={isPrintMenuOpen}>
                {printCategories.map((cat) => (
                  <DropdownItem key={cat.name} to={cat.path}>
                    {cat.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </NavItem>
            
            <NavItem ref={designMenuRef}>
              <DropdownButton onClick={toggleDesignMenu} className={isDesignMenuOpen ? 'open' : ''}>
                Дизайн
              </DropdownButton>
              <DropdownMenu isOpen={isDesignMenuOpen}>
                {designCategories.map((cat) => (
                  <DropdownItem key={cat.name} to={cat.path}>
                    {cat.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </NavItem>
            
            <NavItem>
              <NavLinkBase to="/catalog" className={location.pathname === '/catalog' ? 'active' : ''}>
                Каталог
              </NavLinkBase>
            </NavItem>
            
            <NavItem>
              <NavLinkBase to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                О нас
              </NavLinkBase>
            </NavItem>
            
            <NavItem>
              <NavLinkBase to="/contacts" className={location.pathname === '/contacts' ? 'active' : ''}>
                Контакты
              </NavLinkBase>
            </NavItem>
          </Nav>
          <SearchBar />
        </NavAndSearchWrapper>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 