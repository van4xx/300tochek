import React, { useState } from 'react';
import styled from 'styled-components';
import { ContactFormData } from '../types';
import { submitContactForm } from '../api';

interface ContactFormProps {
  productId?: number;
  defaultQuantity?: string;
}

const FormContainer = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--primary-color);
  
  &:after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background-color: var(--secondary-color);
    margin: 0.5rem auto 0;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  
  &:hover {
    background-color: rgba(0, 86, 163, 0.8);
  }
  
  &:disabled {
    background-color: var(--dark-gray);
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background-color: var(--success);
  color: var(--white);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  background-color: var(--error);
  color: var(--white);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const ContactForm: React.FC<ContactFormProps> = ({ productId, defaultQuantity }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    productId: productId,
    quantity: defaultQuantity
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          productId: productId,
          quantity: defaultQuantity
        });
      } else {
        setSubmitError('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
      }
    } catch (error) {
      setSubmitError('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <FormContainer>
      <Title>Свяжитесь с нами</Title>
      
      {submitSuccess && (
        <SuccessMessage>
          Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.
        </SuccessMessage>
      )}
      
      {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Ваше имя *</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="phone">Телефон *</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="message">Сообщение</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={productId ? "Укажите детали заказа и свои пожелания" : "Ваше сообщение"}
          />
        </FormGroup>
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ContactForm; 