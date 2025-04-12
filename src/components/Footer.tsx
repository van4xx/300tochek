import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--primary-color);
  color: var(--white);
  padding: 3rem 0 2rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    position: relative;
    color: var(--accent-color);
    
    &:after {
      content: '';
      position: absolute;
      width: 50px;
      height: 2px;
      background-color: var(--secondary-color);
      bottom: -8px;
      left: 0;
    }
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    line-height: 1.7;
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  display: block;
  margin-bottom: 0.75rem;
  transition: var(--transition);
  font-size: 0.95rem;
  
  &:hover {
    color: var(--accent-color);
    padding-left: 5px;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  
  svg, span {
    margin-right: 0.8rem;
    color: var(--secondary-color);
    font-size: 1.1rem;
    width: 20px; // Для выравнивания иконок
    text-align: center;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  a {
    color: var(--white);
    font-size: 1.5rem;
    transition: var(--transition);
    
    &:hover {
      color: var(--accent-color);
      transform: scale(1.1);
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>О 300точек</h3>
          <p>Студия дизайна и печати "300точек" — ваш надежный партнер в создании качественной рекламной продукции и уникального дизайна.</p>
          <SocialLinks>
            <a href="#" target="_blank" rel="noopener noreferrer">VK</a>
            <a href="#" target="_blank" rel="noopener noreferrer">TG</a>
            <a href="#" target="_blank" rel="noopener noreferrer">WA</a>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <h3>Навигация</h3>
          <FooterLink to="/">Главная</FooterLink>
          <FooterLink to="/catalog">Каталог</FooterLink>
          <FooterLink to="/about">О нас</FooterLink>
          <FooterLink to="/contacts">Контакты</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <h3>Полезная информация</h3>
          <FooterLink to="/shipping-payment">Доставка и оплата</FooterLink>
          <FooterLink to="/privacy-policy">Политика конфиденциальности</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <h3>Контакты</h3>
          <ContactItem>
            <span>📱</span> +7 (XXX) XXX-XX-XX
          </ContactItem>
          <ContactItem>
            <span>📧</span> info@300tochek.ru
          </ContactItem>
          <ContactItem>
            <span>🏠</span> г. Москва, ул. Примерная, д. 123
          </ContactItem>
          <ContactItem>
            <span>🕒</span> Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 16:00
          </ContactItem>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {new Date().getFullYear()} Студия дизайна и печати "300точек". Все права защищены.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 