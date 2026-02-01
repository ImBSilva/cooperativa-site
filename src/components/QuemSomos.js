import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import TeamImage from './Images/Team.jpg';
import { useTranslation } from 'react-i18next';


const QuemSomos = () => {
    const { t } = useTranslation('common');

    return (
        <Container className='quem-somos'>
            <Row className="gy-4">
                {/*<Col xs={12} md={6} className="order-2 order-md-1">
                    <Image src={TeamImage} fluid rounded />
                </Col>*/}
                <Col xs={12} md={12} className='services-title order-1 order-md-2'>
                    <h3>
                        <span className="gray-title">{t("aboutUs.title")}</span>{' '}
                        <span className="orange-title">{t("aboutUs.secondTitle")}</span>
                    </h3>
                    <p className='sub-text'>
                        {t("aboutUs.presentationText1")}
                    </p>
                    <p className='sub-text'>
                        {t("aboutUs.presentationText2")}
                    </p>
                </Col>
            </Row>
            <Row>
                <p className='sub-text'>
                    {t("aboutUs.presentationText3")}
                </p>
            </Row>
        </Container>

    );


};

export default QuemSomos;