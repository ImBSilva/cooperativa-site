import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Carousel, Col, Image } from 'react-bootstrap';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import PuzzlePirateImage from './Images/ProjectThumbs/PuzzlePirateThumb.png';
import CatRacerImage from './Images/ProjectThumbs/CatRacerThumb.png';
import DesviaPirataImage from './Images/ProjectThumbs/DesviaPirataThumb.png';
import GuacaRoyaleImage from './Images/ProjectThumbs/GuacaRoyaleThumb.png';

const Portfolio = () => {
  const { t } = useTranslation('common');
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projects = [
    { id: 1, title: 'Puzzle Pirate', image: PuzzlePirateImage, link: 'https://www.artstation.com/studiocapivaraneon' },
    { id: 2, title: 'Cat Racer', image: CatRacerImage, link: 'https://www.artstation.com/studiocapivaraneon' },
    { id: 3, title: 'Desvia Pirata', image: DesviaPirataImage, link: 'https://www.artstation.com/studiocapivaraneon' },
    { id: 4, title: 'Guaca Royale', image: GuacaRoyaleImage, link: 'https://www.artstation.com/studiocapivaraneon' },
  ];

  const getItemsPerSlide = () => {
    if (windowWidth < 576) return 1;
    if (windowWidth < 992) return 2;
    return 3;
  };

  const chunkedProjects = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const itemsPerSlide = getItemsPerSlide();

  return (
    <Container>
      <Row className="services-title">
        <h3>
          <span className="gray-title">{t('portfolio.title')}</span>{' '}
          <span className="orange-title">{t('portfolio.secondTitle')}</span>
        </h3>
      </Row>
      <Carousel className='portfolio'
        prevIcon={<FaArrowLeft />}
        nextIcon={<FaArrowRight />}
      >
        {chunkedProjects(projects, itemsPerSlide).map((chunk, index) => (
          <Carousel.Item key={index}>
            <Row className="justify-content-center">
              {chunk.map(project => (
                <Col key={project.id} xs={12} sm={6} md={4} className="mb-3">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="d-block portfolio-link-button">
                    <div className="image-wrapper">
                      <Image 
                        className="img-fluid"
                        src={project.image}
                        alt={project.title}
                        rounded
                      />
                    </div>
                    <h5 className="mt-2 text-center">{project.title}</h5>
                  </a>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Portfolio;
