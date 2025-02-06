import { Container, Row, Col, Button, Image, Card, Carousel } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import DesenvolvimentoImage from './Images/Desenvolvimento.png';
import ArteImage from './Images/Arte.png';
import AnimacaoImage from './Images/Animacao.png';
import PlanejamentoImage from './Images/Planejamento.jpg';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';

const Servicos = () => {
  const { t } = useTranslation('common');

  const SERVICES_DATA = [
    {
      number: '01',
      title: t('services.development.title'),
      description: t('services.development.description'),
      image: DesenvolvimentoImage,
    },
    {
      number: '02',
      title: t('services.art.title'),
      description: t('services.art.description'),
      image: ArteImage,
    },
    {
      number: '03',
      title: t('services.animation.title'),
      description: t('services.animation.description'),
      image: AnimacaoImage,
    },
    {
      number: '04',
      title: t('services.planning.title'),
      description: t('services.planning.description'),
      image: PlanejamentoImage,
    },
  ];

  const [selectedService, setSelectedService] = useState(SERVICES_DATA[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 768;

  const MobileView = () => (
    <Carousel
      activeIndex={currentIndex}
      onSelect={(index) => handleCardClick(SERVICES_DATA[index].number)}
      interval={6000}
      indicators={false}
      className="service-mobile-carousel"
    >
      {SERVICES_DATA.map((service, index) => (
        <Carousel.Item key={index}>
          <ServiceCard 
            service={service} 
            isSelected={selectedService.number === service.number}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );

  const DesktopView = () => (
    <Row className="service-cards">
      {SERVICES_DATA.map((service, index) => (
        <Col key={index} md={3}>
          <ServiceCard 
            service={service} 
            isSelected={selectedService.number === service.number}
            onClick={() => handleCardClick(service.number)}
          />
        </Col>
      ))}
    </Row>
  );

  const ServiceCard = ({ service, isSelected, onClick }) => (
    <Card
      onClick={onClick}
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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (cardNumber) => {
    const index = SERVICES_DATA.findIndex((service) => service.number === cardNumber);
    setCurrentIndex(index);
    setSelectedService(SERVICES_DATA[index]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SERVICES_DATA.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSelectedService(SERVICES_DATA[currentIndex]);
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <Container>
      <Col className="py-5">
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
        <Row className="mb-4">
          <Col md={6} className="d-flex flex-column mb-4 mb-md-0">
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
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <Image
              src={selectedService.image}
              fluid
              className={`service-image rounded ${isAnimating ? 'fade-in active' : 'fade-in'}`}
            />
          </Col>
        </Row>
        {isMobile ? <MobileView /> : <DesktopView />}
      </Col>
    </Container>
  );
};

export default Servicos;