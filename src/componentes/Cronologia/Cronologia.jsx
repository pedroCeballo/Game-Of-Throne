import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from '../Home/Nav';
import Pages from '../Home/Pages';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import {ProgressSpinner} from 'primereact/progressspinner';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDownWideShort} from '@fortawesome/free-solid-svg-icons';
import {faArrowDownShortWide} from '@fortawesome/free-solid-svg-icons';
import 'simplebar-react/dist/simplebar.min.css';
import './cronologia.css';
import 'animate.css';

export default function Cronologia() {
  const [personajes, setPersonajes] = useState([]);
  const [cargadoCro, setCargadoCro] = useState(false);
  const [orden, setOrden] = useState(false);
  const [icono, setIcono] = useState(faArrowDownWideShort);

  useEffect( () => {
    getCharacters();
  },[]);

  const getCharacters = async() => {

    try {
      setCargadoCro(true); // Inicia la carga
      const res = await axios('https://db-go-t.vercel.app/characters');
      const sortedCharacters = res.data.sort((a, b) => a.age - b.age);
      console.log(sortedCharacters);
      setPersonajes(res.data);
    } catch (error) {
      console.error('Error al obtener las casas:', error);
    } finally {
      setCargadoCro(false); // Finaliza la carga, independientemente de si fue exitosa o no
    } 
  }

  const cambiarIdioma = (idiom) => {
    i18n.changeLanguage(idiom);
  }

  const reordenar = async() => {
    setPersonajes([]);
    try {
      setCargadoCro(true); // Inicia la carga
      const res = await axios('https://db-go-t.vercel.app/characters');
      let sortedCharacters = '';
      if(orden){
        sortedCharacters = res.data.sort((a, b) => a.age - b.age );
        setIcono(faArrowDownWideShort);
      }else{
        sortedCharacters = res.data.sort((a, b) => b.age - a.age);
        setIcono(faArrowDownShortWide);
        
      }
      setOrden(!orden);
      console.log(sortedCharacters);
      setPersonajes(res.data);
    } catch (error) {
      console.error('Error al obtener las casas:', error);
    } finally {
      setCargadoCro(false); // Finaliza la carga, independientemente de si fue exitosa o no
    } 
  }

  return (
    <div className='container-cronologia'>
      <div style={{ display:'flex', justifyContent:'center' }}>
        <Nav func={cambiarIdioma} casa={true} buscador={false} />
      </div>
      <div style={{ display:'flex', justifyContent:'center' }} onClick={() => {reordenar()}}>
        <div className='container-order-icon'>
          <FontAwesomeIcon className='orden-icono' icon={icono} /> 
        </div>
      </div>
    <SimpleBar style={{ height: '75vh', color:'white' }} className='custom-scrollbar'>
    {cargadoCro && (
            <div className='container-spinner'>
              <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </div>
        )}
    <div className='cronologia'>
    <div className="iz animate__animated animate__fadeIn">
        {
          personajes.map((per, i) => {
            if(i%2 === 0){
              return (
                <div key={i} className='crono-container animate__animated animate__fadeIn'>
                  <span>{per.age}</span>
                  <span>{per.name}</span>
                  <div className='img-container'>
                    <img src={per.image} className='pers-crono'/>
                  </div>               
                </div>                 
              )
            }             
          })
        }
      </div>
      
      <div className="der animate__animated animate__fadeIn">
      {
        personajes.map((per, i) => {
          if(i%2 !== 0){
            return (
              <div key={i} className='crono-container animate__animated animate__fadeIn'>
                <span>{per.age}</span>
                <span>{per.name}</span>
                <div className='img-container'>
                  <img src={per.image} className='pers-crono'/>
                </div>               
              </div>                 
            )
          }             
        })
      }        
      </div>
    </div>
      </SimpleBar>
      <Pages/>
    </div>
  )
}
