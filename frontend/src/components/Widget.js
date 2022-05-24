import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Widget.module.css';
import { HiOutlineUser } from 'react-icons/hi';
import { FaAngleUp } from 'react-icons/fa';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { BiCart } from 'react-icons/bi';

const Widget = ({type}) => {
    let data;

    //temporay data
    const amount = 100;
    const diff = 20;

    switch(type) {
        case 'user': 
        data = {
            title: 'USERS',
            isMoney: false,
            link: 'See all Users',
            icon: <HiOutlineUser className={style.icon} />
        };
        break;
        case 'order':
            data = {
                title: 'ORDERS',
                isMoney: false,
                link: 'See all Orders',
                icon: <BiCart className={style.icon}
                        style={{backgroundColor: '#ffff0067'}} />
            };
            break;
        case 'earning':
            data = {
                title: 'EARNINGS',
                isMoney: true,
                link: 'View net earnings',
                icon: <MdAttachMoney className={style.icon} 
                        style={{backgroundColor: '#0080004b'}}/>
            };
           break;
           case 'balance':
               data = {
                   title: 'BALANCE',
                   isMoney: true,
                   link: 'See details',
                   icon: <FaMoneyCheckAlt className={style.icon}
                            style={{backgroundColor: '#80006b62'}}/>
               };
            break; 
        default:
            break;
    }
  return (
    <div>
        <div className={style.widget_container}>
            <div className={style.left}>
                <p className={style.users}>{data.title}</p>
                <p className={style.percent}><FaAngleUp className={style.positive} /> {diff}%</p>
            </div>
            <div className={style.right}>
                <p className={style.counter}>{data.isMoney  && "$"}{amount}</p>
            </div>
            <div className={style.see_all}>
                <Link to='#'>{data.link}</Link>
                {data.icon}
            </div>
        </div>
    </div>
  )
}

export default Widget;