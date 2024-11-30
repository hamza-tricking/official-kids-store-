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
  ${({ isRTL }) => isRTL ? 'right: 20px;' : 'left: 20px;'}
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
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div``;

const Name = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
`;

const Role = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 0.9rem;
`;

const Testimonials = () => {
  const { t, isRTL } = useLanguage();

  const testimonials = [
    {
      text: t('testimonial1Text'),
      author: t('testimonial1Author'),
      role: t('testimonial1Role'),
      avatar: "game (1).jpg",
      rating: 5
    },
    {
      text: t('testimonial2Text'),
      author: t('testimonial2Author'),
      role: t('testimonial2Role'),
      avatar: "game (2).jpg",
      rating: 5
    },
    {
      text: t('testimonial3Text'),
      author: t('testimonial3Author'),
      role: t('testimonial3Role'),
      avatar: "game (3).jpg",
      rating: 5
    }
  ];

  return (
    <Section>
      <Container>
        <Title>{t('testimonialsTitle')}</Title>
        <Subtitle>
          {t('testimonialsSubtitle')}
        </Subtitle>
        <Grid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <QuoteIcon isRTL={isRTL}>
                <FaQuoteLeft />
              </QuoteIcon>
              <Stars>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </Stars>
              <Text>{testimonial.text}</Text>
              <Author>
                <Avatar src={`/src/assets/${testimonial.avatar}`} alt={testimonial.author} />
                <AuthorInfo>
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
