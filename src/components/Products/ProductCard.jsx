import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../../contexts/LanguageContext';

const Card = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 100%;
  overflow: hidden;
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 1rem;
  ${({ isRTL }) => isRTL ? 'right: 1rem' : 'left: 1rem'};
  display: flex;
  gap: 0.5rem;
`;

const Badge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  background: ${({ type, theme }) => 
    type === 'new' ? theme.colors.secondary :
    type === 'sale' ? theme.colors.primary :
    theme.colors.accent};
`;

const Content = styled.div`
  padding: 1.5rem;
  text-align: ${({ isRTL }) => isRTL ? 'right' : 'left'};
`;

const Title = styled(Link)`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: ${({ isRTL }) => isRTL ? 'flex-end' : 'flex-start'};
`;

const CurrentPrice = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray[400]};
  text-decoration: line-through;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: ${({ isRTL }) => isRTL ? 'flex-end' : 'flex-start'};
`;

const Stars = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const ReviewCount = styled.span`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 0.9rem;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const BuyNowButton = styled.button`
  padding: 0.8rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${({ theme }) => theme.colors.primary};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background: ${({ theme }) => theme.colors.primaryDark}10;
  }

  &:active {
    transform: translateY(0);
  }
`;

const AddToCartButton = styled.button`
  padding: 0.8rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: white;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${({ theme }) => theme.colors.primary};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background: ${({ theme }) => theme.colors.primary}10;
  }

  &:active {
    transform: translateY(0);
  }
`;

const ProductCard = ({ product }) => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const {
    id,
    name,
    price,
    originalPrice,
    image,
    rating,
    reviewCount,
    badges = []
  } = product;

  const handleBuyNow = () => {
    navigate('/order', { 
      state: { 
        product: {
          id,
          name,
          price,
          image
        }
      }
    });
  };

  const handleAddToCart = () => {
    console.log('Add to cart');
  };

  return (
    <Card>
      <ImageContainer>
        <ProductImage src={image} alt={name} />
        <BadgeContainer isRTL={isRTL}>
          {badges.map((badge, index) => (
            <Badge key={index} type={badge.toLowerCase()}>
              {badge}
            </Badge>
          ))}
        </BadgeContainer>
      </ImageContainer>

      <Content isRTL={isRTL}>
        <Title to={`/product/${id}`}>{name}</Title>
        <Price isRTL={isRTL}>
          <CurrentPrice>${price}</CurrentPrice>
          {originalPrice && (
            <OriginalPrice>${originalPrice}</OriginalPrice>
          )}
        </Price>

        <Rating isRTL={isRTL}>
          <Stars>
            {'★'.repeat(Math.floor(rating))}
            {'☆'.repeat(5 - Math.floor(rating))}
          </Stars>
          <ReviewCount>
            ({reviewCount} {t('common.reviews')})
          </ReviewCount>
        </Rating>

        <ButtonContainer>
          <BuyNowButton onClick={handleBuyNow}>
            {t('buyNow')}
          </BuyNowButton>
          <AddToCartButton onClick={handleAddToCart}>
            {t('addToCart')}
          </AddToCartButton>
        </ButtonContainer>
      </Content>
    </Card>
  );
};

export default ProductCard;
