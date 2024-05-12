import React from 'react'
import { useTranslation } from 'react-i18next';

const Inicio = () => {
  const { t } = useTranslation();
  return (
    <div className='container-title'>
        <p className='title' dangerouslySetInnerHTML={{ __html: t('game of thrones')}}></p>
    </div>
  )
}

export default Inicio;
