import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MdOutlineMoreVert } from 'react-icons/md';
import style from '../styles/Chart.module.css';

const Chart = () => {
  return (
    <div>
        <div className={style.chart_container}>
            <div className={style.chart_header}>
                <h1 className={style.title}>Total Revenue</h1>
                <MdOutlineMoreVert className={style.icon} />
            </div>
            <div className={style.circular}>
                <CircularProgressbar value={70} text={'70%'} strokeWidth={3} />
            </div>
            <div className={style.sales}>
                <p className={style.total_sales}> Total sales made today</p>
                <p className={style.amount}>$123</p>
                <p className={style.prev}>Previous transaction processing. Last transaction not included</p>
            </div>
            <div className={style.bottom}>
                <div className={style.bottom_content}>
                    <p className={style.target}>Target</p>
                    <p className={style.bottom_amount}>$123,7k</p>
                </div>
                <div className={style.bottom_content}>
                    <p>Last Week</p>
                    <p className={style.bottom_amount}>$123,7k</p>
                </div>
                <div className={style.bottom_content}>
                    <p>Last Month</p>
                    <p className={style.bottom_amount}>$123,7k</p>
                </div>  
            </div>
        </div>
    </div>
  )
}

export default Chart