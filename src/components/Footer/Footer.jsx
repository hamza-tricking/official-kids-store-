import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.text};
  color: white;
  padding: 4rem 2rem 2rem;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`;

const Column = styled.div``;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray[300]};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const Title = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: white;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray[300]};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.gray[300]};
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[700]};
  margin: 2rem 0;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[400]};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Links = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Grid>
          <Column>
            <Logo to="/">
              🎯 BabyBloom
            </Logo>
            <Description>
              Empowering children through educational play. We believe in making learning fun,
              engaging, and accessible for every child.
            </Description>
            <SocialLinks>
              <SocialLink href="https://facebook.com" target="_blank">
                <FaFacebook />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="https://instagram.com" target="_blank">
                <FaInstagram />
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank">
                <FaLinkedin />
              </SocialLink>
            </SocialLinks>
          </Column>
          
          <Column>
            <Title>Quick Links</Title>
            <List>
              <ListItem>
                <FooterLink to="/about">About Us</FooterLink>
              </ListItem>
              <ListItem>
                <FooterLink to="/products">Products</FooterLink>
              </ListItem>
              <ListItem>
                <FooterLink to="/categories">Categories</FooterLink>
              </ListItem>
              <ListItem>
                <FooterLink to="/blog">Blog</FooterLink>
              </ListItem>
            </List>
          </Column>
          
          <Column>
            <Title>Customer Service</Title>
            <List>
              <ListItem>
                <FooterLink to="/contact">Contact Us</FooterLink>
              </ListItem>
              <ListItem>
                <FooterLink to="/shipping">Shipping Info</FooterLink>
              </ListItem>
              <ListItem>
                <FooterLink to="/returns">Returns</FooterLink>
              </ListItem>
              <ListItem>
                <FooterLink to="/faq">FAQ</FooterLink>
              </ListItem>
            </List>
          </Column>
          
          <Column>
            <Title>Contact Info</Title>
            <List>
              <ListItem>
                <Description>1234 Toy Street</Description>
              </ListItem>
              <ListItem>
                <Description>Playville, PL 12345</Description>
              </ListItem>
              <ListItem>
                <Description>Phone: (123) 456-7890</Description>
              </ListItem>
              <ListItem>
                <Description>Email: info@babybloom.com</Description>
              </ListItem>
            </List>
          </Column>
        </Grid>
        
        <Divider />
        
        <Bottom>
          <Copyright>
            © 2023 BabyBloom. Made with <FaHeart style={{ color: '#FF6B6B' }} /> for kids
          </Copyright>
          <Links>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/sitemap">Sitemap</FooterLink>
          </Links>
        </Bottom>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
