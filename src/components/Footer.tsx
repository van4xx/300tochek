import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--primary-color);
  color: var(--white);
  padding: 2rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      width: 50px;
      height: 2px;
      background-color: var(--secondary-color);
      bottom: -5px;
      left: 0;
    }
  }
`;

const FooterLink = styled(Link)`
  color: var(--white);
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    color: var(--white);
    font-size: 1.5rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--accent-color);
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>О компании</h3>
          <p>Студия дизайна и печати "300точек" предлагает широкий спектр услуг по разработке дизайна и печати рекламной продукции.</p>
          <SocialLinks>
            <a href="https://vk.com" target="_blank" rel="noopener noreferrer">VK</a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">TG</a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">WA</a>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <h3>Разделы</h3>
          <FooterLink to="/">Главная</FooterLink>
          <FooterLink to="/catalog">Каталог</FooterLink>
          <FooterLink to="/about">О нас</FooterLink>
          <FooterLink to="/contacts">Контакты</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <h3>Услуги</h3>
          <FooterLink to="/catalog/visitki">Визитки</FooterLink>
          <FooterLink to="/catalog/listovki">Листовки</FooterLink>
          <FooterLink to="/catalog/bannery">Баннеры</FooterLink>
          <FooterLink to="/catalog/broshyury">Брошюры</FooterLink>
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
            <span>🕒</span> Пн-Пт: 9:00 - 18:00
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