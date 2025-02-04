import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Dropdown align="end">
            <Dropdown.Toggle className="language-switcher" variant="link">
                <FaGlobe size={16} className="me-2" />
                <span>{i18n.language === 'pt' ? 'PT' : 'EN'}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item 
                    onClick={() => changeLanguage('pt')}
                    active={i18n.language === 'pt'}
                >
                    🇧🇷 Português
                </Dropdown.Item>
                <Dropdown.Item 
                    onClick={() => changeLanguage('en')}
                    active={i18n.language === 'en'}
                >
                    🇺🇸 English
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};