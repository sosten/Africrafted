import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import jewelry_4 from '../assets/images/jewelry_4.jpg';
import smile_lady from '../assets/images/ronise-da-luz-5DJ8sR-m58I-unsplash.jpg';
import style from '../styles/About.module.css';

const About = () => {
  return (
    <div>
        <Navbar />
        <div className={style.header}>
            <div className={style.header_color}>
                <div className={style.header_cont}>
                    <h1>Get to know us</h1>
                    <p><b>Africrafted,</b> home of art and craft.</p>  
                </div>
            </div>
        </div>
        <div className={style.container}>
            <div className={style.who}>
                <div className={style.who_cont}>
                    <h2>Who we are.</h2>
                    <p>Africrafted is a hub of African Crafts and Arts, operating both online and offline. We are open to all suppliers of African Craft and Art.</p>
                    <p>Most of our goods are handmade so the pieces that you do order are unique and made by genuine African men and women who use this as their source of income.</p>
                </div>
                <div className={style.image}>
                    <img src={jewelry_4} alt="jewelry" />
                </div>
            </div>
            <div className={style.mission}>
                <div className={style.image}>
                    <img src={smile_lady} alt="jewelry" />
                </div>
                <div className={style.mission_cont}>
                    <h2>Our mission.</h2>
                    <p>We are here to support the growth of African Crafts and Art to world.</p>
                </div>
            </div>
            <div className={style.contact}>
                <p>For more information and other questions or queries, feel free to <Link to ="/contact">contact us</Link></p>
                <p><b>Note:</b>We are located in Zambia, central part of Africa. Hence time may differ with your location. We are open from 08am to 5pm.</p>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default About;