import styled from 'styled-components'

const GalleryContainer = styled.div`
  position: relative;
`

const MainImage = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`

const Badges = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Badge = styled.span`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.typography.weights.semiBold};
  color: white;
  background: ${({ type, theme }) => 
    type === 'new' ? theme.colors.secondary : theme.colors.primary};
`

const ThumbnailGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: center;
  }
`

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  object-fit: cover;
  transition: all 0.3s ease;
  border: 2px solid ${({ isActive, theme }) => 
    isActive ? theme.colors.primary : 'transparent'};

  &:hover {
    transform: translateY(-2px);
  }
`

const ProductGallery = ({ images, selectedImage, onImageSelect, badges }) => {
  return (
    <GalleryContainer>
      <MainImage>
        <img src={images[selectedImage]} alt="Product" />
        <Badges>
          {badges.isNew && <Badge type="new">New!</Badge>}
          {badges.discount && (
            <Badge type="discount">-{badges.discount}%</Badge>
          )}
        </Badges>
      </MainImage>

      <ThumbnailGrid>
        {images.map((image, index) => (
          <Thumbnail
            key={index}
            src={image}
            alt={`Product view ${index + 1}`}
            isActive={selectedImage === index}
            onClick={() => onImageSelect(index)}
          />
        ))}
      </ThumbnailGrid>
    </GalleryContainer>
  )
}

export default ProductGallery
