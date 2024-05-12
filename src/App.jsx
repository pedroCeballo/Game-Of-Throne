import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Casa from './componentes/Casas/Casa';
import Home from './componentes/Home/Home';
import Personajes from './componentes/Personajes/Personajes';
import Casas from './componentes/Casas/Casas';
import Cronologia from './componentes/Cronologia/Cronologia';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Personaje from './componentes/Personajes/Personaje';
import './App.css';

i18n.use(initReactI18next).init({
    lng: 'en', // idioma predeterminado
    fallbackLng: 'en', // idioma de reserva
    resources: {
      en: {
        translation: {
          'characters': 'characters',
          'houses': 'houses',
          'chronology': 'chronology',
          'game of thrones':'Game of <br> Thrones',
          'house':'house',
          'alliances':'alliances',
          'episodes':'episodes',
          'parents':'parents',
          'siblings':'siblings',
          'titles':'titles',
          'foundation':'foundation',
          'region':'region',
          'religion':'religion',
          'settlement':'settlement'
          // agregar más traducciones aquí...
        }
      },
      es: {
        translation: {
          'characters': 'personajes',
          'houses': 'casas',
          'chronology': 'cronologia',
          'game of thrones':'Juego de <br> tronos',
          'house':'casa',
          'alliances':'alianzas',
          'episodes':'apariciones',
          'parents':'padres',
          'siblings':'descendientes',
          'titles':'titulos',
          'foundation':'fundacion',
          'region':'región',
          'religion':'religión',
          'settlement':'Asentamiento'

        }
      }
    },
    interpolation: {
      escapeValue: false // No necesitas escapar las cadenas traducidas
    }
});

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/personajes" element={<Personajes/>}/>
          <Route path="/personaje/:id" element={<Personaje/>}/>
          <Route path="/casas" element={<Casas/>}/>
          <Route path="/casa/:id" element={<Casa/>}/>
          <Route path="/cronologia" element={<Cronologia/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
