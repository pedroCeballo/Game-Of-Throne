import React, {useEffect, useState} from 'react';
import es from '../../assets/es.png';
import uk from '../../assets/uk.png';
import lupa from '../../assets/lupa.png'
import { NavLink, useLocation} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Nav = ({func, casa, buscador, atras, busca}) => {
  const { t } = useTranslation();
  //const history = useHistory();
  const location = useLocation();
  const [labelText, setLabelText] = useState('');
  useEffect(() => {
    if (location.pathname === '/casas') {
      setLabelText('Casa');
    }   
    if (location.pathname === '/personajes') {
      setLabelText('Personaje');
    }
    console.log(location.pathname);
  });
  const goBack = () => {
    window.history.back();
  }
  return (
    <nav className='nav'>
      <div className={`container-nav`}>
          <div className='container-vector'>
          {atras &&  
            <>
              <div onClick={() => {goBack()}}>            
                <FontAwesomeIcon  className='atras' icon={faArrowLeft} />
              </div>            
              <span className='atrasT'>Atras</span>
            </>
          }
          {buscador &&  
            <>           
              <div>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                {/*<img src={lupa} className='lupa' alt="" />*/}
              </div> 
              <TextField 
              onChange={(event) => {busca(event.target.value)}}
              className='buscador'
              placeholder={labelText}
              id="standard-basic"
              variant="standard"
              InputProps={{
                style: {color:'white',
                borderBottom: '1px solid #666666',
               }, // Cambia el color del texto
              }}

              InputLabelProps={{
                style: { color: 'white' }, // Cambia el color de la etiqueta
              }}
              FormHelperTextProps={{
                style: { color: 'purple' }, // Cambia el color del texto de ayuda
              }}
              />           
            {/*<input className='buscador' type="text" placeholder='Buscar...' onChange={(event) => {busca(event.target.value)} }/> */}
            </>
          }
            
          </div>
          <div className='container-flags'>
            {casa && <NavLink to="/"> <FontAwesomeIcon className='casa' icon={faHouse} /> </NavLink> }
            <img className="flag" src={es} alt="bandera española" onClick={ () => func('es') }   />
            <img className="flag" src={uk} alt="bandera inglesa"  onClick={ () => func('en') }  />
          </div>
      </div>
    </nav>
  )
}

export default Nav;