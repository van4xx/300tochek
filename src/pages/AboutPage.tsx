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
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.8;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background-color: var(--secondary-color);
    margin: 0.8rem auto 0;
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const AboutImage = styled.div`
  height: 400px;
  background-color: var(--light-gray);
  background-image: url('https://placehold.co/800x600/cccccc/cccccc?text=About+Company');
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 992px) {
    height: 300px;
  }
`;

const AboutText = styled.div`
  p {
    margin-bottom: 1.5rem;
    line-height: 1.8;
    font-size: 1.1rem;
    color: var(--dark-gray);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ValueItem = styled.div`
  background-color: var(--white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const ValueIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`;

const ValueTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const ValueDescription = styled.p`
  color: var(--dark-gray);
  font-size: 0.95rem;
  line-height: 1.6;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const TeamMember = styled.div`
  text-align: center;
`;

const MemberPhoto = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 250px;
  background-color: var(--light-gray);
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const MemberName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const MemberPosition = styled.p`
  color: var(--dark-gray);
  margin-bottom: 0.75rem;
`;

const AboutPage: React.FC = () => {
  return (
    <div>
      <PageHeader>
        <div className="container">
          <Title>О компании</Title>
          <Subtitle>
            Узнайте больше о студии дизайна и печати "300точек"
          </Subtitle>
        </div>
      </PageHeader>
      
      <div className="container">
        <Section>
          <SectionTitle>Наша история</SectionTitle>
          <AboutContent>
            <AboutImage />
            <AboutText>
              <p>
                Студия дизайна и печати "300точек" была основана в 2015 году группой энтузиастов,
                объединенных общей идеей – создавать качественную полиграфическую продукцию,
                которая поможет бизнесу наших клиентов выделиться на фоне конкурентов.
              </p>
              <p>
                За годы работы мы накопили огромный опыт в сфере полиграфии и дизайна,
                освоили различные технологии печати и постоянно следим за новыми тенденциями
                в индустрии. Наша команда постоянно развивается и совершенствует свои навыки,
                чтобы предложить клиентам только лучшие решения.
              </p>
              <p>
                Сегодня "300точек" – это современная студия с собственным производством,
                профессиональным оборудованием и командой квалифицированных специалистов.
                Мы гордимся каждым выполненным проектом и стремимся превосходить ожидания
                наших клиентов.
              </p>
            </AboutText>
          </AboutContent>
        </Section>
        
        <Section>
          <SectionTitle>Наши ценности</SectionTitle>
          <ValuesGrid>
            <ValueItem>
              <ValueIcon>🎯</ValueIcon>
              <ValueTitle>Качество</ValueTitle>
              <ValueDescription>
                Мы стремимся к безупречному качеству во всем, что делаем – от дизайна до готовой продукции.
              </ValueDescription>
            </ValueItem>
            
            <ValueItem>
              <ValueIcon>⏱️</ValueIcon>
              <ValueTitle>Оперативность</ValueTitle>
              <ValueDescription>
                Мы ценим время наших клиентов и всегда соблюдаем установленные сроки выполнения заказов.
              </ValueDescription>
            </ValueItem>
            
            <ValueItem>
              <ValueIcon>💡</ValueIcon>
              <ValueTitle>Креативность</ValueTitle>
              <ValueDescription>
                Мы находим нестандартные решения и предлагаем свежие идеи для каждого проекта.
              </ValueDescription>
            </ValueItem>
            
            <ValueItem>
              <ValueIcon>🤝</ValueIcon>
              <ValueTitle>Клиентоориентированность</ValueTitle>
              <ValueDescription>
                Мы внимательно относимся к потребностям каждого клиента и стремимся превзойти ожидания.
              </ValueDescription>
            </ValueItem>
            
            <ValueItem>
              <ValueIcon>📈</ValueIcon>
              <ValueTitle>Развитие</ValueTitle>
              <ValueDescription>
                Мы постоянно совершенствуем наши навыки и следим за новыми технологиями в отрасли.
              </ValueDescription>
            </ValueItem>
            
            <ValueItem>
              <ValueIcon>♻️</ValueIcon>
              <ValueTitle>Экологичность</ValueTitle>
              <ValueDescription>
                Мы заботимся об окружающей среде и используем экологичные материалы там, где это возможно.
              </ValueDescription>
            </ValueItem>
          </ValuesGrid>
        </Section>
        
        <Section>
          <SectionTitle>Наша команда</SectionTitle>
          <TeamGrid>
            <TeamMember>
              <MemberPhoto imageUrl="https://placehold.co/400x500/cccccc/cccccc?text=Team+1" />
              <MemberName>Иванов Иван</MemberName>
              <MemberPosition>Генеральный директор</MemberPosition>
            </TeamMember>
            
            <TeamMember>
              <MemberPhoto imageUrl="https://placehold.co/400x500/cccccc/cccccc?text=Team+2" />
              <MemberName>Петрова Елена</MemberName>
              <MemberPosition>Арт-директор</MemberPosition>
            </TeamMember>
            
            <TeamMember>
              <MemberPhoto imageUrl="https://placehold.co/400x500/cccccc/cccccc?text=Team+3" />
              <MemberName>Сидоров Алексей</MemberName>
              <MemberPosition>Ведущий дизайнер</MemberPosition>
            </TeamMember>
            
            <TeamMember>
              <MemberPhoto imageUrl="https://placehold.co/400x500/cccccc/cccccc?text=Team+4" />
              <MemberName>Козлова Мария</MemberName>
              <MemberPosition>Менеджер проектов</MemberPosition>
            </TeamMember>
          </TeamGrid>
        </Section>
      </div>
    </div>
  );
};

export default AboutPage; 