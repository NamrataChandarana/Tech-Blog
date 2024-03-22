import React from 'react'
import {Container, Logo, Logout} from '../index'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import authSlice from '../../redux/authSlice'




function Header() {

  const authStatus = useSelector((state) => state.status);
  console.log(authStatus)

  const navigate = useNavigate()

  const navItems = [
    {
      name: "Home",
      link: "/",
      active: true,
    },
    {
      name: "Singup",
      link: "/signup",
      active: !authStatus,
    },
    {
      name: "Login",
      link: "/login",
      active: !authStatus,
    },
    {
      name: "All Posts",
      link: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Posts",
      link: "/add-posts",
      active: authStatus,
    }
  ]


  return (
    <Container>
      <nav>
        <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
        </div>
        <ul className='flex ml-auto'>
          {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                  onClick={() => navigate(item.link)}
                  className='inline-bock px-6 py-2 duration-200 hover:bg-[#e2e2e2] hover:text-black rounded-full text-white'
                  >{item.name}</button>
                </li>
              ) : null
          )}
        {authStatus && (
              <li>
                <Logout />
              </li>
            )}
        </ul>
      </nav>
    </Container>
  )
}

export default Header