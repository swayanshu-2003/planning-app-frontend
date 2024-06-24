import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import moment from 'moment';
import MyToDo from '../components/Tabs/MyToDo';
import Collaborated from '../components/Tabs/Collaborated';
import Completed from '../components/Tabs/Completed';
import Deleted from '../components/Tabs/Deleted';
import { TbEdit } from "react-icons/tb";

import { TiTick } from "react-icons/ti";
import { FaCalendarCheck, FaShareFromSquare } from 'react-icons/fa6';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import SlideInModel from '../components/modal/Modal';
import { MdDelete } from 'react-icons/md';
import { RiFileCopy2Fill } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import MiniSideBar from '../components/sidebar/MiniSideBar';
import Loader from '../components/loader/Loader';





const types = [
    { value: "owned", name: 'Personal' },
    { value: "collab", name: 'Collaborated' },
    { value: "completed", name: 'Completed' },
    { value: "deleted", name: 'Deleted' },
]




const TodoDetails = ({ user, refetch, setRefetch }) => {
    const { uuid } = useParams();
    const [details, setDetails] = useState(null);
    const [selectedType, setselectedType] = useState('Personal');
    const [selectedTypeValue, setselectedTypeValue] = useState('owned');
    const [loading, setLoading] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);

    const [pageLoading, setPageLoading] = useState(false)

    const [editMode, setEditMode] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [openDoneModal, setOpenDoneModal] = useState(false);
    const [valType, setValType] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/auth/login');
        }
    }, [navigate]);




    useEffect(() => {
        if (uuid) {
            setPageLoading(true)
            const todoDetails = async () => {

                const res = await axiosInstance.get(`/todo/${uuid}`)
                if (res?.data?.success) {
                    setDetails(res?.data?.todo);
                    setTitle(res?.data?.todo?.title);
                    setDescription(res?.data?.todo?.description);
                    setPageLoading(false)
                }
                setPageLoading(false)
            }
            todoDetails();
        }
    }, [uuid, refetch]);



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



    useEffect(() => {

        async function isUserInvolved() {
            if (details !== null) {
                const person = await getUserData();
                const isOwner = details?.ownerId === person?.uuid;
                const isCollaborator = details?.collaborators.some(collaborator => collaborator.user.uuid === person?.uuid);

                // If the user is the owner, no need to navigate
                if (isOwner) return;

                // If the user is not the owner and the collaborators array is empty, navigate
                if (!isOwner && details?.collaborators.length === 0) {
                    navigate('/404');
                    return;
                }

                // If the user is not the owner and is not a collaborator, navigate
                if (!isCollaborator) {
                    navigate('/404');
                }
            }
        }

        isUserInvolved();
    }, [details]);



    const handleClick = async (type) => {
        setLoading(true);
        setselectedType(type?.name);
        setselectedTypeValue(type?.value);
    }



    const handleEdit = (field) => {
        setEditMode(field);
    };


    const editDb = async () => {

        const payload = {};
        if (editMode === 'title') {
            payload.title = title;
        } else if (editMode === 'description') {
            payload.description = description;
        }

        const res = await axiosInstance.patch(`/todo/edit/${details?.uuid}`, payload);


    }


    const handleSubmit = async (field) => {
        setPageLoading(true)
        await editDb();
        setEditMode(null);
        setPageLoading(false)
    };

    const handleChange = (event, field) => {
        switch (field) {
            case "title":
                setTitle(event.target.value);
                break;
            case "description":
                setDescription(event.target.value);
                break;

            default:
                break;
        }
    };

    const handleInnitiateDone = (val) => {
        setValType(val);
        setOpenDoneModal(true)
    }

    const handleDone = async () => {
        setOpenDoneModal(false)
        setPageLoading(true)
        setDoneLoading(true)
        const payload = {};
        if (valType === 'delete') {
            payload.isDeleted = true;
        } else {
            payload.done = (valType === 'put-back') ? false : true;
        }
        const res = await axiosInstance.patch(`/todo/edit/${details?.uuid}`, payload);
        if (res?.data?.success) {
            setDoneLoading(false);
            setOpenDoneModal(false);
        }
        setRefetch(prev => !prev);
        setPageLoading(false)
    }


    const confirmButton = (
        <div className="mx-auto w-[400px] bg-white rounded-lg">
            <div className='w-full flex items-center justify-between bg-gray-800 rounded-t-lg px-4'>
                <h1 className="w-auto text-white text-xl font-medium px-1 py-2">{
                    valType === 'put-back' && 'Putback Plan' || valType === 'done' && 'Complete Plan' || valType === 'delete' && 'Delete Plan'
                }
                </h1>
                <RxCross2 onClick={() => setOpenDoneModal(false)} className="text-md text-white cursor-pointer" />
            </div>
            <div className="w-full px-4 py-6">
                {doneLoading ? (
                    <div className='w-full h-30 flex items-center justify-center'>
                        <p>loading...</p>
                    </div>
                ) : (
                    <>
                        <p className="text-md text-gray-600">{valType === 'put-back' && 'Are you sure you want put this back ?' || valType === 'done' && 'Are you sure you want to mark this as Done?' || valType === 'delete' && "Are You Sure want to delete this Plan?"}   </p>
                        <div class="flex justify-end items-center gap-4 w-full mt-4">
                            <button onClick={() => setOpenDoneModal(false)} type="submit" class="px-4 py-1 bg-gray-200 text-gray-600 font-semibold rounded-md hover:bg-gray-300 focus:outline-none">Cancel</button>
                            <button onClick={handleDone} type="submit" class="px-4 py-1 bg-green-600 text-white font-semibold rounded-md hover:bg-green-400 focus:outline-none">Confirm</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )


    const [openShareModal, setOpenShareModal] = useState(false)
    const handleShare = () => {
        setOpenShareModal(true);
    }


    const [copySuccess, setCopySuccess] = useState('');
    const copyToClipboard = (link) => {
        navigator.clipboard.writeText(link).then(() => {
            setCopySuccess('Link copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };


    const shareTodoLink = (
        <div className="mx-auto  w-max bg-white rounded-lg">
            <div className='w-full flex items-center justify-between bg-gray-800 rounded-t-lg px-4'>
                <h1 className="w-auto text-white text-lg font-medium px-1 py-1">
                    Copy Invite Link
                </h1>
                <RxCross2 onClick={() => setOpenShareModal(false)} className="text-md text-white cursor-pointer" />
            </div>
            <div className="w-full px-1 lg:px-4 py-6 overflow-hidden">
                <div className="flex w-full flex-col lg:flex-row items-center justify-between border rounded-md overflow-hidden">
                    <a href={`${import.meta.env.VITE_PUBLIC_URL}/todo/invite/${details?.uuid}`} className="p-2 ml-6 hidden md:inline text-blue-950 w-full rounded truncate" target="_blank" rel="noopener noreferrer">
                        {`${import.meta.env.VITE_PUBLIC_URL}/todo/invite/${details?.uuid}`}
                    </a>
                    <button
                        onClick={() => copyToClipboard(`${import.meta.env.VITE_PUBLIC_URL}/todo/invite/${details?.uuid}`)}
                        className=" text-blue-600 border-l p-2 flex items-center justify-center bg-blue-200  text-2xl outline-none focus:outline-none"
                    >
                        <RiFileCopy2Fill />

                    </button>
                </div>
                {copySuccess && <p className="w-full text-center text-sm text-green-500">{copySuccess}</p>}
            </div>
        </div>
    )




    return (
        <>
            <div className="rounded-lg border px-5 py-3 mx-5 md:mx-20 lg:mx-40 mb-6">
                <p className="w-full text-center uppercase text-xl md:text-2xl font-semibold text-gray-800">Plan Details</p>
            </div>
            <div className="bg-gray-50 w-full min-h-screen flex flex-col justify-center md:flex-row px-2 md:px-16 lg:px-28 gap-5">
                {<Loader loading={pageLoading} />}
                {<SlideInModel open={openDoneModal} setOpen={setOpenDoneModal}>
                    {confirmButton}
                </SlideInModel>}
                {<SlideInModel open={openShareModal} setOpen={setOpenShareModal}>
                    {shareTodoLink}
                </SlideInModel>}
                <div className="bg-white p-4 md:p-6 w-full md:w-2/3 border shadow rounded-md">
                    {details &&
                        <div className='w-full'>
                            <div className="mb-4">
                                <div className="w-full flex items-center justify-between">
                                    <div className='flex items-center gap-3 md:gap-5'>
                                        {editMode === 'title' ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={title}
                                                    onChange={(e) => handleChange(e, 'title')}
                                                    className="border-none outline-none px-2 py-1 text-xl md:text-2xl font-semibold text-gray-800 capitalize w-fit"
                                                />
                                                <button
                                                    onClick={() => handleSubmit('title')}
                                                    className="hover:scale-[1.09] transition-all duration-100 text-xl md:text-2xl text-gray-800 px-1 py-1 rounded"
                                                >
                                                    <TiTick />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <h2 className="text-xl md:text-2xl font-bold text-gray-800 capitalize">
                                                    {title}
                                                </h2>
                                                {details?.ownerId === user?.uuid &&
                                                    <button
                                                        onClick={() => handleEdit('title')}
                                                        className="hover:scale-[1.09] transition-all duration-100 text-lg text-gray-500 px-1 py-1 rounded"
                                                    >
                                                        <TbEdit />
                                                    </button>
                                                }
                                            </>
                                        )}
                                    </div>

                                    {details?.ownerId === user?.uuid &&
                                        <div className='flex items-center gap-4 md:gap-8'>
                                            {details?.isDeleted ||
                                                <span onClick={() => handleInnitiateDone('delete')} className='text-red-500 text-xl md:text-2xl font-bold cursor-pointer hover:scale-[1.09] transition-all duration-100'>
                                                    <MdDelete />
                                                </span>
                                            }
                                            {details?.done ? (
                                                <span onClick={() => handleInnitiateDone('put-back')} className='text-blue-500 text-sm font-bold cursor-pointer hover:scale-[1.09] transition-all duration-100 flex gap-2'>
                                                    Put Back ?
                                                </span>
                                            ) : (
                                                <>
                                                    <span onClick={handleShare} className='text-gray-500 text-lg md:text-xl font-bold cursor-pointer hover:scale-[1.09] transition-all duration-100'>
                                                        <FaShareFromSquare />
                                                    </span>
                                                    <span onClick={() => handleInnitiateDone('done')} className='text-green-500 text-base md:text-lg font-bold cursor-pointer hover:scale-[1.09] transition-all duration-100 flex gap-2'>
                                                        <FaCalendarCheck />
                                                        <span className='text-sm'>
                                                            Done?
                                                        </span>
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    }
                                </div>
                                <p className="text-gray-500 text-xs mt-2">
                                    {moment(details.createdAt).format('MM-DD-YYYY')}
                                    <span className={`${details?.shared ? 'bg-yellow-500' : 'bg-red-500'} text-white text-xs px-2 py-1 rounded-full ml-4`}>
                                        {details.shared ? 'Collaborated' : 'Private'}
                                    </span>
                                    {details?.isOwner &&
                                        <span className={`bg-purple-600 text-white text-xs px-2 py-1 rounded-full ml-4`}>
                                            Owned
                                        </span>
                                    }
                                    {details?.isDeleted &&
                                        <span className={`bg-blue-500 text-white text-xs px-2 py-1 rounded-full ml-4`}>
                                            Deleted
                                        </span>
                                    }
                                    {details?.done &&
                                        <span className={`bg-green-500 text-white text-xs px-2 py-1 rounded-full ml-4`}>
                                            Completed
                                        </span>
                                    }
                                </p>
                            </div>
                            <div className="mb-4 space-y-2 w-full mt-10">
                                {editMode === "description" ? (
                                    <>
                                        <textarea
                                            value={description}
                                            onChange={(e) => handleChange(e, "description")}
                                            className="px-2 py-1 rounded w-full h-max border text-sm leading-relaxed text-gray-500 text-pretty"
                                            rows={Math.max(3, Math.ceil(description.length / 90))} // Adjust rows dynamically
                                        />
                                        <button
                                            onClick={() => handleSubmit('description')}
                                            className="w-full items-center flex justify-end text-2xl px-1 py-1 rounded"
                                        >
                                            <IoMdCheckboxOutline className='hover:scale-[1.09] transition-all duration-100 text-sm text-gray-500' />
                                            <span className='text-sm text-gray-500 ml-1'>
                                                Update
                                            </span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm leading-relaxed text-gray-500 text-pretty">
                                            {description}
                                            {details?.ownerId === user?.uuid &&
                                                <TbEdit onClick={() => handleEdit('description')} className='inline ml-4 hover:scale-[1.09] transition-all duration-100 text-lg text-gray-500 cursor-pointer' />}
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center w-full justify-between mt-10">
                                <div className="flex flex-col items-start space-x-2 gap-2">
                                    <span className="text-gray-500 text-xs">Created by</span>
                                    <div className="flex items-center -space-x-1 border rounded-md w-fit px-2 py-1 gap-2">
                                        <img className="w-8 h-8 rounded-full border-2 border-gray-400" src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1716163200&semt=ais_user" alt="User" />
                                        <span className="text-gray-700 text-sm">{`${details?.owner?.firstName} ${details?.owner?.lastName}`} </span>
                                    </div>
                                </div>
                                {details?.collaborators?.length > 0 &&
                                    <div className="flex flex-col items-start space-x-2 gap-2">
                                        <span className="text-gray-500 text-xs">Shared with</span>
                                        <div className="flex -space-x-1">
                                            {details?.collaborators?.map((person, index) =>
                                                <div key={index} className="relative group inline-block overflow-visible cursor-pointer">
                                                    <img className="w-8 h-8 rounded-full border-2 border-gray-400" src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1716163200&semt=ais_user" alt="User" />
                                                    <div className="overflow-visible opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute min-w-fit mt-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg py-1 z-10">
                                                        <p className="px-4 py-0 text-xs capitalize min-w-fit">{`${person?.user?.firstName} ${person?.user?.lastName}`}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                }
                            </div>
                            <MiniSideBar details={details} refetch={refetch} setRefetch={setRefetch} />
                        </div>
                    }
                </div>
                <div className="w-full md:w-1/4 h-30 bg-white border shadow rounded-md mt-5 md:mt-0">
                    <p className='text-blue-950 text-lg w-full px-3 py-2 font-semibold bg-green-100 border-b'>Other Plans</p>
                    <div className="mx-3 group relative cursor-pointer py-1 border-b">
                        <div className="flex items-center justify-between space-x-5">
                            <a className={`menu-hover my-2 text-base font-medium text-gray-400 lg:mx-4`}>
                                {selectedType || 'Choose Type'}
                            </a>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" className="h-4 w-4 text-gray-400 font-semibold">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                        </div>
                        <div className="invisible absolute z-50 flex w-full flex-col rounded-lg bg-white py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
                            {types?.map((type, index) =>
                                <p key={index} onClick={() => handleClick(type)} className="block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                                    {type?.name}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="w-full px-2 py-3 overflow-y-auto">
                        {selectedTypeValue === 'owned' && <MyToDo refetch={refetch} />}
                        {selectedTypeValue === 'collab' && <Collaborated refetch={refetch} />}
                        {selectedTypeValue === 'completed' && <Completed refetch={refetch} />}
                        {selectedTypeValue === 'deleted' && <Deleted refetch={refetch} />}
                    </div>
                </div>
            </div>
        </>


    );
}

export default TodoDetails;



