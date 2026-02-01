import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import { FaArrowRight } from 'react-icons/fa';
import emailjs from '@emailjs/browser'; // Importe o EmailJS

const MailUs = () => {
    const { t } = useTranslation('common');
    const recaptchaRef = useRef();
    const form = useRef(); // Referência para o formulário

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verifica o reCAPTCHA
        const captchaValue = recaptchaRef.current.getValue();
        if (!captchaValue) {
            alert('Por favor, complete o reCAPTCHA');
            return;
        }

        try {
            // Envia o formulário usando EmailJS
            await emailjs.sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE_ID, // Service ID
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID, // Template ID
                form.current, // Referência do formulário
                process.env.REACT_APP_EMAILJS_PUBLIC_KEY // Public Key
            );

            alert('Mensagem enviada com sucesso!');
            form.current.reset(); // Limpa o formulário
            recaptchaRef.current.reset(); // Reseta o reCAPTCHA
        } catch (error) {
            console.error('Erro ao enviar:', error);
            alert('Erro ao enviar a mensagem. Tente novamente.');
        }
    };

    return (
        <Container className='mailUs'>
            <Card className='card mb-3'>
                <Card.Body>
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
                                        name="nome" // Nome do campo para o EmailJS
                                        placeholder={t('mailUsComponent.input.name')}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formEmail">
                                    <Form.Control
                                        type="email"
                                        name="email" // Nome do campo para o EmailJS
                                        placeholder={t('mailUsComponent.input.email')}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="formPhone">
                            <Form.Control
                                type="tel"
                                name="telefone" // Nome do campo para o EmailJS
                                placeholder={t('mailUsComponent.input.phone')}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formMessage">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="mensagem" // Nome do campo para o EmailJS
                                placeholder={t('mailUsComponent.input.message')}
                                required
                            />
                        </Form.Group>

                        <Row className="mb-3">
                            <Col>
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                />
                            </Col>
                            <Col className='d-flex justify-content-end align-self-end'>
                                <Button variant="primary" type="submit" className='cta-button'>
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