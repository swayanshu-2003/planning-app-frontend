import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import Todo from '../cards/Todo';
import Loader from '../loader/Loader';

const Deleted = ({ refetch }) => {
    const [todos, setTodos] = useState([]);
    const [pageLoading, setPageLoading] = useState(false)

    const fetchData = async () => {

        const res = await axiosInstance.get('/todos?type=deleted');
        if (res?.data?.success) {
            setTodos(res?.data?.todos)
        }

    }
    useEffect(() => {
        setPageLoading(true)
        fetchData();
        setPageLoading(false)
    }, [refetch])
    return (
        <div className="h-max px-2">
            <Loader loading={pageLoading} />
            <div className="w-full mb-6">
                <p className="w-full text-md font-semibold text-start">Deleted <span className='text-gray-500 ml-2 text-sm'>{todos?.length}</span></p>
                <div className='w-full h-1 bg-blue-600 rounded-lg mt-2'></div>
            </div>
            {todos.length > 0 ? (todos?.map((todo, index) =>
                <Todo type={"deleted"} todo={todo} key={index} />
            )) : (
                <p className='text-sm text-gray-400 text-center'>Nothing Here</p>
            )}


        </div>
    )
}

export default Deleted