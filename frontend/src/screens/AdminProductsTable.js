import React from 'react';
import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { rows, columns } from '../data/productData';
import style from '../styles/DataTable.module.css';
import { useEffect } from 'react';
import axios from 'axios';

const reducer = (state, action) =>{
        switch(action.type){
          case 'FETCH_REQUEST':
            return {...state, loading: true, error: false }
          case 'FETCH_SUCCESS':
            return {...state, loading: false, products: action.payload }
          case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
          default: 
            return state;
        }
  }


const AdminProductsTable = () => {

  const[{loading, error, products}, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    products: []
  });

  useEffect(()=>{
    dispatch({type: 'FETCH_REQUEST', loading: true})
      const fetchData = async()=> {
        try{
          const result = await axios.get('/api/products');
          dispatch({type: 'FETCH_SUCCESS', loading: false, payload: result.data});
        }catch (error) {
          dispatch({type: 'FETCH_FAIL', loading: false, payload: error.message});
        }
      } 
      fetchData()
  },[]);

  
  const actionColumn = [{field: 'action', headerName: 'Action', width: 300, renderCell: () =>{
    return(
      <div className={style.cell_action}>
        <div className={style.view_btn}>Edit</div>
        <div className={style.delete_btn}>Delete</div>
      </div>
    )
  }}]
  return (
    <div style={{ height: 500, width: '100%' }}>
      <div className={style.header}>
        {
          products.map((product) => (
            <div key={product._id}>
              {product.productName}
              {product.price}
              {product.category}
            </div>
          ))
        }
        <h1>Products</h1>
        <div className={style.add_btn}>
          <Link to={'/admin/add_product'}>Add New</Link>
        </div>
      </div>
      
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[7]}
        checkboxSelection
      />
  </div>
  )
}

export default AdminProductsTable;