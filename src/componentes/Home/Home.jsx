import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import Pages from './Pages';
import Nav from './Nav';
import './home.css';
import Inicio from './Inicio';

const Home = () => {
    const { t } = useTranslation();

    const cambiarIdioma = (idiom) => {
        i18n.changeLanguage(idiom);
    }
    return (
        <div className='container'>
            <Nav func={cambiarIdioma} casa={false} buscador={false}/>
            <Inicio/>
            <Pages/>
        </div>
    )
}

export default Home;
