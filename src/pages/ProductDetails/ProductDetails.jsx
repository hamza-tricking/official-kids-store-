import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  ProductGallery,
  ProductInfo,
  ProductTabs,
  RelatedProducts
} from '../../components/ProductDetails'

const ProductContainer = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 2rem auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 0.9rem;

  a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  .separator {
    color: ${({ theme }) => theme.colors.gray[300]};
  }

  .current {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.typography.weights.semiBold};
  }
`

const ProductDetails = () => {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // Mock product data (replace with API call)
  const product = {
    id,
    name: 'Learning Blocks Set',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewCount: 128,
    sku: 'LBS-001',
    images: [
      '/products/game (1).jpg',
      '/products/game (2).jpg',
      '/products/game (3).jpg',
      '/products/game (4).jpg'
    ],
    description: 'Interactive blocks designed for early childhood development...',
    features: [
      'Basic shapes and colors',
      'Fine motor skills',
      'Problem-solving abilities',
      'Spatial awareness'
    ],
    specifications: {
      age: '3+ years',
      pieces: '50 blocks',
      materials: 'High-quality ABS plastic',
      dimensions: '30 x 20 x 15 cm',
      weight: '800g',
      package: '50 blocks, 1 storage bag, 1 instruction manual'
    },
    badges: {
      isNew: true,
      discount: 25
    }
  }

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, Math.min(10, value)))
  }

  const handleAddToCart = () => {
    console.log('Adding to cart:', { ...product, quantity })
    // Implement cart functionality
  }

  const handleBuyNow = () => {
    console.log('Buying now:', { ...product, quantity })
    // Implement checkout functionality
  }

  return (
    <ProductContainer>
      <Breadcrumb>
        <a href="/">Home</a>
        <span className="separator">›</span>
        <a href="/products">Products</a>
        <span className="separator">›</span>
        <span className="current">{product.name}</span>
      </Breadcrumb>

      <ProductGrid>
        <ProductGallery
          images={product.images}
          selectedImage={selectedImage}
          onImageSelect={setSelectedImage}
          badges={product.badges}
        />
        
        <ProductInfo
          product={product}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      </ProductGrid>

      <ProductTabs product={product} />
      <RelatedProducts currentProductId={id} />
    </ProductContainer>
  )
}

export default ProductDetails
