import GradientDefs from './GradientDefs.js';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
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
            photo: BrunoPerfilImage, // Replace with the actual image path
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
            photo: MatheusPerfilImage, // Replace with the actual image path
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

    const resetTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setIsAnimating(true);
            setSelectedMemberIndex((prevIndex) => (prevIndex + 1) % team.length);
        }, 10000); // reset de tempo para trocar cooperado
    };

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
    }, [team.length]);

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 250); // Metade do tempo de transição CSS

            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 500); // Tempo total da animação
        return () => clearTimeout(timer);
    }, [selectedMemberIndex]);

    // Componente do card de membro
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

    // View Mobile com informações do membro
    const MemberInfo = ({ member }) => (
        <>
            <Row className="justify-content-center mb-3">
                <Col xs={8} sm={6} className="text-center">
                    <Image
                        src={member.photo}
                        roundedCircle
                        fluid
                        className={`profile-image ${isAnimating ? 'fade-in active' : 'fade-in'}`}
                    />
                </Col>
            </Row>
            <Row className="text-center">
                <span className='links-title'>{t("teamComponent.socialMediaTitle")}</span>
            </Row>
            <Row className='icons justify-content-center'>
                {member.socialLinks.map((link, index) => (
                    <Col xs={2} key={index}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.icon}
                        </a>
                    </Col>
                ))}
            </Row>
        </>
    );

    return (
        <Container className='cooperados'>
            <GradientDefs />
            
            {isMobile ? (
                // MOBILE VIEW
                <>
                    <Row className="justify-content-center mb-4">
                        <Col xs={10}>
                            <MemberInfo member={team[selectedMemberIndex]} />
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={12} className="services-title text-center">
                            <div className={`content-slide ${isAnimating ? 'fade-out' : 'fade-in'}`}
                                style={{ visibility: isAnimating ? 'hidden' : 'visible' }}>
                                <h3 className="orange-title">
                                    {team[selectedMemberIndex].name}
                                </h3>
                                <p>
                                    {team[selectedMemberIndex].about}
                                </p>
                                <span>{t('teamComponent.favoriteGamesText')}</span>{' '}
                                <span className="favorite-games">{team[selectedMemberIndex].favoriteGames}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-4">
                        <Col xs={12}>
                            <Row className="justify-content-center g-2">
                                {team.map((member, index) => (
                                    <Col key={index} xs={6} className="mb-3">
                                        <MemberCard member={member} index={index} />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-3">
                        <Col xs="auto">
                            <Button className="me-2 black-button" onClick={handlePreviousButtonClick}>
                                <FaArrowLeft className='gradient-icon' />
                            </Button>
                            <Button onClick={handleNextButtonClick} className="black-button">
                                <FaArrowRight className='gradient-icon' />
                            </Button>
                        </Col>
                    </Row>
                </>
            ) : (
                // DESKTOP VIEW
                <>
                    <Row>
                        <Col md={9} className="services-title cooperados">
                            <div className={`content-slide ${isAnimating ? 'fade-out' : 'fade-in'}`}
                                style={{ visibility: isAnimating ? 'hidden' : 'visible' }}>
                                <h3 className="orange-title">
                                    {team[selectedMemberIndex].name}
                                </h3>
                                <p>
                                    {team[selectedMemberIndex].about}
                                </p>
                                <span>{t('teamComponent.favoriteGamesText')}</span>{' '}
                                <span className="favorite-games">{team[selectedMemberIndex].favoriteGames}</span>
                            </div>
                        </Col>
                        <Col md={3} className="cooperados card-info">
                            <Row className='photo'>
                                <Image
                                    src={team[selectedMemberIndex].photo}
                                    roundedCircle
                                    fluid
                                    className={`profile-image ${isAnimating ? 'fade-in active' : 'fade-in'}`}
                                />
                            </Row>
                            <Row>
                                <span className='links-title'>{t("teamComponent.socialMediaTitle")}</span>
                            </Row>
                            <Row className='icons'>
                                {team[selectedMemberIndex].socialLinks.map((link, index) => (
                                    <Col md={2} key={index} >
                                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                                            {link.icon}
                                        </a>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <Row >
                        <Col md={1} className='justify-contend'>
                            <Button className="me-2 black-button" onClick={handlePreviousButtonClick}>
                                <FaArrowLeft className='gradient-icon' />
                            </Button>
                        </Col>
                        <Col md={10}>
                            <Row className="cooperados justify-content-center ">
                                {team.map((member, index) => (
                                    <Col key={index} md={3} className="mb-3">
                                        <MemberCard member={member} index={index} />
                                    </Col>
                                ))}
                            </Row>
                        </Col>

                        <Col md={1} className='justify-contend'>
                            <Button onClick={handleNextButtonClick} className="me-2 black-button"><FaArrowRight className='gradient-icon' /></Button>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );

};

export default Cooperados;

