import { useState } from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { Link } from 'react-scroll';
import logo from './Images/CapiLogo.png';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

function NavBar() {
    const { t } = useTranslation('common');
    const [expanded, setExpanded] = useState(false);

    const closeNavbar = () => setExpanded(false);

    return (
        <Navbar expand="lg" expanded={expanded} className="custom-navbar w-100">
            <Container fluid className="px-3 px-md-4" style={{ maxWidth: '900px', margin: '0 auto' }}>
                <Navbar.Brand as={Link} to="inicio" spy={true} smooth={true} offset={-70} duration={400} style={{ cursor: 'pointer' }}>
                    <Image src={logo} width="48" height="48" alt="Logo" />
                </Navbar.Brand>
                <div className="d-flex align-items-center d-lg-none">
                    <LanguageSwitcher className="me-2" />
                    <Navbar.Toggle 
                        aria-controls="responsive-navbar-nav" 
                        onClick={() => setExpanded(!expanded)}
                    />
                </div>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="inicio" spy={true} smooth={true} offset={-70} duration={400}
                            className="nav-link-hover" onClick={closeNavbar}>
                            {t('navbar.home')}
                        </Nav.Link>
                        <Nav.Link as={Link} to="Servicos" spy={true} smooth={true} offset={-70} duration={400}
                            className="nav-link-hover" onClick={closeNavbar}>
                            {t('navbar.services')}
                        </Nav.Link>
                        <Nav.Link
                            href="https://www.artstation.com/studiocapivaraneon"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-link-hover"
                            onClick={closeNavbar}
                        >
                            {t('navbar.portfolio')}
                        </Nav.Link>
                        <Nav.Link as={Link} to="Cooperados" spy={true} smooth={true} offset={-70} duration={400}
                            className="nav-link-hover" onClick={closeNavbar}>
                            {t('navbar.about')}
                        </Nav.Link>
                        <Nav.Link as={Link} to="MailUs" spy={true} smooth={true} offset={-70} duration={400}
                            className="nav-link-hover" onClick={closeNavbar}>
                            {t('navbar.contact')}
                        </Nav.Link>
                    </Nav>
                    <div className="d-none d-lg-flex">
                        <LanguageSwitcher />
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;