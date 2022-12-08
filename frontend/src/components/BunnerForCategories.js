import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/bunnerForCategories.module.css";
import beads from "../assets/images/beads-image.png";
import fabric_1 from "../assets/images/fab_1.jpg";
import oil_art_1 from "../assets/images/oil_art_1.jpg";
import carving from "../assets/images/carving.jpg";
import Jewelry from "../assets/images/Jewelry.png";
import makishi_mask from "../assets/images/makishi_mask.jpg";

const BunnerForCategories = () => {
  return (
    <>
      <div className={style.bunner_wrapper}>
        <div className={style.banner}></div>
      </div>
      <div className={style.container}>
        {/* <div className={style.banner_header}>
          <h1>Shop By Category</h1>
        </div> */}
        <div className={style.card_container}>
          <div className={style.card}>
            <Link to={"/search?category=Beads"}>
              <img src={beads} alt="category" />
              <p>Beads</p>
            </Link>
          </div>
          <div className={style.card}>
            <Link to={"/search?category=Jewerly"}>
              <img src={Jewelry} alt="category" />
              <p>Jewelry</p>
            </Link>
          </div>
          <div className={style.card}>
            <Link to={"#"}>
              <img src={carving} alt="category" />
              <p>Carvings</p>
            </Link>
          </div>
          <div className={style.card}>
            <Link to={"/search?category=Masks"}>
              <img src={makishi_mask} alt="category" />
              <p>Masks</p>
            </Link>
          </div>
          <div className={style.card}>
            <Link to={"/search?category=Painting"}>
              <img src={oil_art_1} alt="category" />
              <p>Art & Paintings</p>
            </Link>
          </div>
          <div className={style.card}>
            <Link to={"/search?category=Textiles"}>
              <img src={fabric_1} alt="category" />
              <p>Textiles</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BunnerForCategories;
