import React from 'react';
import styled from 'styled-components';
import ContactForm from '../components/ContactForm';

const PageHeader = styled.div`
  background-color: var(--primary-color);
  color: var(--white);
  padding: 3rem 0;
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.8;
`;

const ContactsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div``;

const ContactSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 50px;
    height: 3px;
    background-color: var(--secondary-color);
    bottom: -8px;
    left: 0;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ContactIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: var(--primary-color);
`;

const ContactText = styled.div`
  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }
  
  p {
    color: var(--dark-gray);
  }
`;

const MapContainer = styled.div`
  height: 400px;
  background-color: var(--light-gray);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
  
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: var(--primary-color);
    color: var(--white);
    font-size: 1.5rem;
    border-radius: 50%;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: var(--secondary-color);
    }
  }
`;

const WorkingHours = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--light-gray);
    display: flex;
    justify-content: space-between;
    
    &:last-child {
      border-bottom: none;
    }
    
    span:last-child {
      font-weight: 500;
    }
  }
`;

const ContactsPage: React.FC = () => {
  return (
    <div>
      <PageHeader>
        <div className="container">
          <Title>Контактная информация</Title>
          <Subtitle>
            Свяжитесь с нами любым удобным способом или оставьте заявку, и мы свяжемся с вами
          </Subtitle>
        </div>
      </PageHeader>
      
      <div className="container">
        <ContactsContainer>
          <ContactInfo>
            <ContactSection>
              <SectionTitle>Контактные данные</SectionTitle>
              
              <ContactItem>
                <ContactIcon>📱</ContactIcon>
                <ContactText>
                  <h3>Телефон</h3>
                  <p>+7 (XXX) XXX-XX-XX</p>
                </ContactText>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>📧</ContactIcon>
                <ContactText>
                  <h3>Email</h3>
                  <p>info@300tochek.ru</p>
                </ContactText>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>🏠</ContactIcon>
                <ContactText>
                  <h3>Адрес</h3>
                  <p>г. Москва, ул. Примерная, д. 123</p>
                </ContactText>
              </ContactItem>
            </ContactSection>
            
            <ContactSection>
              <SectionTitle>Часы работы</SectionTitle>
              <WorkingHours>
                <li>
                  <span>Понедельник</span>
                  <span>09:00 - 18:00</span>
                </li>
                <li>
                  <span>Вторник</span>
                  <span>09:00 - 18:00</span>
                </li>
                <li>
                  <span>Среда</span>
                  <span>09:00 - 18:00</span>
                </li>
                <li>
                  <span>Четверг</span>
                  <span>09:00 - 18:00</span>
                </li>
                <li>
                  <span>Пятница</span>
                  <span>09:00 - 18:00</span>
                </li>
                <li>
                  <span>Суббота</span>
                  <span>10:00 - 16:00</span>
                </li>
                <li>
                  <span>Воскресенье</span>
                  <span>Выходной</span>
                </li>
              </WorkingHours>
            </ContactSection>
            
            <ContactSection>
              <SectionTitle>Мы в социальных сетях</SectionTitle>
              <SocialLinks>
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer">VK</a>
                <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">TG</a>
                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">WA</a>
              </SocialLinks>
            </ContactSection>
          </ContactInfo>
          
          <div>
            <MapContainer>
              {/* Здесь будет карта. В реальном проекте можно использовать Яндекс.Карты или Google Maps */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.397088123305!2d37.6173!3d55.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0JrRgNC10LzQu9GM!5e0!3m2!1sru!2sru!4v1622121172500!5m2!1sru!2sru" 
                title="Карта с расположением офиса"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </MapContainer>
            
            <ContactForm />
          </div>
        </ContactsContainer>
      </div>
    </div>
  );
};

export default ContactsPage; 