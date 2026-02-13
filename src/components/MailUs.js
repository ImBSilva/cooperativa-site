import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import { FaArrowRight } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const MailUs = () => {
    const { t } = useTranslation('common');
    const recaptchaRef = useRef();
    const form = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const captchaValue = recaptchaRef.current.getValue();
        if (!captchaValue) {
            alert('Por favor, complete o reCAPTCHA');
            return;
        }

        try {
            await emailjs.sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                form.current,
                process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            );

            alert('Mensagem enviada com sucesso!');
            form.current.reset();
            recaptchaRef.current.reset();
        } catch (error) {
            console.error('Erro ao enviar:', error);
            alert('Erro ao enviar a mensagem. Tente novamente.');
        }
    };

    return (
        <Container className='mailUs py-4'>
            <Card className='card mb-3'>
                <Card.Body className="py-4">
                    <Card.Title className='card-title'>{t('mailUsComponent.contactTitle')}</Card.Title>
                    <Card.Text className='card-text'>
                        {t('mailUsComponent.contactSubtitle')}
                    </Card.Text>
                    <Form ref={form} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="formName">
                                    <Form.Control
                                        type="text"
                                        name="nome"
                                        placeholder={t('mailUsComponent.input.name')}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formEmail">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder={t('mailUsComponent.input.email')}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="formPhone">
                            <Form.Control
                                type="tel"
                                name="telefone"
                                placeholder={t('mailUsComponent.input.phone')}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formMessage">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="mensagem"
                                placeholder={t('mailUsComponent.input.message')}
                                required
                            />
                        </Form.Group>

                        <Row className="mb-3 align-items-end">
                            <Col xs={12} md={6} className="mb-3 mb-md-0">
                                <div style={{ overflow: 'hidden' }}>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                    />
                                </div>
                            </Col>
                            <Col xs={12} md={6} className='d-flex justify-content-center justify-content-md-end'>
                                <Button variant="primary" type="submit" className='cta-button w-100 w-md-auto'>
                                    {t('mailUsComponent.sendButton')} <FaArrowRight />
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default MailUs;