import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import { Store } from '../Store';
import { BsPencilSquare } from 'react-icons/bs';
import style from '../styles/Profile.module.css'

const reducer = (state, action) => {
  switch(action.type){
    case 'UPDATE_REQUEST':
      return {...state, loadingUpdate: true};
    case 'UPDATE_SUCCESS':
      return {...state, loadingUpdate: false};
    case 'UPDATE_FAIL':
      return {...state, loadingUpdate: false};
    default:
      return state;
  }
}

const ProfileScreen = () => {
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const { userInfo } = state;
  const [{loadingUpdate}, dispatch] = useReducer(reducer,{
    loadingUpdate: false
  });

  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      alert('Password did not match');
      return;
    }else {
      dispatch({type: 'UPDATE_REQUEST'});
      try {
        const { data } = await axios.put('/api/profile', {
          firstName,
          lastName,
          email,
          password
        },
        {
         headers: { Authorization: `Bearer ${userInfo.token}` }
        }
      );

      dispatch({type: 'UPDATE_SUCCESS'});
      ctxDispatch({type: 'USER_SIGNIN', payload: data});
      localStorage.setItem('userInfo', JSON.stringify(data));

      } catch (error) {
        dispatch({type: 'UPDATE_FAIL'});
        console.log(error)
      }
      
    }
  }

  return (
    <div>
      {
        loadingUpdate ? (<LoadingSpinner />) : (
          <div className={style.form_container}>
            <form onSubmit={submitHandler}>
              <h1>User Profile</h1>
              <label htmlFor="fname">First Name</label>
              <div className={style.form_row}>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} id='fname' required />
                <BsPencilSquare color='#222' size={20} />
              </div>
              
              <label htmlFor="lname">Last Name</label>
              <div className={style.form_row}>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} id = 'lname' required/>
                <BsPencilSquare color='#222' size={20} />
              </div>
              <label htmlFor="email">Email</label>
              <div className={style.form_row}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email"  required/>
                <BsPencilSquare color='#222' size={20} />
              </div>
              <label htmlFor="pws">Password</label>
              <div className={style.form_row}>
                <input type="password" onChange={(e) => setPassword(e.target.value)} id="pws" />
                <BsPencilSquare color='#222' size={20} />
              </div>
              <label htmlFor="cpws">Confirm Password</label>
              <div className={style.form_row}>
                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} id="cpws" />
                <BsPencilSquare color='#222' size={20} />
              </div>
              <input type="submit" value="Update Profile" />
            </form>
          </div>
        )
      }
    </div>
  )
}

export default ProfileScreen;