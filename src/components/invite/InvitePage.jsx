import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import Loader from '../loader/Loader';

const InvitePage = () => {
    const navigate = useNavigate();
    const { uuid } = useParams();
    const [details, setDetails] = useState({});
    const [loading, setloading] = useState(false)
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/auth/login');
        }
    }, [navigate]);




    const getUserData = async () => {
        if (!sessionStorage.getItem('token')) {
            return;
        }
        const res = await axiosInstance.get('/user');
        console.log(res)
        try {

            if (res?.data?.success) {
                return res?.data?.user;
            }

        } catch (error) {
            console.log(error)
        }

    }


    async function isUserInvolved(data) {
        if (data !== null) {
            const udata = await getUserData();
            if (udata !== undefined) {
                const isOwner = details?.ownerId === udata?.uuid;
                const isCollaborator = data?.collaborators.some(collaborator => collaborator.user.uuid === udata?.uuid);
                if (isOwner) return false;
                if (isCollaborator) return false;
            }
        }
    }


    useEffect(() => {
        setloading(true)
        if (uuid) {
            const todoDetails = async () => {
                const res = await axiosInstance.get(`/todo/${uuid}`)
                console.log(res)
                if (res?.data?.success) {
                    if (await isUserInvolved(res?.data?.todo) === false) {
                        navigate(`/todo/${uuid}`);
                    } else {
                        setDetails(res?.data?.todo);
                        console.log(details)
                    }
                }

                setloading(false)
            }
            todoDetails();
        }
    }, [uuid]);


    const handleAcceptInvite = async () => {
        setloading(true)
        const res = await axiosInstance.get(`/todo/${details?.uuid}/collab`);
        console.log(res)
        if (res?.data?.success) {
            navigate(`/todo/${details?.uuid}`)
        }
        setloading(false)
    }



    return (
        <div className="w-full flex flex-col items-center justify-center">
            <Loader loading={loading} />

            <div className="w-full flex items-center gap-3 flex-col">
                <img className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-lg" src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1716163200&semt=ais_user" alt="User" />
                <h2 className="text-xl font-normal text-center text-gray-800 mt-4">
                    <span className='block font-bold text-2xl mb-4 capitalize'>{details?.owner?.firstName}</span> is inviting you to collaborate with this Plan!
                </h2>
            </div>

            <section className="container mx-auto p-4 md:p-8 antialiased">
                <article className="flex flex-wrap md:flex-nowrap shadow-lg mx-auto max-w-3xl group transform duration-500 hover:-translate-y-1 border rounded-lg p-4">
                    <div className="w-full">
                        <div className="p-4 md:p-6 pb-10">
                            <h1 className="capitalize text-2xl font-semibold text-gray-800 mt-4">
                                {details?.title}
                            </h1>
                            <p className="text-gray-500 ml-1 text-xs md:text-sm mt-2 mb-4">
                                {moment(details?.createdDate).format('DD-MM-YYYY')}
                            </p>
                            <p className="text-md text-gray-500 mt-2 leading-relaxed overflow-hidden text-ellipsis">
                                {details?.description}
                            </p>
                        </div>

                        <div className="sm:flex sm:justify-between items-end w-full ">
                            {details?.collaborators?.length > 0 && (
                                <div className="flex flex-col items-start space-x-2 gap-2 w-max">
                                    <span className="text-gray-500 text-xs">Shared with</span>
                                    <div className="flex gap-2 flex-wrap">
                                        {details?.collaborators?.map((person, index) => (
                                            <div key={index} className="flex items-center border rounded-md w-fit px-2 py-1 gap-2 shadow-sm bg-white">
                                                <img className="w-8 h-8 rounded-full border-2 border-gray-300" src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1716163200&semt=ais_user" alt="User" />
                                                <span className="text-gray-700 text-sm">{`${person?.user?.firstName}`}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <button onClick={handleAcceptInvite} className="mt-3 sm:mt-0 px-4 h-10 bg-purple-700 hover:bg-purple-600 font-semibold text-white md:text-md rounded-lg shadow-md">
                                Accept Invite
                            </button>
                        </div>
                    </div>
                </article>
            </section>
        </div>


    )
}

export default InvitePage