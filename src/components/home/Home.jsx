import React, { useEffect } from 'react'
import MyToDo from '../Tabs/MyToDo'
import Collaborated from '../Tabs/Collaborated'
import Completed from '../Tabs/Completed'
import Deleted from '../Tabs/Deleted'
import { useNavigate } from 'react-router-dom'

const Home = ({ user, refetch }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/auth/login');
        }
    }, [navigate]);
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  items-start justify-center gap-4 px-2 md:px-10 lg:px-32">
            <MyToDo refetch={refetch} />
            <Collaborated refetch={refetch} />
            <Completed refetch={refetch} />
            <Deleted refetch={refetch} />
        </div>
    )
}

export default Home