import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/sculputures.module.css';
import carved_1 from '../assets/images/carved_1.webp';
import carved_6 from '../assets/images/carved_6.jpg';
import carved_3 from '../assets/images/carved_3.jpg';
import carved_7 from '../assets/images/carved_7.jpg';
import carved_5 from '../assets/images/carved_5.jpg';

export const Sculputures = () => {
  return (
    <>
        <div className={style.header}>
            <h1><Link to="#">Carvings & Sculptures </Link></h1>
            <p>Curated collections hand-picked by Africraft editors</p>
        </div>
        <div className={style.card_container}>
            <div className={style.card}>
                <Link to="#">
                    <div className={style.card_img_wrapper}>
                        <img src={carved_5} alt="Art and craft" className={style.img} />
                        <h3>Oil Painting celebartion</h3>
                    </div>
                </Link>
            </div>
            <div className={style.card}>
                <Link to="#">
                    <div className={style.card_img_wrapper}>
                        <img src={carved_3} alt="Art and craft" className={style.img} />
                        <h3>Oil Art paint</h3>
                    </div>
                </Link>
            </div>
            <div className={style.card}>
                <Link to="#">
                    <div className={style.card_img_wrapper}>
                        <img src={carved_1} alt="Art and craft" className={style.img} />
                        <h3>Zambian Oil painting a girl smiling</h3>
                    </div>
                </Link>
            </div>
            <div className={style.card}>
                <Link to="#">
                    <div className={style.card_img_wrapper}>
                        <img src={carved_7} alt="Art and craft" className={style.img} />
                        <h3>Oil Art paint</h3>
                    </div>
                </Link>
            </div>
            <div className={style.card}>
                <Link to="#">
                    <div className={style.card_img_wrapper}>
                        <img src={carved_6} alt="Art and craft" className={style.img} />
                        <h3>Oil Art paint</h3>
                    </div>
                </Link>
            </div>
        </div>
    </>
  )
}

export default Sculputures
