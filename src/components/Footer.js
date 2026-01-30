import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LinkedinIcon } from './Icons/Linkedin-icon.svg';
import { ReactComponent as InstagramIcon } from './Icons/Instagram-icon.svg';
import { ReactComponent as ArtstationIcon } from './Icons/artstation-icon.svg';
import GradientDefs from './GradientDefs.js';

const Footer = () => {
    const { t } = useTranslation('common');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <GradientDefs />
            <Container>
                <Row className="align-items-center py-4">
                    <Col xs={12} md={6} className="text-center text-md-start mb-3 mb-md-0">
                        <p className="footer-copyright mb-0">
                            © {currentYear} Studio Capivara Neon. {t('footer.rights')}
                        </p>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="footer-social d-flex justify-content-center justify-content-md-end gap-3">
                            <a href="https://www.instagram.com/studiocapivaraneon/" 
                               target="_blank"
                               rel="noopener noreferrer"
                               aria-label="Instagram">
                                <InstagramIcon className="footer-icon" />
                            </a>
                            <a href="https://www.artstation.com/studiocapivaraneon" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               aria-label="ArtStation">
                                <ArtstationIcon className="footer-icon" />
                            </a>
                            <a href="https://www.linkedin.com/company/studiocapivaraneon" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               aria-label="LinkedIn">
                                <LinkedinIcon className="footer-icon" />
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
