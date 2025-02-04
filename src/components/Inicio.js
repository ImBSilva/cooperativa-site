import { FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { ReactComponent as GitlabIcon } from './Icons/gitlab-icon.svg';
import { Link } from 'react-scroll';
import logo from './Images/CapiLogo.png';

const Home = () => {
  const { t } = useTranslation('common');

  return (
    <Container fluid className="mt-4" style={{ Height: '640px', overflow: 'hidden' }}>
      <Row className="h-100 py-5 " style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <Col md={6} className="d-flex align-items-center justify-image-mobile">
          <Image src={logo} fluid />
        </Col>
        <Col md={6} className="d-flex flex-column" >
          <div className="flex-grow-1 sub-text text-end">
            <p className="padding-presentation-text">{t('home.presentationText')}</p>
          </div>

          <div className="mt-auto d-flex justify-content-end">
            <Button as="a"
              href="https://www.artstation.com/studiocapivaraneon"
              target="_blank"
              rel="noopener noreferrer"
              className="me-2 black-button">
              <GitlabIcon alt="Ícone" className="me-1" style={{ width: '20px', height: '20px' }} />
              <span> {t('home.buttonPortifolio')}</span>
            </Button>
            <Button as={Link}
              to="MailUs"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500} className="me-2 cta-button">
              {t('home.buttonContact')}
              <FaArrowRight alt="Ícone" className="me-1" style={{ width: '16px', height: '16px' }} />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
