import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Nav from '../Home/Nav';
import Pages from '../Home/Pages';
import i18n from 'i18next';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import './personajes.css';

const Personaje = () => {
    const [personaje, setPersonaje] = useState([]);
    const [cargando, setCargando] = useState(false);

    let {id} = useParams();
    const {t} = useTranslation();

    useEffect( () => {
      getCharacter();
    },[]);
    

    const getCharacter = async() => {
        try{
            setCargando(true);
            const res = await axios('https://db-go-t.vercel.app/characters');
            const mipersonaje = res.data.map(objeto => {
                // Copiamos el objeto para evitar mutar el objeto original
                const objetoTransformado = {...objeto};
                
                // Iteramos sobre cada propiedad del objeto
                Object.keys(objetoTransformado).forEach(propiedad => {
                  // Si la propiedad tiene valor null, la cambiamos por una cadena vacía
                  if (objetoTransformado[propiedad] === null) {
                    objetoTransformado[propiedad] = '';
                  }
                });
                
                return objetoTransformado;
              });
            const mipersonaje2 = mipersonaje.filter((x) => {
                return x.id == id;
            })
    
            const res2 = await axios('https://db-go-t.vercel.app/houses');
            const micasa = res2.data.filter((x) => {
                return x.name == mipersonaje2[0].house;
            })
            console.log(mipersonaje2);
            if(micasa.length > 0 && micasa[0].image) {
                mipersonaje2[0].casaImage = micasa[0].image;
            }else{
                mipersonaje2[0].casaImage = 'imagen predeterminada'; 
            }
    
            setPersonaje(mipersonaje2);
        } catch (error) {
            console.error('Error al obtener los personajes:', error);
        } finally {
            setCargando(false); // Finaliza la carga, independientemente de si fue exitosa o no
        }
    }



    const cambiarIdioma = (idiom) => {
        i18n.changeLanguage(idiom);
    }
    
  return (
    <div className='container-personajes'>
        <Nav func={cambiarIdioma} casa={true} buscador={false} atras={true}/>
        {cargando && (
            <div className='container-spinner'>
              <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </div>
        )}
        {
            personaje.map( (pers, index) => {
                return(
                    <div className='container-personaje ' key={index}>
                        <div>
                            <div className='foto-pers animate__animated animate__fadeIn' style={{backgroundImage: `url(${pers.image})`}}></div>
                            <p className='nombre-pers animate__animated animate__fadeIn'>{pers.name}</p>
                        </div>
                        <div className='caracteristicas animate__animated animate__fadeIn'>
                            <div className='caracteristica'>
                                <p className='text-carac'> {t('house')}</p>
                                {pers.casaImage &&
                                    <img key={index} width={150} src={pers.casaImage} alt="" />
                                }                               
                            </div>
                            <div className='caracteristica'>
                                <p className='text-carac'> {t('alliances')}</p>
                                {
                                    pers.alliances.map( (a, i) => {
                                        return(
                                            <p key={i} className='sub-carac'>{a}</p>
                                        )
                                    })
                                }
                            </div>
                            <div className='caracteristica'>
                                <p className='text-carac'> {t('episodes')}</p>
                                {
                                    pers.episodes.map( (a, i) => {
                                        return(
                                            <p key={i} className='sub-carac'>{a}</p>
                                        )
                                    })
                                }
                            </div>
                            <div className='caracteristica'>
                                <p className='text-carac'> {t('parents')}</p>
                                {
                                    pers.parents.map( (a, i) => {
                                        return(
                                            <p key={i} className='sub-carac'>{a}</p>
                                        )
                                    })
                                }
                            </div>
                            <div className='caracteristica'>
                                <p className='text-carac'> {t('siblings')}</p>
                                {
                                    pers.siblings.map( (a, i) => {
                                        return(
                                            <p key={i} className='sub-carac'>{a}</p>
                                        )
                                    })
                                }
                            </div>
                            <div className='caracteristica'>
                                <p className='text-carac'> {t('titles')}</p>
                                {
                                    pers.titles.map( (a, i) => {
                                        return(
                                            <p key={i} className='sub-carac'>{a}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                )
            })
        }

        <Pages/>
    </div>
  )
}

export default Personaje;
