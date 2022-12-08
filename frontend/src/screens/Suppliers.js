import React from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import style from '../styles/Suppliers.module.css';

const Suppliers = () => {
  return (
    <div>
        <Navbar />
        <div className={style.container}>
            <h1>Suppliers of African crafts</h1>
            <div className={style.header_bg}>
                
            </div>
            <div className={style.header}>
                <h2>Welcome suppliers</h2>
                <p>We are looking for new Suppliers of African arts and crafts.</p>
            </div>
            <div className={style.content}>
                <p>We at Africrafted are always looking for anyone that is involved in African arts and crafts, so if you are within Zambia and an artist, supplier or just doing it as a hobby we would like to hear from you. We are looking for people in the following fields.</p>
                <ul>
                    <li>Crafts supplier -anything African relate</li>
                    <li>Artist</li>
                    <li>Sculptor Makers</li>
                    <li>Mask Makers</li>
                    <li>Beaders</li>
                    <li>In fact anything African</li>
                </ul>
                <p>If you are involved in African items of any sort send us an email with your contact details and tell us what you do . Email pictures and prices as well as any info that may help us decide if your product is good for us to <a href="mailto:africrafted@gmail.com">africrafted@gmail.com.</a></p>
            </div>
        </div>
       <Footer />
    </div>
  )
}

export default Suppliers;