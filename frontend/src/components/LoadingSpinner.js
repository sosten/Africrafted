import React from 'react';
import style from '../styles/LoadingSpinner.module.css'

const LoadingSpinner = () => {
  return (
    <div className={style.loading_container}>
        <div className={style.loading_flex}>
            <div className={style.loading_spinner_container}>
                <div className={style.loading_spinner}></div>
            </div>
        </div> 
    </div>
    
  )
}

export default LoadingSpinner;