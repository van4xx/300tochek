import React from 'react';
import styled from 'styled-components';

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
  color: var(--white);
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
`;

const ContentSection = styled.section`
  padding: 2rem 0;
  max-width: 900px;
  margin: 0 auto;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--secondary-color);
  }
  
  p {
    margin-bottom: 1rem;
    line-height: 1.8;
  }
  
  ul {
    list-style: disc;
    margin-left: 2rem;
    margin-bottom: 1rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const ShippingPaymentPage: React.FC = () => {
  return (
    <div>
      <PageHeader>
        <div className="container">
          <Title>Доставка и оплата</Title>
          <Subtitle>Информация об условиях доставки и способах оплаты заказов</Subtitle>
        </div>
      </PageHeader>
      
      <div className="container">
        <ContentSection>
          <h2>Доставка</h2>
          <p>
            Мы предлагаем различные варианты доставки готовой продукции:
          </p>
          <ul>
            <li>Самовывоз из нашего офиса по адресу: г. Москва, ул. Примерная, д. 123.</li>
            <li>Курьерская доставка по Москве и Московской области. Стоимость рассчитывается индивидуально в зависимости от адреса и объема заказа.</li>
            <li>Доставка транспортными компаниями по всей России. Мы работаем с надежными перевозчиками (СДЭК, Деловые Линии и др.). Стоимость и сроки зависят от тарифов транспортной компании.</li>
          </ul>
          <p>
            Сроки доставки согласовываются с менеджером после подтверждения заказа и готовности продукции.
          </p>
          
          <h2>Оплата</h2>
          <p>
            Оплата заказов осуществляется следующими способами:
          </p>
          <ul>
            <li>Наличными или банковской картой при самовывозе из офиса.</li>
            <li>Безналичный расчет для юридических лиц (работаем с НДС и без НДС). Мы выставим счет на оплату после согласования всех деталей заказа.</li>
            <li>Онлайн-оплата банковской картой через защищенный платежный шлюз (в разработке).</li>
            <li>Перевод на расчетный счет для физических лиц.</li>
          </ul>
          <p>
            Для большинства заказов требуется предоплата в размере 50-100% в зависимости от типа продукции и объема заказа. Точные условия оплаты уточняйте у наших менеджеров.
          </p>
          <p>
            Мы всегда готовы обсудить индивидуальные условия оплаты и доставки для наших клиентов. Свяжитесь с нами для получения подробной информации.
          </p>
        </ContentSection>
      </div>
    </div>
  );
};

export default ShippingPaymentPage; 