import React from 'react';
import { Link } from 'react-router-dom';
import { BsGlobe } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';
import { BsMoon } from 'react-icons/bs';
import { AiOutlineBell } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import style from '../styles/AdminNavbar.module.css';

const AdminNavbar = () => {
  return (
    <div className={style.navbar_container}>
        <div className={style.search}>
            <form>
                <div className={style.search_cont}>
                    <input type="text" placeholder='Search' />
                    <button type='Submit'><BsSearch  className={style.icon}/></button>
                </div>
            </form>
        </div>
        <div className={style.top_links}>
            <ul>
                <li><Link to='#'><BsGlobe className={style.icon}/> English</Link></li>
                <li><Link to='#'><BsMoon className={style.icon}/></Link></li>
                <li><Link to='#'><AiOutlineBell className={style.icon}/></Link></li>
                <li><Link to='#'><BsChatLeft className={style.icon}/></Link></li>
            </ul>
        </div>
    </div>
  )
}

export default AdminNavbar;