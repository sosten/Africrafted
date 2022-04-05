import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/bunnerForCategories.module.css";
import jewelry_3 from "../assets/images/jewelry_3.jpg";
import fabric_1 from "../assets/images/fab_1.jpg";
import oil_art_1 from "../assets/images/oil_art_1.jpg";
import fabric_3 from "../assets/images/fabric_3.jpeg";
import decor_1 from "../assets/images/decor_1.webp";
import decor_2 from "../assets/images/decor_2.jpg";

const BunnerForCategories = () => {
  return (
    <>
      <div className={style.bunner_wrapper}>
          <div className={style.banner}></div>
      </div>
      <div className={style.container}>
        <div className={style.card_container}>
          <div className={style.card}>
            <Link to={"#"}>
              <img src={jewelry_3} alt="category" />
              <p>Necklaces</p>
            </Link>
          </div>
          <div className={style.card}>
            <Link to={"#"}>
              <img src={decor_1} alt="category" />
              <p>Wall decor</p>
            </Link>
          </div>
          <div className={style.card}>
            <Link to={"#"}>
              <img src={fabric_3} alt="category" />
              <p>Bags & Purses</p>
            </Link>
          </div>
          <div className={style.card}>
            <Link to={"#"}>
              <img src={decor_2} alt="category" />
              <p>Outdoor & Garden</p>
            </Link>
          </div>
          <div className={style.card}>
            <Link to={"#"}>
              <img src={oil_art_1} alt="category" />
              <p>Carvings & Paintings</p>
            </Link>
          </div>
          <div className={style.card}>
            <Link to={"#"}>
              <img src={fabric_1} alt="category" />
              <p>Fabric</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BunnerForCategories;
