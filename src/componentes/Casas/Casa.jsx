import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Nav from '../Home/Nav';
import Pages from '../Home/Pages';
import i18n from 'i18next';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import '../Personajes/personajes.css';

export default function Casa() {
    const [casa, setCasa] = useState([]);
    const [cargadoCs, setCargadocs] = useState(false);

    let { id } = useParams();
    const { t } = useTranslation();

    useEffect( () => {
      getHouses();
      //getHouses();
    },[]);

    const getHouses = async() => {
        try {
            setCargadocs(true); // Inicia la carga
            const res = await axios('https://db-go-t.vercel.app/houses');
            const miCasa = res.data.filter((x) => {
                return x.id == id;
            });
            console.log(miCasa);
            setCasa(miCasa); 
          } catch (error) {
            console.error('Error al obtener las casas:', error);
          } finally {
            setCargadocs(false); // Finaliza la carga, independientemente de si fue exitosa o no
          } 
    }

    const cambiarIdioma = (idiom) => {
        i18n.changeLanguage(idiom);
    }
    
    return (
        <div className='container-casas'>
            <Nav func={cambiarIdioma} casa={true} buscador={false} atras={true}/>
            {cargadoCs && (
            <div className='container-spinner'>
              <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </div>
        )}
            {
                casa.map((casa, i) => {
                    console.log(casa);
                    return (
                        <div key={i}>
                            <img className="foto-escu animate__animated animate__fadeIn" key={i} src={casa.image}/>
                            <p className='text-carac animate__animated animate__fadeIn'> {t('house') +' - '+casa.name} </p>
                        </div>
                    )
                })                
            }
            {
                casa.map((casa, i) => {
                    console.log(casa);
                    return (
                        <div className='caracteristicas animate__animated animate__fadeIn' key={i}>
                             <div className='caracteristica'>
                                <p className='text-carac'> {t('foundation')}</p>
                                {
                                    <p className='sub-carac'>{casa.foundation}</p>
                                }                               
                            </div>
                            <div className='caracteristica'>
                                <p className='text-carac'> {t('region')}</p>
                                {
                                    <p className='sub-carac'>{casa.region}</p>
                                }                               
                            </div>
                            <div className='caracteristica'>
                                <p className='text-carac'> {t('religion')}</p>
                                <p className='sub-carac'>
                                {
                                    casa.religions.map((rel, i) => {
                                        return (rel)
                                    })
                                }  
                                </p>                             
                            </div>
                            <div className='caracteristica'>
                                <p className='text-carac'> {t('alliances')}</p>
                                {
                                    casa.alliances.map((rel, i) => {
                                        return (
                                            <p className='sub-carac' key={i}> {rel} </p>
                                        )
                                    })
                                }                                                             
                            </div>
                            <div className='caracteristica'>
                                <p className='text-carac'> {t('settlement')}</p>
                                <p className='sub-carac'>
                                {
                                    casa.settlement
                                }  
                                </p>                                                             
                            </div>
                        </div>
                    )
                })                
            }
            <Pages/>
        </div> 
    )
}
