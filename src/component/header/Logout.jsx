import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../../appwriter/Auth';
import { logout } from '../../redux/authSlice';

function Logout() {
    const dispatch = useDispatch();

    const logoutHandle = () => {
        authService.logout().then(
            localStorage.removeItem("userData"),
            dispatch(logout())
        )
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-[#e2e2e2] hover:text-black rounded-full text-white' onClick={logoutHandle}>Logout</button>
  )
}

export default Logout