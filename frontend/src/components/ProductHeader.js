import React from 'react';
import style from '../styles/ProductHeader.module.css';
import { RiEqualizerLine } from 'react-icons/ri';
import { GoTriangleDown } from 'react-icons/go';

const ProductHeader = () => {
  return (
    <>
        <div className={style.container}>
            <div className={style.header}>
                <h2>Find something you love</h2>
                <div className={style.filter}>
                    <div>
                        <button><RiEqualizerLine /><span>All Filters</span></button>
                    </div>
                    <div>
                        <button>Sort by: <b>Relevancy</b><GoTriangleDown /></button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProductHeader