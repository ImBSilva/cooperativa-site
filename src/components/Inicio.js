import { FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { ReactComponent as GitlabIcon } from './Icons/gitlab-icon.svg';
import { Link } from 'react-scroll';
import logo from './Images/CapiLogo.png';

const Home = () => {
  const { t } = useTranslation('common');

  return (
    <Container fluid className="py-4 py-md-5 mt-5 pt-4">
      <Row className="align-items-center gy-4">
        <Col xs={12} md={6} className="text-center text-md-start">
          <Image 
            src={logo} 
            fluid 
            className="max-width-md"
            style={{ maxWidth: '80%', height: 'auto' }}
          />
        </Col>
        <Col xs={12} md={6} className="d-flex flex-column">
          <div className="flex-grow-1 sub-text text-center text-md-end">
            <p className="px-3 px-md-4">
              {t('home.presentationText')}
            </p>
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-end gap-3 mt-4">
            <Button 
              as="a"
              href="https://www.artstation.com/studiocapivaraneon"
              target="_blank"
              rel="noopener noreferrer"
              className="black-button w-100 w-md-auto"
            >
              <GitlabIcon 
                className="me-2" 
                style={{ width: '20px', height: '20px' }} 
              />
              <span>{t('home.buttonPortifolio')}</span>
            </Button>
            <Button 
              as={Link}
              to="MailUs"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500} 
              className="cta-button w-100 w-md-auto"
            >
              {t('home.buttonContact')}
              <FaArrowRight 
                className="ms-2" 
                style={{ width: '16px', height: '16px' }} 
              />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;