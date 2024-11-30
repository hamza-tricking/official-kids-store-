import styled from 'styled-components'
import ProductCard from '../Products/ProductCard'

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`

const RelatedProducts = ({ currentProductId }) => {
  // Mock related products (replace with API call)
  const relatedProducts = [
    {
      id: 'rp1',
      name: "Science Explorer Kit",
      price: 34.99,
      originalPrice: 44.99,
      image: "/products/game (3).jpg",
      rating: 4.8,
      reviewCount: 156,
      badges: ["Sale"]
    },
    {
      id: 'rp2',
      name: "Musical Instruments Set",
      price: 39.99,
      image: "/products/game (4).jpg",
      rating: 4.7,
      reviewCount: 94,
      badges: ["New"]
    },
    {
      id: 'rp3',
      name: "Building Blocks Tower",
      price: 19.99,
      image: "/products/game (5).jpg",
      rating: 4.6,
      reviewCount: 112,
      badges: []
    },
    {
      id: 'rp4',
      name: "Math Learning Cards",
      price: 14.99,
      image: "/products/game (6).jpg",
      rating: 4.9,
      reviewCount: 75,
      badges: ["Bestseller"]
    }
  ].filter(product => product.id !== currentProductId)

  return (
    <Section>
      <Title>You May Also Like</Title>
      <Grid>
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Section>
  )
}

export default RelatedProducts
