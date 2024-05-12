import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Pages = () => {
  const { t } = useTranslation();
  return (
    <ul className='list-pages'>
        <NavLink className={({ isActive }) => isActive ? "item-pages active" : "item-pages"} to="/personajes">{t('characters')}</NavLink>
        <NavLink className={({ isActive }) => isActive ? "item-pages active" : "item-pages"} to="/casas">{t('houses')}</NavLink>
        <NavLink className={({ isActive }) => isActive ? "item-pages active" : "item-pages"} to="/cronologia">{t('chronology')}</NavLink>
    </ul>
  )
}

export default Pages;