import styled from 'styled-components'

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const CurrentPrice = styled.span`
  font-size: 1.8rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
`

const OriginalPrice = styled.span`
  font-size: 1.2rem;
  text-decoration: line-through;
  color: ${({ theme }) => theme.colors.gray[400]};
`

const Discount = styled.span`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.typography.weights.semiBold};
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Stars = styled.div`
  color: ${({ theme }) => theme.colors.accent};
`

const ReviewCount = styled.span`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 0.9rem;
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  margin: ${({ theme }) => `${theme.spacing.lg} 0`};
`

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const QuantityLabel = styled.span`
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: white;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
  }
`

const QuantityInput = styled.input`
  width: 50px;
  height: 32px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1rem;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`

const Button = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: ${({ theme }) => theme.typography.weights.semiBold};
  transition: all 0.3s ease;
  
  ${({ primary, theme }) => primary ? `
    background: ${theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${theme.colors.secondary};
    }
  ` : `
    background: white;
    border: 2px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    
    &:hover {
      background: ${theme.colors.gray[100]};
    }
  `}
`

const SKU = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray[400]};
  margin-top: ${({ theme }) => theme.spacing.md};
`

const ProductInfo = ({ 
  product, 
  quantity, 
  onQuantityChange, 
  onAddToCart, 
  onBuyNow 
}) => {
  return (
    <Container>
      <Title>{product.name}</Title>
      
      <PriceContainer>
        <CurrentPrice>${product.price}</CurrentPrice>
        {product.originalPrice && (
          <>
            <OriginalPrice>${product.originalPrice}</OriginalPrice>
            <Discount>
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </Discount>
          </>
        )}
      </PriceContainer>

      <Rating>
        <Stars>{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</Stars>
        <ReviewCount>({product.reviewCount} reviews)</ReviewCount>
      </Rating>

      <Description>{product.description}</Description>

      <Divider />

      <QuantityContainer>
        <QuantityLabel>Quantity:</QuantityLabel>
        <QuantityControl>
          <QuantityButton 
            onClick={() => onQuantityChange(quantity - 1)}
          >
            -
          </QuantityButton>
          <QuantityInput
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value))}
          />
          <QuantityButton 
            onClick={() => onQuantityChange(quantity + 1)}
          >
            +
          </QuantityButton>
        </QuantityControl>
      </QuantityContainer>

      <ButtonContainer>
        <Button onClick={onAddToCart}>
          Add to Cart
        </Button>
        <Button primary onClick={onBuyNow}>
          Buy Now
        </Button>
      </ButtonContainer>

      <SKU>SKU: {product.sku}</SKU>
    </Container>
  )
}

export default ProductInfo
