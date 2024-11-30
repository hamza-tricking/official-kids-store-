import React from 'react';
import styled from 'styled-components';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

const Section = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.colors.gray[50]};
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[400]};
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  }
  
  transition: all 0.3s ease;
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: -15px;
  ${({ $isRTL }) => $isRTL ? 'right: 20px;' : 'left: 20px;'}
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Stars = styled.div`
  color: #FFD700;
  margin-bottom: 1rem;
  display: flex;
  gap: 0.25rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
  text-align: ${({ $isRTL }) => $isRTL ? 'right' : 'left'};
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: ${({ $isRTL }) => $isRTL ? 'row-reverse' : 'row'};
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  text-align: ${({ $isRTL }) => $isRTL ? 'right' : 'left'};
`;

const Name = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
`;

const Role = styled.span`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 0.9rem;
`;

const Testimonials = () => {
  const { isRTL } = useLanguage();

  const testimonials = [
    {
      text: "The educational toys from BabyBloom have been amazing for my daughter's development. She's learning while having fun, and I can see her progress every day!",
      author: "Sarah Johnson",
      role: "Mother of 2",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      text: "As a father, I appreciate how BabyBloom's toys combine entertainment with education. The quality is excellent, and the customer service is outstanding.",
      author: "Michael Chen",
      role: "Parent & Educator",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      text: "These toys have made learning time the best part of our day. My son's cognitive skills have improved significantly since we started using BabyBloom products.",
      author: "Emily Rodriguez",
      role: "Mother & Child Development Specialist",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];

  return (
    <Section>
      <Container>
        <Title>What Parents Say</Title>
        <Subtitle>Discover why families love our educational toys and learning materials</Subtitle>
        <Grid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <QuoteIcon $isRTL={isRTL}>
                <FaQuoteLeft />
              </QuoteIcon>
              <Stars>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </Stars>
              <Text $isRTL={isRTL}>{testimonial.text}</Text>
              <Author $isRTL={isRTL}>
                <Avatar src={testimonial.avatar} alt={testimonial.author} />
                <AuthorInfo $isRTL={isRTL}>
                  <Name>{testimonial.author}</Name>
                  <Role>{testimonial.role}</Role>
                </AuthorInfo>
              </Author>
            </TestimonialCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Testimonials;
