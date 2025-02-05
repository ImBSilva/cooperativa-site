import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
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
        <Row className="service-cards">
          {SERVICES_DATA.map((service, index) => (
            <Col key={index} xs={6} md={3} className="mb-3">
              <Card
                onClick={() => handleCardClick(service.number)}
                className={`clickable-card text-center h-100 ${selectedService.number === service.number ? 'selected-card' : ''}`}
              >
                <Card.Body className="d-flex flex-column justify-content-center">
                  <Card.Title className="service-number">{service.number}</Card.Title>
                  <Card.Text className={`card-text ${selectedService.number === service.number ? 'selected' : ''}`}>{service.title}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Container>
  );
};

export default Servicos;