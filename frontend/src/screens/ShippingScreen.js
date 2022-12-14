import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import style from "../styles/Shipping.module.css";

const ShippingScreen = () => {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [province, setProvince] = useState(shippingAddress.province || "");
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode || "");
  const [phoneNumber, setPhoneNumber] = useState(
    shippingAddress.phoneNumber || ""
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        country,
        address,
        city,
        province,
        zipCode,
        phoneNumber,
      },
    });

    localStorage.getItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        country,
        address,
        city,
        province,
        zipCode,
        phoneNumber,
      })
    );

    navigate("/payment");
  };

  return (
    <div><Navbar />
    <div className={style.container}>
      <div className={style.form_container}>
        <form onSubmit={handleSubmit}>
          <div className={style.header}>
            <h1>Shipping Details</h1>
          </div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            id="fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <label htmlFor="country">Country</label>
          <input
            type="text"
            placeholder="Zambia"
            id="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <label htmlFor="address_1">Address</label>
          <input
            type="text"
            placeholder="1234 Copper Street, 2345"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <p style={{ color: "#989898" }}>street Address, Home Number, POBox</p>
          <div className={style.additional_info}>
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                placeholder="Lusaka"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="province">State/Province</label>
              <input
                type="text"
                placeholder="Lusaka"
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={style.additional_info}>
            <div>
              <label htmlFor="zip">Zip Code</label>
              <input
                type="number"
                placeholder="101010"
                id="zip"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number (Optional)</label>
              <input
                type="number"
                placeholder="+260 7777 30003"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <input type="submit" value={"Continue"} />
        </form>
      </div>
    </div>
    </div>
  );
};

export default ShippingScreen;
