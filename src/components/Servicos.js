import { Container, Row, Col, Button, Image, Card, Carousel } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import DesenvolvimentoImage from './Images/Desenvolvimento.png';
import ArteImage from './Images/Arte.png';
import AnimacaoImage from './Images/Animacao.png';
import PlanejamentoImage from './Images/Planejamento.jpg';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';

const SERVICES_IMAGES = [DesenvolvimentoImage, ArteImage, AnimacaoImage, PlanejamentoImage];

const Servicos = () => {
  const { t } = useTranslation('common');

  const getServicesData = useCallback(() => [
    {
      number: '01',
      title: t('services.development.title'),
      description: t('services.development.description'),
      image: SERVICES_IMAGES[0],
    },
    {
      number: '02',
      title: t('services.art.title'),
      description: t('services.art.description'),
      image: SERVICES_IMAGES[1],
    },
    {
      number: '03',
      title: t('services.animation.title'),
      description: t('services.animation.description'),
      image: SERVICES_IMAGES[2],
    },
    {
      number: '04',
      title: t('services.planning.title'),
      description: t('services.planning.description'),
      image: SERVICES_IMAGES[3],
    },
  ], [t]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 768;

  const servicesData = getServicesData();
  const selectedService = servicesData[currentIndex];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % servicesData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [servicesData.length]);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const ServiceCard = ({ service, index, isSelected }) => (
    <Card
      onClick={() => handleCardClick(index)}
      className={`clickable-card text-center ${isSelected ? 'selected-card' : ''}`}
    >
      <Card.Body>
        <Card.Title className="service-number">{service.number}</Card.Title>
        <Card.Text className={`card-text ${isSelected ? 'selected' : ''}`}>
          {service.title}
        </Card.Text>
      </Card.Body>
    </Card>
  );

  // Agrupa os cards em pares para o carousel mobile (2 por slide)
  const chunkedServices = [];
  for (let i = 0; i < servicesData.length; i += 2) {
    chunkedServices.push(servicesData.slice(i, i + 2));
  }

  return (
    <Container>
      <div className="py-5">
        <Row className="services-title">
          <h3>
            <span className="gray-title">{t('services.title')}</span>{' '}
            <span className="orange-title">{t('services.secondTitle')}</span>
          </h3>
        </Row>
        <Row className="services-title">
          <h3 className={`overlapping-text ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            <span className="orange-title-border">{selectedService.number}</span>
            <span className="overlap">{selectedService.title}</span>
          </h3>
        </Row>
        {isMobile ? (
          /* MOBILE LAYOUT: Description -> Image -> Button */
          <div className="d-flex flex-column mb-4">
            <div className={`content-slide ${isAnimating ? 'fade-out' : 'fade-in'}`}>
              <div className="sub-text text-start mb-3">
                <p>{selectedService.description}</p>
              </div>
            </div>
            
            <div className="d-flex justify-content-center mb-3">
              <Image
                src={selectedService.image}
                fluid
                className={`service-image rounded ${isAnimating ? 'fade-in active' : 'fade-in'}`}
              />
            </div>

            <div className={`content-slide ${isAnimating ? 'fade-out' : 'fade-in'} d-flex justify-content-center`}>
              <Button className="cta-button quote-button"
                as={Link}
                to="MailUs"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}>
                {t('services.buttonCTA.text')}
                <FaArrowRight className="ms-2" style={{ width: '16px', height: '16px' }} />
              </Button>
            </div>
          </div>
        ) : (
          /* DESKTOP LAYOUT */
          <Row className="mb-4">
            <Col xs={12} md={6} className="d-flex flex-column mb-4 mb-md-0">
              <div className={`content-slide ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                <div className="flex-grow-1 sub-text text-start">
                  <p>{selectedService.description}</p>
                </div>
                <div className="mt-3">
                  <Button className="cta-button quote-button"
                    as={Link}
                    to="MailUs"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}>
                    {t('services.buttonCTA.text')}
                    <FaArrowRight className="ms-2" style={{ width: '16px', height: '16px' }} />
                  </Button>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
              <Image
                src={selectedService.image}
                fluid
                className={`service-image rounded ${isAnimating ? 'fade-in active' : 'fade-in'}`}
              />
            </Col>
          </Row>
        )}

        {isMobile ? (
          /* MOBILE: Carousel com 2 cards por slide */
          <>
            <Carousel
              activeIndex={Math.floor(currentIndex / 2)}
              onSelect={(slideIndex) => handleCardClick(slideIndex * 2)}
              interval={null}
              indicators={false}
              controls={false}
              className="service-mobile-carousel"
            >
              {chunkedServices.map((chunk, slideIndex) => (
                <Carousel.Item key={slideIndex}>
                  <Row className="justify-content-center g-3 px-2">
                    {chunk.map((service, i) => {
                      const realIndex = slideIndex * 2 + i;
                      return (
                        <Col xs={6} key={realIndex}>
                          <ServiceCard
                            service={service}
                            index={realIndex}
                            isSelected={currentIndex === realIndex}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
            {/* Indicadores customizados abaixo dos cards */}
            <div className="d-flex justify-content-center mt-3">
              <div className="custom-carousel-indicators">
                {chunkedServices.map((_, slideIndex) => (
                  <button
                    key={slideIndex}
                    className={`carousel-dot ${Math.floor(currentIndex / 2) === slideIndex ? 'active' : ''}`}
                    onClick={() => handleCardClick(slideIndex * 2)}
                    aria-label={`Slide ${slideIndex + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          /* DESKTOP: Grid com 4 cards */
          <Row className="service-cards">
            {servicesData.map((service, index) => (
              <Col key={index} md={3}>
                <ServiceCard
                  service={service}
                  index={index}
                  isSelected={currentIndex === index}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
};

export default Servicos;