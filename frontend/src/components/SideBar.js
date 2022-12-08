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

    const handleSignOut = () => {
    window.location.href='/login';
  }
  return (
        <div className={style.side_bar_container}>
          <div className={style.logo}>
            <Link to="/search?category=all&query=all&price=all&rating=all&order=newest&page=1"><img src="/images/afri_logo.png" alt="Africrafted" /></Link>
          </div>
            <ul>
                <p className={style.title}>MAIN</p>
                <li><RiDashboardFill className={style.icon} /> <Link to='/admin/dashboard'>Dashboard</Link></li>
                <p className={style.title}>LISTS</p>
                <li><BsPeople className={style.icon} /> <Link to='/admin/users'>Users</Link></li>
                <li><BsShop className={style.icon} /> <Link to='/admin/products'>Products</Link></li>
                <li><BsCreditCard className={style.icon} /> <Link to='/admin/orders'>Orders</Link></li>
                <li><BsTruck className={style.icon} /> <Link to='#'>Delivery</Link></li>
                <li><RiDashboardFill className={style.icon} /> <Link to='/admin/categories'>Categories</Link></li>
                <p className={style.title}>USEFUL</p>
                <li><BsBarChartLineFill className={style.icon} /> <Link to='#'>Stats</Link></li>
                <li><AiOutlineBell className={style.icon} /> <Link to='#'>Notefication</Link></li>
                <p className={style.title}>USER</p>
                <li><BiUserCircle className={style.icon}/><Link to='/profile'>Profile</Link></li>
                <li onClick={handleSignOut}><BsBoxArrowInRight className={style.icon}/><Link to='#'>Logout</Link></li>
            </ul>
        </div>
  )
}

export default SideBar;