import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Todo = ({ type = "own", todo }) => {
    const [color, setColor] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        switch (type) {
            case "own":
                setColor('bg-red-100 border-red-500');
                break;
            case "collab":
                setColor('bg-yellow-100 border-yellow-500');
                break;
            case "completed":
                setColor('bg-green-100 border-green-500');
                break;
            case "deleted":
                setColor('bg-blue-100 border-blue-500');
                break;
            default:
                setColor('bg-red-100 border-red-500');
                break;
        }
    }, [type]);

    return (
        <div onClick={() => navigate(`/todo/${todo.uuid}`)} className="w-full mt-2 cursor-pointer h-20">
            <div className={`w-full border border-gray-200 shadow-lg rounded-lg p-4 text-sm flex items-start transition-transform transform hover:scale-[1.01]`}>
                <div className={`w-4 h-4 rounded-full border ${color} mr-4`}></div>
                <div className="flex-1 -mt-1 overflow-hidden">
                    <p className="font-semibold text-gray-800 capitalize truncate">{todo?.title}</p>
                    <p className="text-gray-500 mt-1 truncate">{todo?.description}</p>
                </div>
            </div>
        </div>
    );
}

export default Todo;
