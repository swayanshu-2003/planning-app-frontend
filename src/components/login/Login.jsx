import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';

const Login = ({ refetch }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    const onSubmit = async (data) => {
        setLoginLoading(true)
        if (isLogin) {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, data);
            if (res?.data?.success) {
                refetch(val => !val);
                sessionStorage.setItem('token', `Bearer ${res.data.token}`);
                if (sessionStorage.getItem('inviteUrl')) {
                    const inviteURl = sessionStorage.getItem('inviteUrl');
                    sessionStorage.removeItem('inviteUrl')
                    navigate(inviteURl);
                } else {
                    navigate('../home');
                }
                setLoginLoading(false)
            }
            setLoginLoading(false)
        } else {
            if (data?.password !== data?.confirmPassword) {
                setError('password', { type: "custom", message: "passwords doesnot match" })
                setError('confirmPassword', { type: "custom", message: "passwords doesnot match" })
                setLoginLoading(false)
                return false;
            } else {
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/create`, data);
                console.log(res)
                if (res?.data?.success) {
                    refetch(val => !val);
                    sessionStorage.setItem('token', `Bearer ${res.data.token}`);
                    if (sessionStorage.getItem('inviteUrl')) {
                        const inviteURl = sessionStorage.getItem('inviteUrl');
                        sessionStorage.removeItem('inviteUrl')
                        navigate(inviteURl);
                    } else {
                        navigate('../home');
                    }
                    setIsLogin(true);
                    setLoginLoading(false)
                }
                setLoginLoading(false)
            }
            setLoginLoading(false)
        }
        setLoginLoading(false)
    };

    return (
        <div className="container py-16">
            {<Loader loading={loginLoading} />}
            <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                <h2 className="text-2xl uppercase font-medium mb-1">{isLogin ? 'Login' : 'Register'}</h2>
                <p className="text-gray-600 mb-6 text-sm">{isLogin ? 'Welcome! So good to have you back!' : 'Create an account to get started!'}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Username Field */}
                    <div className="space-y-2">
                        <label htmlFor="username" className="text-gray-600 text-xs mb-2 block">Username</label>
                        <input
                            {...register('username', {
                                required: {
                                    value: true,
                                    message: "this field is required"
                                }, minLength: {
                                    value: 1,
                                    message: "minimum 3 characters needed"
                                }
                            })}
                            type="text"
                            name="username"
                            id="username"
                            className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400 ${errors.username ? 'border-red-500' : ''}`}
                            placeholder="username"
                        />
                        {errors.username && <small className="text-red-500 text-xs">{errors?.username?.message}</small>}
                    </div>

                    {/* Conditional Fields for Registration */}
                    {!isLogin && (
                        <>
                            <div className="space-y-2 mt-4">
                                <label htmlFor="firstName" className="text-gray-600 text-xs mb-2 block">First Name</label>
                                <input
                                    {...register('firstName', {
                                        required: {
                                            value: true,
                                            message: "this field is required"
                                        }, minLength: {
                                            value: 1,
                                            message: "minimum 3 characters needed"
                                        }
                                    })}
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400 ${errors.firstName ? 'border-red-500' : ''}`}
                                    placeholder="First Name"
                                />
                                {errors.firstName && <small className="text-red-500 text-xs">{errors?.firstName?.message}</small>}
                            </div>
                            <div className="space-y-2 mt-4">
                                <label htmlFor="lastName" className="text-gray-600 text-xs mb-2 block">Last Name</label>
                                <input
                                    {...register('lastName', {
                                        required: {
                                            value: true,
                                            message: "this field is required"
                                        }, minLength: {
                                            value: 1,
                                            message: "minimum 3 characters needed"
                                        }
                                    })}
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400 ${errors.lastName ? 'border-red-500' : ''}`}
                                    placeholder="Last Name"
                                />
                                {errors.lastName && <small className="text-red-500 text-xs">{errors?.lastName?.message}</small>}
                            </div>
                        </>
                    )}

                    {/* Password Field */}
                    <div className="space-y-2 mt-4">
                        <label htmlFor="password" className="text-gray-600 text-xs mb-2 block">Password</label>
                        <div className="relative">
                            <input
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: "this field is required"
                                    }, minLength: {
                                        value: 1,
                                        message: "minimum 3 characters needed"
                                    }
                                })}
                                type="password"
                                name="password"
                                id="password"
                                className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400 ${errors.password ? 'border-red-500' : ''}`}
                                placeholder="***********"
                            />
                        </div>
                        {errors.password && <small className="text-red-500 text-xs">{errors?.password?.message}</small>}
                    </div>

                    {/* Confirm Password Field */}
                    {!isLogin && (
                        <div className="space-y-2 mt-4">
                            <label htmlFor="confirmPassword" className="text-gray-600 text-xs mb-2 block">Confirm Password</label>
                            <div className="relative">
                                <input
                                    {...register('confirmPassword', {
                                        required: {
                                            value: true,
                                            message: "this field is required"
                                        }, minLength: {
                                            value: 1,
                                            message: "minimum 3 characters needed"
                                        }
                                    })}
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    className={`block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                    placeholder="***********"
                                />
                            </div>
                            {errors.confirmPassword && <small className="text-red-500 text-xs">{errors?.confirmPassword?.message}</small>}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="block w-full py-2 text-center text-white bg-teal-500 border border-teal-500 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium"
                        >
                            {isLogin ? 'Login' : 'Register'}
                        </button>
                    </div>

                    {/* Toggle Link */}
                    <div className="flex gap-2 pt-5">
                        <p className="text-gray-600 text-sm">{isLogin ? "Don't have an account?" : 'Already have an account?'}</p>
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-gray-600 text-sm underline"
                        >
                            {isLogin ? 'Register here' : 'Login here'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
