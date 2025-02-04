import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { Link } from 'react-scroll';
import logo from './Images/CapiLogo.png';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

function NavBar() {
    const { t } = useTranslation('common');

    return (
        <Navbar fixed="top" direction="horizontal" gap={2} expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <Image src={logo} width="48" height="48" />
                </Navbar.Brand>
                <LanguageSwitcher />
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="inicio" spy={true} smooth={true} offset={-30} duration={400}
                            className="nav-link-hover">
                            {t('navbar.home')} </Nav.Link>
                        <Nav.Link as={Link} to="Servicos" spy={true} smooth={true} offset={-30} duration={400}
                            className="nav-link-hover">
                            {t('navbar.services')}</Nav.Link>
                        <Nav.Link
                            href="https://www.artstation.com/studiocapivaraneon"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-link-hover"
                        >
                            {t('navbar.portfolio')}
                        </Nav.Link>
                        <Nav.Link as={Link} to="Cooperados" spy={true} smooth={true} offset={-70} duration={400}
                            className="nav-link-hover">{t('navbar.about')}</Nav.Link>
                        <Nav.Link as={Link} to="MailUs" spy={true} smooth={true} offset={-30} duration={400}
                            className="nav-link-hover">{t('navbar.contact')}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;