import React from 'react';
import { Link } from 'react-router-dom';
import { RiDashboardFill } from 'react-icons/ri';
import { AiOutlineBell } from 'react-icons/ai';
import { BsBarChartLineFill } from 'react-icons/bs';
import { BsBoxArrowInRight } from 'react-icons/bs';
import { BsCreditCard } from 'react-icons/bs';
import { BsPeople } from 'react-icons/bs';
import { BsShop } from 'react-icons/bs';
import { BsTruck } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import style from '../styles/SideBar.module.css';


const SideBar = () => {
  return (
    <div>
        <div className={style.side_bar_container}>
            {/* <img src="../assets/images/afri_logo.png" alt="Africrafted" /> */}
            <h1 className='logo'>Africrafted</h1>
            <hr />
            <ul>
                <p className={style.title}>MAIN</p>
                <li><RiDashboardFill className={style.icon} /> <Link to='#'>Dashboard</Link></li>
                <p className={style.title}>LISTS</p>
                <li><BsPeople className={style.icon} /> <Link to='#'>Users</Link></li>
                <li><BsShop className={style.icon} /> <Link to='#'>Products</Link></li>
                <li><BsCreditCard className={style.icon} /> <Link to='#'>Orders</Link></li>
                <li><BsTruck className={style.icon} /> <Link to='#'>Delivery</Link></li>
                <p className={style.title}>USEFUL</p>
                <li><BsBarChartLineFill className={style.icon} /> <Link to='#'>Stats</Link></li>
                <li><AiOutlineBell className={style.icon} /> <Link to='#'>Notefication</Link></li>
                <p className={style.title}>USER</p>
                <li><BiUserCircle className={style.icon}/><Link to='#'>Profile</Link></li>
                <li><BsBoxArrowInRight className={style.icon}/><Link to='#'>Logout</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default SideBar