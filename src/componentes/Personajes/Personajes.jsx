import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from '../Home/Nav';
import Pages from '../Home/Pages';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import { ProgressSpinner } from 'primereact/progressspinner';
import 'animate.css';

import 'simplebar-react/dist/simplebar.min.css';
import './personajes.css';

const Personajes = () => {
  const [personajes, setPersonajes] = useState([]);
  const [cargado, setCargado] = useState(false);

  useEffect( () => {
    getCharacters();
  },[])

  const { t } = useTranslation();

  const cambiarIdioma = (idiom) => {
      i18n.changeLanguage(idiom);
  }

  const getCharacters = async() => {
    try {
      setCargado(true); // Inicia la carga
      const res = await axios('https://db-go-t.vercel.app/characters');
      console.log(res.data);
      setPersonajes(res.data);
    } catch (error) {
      console.error('Error al obtener los personajes:', error);
    } finally {
      setCargado(false); // Finaliza la carga, independientemente de si fue exitosa o no
    }
  }

  const buscando = async(input) => {
    console.log(input);
    const res = await axios('https://db-go-t.vercel.app/characters');
    const filtrados = res.data.filter((x) => {
      if(x.name.toLowerCase().trim().includes(input.toLowerCase().trim())){
        return x; 
      }
    });
    setPersonajes(filtrados);
  }

  return (
    <>
    <div className='container-personajes'>
      <Nav func={cambiarIdioma} casa={true} buscador={true} busca={buscando}/>
        
          <div className='personajes'>
            <SimpleBar style={{ height: '75vh', color:'white' }} className='custom-scrollbar'>
          {cargado && (
            <div className='container-spinner'>
              <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </div>
          )}
        <div className="inner-content" style={{ display: 'grid', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-start', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {personajes.map((personaje, index) => (
              <NavLink className='enlace-personaje' to={"/personaje/"+personaje.id} key={index}>
              <div className='personaje animate__animated animate__fadeIn'  style={
                {
                backgroundImage: `url(${personaje.image})`,
                position:'relative',
                display: 'flex',
                flexDirection:'column',
                alignItems:'flex-end'
                }}>
                <div className='overlay'>
                  <div className='nombre'>
                  <p>
                    {personaje.name}
                  </p>
                  </div>

                </div>
              </div>
              </NavLink>
              
            ))}
        </div>
        </SimpleBar>
        </div>
        <Pages/>
    </div>
    
    </>
  )
}

export default Personajes;
