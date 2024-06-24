import React, { useEffect, useState } from 'react'
import logo from "../../assets/img/logo/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';

const NavBar = ({ refetch, setRefetch }) => {

    const navigate = useNavigate();

    const [hasShadow, setHasShadow] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            if (!sessionStorage.getItem('token')) {
                setUser(null);
                return;
            }
            const res = await axiosInstance.get('/user');
            // setRefetch(prev => !prev)
            console.log(res)
            try {

                if (res?.data?.success) {
                    setUser(res?.data?.user);
                }
                else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            }
        }
        getUserData();
    }, [refetch]);


    const handleSignOut = () => {
        setRefetch(val => !val);
        sessionStorage.removeItem('token');
        navigate('/auth/login')
    }


    return (
        <header id="navbar" className={`w-full flex items-center justify-between px-5 md:px-20 py-3 mb-10 sticky top-0 left-0 bg-white shadow-none z-50 transition-shadow duration-300 ${hasShadow ? 'shadow-lg' : ''} border-b`}>

            <div className="w-auto flex items-center gap-4 md:gap-9">
                <Link to={'/'}>
                    <img src={logo} alt="Logo" className='w-20 md:w-28' />
                </Link>
                {user === null ? (
                    <Link to={'/'}>
                        <span className="hover:text-gray-800 font-semibold hover:border-b-2 border-teal-500 text-sm text-gray-500 capitalize">
                            Home
                        </span>
                    </Link>
                ) : (
                    <Link to={'/home'}>
                        <span className="hover:text-gray-800 font-semibold hover:border-b-2 border-teal-500 text-sm text-gray-500 capitalize">
                            Dashboard
                        </span>
                    </Link>
                )}
            </div>

            <div className="relative group inline-block text-left">
                {user !== null ? (
                    <>
                        <div className="w-max flex items-center gap-2">
                            <img className="w-8 h-8 rounded-full border-2 border-gray-400" src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1716163200&semt=ais_user" alt="User" />
                            <span className='text-sm text-gray-500 capitalize'>{user.firstName}</span>
                        </div>
                        <div className="group-hover:opacity-100 group-hover:visible opacity-0 invisible absolute right-0 z-10 w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1" role="none">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">Account settings</a>
                                <button onClick={handleSignOut} type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <a href="#features" className="ml-2 md:ml-4 hover:text-gray-800 font-semibold hover:border-b-2 border-teal-500 text-sm text-gray-500 capitalize">Features</a>
                        <a href="#how-it-works" className="hidden md:inline ml-2 md:ml-4 hover:text-gray-800 font-semibold hover:border-b-2 border-teal-500 text-sm text-gray-500 capitalize">How It Works</a>
                        <a href="#contact" className="hidden md:inline ml-2 md:ml-4 hover:text-gray-800 font-semibold hover:border-b-2 border-teal-500 text-sm text-gray-500 capitalize">Contact</a>
                        <Link to={'/auth/login'} className="ml-2 md:ml-4 hover:text-gray-800 font-semibold hover:border-b-2 border-teal-500 text-sm text-gray-500 capitalize">Log In</Link>
                    </>
                )}
            </div>

        </header>

    )
}

export default NavBar