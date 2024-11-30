import { useState } from 'react'
import styled from 'styled-components'

const TabsContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

const TabList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const Tab = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.gray[400]};
  font-weight: ${({ active, theme }) => 
    active ? theme.typography.weights.semiBold : theme.typography.weights.medium};
  border-bottom: 2px solid ${({ active, theme }) => 
    active ? theme.colors.primary : 'transparent'};
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const TabPanel = styled.div`
  display: ${({ active }) => active ? 'block' : 'none'};
`

const FeatureList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  &::before {
    content: '✓';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-radius: 50%;
    font-size: 0.8rem;
  }
`

const SpecTable = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 600px;
`

const SpecLabel = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.gray[400]};
`

const SpecValue = styled.div`
  color: ${({ theme }) => theme.colors.text};
`

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('features')

  const tabs = [
    { id: 'features', label: 'Features' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'shipping', label: 'Shipping' }
  ]

  return (
    <TabsContainer>
      <TabList>
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      <TabPanel active={activeTab === 'features'}>
        <FeatureList>
          {product.features.map((feature, index) => (
            <FeatureItem key={index}>{feature}</FeatureItem>
          ))}
        </FeatureList>
      </TabPanel>

      <TabPanel active={activeTab === 'specifications'}>
        <SpecTable>
          {Object.entries(product.specifications).map(([key, value]) => (
            <>
              <SpecLabel>{key.charAt(0).toUpperCase() + key.slice(1)}:</SpecLabel>
              <SpecValue>{value}</SpecValue>
            </>
          ))}
        </SpecTable>
      </TabPanel>

      <TabPanel active={activeTab === 'shipping'}>
        <SpecTable>
          <SpecLabel>Delivery Time:</SpecLabel>
          <SpecValue>2-5 business days</SpecValue>
          
          <SpecLabel>Shipping Cost:</SpecLabel>
          <SpecValue>Free shipping on orders over $50</SpecValue>
          
          <SpecLabel>Returns:</SpecLabel>
          <SpecValue>30-day money-back guarantee</SpecValue>
          
          <SpecLabel>International:</SpecLabel>
          <SpecValue>Available for select countries</SpecValue>
        </SpecTable>
      </TabPanel>
    </TabsContainer>
  )
}

export default ProductTabs
