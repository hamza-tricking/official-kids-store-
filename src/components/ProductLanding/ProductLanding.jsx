import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(-20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-20px); }
`;

const fadeInPopup = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.gray[50]} 0%,
    #ffffff 50%,
    ${({ theme }) => theme.colors.gray[50]} 100%
  );
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  direction: ${props => props.isRTL ? 'rtl' : 'ltr'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FormContainer = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: ${({ theme }) => theme.colors.gray[600]};
    margin-bottom: 2rem;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: ${({ error }) => error ? '1rem' : '0.5rem'};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 2px solid ${({ theme, error }) => error ? '#FF0000' : theme.colors.gray[200]};
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  direction: ${props => props.isRTL ? 'rtl' : 'ltr'};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => error ? '#FF0000' : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ error }) => error ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 123, 255, 0.1)'};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  background: linear-gradient(45deg, 
    ${({ theme }) => theme.colors.primary}, 
    ${({ theme }) => theme.colors.secondary}
  );
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SuccessPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #2c3e50;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
  animation: ${fadeInPopup} 0.3s ease-out forwards;
  min-width: 400px;
  border: 2px solid #4CAF50;
`;

const PopupIcon = styled(FaCheckCircle)`
  font-size: 4rem;
  color: #4CAF50;
  margin-bottom: 20px;
`;

const PopupTitle = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 15px 0;
`;

const PopupMessage = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin: 15px 0 25px 0;
  line-height: 1.5;
`;

const OkButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: ${fadeInPopup} 0.3s ease-out forwards;
`;

const ImageSection = styled.div`
  img {
    width: 100%;
    max-width: 500px;
    height: auto;
    animation: ${fadeIn} 0.6s ease-out 0.3s backwards;
  }
`;

const ErrorMessage = styled.span`
  color: #FF0000;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
  animation: ${fadeIn} 0.2s ease-in;
  font-weight: 500;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: 15px;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const ProductLanding = () => {
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('firstNameRequired');
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('lastNameRequired');
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = t('phoneRequired');
    } else {
      // Simple phone validation - can be made more specific for your region
      const phoneRegex = /^\+?[\d\s-]{8,}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = t('invalidPhone');
      }
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = t('addressRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        address: ''
      });
      setErrors({});
    }
  };

  const handleOkClick = () => {
    setShowSuccess(false);
    navigate('/');
  };

  return (
    <Section isRTL={isRTL}>
      {showSuccess && (
        <>
          <Overlay />
          <SuccessPopup>
            <PopupIcon />
            <PopupTitle>{t('successTitle')}</PopupTitle>
            <PopupMessage>
              {t('successMessage')}
            </PopupMessage>
            <OkButton onClick={handleOkClick}>
              {t('ok')}
            </OkButton>
          </SuccessPopup>
        </>
      )}
      <Container>
        <FormContainer>
          <h2>{t('orderTitle')}</h2>
          {product && (
            <ProductInfo>
              <ProductImage src={product.image} alt={product.name} />
              <ProductDetails>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price}</ProductPrice>
              </ProductDetails>
            </ProductInfo>
          )}
          <p>{t('orderSubtitle')}</p>
          
          <Form onSubmit={handleSubmit} dir={isRTL ? 'rtl' : 'ltr'}>
            <InputGroup error={errors.firstName}>
              <Label>{t('firstName')}</Label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isRTL={isRTL}
                error={errors.firstName}
              />
              {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
            </InputGroup>

            <InputGroup error={errors.lastName}>
              <Label>{t('lastName')}</Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isRTL={isRTL}
                error={errors.lastName}
              />
              {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
            </InputGroup>

            <InputGroup error={errors.phone}>
              <Label>{t('phone')}</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isRTL={isRTL}
                error={errors.phone}
              />
              {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            </InputGroup>

            <InputGroup error={errors.address}>
              <Label>{t('address')}</Label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                isRTL={isRTL}
                error={errors.address}
              />
              {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
            </InputGroup>

            <SubmitButton type="submit">
              {t('submit')}
            </SubmitButton>
          </Form>
        </FormContainer>

        <ImageSection>
          <img src={product?.image} alt={product?.name} />
        </ImageSection>
      </Container>
    </Section>
  );
};

export default ProductLanding;
