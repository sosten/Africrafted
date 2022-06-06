import React from 'react';
import { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import style from '../styles/DataTable.module.css';
import axios from 'axios';
import { TiPencil } from 'react-icons/ti';
import { FiTrash2 } from 'react-icons/fi';

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

  return (
    
    <div>
      
      {
        loading ? (<div><LoadingSpinner /></div>) : error ? (<div>{error}</div>) : (
          <div>
              <div className={style.header}>
              <h1>Customers</h1>
              <div className={style.add_btn}>
                <Link to={'/admin/add_user'}>Add New</Link>
              </div>
            </div>
            <table className='table table-sm table-hover table-light table-striped'>
                  <thead className='table-light'>
                      <tr>
                          <th scope="col">ID</th>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Email Address</th>
                          <th scope="col">Full Name</th>
                          <th scope="col">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                    {users.map((user)=> (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td><span><TiPencil/> Edit</span> <span><FiTrash2 /> Delete</span></td>
                      </tr>
                    ))}
                  </tbody>
            </table>
          </div>
        )
      }
      
  </div>
  )
}

export default DataTable;