import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaPaperPlane, FaGift } from 'react-icons/fa';

const Section = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary}dd,
    ${({ theme }) => theme.colors.secondary}dd
  );
  color: white;
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/pattern.png') repeat;
    opacity: 0.1;
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  svg {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const Benefits = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const Benefit = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  opacity: 0.9;

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Form = styled(motion.form)`
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  flex-direction: ${({ $isRTL }) => $isRTL ? 'row-reverse' : 'row'};
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 1rem;
  }
`;

const Input = styled(motion.input)`
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 50px;
  font-size: 1rem;
  outline: none;
  text-align: ${({ $isRTL }) => $isRTL ? 'right' : 'left'};
  direction: ${({ $isRTL }) => $isRTL ? 'rtl' : 'ltr'};
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    background: white;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  background: white;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 160px;
  
  svg {
    font-size: 1.2rem;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Message = styled(motion.div)`
  margin-top: 1rem;
  font-size: 1rem;
  background: ${({ $success }) => $success ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  display: inline-block;
`;

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, isRTL } = useLanguage();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage(t('newsletterInvalidEmail'));
      setIsSuccess(false);
      setShowMessage(true);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage(t('newsletterSuccess'));
      setIsSuccess(true);
      setShowMessage(true);
      setEmail('');
      setTimeout(() => setShowMessage(false), 5000);
    } catch (error) {
      setMessage(t('newsletterError'));
      setIsSuccess(false);
      setShowMessage(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section $isRTL={isRTL}>
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaGift /> {t('newsletterTitle')}
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('newsletterSubtitle')}
        </Subtitle>

        <Benefits
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t('newsletterBenefits').map((benefit, index) => (
            <Benefit
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <FaGift /> {benefit}
            </Benefit>
          ))}
        </Benefits>

        <Form 
          $isRTL={isRTL}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('newsletterPlaceholder')}
            $isRTL={isRTL}
            required
            whileFocus={{ scale: 1.02 }}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? (
              t('newsletterSubmitting')
            ) : (
              <>
                <FaPaperPlane />
                {t('newsletterButton')}
              </>
            )}
          </Button>
        </Form>

        <AnimatePresence>
          {showMessage && (
            <Message
              $success={isSuccess}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </Message>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
};

export default Newsletter;
