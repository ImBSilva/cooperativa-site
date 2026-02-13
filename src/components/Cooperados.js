import GradientDefs from './GradientDefs.js';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Row, Col, Button, Image, Card, Carousel } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ReactComponent as LinkedinIcon } from './Icons/Linkedin-icon.svg';
import { ReactComponent as InstagramIcon } from './Icons/Instagram-icon.svg';
import { ReactComponent as ArtstationIcon } from './Icons/artstation-icon.svg';
import { ReactComponent as GithubIcon } from './Icons/github-icon.svg';
import { ReactComponent as GitlabIcon } from './Icons/gitlab-icon.svg';
import { ReactComponent as SteamIcon } from './Icons/Steam-icon.svg';
import { ReactComponent as ItchioIcon } from './Icons/itchIO-icon.svg';
import BrunoPerfilImage from './Images/BrunoPerfil.png';
import WaliPerfilImage from './Images/WaliPerfil.png';
import GabsPerfilImage from './Images/GabsPerfil.png';
import MatheusPerfilImage from './Images/MatheusPerfil.png';

const Cooperados = () => {
    const { t } = useTranslation('common');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isMobile = windowWidth <= 768;

    const team = [
        {
            number: '01',
            name: 'Bruno Silva',
            about: t('teamComponent.team.bruno.about'),
            favoriteGames: t('teamComponent.team.bruno.favoriteGames'),
            services: [
                t('teamComponent.team.bruno.services.0'),
                t('teamComponent.team.bruno.services.1'),
                t('teamComponent.team.bruno.services.2'),
                t('teamComponent.team.bruno.services.3')
            ],
            photo: BrunoPerfilImage,
            socialLinks: [
                { icon: <LinkedinIcon />, url: 'https://www.linkedin.com/in/imbsilva/' },
                { icon: <ArtstationIcon />, url: 'https://www.artstation.com/bruno_silva' },
                { icon: <InstagramIcon />, url: 'https://www.instagram.com/art.imbsil/' },
                { icon: <GithubIcon />, url: 'https://github.com/ImBSilva' },
                { icon: <GitlabIcon />, url: 'https://gitlab.com/ImBSilva' },
            ],
        },
        {
            number: '02',
            name: 'Gabriel',
            about: t('teamComponent.team.gabriel.about'),
            favoriteGames: t('teamComponent.team.gabriel.favoriteGames'),
            services: [
                t('teamComponent.team.gabriel.services.0'),
                t('teamComponent.team.gabriel.services.1'),
                t('teamComponent.team.gabriel.services.2'),
                t('teamComponent.team.gabriel.services.3')
            ],
            photo: GabsPerfilImage,
            socialLinks: [
                { icon: <LinkedinIcon />, url: 'https://www.linkedin.com/in/gabriel-diniz-aa5797115/' },
                { icon: <ArtstationIcon />, url: 'https://www.artstation.com/gabrielmirandadiniz' },
                { icon: <InstagramIcon />, url: 'https://www.instagram.com/gabsmdiniz/' },
            ],
        },
        {
            number: '03',
            name: 'Matheus',
            about: t('teamComponent.team.matheus.about'),
            favoriteGames: t('teamComponent.team.matheus.favoriteGames'),
            services: [
                t('teamComponent.team.matheus.services.0'),
                t('teamComponent.team.matheus.services.1'),
                t('teamComponent.team.matheus.services.2'),
                t('teamComponent.team.matheus.services.3')
            ],
            photo: MatheusPerfilImage,
            socialLinks: [
                { icon: <LinkedinIcon />, url: 'https://www.linkedin.com/in/matheus-saraiva-26bab320b/' },
                { icon: <GithubIcon />, url: 'https://github.com/matsaraiva' },
                { icon: <GitlabIcon />, url: 'https://gitlab.com/matsaraiva' },
                { icon: <SteamIcon />, url: 'https://store.steampowered.com/search/?developer=Sagui%20Games' },
            ],
        },
        {
            number: '04',
            name: 'Wali',
            about: t('teamComponent.team.wali.about'),
            favoriteGames: t('teamComponent.team.wali.favoriteGames'),
            services: [
                t('teamComponent.team.wali.services.0'),
                t('teamComponent.team.wali.services.1'),
                t('teamComponent.team.wali.services.2'),
                t('teamComponent.team.wali.services.3')
            ],
            photo: WaliPerfilImage,
            socialLinks: [
                { icon: <LinkedinIcon />, url: 'https://www.linkedin.com/in/walison-rodrigues-de-sousa-b190b2244/' },
                { icon: <InstagramIcon />, url: 'https://www.instagram.com/wali.png/' },
                { icon: <GithubIcon />, url: 'https://github.com/walistoteles' },
                { icon: <ItchioIcon />, url: 'https://walidev.itch.io/' },
            ],
        },
    ];

    const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
    const intervalRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const resetTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setIsAnimating(true);
            setSelectedMemberIndex((prevIndex) => (prevIndex + 1) % team.length);
        }, 10000);
    }, [team.length]);

    const handleCardClick = (cardIndex) => {
        if (!isAnimating) {
            setIsAnimating(true);
            setSelectedMemberIndex(cardIndex);
            resetTimer();
        }
    };

    const handlePreviousButtonClick = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setSelectedMemberIndex((prevIndex) => (prevIndex - 1 + team.length) % team.length);
            resetTimer();
        }
    };

    const handleNextButtonClick = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setSelectedMemberIndex((prevIndex) => (prevIndex + 1) % team.length);
            resetTimer();
        }
    };

    useEffect(() => {
        resetTimer();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [resetTimer]);

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
        const timer = setTimeout(() => setIsAnimating(false), 500);
        return () => clearTimeout(timer);
    }, [selectedMemberIndex]);

    const selectedMember = team[selectedMemberIndex];

    // Card de membro
    const MemberCard = ({ member, index }) => (
        <Card
            onClick={() => handleCardClick(index)}
            className={`clickable-card ${selectedMemberIndex === index ? 'selected' : ''}`}>
            <Card.Body>
                <Card.Title className={`card-title ${selectedMemberIndex === index ? 'selected' : ''}`}>{member.name}</Card.Title>
                <Card.Text className='card-list'>
                    <ul className="custom-list">
                        {member.services.map((service, serviceIndex) => (
                            <li key={serviceIndex}>{service}</li>
                        ))}
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    );

    // Info do membro (foto + redes sociais)
    const MemberInfo = ({ member }) => (
        <>
            <Row className="justify-content-center mb-3">
                <Col xs={8} sm={6} md={4} className="text-center">
                    <Image
                        src={member.photo}
                        roundedCircle
                        fluid
                        className={`profile-image ${isAnimating ? 'fade-in active' : 'fade-in'}`}
                        style={{ maxWidth: '200px' }}
                    />
                </Col>
            </Row>
            <Row className="text-center">
                <span className='links-title'>{t("teamComponent.socialMediaTitle")}</span>
            </Row>
            <div className='social-icons-row'>
                {member.socialLinks.map((link, index) => (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" key={index} className="social-icon-link">
                        {link.icon}
                    </a>
                ))}
            </div>
        </>
    );

    // Detalhes do membro (nome, sobre, jogos favoritos)
    const MemberDetails = ({ member }) => (
        <div className={`content-slide ${isAnimating ? 'fade-out' : 'fade-in'}`}
            style={{ visibility: isAnimating ? 'hidden' : 'visible' }}>
            <h3 className="orange-title">
                {member.name}
            </h3>
            <p>{member.about}</p>
            <span>{t('teamComponent.favoriteGamesText')}</span>{' '}
            <span className="favorite-games">{member.favoriteGames}</span>
        </div>
    );

    // Agrupa membros em pares para carousel mobile (2 por slide)
    const chunkedMembers = [];
    for (let i = 0; i < team.length; i += 2) {
        chunkedMembers.push(team.slice(i, i + 2));
    }

    return (
        <Container className='cooperados'>
            <GradientDefs />
            
            {isMobile ? (
                /* ===== MOBILE VIEW ===== */
                <>
                    <Row className="justify-content-center mb-4">
                        <Col xs={10}>
                            <MemberInfo member={selectedMember} />
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={12} className="services-title text-center">
                            <MemberDetails member={selectedMember} />
                        </Col>
                    </Row>
                    {/* Cards em carousel — 2 por slide */}
                    <Row className="justify-content-center mt-4">
                        <Col xs={12}>
                            <Carousel
                                activeIndex={Math.floor(selectedMemberIndex / 2)}
                                onSelect={(slideIndex) => handleCardClick(slideIndex * 2)}
                                interval={null}
                                indicators={false}
                                controls={false}
                                className="cooperados-mobile-carousel"
                            >
                                {chunkedMembers.map((chunk, slideIndex) => (
                                    <Carousel.Item key={slideIndex}>
                                        <Row className="justify-content-center g-3 px-2">
                                            {chunk.map((member, i) => {
                                                const realIndex = slideIndex * 2 + i;
                                                return (
                                                    <Col xs={6} key={realIndex}>
                                                        <MemberCard member={member} index={realIndex} />
                                                    </Col>
                                                );
                                            })}
                                        </Row>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>
                    </Row>
                    {/* Indicadores customizados abaixo dos cards */}
                    <Row className="justify-content-center mt-3 mb-4">
                        <Col xs="auto">
                            <div className="custom-carousel-indicators">
                                {chunkedMembers.map((_, slideIndex) => (
                                    <button
                                        key={slideIndex}
                                        className={`carousel-dot ${Math.floor(selectedMemberIndex / 2) === slideIndex ? 'active' : ''}`}
                                        onClick={() => handleCardClick(slideIndex * 2)}
                                        aria-label={`Slide ${slideIndex + 1}`}
                                    />
                                ))}
                            </div>
                        </Col>
                    </Row>
                </>
            ) : (
                /* ===== DESKTOP VIEW ===== */
                <>
                    <Row>
                        <Col md={9} className="services-title cooperados">
                            <MemberDetails member={selectedMember} />
                        </Col>
                        <Col md={3} className="cooperados card-info">
                            <Row className='photo'>
                                <Image
                                    src={selectedMember.photo}
                                    roundedCircle
                                    fluid
                                    className={`profile-image ${isAnimating ? 'fade-in active' : 'fade-in'}`}
                                />
                            </Row>
                            <Row>
                                <span className='links-title'>{t("teamComponent.socialMediaTitle")}</span>
                            </Row>
                            <Row className='icons'>
                                {selectedMember.socialLinks.map((link, index) => (
                                    <Col md={2} key={index}>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                                            {link.icon}
                                        </a>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={1} className='justify-contend'>
                            <Button className="me-2 black-button" onClick={handlePreviousButtonClick}>
                                <FaArrowLeft className='gradient-icon' />
                            </Button>
                        </Col>
                        <Col md={10}>
                            <Row className="cooperados justify-content-center">
                                {team.map((member, index) => (
                                    <Col key={index} md={3} className="mb-3">
                                        <MemberCard member={member} index={index} />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col md={1} className='justify-contend'>
                            <Button onClick={handleNextButtonClick} className="me-2 black-button">
                                <FaArrowRight className='gradient-icon' />
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default Cooperados;
