import { Navbar, Nav, Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
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

  const services = [
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

  const [selectedService, setSelectedService] = useState(services[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardContainerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCardClick = (cardNumber) => {
    const index = services.findIndex((service) => service.number === cardNumber);
    setCurrentIndex(index);
    setSelectedService(services[index]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 6000); // Velocidade de troca de card

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  useEffect(() => {
    setIsAnimating(true);
  }, [selectedService]);

  useEffect(() => {
    setSelectedService(services[currentIndex]);
    if (cardContainerRef.current) {
      const cardHeight = cardContainerRef.current.children[0].offsetHeight;
      cardContainerRef.current.style.transform = `translateY(-${currentIndex * cardHeight}px)`;
    }
  }, [currentIndex]);

  const cards = document.querySelectorAll('.clickable-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
    });
  });

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
        <Row>
          <Col className="d-flex flex-column">
            <div className={`content-slide ${isAnimating ? 'fade-out' : 'fade-in'}`}
              style={{ visibility: isAnimating ? 'hidden' : 'visible' }}>
              <div className="flex-grow-1 sub-text text-start">
                <p>{selectedService.description}</p>
              </div>
              <div className="mt-auto d-flex justify-content-start">
                <Button className="me-2 cta-button quote-button"
                  as={Link}
                  to="MailUs"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}>
                  {t('services.buttonCTA.text')}
                  <FaArrowRight alt="Ícone" className="me-1" style={{ width: '16px', height: '16px' }} />
                </Button>
              </div>
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-image-mobile">
            <Image
              src={selectedService.image}
              fluid
              className={`mx-auto service-image rounded ${isAnimating ? 'fade-in active' : 'fade-in'}`}
            />
          </Col>
        </Row>
        <Row>
          {services.map((service, index) => (
            <Col key={index}>
              <Card
                onClick={() => handleCardClick(service.number)}
                className={`clickable-card text-center ${selectedService.number === service.number ? 'selected-card' : ''}`}
              >
                <Card.Body className="card-body">
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