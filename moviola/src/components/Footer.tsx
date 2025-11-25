import Link from "next/link";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #1f2937;
  border-top: 1px solid rgba(6, 182, 212, 0.3);
`;

const MainContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr 1fr;
  }
`;

const BrandSection = styled.div`
  @media (min-width: 768px) {
    grid-column: span 1;
  }
`;

const BrandTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  font-family: "Playfair Display", "Georgia", serif;
  letter-spacing: 0.5px;
  background: linear-gradient(to right, #d32f2f, #6e38e0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    text-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
  }
`;

const BrandDescription = styled.p`
  color: #9ca3af;
  font-size: 0.875rem;
  line-height: 1.625;
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #1f2937;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6e38e0ff;
  }
`;

const SocialText = styled.span`
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
`;

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-column: span 2;
  }
`;

const LinkGroup = styled.div``;

const LinkTitle = styled.h3`
  color: ${(props) => props.color || "#6e38e0ff"};
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.125rem;
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled(Link)`
  color: #9ca3af;
  font-size: 0.875rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.hoverColor || "#6e38e0ff"};
  }
`;

const NewsletterSection = styled.div`
  @media (min-width: 768px) {
    grid-column: span 1;
  }
`;

const NewsletterTitle = styled.h3`
  color: #6e38e0ff;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.125rem;
`;

const NewsletterDescription = styled.p`
  color: #9ca3af;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const NewsletterForm = styled.div`
  display: flex;
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.75rem;
  background-color: #1f2937;
  border: 1px solid #374151;
  border-radius: 0.5rem 0 0 0.5rem;
  color: white;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #6e38e0ff;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const NewsletterButton = styled.button`
  background: linear-gradient(to right, #d32f2f, #6e38e0ff);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0 0.5rem 0.5rem 0;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 600;

  &:hover {
    background: linear-gradient(to right, #0e7490, #16a34a);
  }
`;

const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #374151;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FeatureItem = styled.div`
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const FeatureTitle = styled.h4`
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

const FeatureDescription = styled.p`
  color: #9ca3af;
  font-size: 0.75rem;
`;

const BottomBar = styled.div`
  background: linear-gradient(
    to right,
    rgba(8, 145, 178, 0.2),
    rgba(34, 197, 94, 0.2)
  );
  border-top: 1px solid #374151;
`;

const BottomContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 1rem;
`;

const BottomFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Copyright = styled.div`
  color: #9ca3af;
  font-size: 0.875rem;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const LegalLink = styled(Link)`
  color: #6b7280;
  font-size: 0.75rem;
  transition: color 0.2s ease;

  &:hover {
    color: #67e8f9;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      {/* Main Footer Content */}
      <MainContent>
        <FooterGrid>
          <BrandSection>
            <BrandTitle>Moviola</BrandTitle>
            <BrandDescription>
              Your ultimate movie companion. Discover, rate, and create
              personalized watchlists from thousands of films.
            </BrandDescription>

            <SocialContainer>
              {["Twitter", "Facebook", "Instagram", "YouTube"].map((social) => (
                <SocialIcon key={social}>
                  <SocialText>{social[0]}</SocialText>
                </SocialIcon>
              ))}
            </SocialContainer>
          </BrandSection>

          <LinksGrid>
            <LinkGroup>
              <LinkTitle color="#22d3ee">Explore</LinkTitle>
              <LinkList>
                {["Home", "Discover", "Trending", "New Releases"].map(
                  (link) => (
                    <FooterLink key={link} href="./">
                      {link}
                    </FooterLink>
                  )
                )}
              </LinkList>
            </LinkGroup>

            <LinkGroup>
              <LinkTitle color="#4ade80">Library</LinkTitle>
              <LinkList>
                {["Favorite", "Top Rated", "Playlist", "Watch Later"].map(
                  (link) => (
                    <FooterLink key={link} href="./">
                      {link}
                    </FooterLink>
                  )
                )}
              </LinkList>
            </LinkGroup>
             <NewsletterSection>
            <NewsletterTitle>Stay Updated</NewsletterTitle>
            <NewsletterDescription>
              Get the latest movie recommendations and updates.
            </NewsletterDescription>
            <NewsletterForm>
              <NewsletterInput type="email" placeholder="Your email" />
              <NewsletterButton>Join</NewsletterButton>
            </NewsletterForm>
          </NewsletterSection>
          </LinksGrid>

          {/* Newsletter */}
         
        </FooterGrid>

        {/* Feature Highlights */}
      </MainContent>

      {/* Bottom Bar */}
      <BottomBar>
        <BottomContent>
          <BottomFlex>
            <Copyright>
              © {new Date().getFullYear()} MovieMate. All rights reserved.
            </Copyright>
            <LegalLinks>
              {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
                <LegalLink key={item} href="./">
                  {item}
                </LegalLink>
              ))}
            </LegalLinks>
          </BottomFlex>
        </BottomContent>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
