import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import style from "../styles/Contact.module.css";
import { BsEnvelope, BsTelephone, BsWhatsapp } from "react-icons/bs";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className={style.header}>
        <div className={style.header_color}>
          <div className={style.header_cont}>
            <h1>Let's interact</h1>
            <p>
              <b>Africrafted,</b> we are here for you.
            </p>
          </div>
        </div>
      </div>
      <div className={style.contact_form}>
        <div className={style.address}>
          <h2>Address</h2>
          <p>Africrafted</p>
          <p>P.O.BOX 1234</p>
          <p>Kenneth Kaunda International Airport</p>
          <p>Lusaka, Zambia</p>
          <p>
            <BsTelephone /> Call Us +260 7777 30003
          </p>
          <p>
            <BsWhatsapp /> Whatsapp +260 7777 30003
          </p>
          <BsEnvelope /> Email:{" "}
          <a href="mailto:africrafted@gmail.com">africrafted@gmail.com</a>
        </div>
        <form>
          <div className={style.contact_header}>
            <h2>Contact us</h2>
            <p>
              Email <b>Africrafted</b> for questions, queries or comments at{" "}
              <a href="mailto:africrafted@gmail.com">africrafted@gmail</a>
            </p>
          </div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
          <label htmlFor="msg">Message</label>
          <br />
          <textarea id="msg" cols="10" rows="4"></textarea>
          <input type="submit" value="Send" />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
