import React, { useState } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../../contexts/LanguageContext';

const Section = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: white;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  outline: none;
  text-align: ${({ isRTL }) => isRTL ? 'right' : 'left'};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: white;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Message = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  opacity: ${({ show }) => (show ? '1' : '0')};
  transition: opacity 0.3s ease;
`;

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const { t, isRTL } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setMessage(t('newsletterSuccess'));
      setShowMessage(true);
      setEmail('');
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <Section>
      <Container>
        <Title>{t('newsletterTitle')}</Title>
        <Subtitle>
          {t('newsletterSubtitle')}
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder={t('newsletterPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRTL={isRTL}
          />
          <Button type="submit">
            {t('newsletterButton')}
          </Button>
        </Form>
        <Message show={showMessage}>{message}</Message>
      </Container>
    </Section>
  );
};

export default Newsletter;
