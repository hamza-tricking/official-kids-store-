import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderContainer = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    margin: 2rem auto;
    gap: 2rem;
  }
`;

const ProductSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  object-fit: cover;
`;

const ProductTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FormSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

const OrderSummary = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Total = styled(SummaryItem)`
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 1rem;
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.gray[400]};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SuccessModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 90%;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  
  h2 {
    color: #4CAF50;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    margin-bottom: 1.5rem;
    color: #666;
    line-height: 1.5;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #45a049;
    }
  }
`;

const Order = () => {
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!product) {
    React.useEffect(() => {
      navigate('/products');
    }, [navigate]);
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCloseModal = () => {
    setSuccess(false);
    navigate('/products');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const data = {
        timestamp: new Date().toISOString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        productName: product.name,
        price: product.price,
        language: isRTL ? 'ar' : 'en'
      };

      console.log('Submitting form data:', data);

      const response = await fetch('https://script.google.com/macros/s/AKfycbxTNLan4I10SHkLviHNkE5Z7pzWRJXSEuq3f8ij76PMXuDjSJAh2eGiqEDRFlPmYAyE/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data).toString(),
        mode: 'no-cors'
      });

      console.log('Form submission completed');
      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        address: ''
      });

    } catch (err) {
      console.error('Order submission error:', err);
      setError(t('orderError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OrderContainer>
      <ProductSection>
        <ProductImage src={product.image} alt={product.name} />
        <ProductTitle>{product.name}</ProductTitle>
        <ProductPrice>${product.price}</ProductPrice>
        <ProductDescription>{product.description}</ProductDescription>
      </ProductSection>

      <FormSection>
        <Title>{t('orderTitle')}</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>{t('firstName')}</Label>
            <Input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label>{t('lastName')}</Label>
            <Input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label>{t('phone')}</Label>
            <Input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <Label>{t('address')}</Label>
            <TextArea 
              name="address"
              value={formData.address}
              onChange={handleChange}
              required 
            />
          </FormGroup>

          <OrderSummary>
            <SummaryItem>
              <span>{t('subtotal')}</span>
              <span>${product.price}</span>
            </SummaryItem>
            <SummaryItem>
              <span>{t('shipping')}</span>
              <span>{t('freeShipping')}</span>
            </SummaryItem>
            <Total>
              <span>{t('total')}</span>
              <span>${product.price}</span>
            </Total>
          </OrderSummary>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && (
            <SuccessModal>
              <ModalContent>
                <h2>{isRTL ? '🎉 شكراً لطلبك!' : '🎉 Thank You for Your Order!'}</h2>
                <p>
                  {isRTL 
                    ? 'تم استلام طلبك بنجاح. سيتصل بك فريقنا خلال 24 ساعة لتأكيد تفاصيل طلبك وترتيب التوصيل. نشكرك على ثقتك في بيبي بلوم!'
                    : 'Your order has been successfully received. Our team will contact you within 24 hours to confirm your order details and arrange delivery. We appreciate your trust in BabyBloom!'
                  }
                </p>
                <button onClick={handleCloseModal}>
                  {isRTL ? 'مواصلة التسوق' : 'Continue Shopping'}
                </button>
              </ModalContent>
            </SuccessModal>
          )}
          
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
          >
            {isSubmitting ? t('submitting') : t('submit')}
          </SubmitButton>
        </Form>
      </FormSection>
    </OrderContainer>
  );
};

export default Order;
