import React from 'react';
import { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { rows, columns } from '../data/userData';
import style from '../styles/DataTable.module.css';
import axios from 'axios';

const reducer = (state, action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading: true}
    case 'FETCH_SUCCESS':
      return {...state, loading: false, error: false, users: action.payload}
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state;
  }
}

const DataTable = () => {

  const[{loading, error, users}, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    users: []
  });

  useEffect(() => {
    dispatch({type: 'FETCH_REQUEST', loading: true});
    const fetchUsers = async() =>{
      try {
        const result = await axios.get('/api/users');
        dispatch({type: 'FETCH_SUCCESS', loading: false, payload: result.data})
        console.log(result)
      } catch (error) {
        dispatch({type: 'FETCH_FAIL', loading: false, payload: error.message});
      }
    }
    fetchUsers();
  }, []);

  const actionColumn = [{field: 'action', headerName: 'Action', width: 300, renderCell: () =>{
    return(
      <div className={style.cell_action}>
        <div className={style.view_btn}>View</div>
        <div className={style.delete_btn}>Delete</div>
      </div>
    )
  }}]
  return (
    <div style={{ height: 500, width: '100%' }}>
      {users.map((user) =>(
        <div key={user._id}>
          {user.firstName}
        </div>
      ))}
      <div className={style.header}>
        <h1>Customers</h1>
        <div className={style.add_btn}>
          <Link to={'/admin/add_user'}>Add New</Link>
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

export default DataTable;