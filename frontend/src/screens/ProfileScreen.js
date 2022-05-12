import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react'
import { Store } from '../Store';

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
  const [{lodingUpdate}, dispatch] = useReducer(reducer,{
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
        lodingUpdate ? (<div>Loading...</div>) : (
          <div>
            <h1>User Profile</h1>
            <form onSubmit={submitHandler}>
              <label htmlFor="fname">First Name</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} id='fname' required />
              <br />
              <label htmlFor="lname">Last Name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} id = 'lname' required/>
              <br />
              <label htmlFor="email">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email"  required/>
              <br />
              <label htmlFor="pws">Password</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} id="pws" />
              <br />
              <label htmlFor="cpws">Confirm Password</label>
              <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} id="cpws" />
              <br />
              <input type="submit" value="Update Profile" />
            </form>
          </div>
        )
      }
    </div>
  )
}

export default ProfileScreen;