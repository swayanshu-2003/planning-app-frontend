import React, { useState } from 'react';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import SlideInModel from '../modal/Modal';
import { RxCross2 } from 'react-icons/rx';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../utils/axiosInstance';
import Loader from '../loader/Loader';

const StickyPlusButton = ({ setRefetch }) => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false)

    const methods = useForm();
    const { register, handleSubmit, formState: { errors } } = methods;

    const onSubmit = async (data) => {

        setLoading(true);
        setOpenModal(false)
        const payload = {
            ...data,
            done: false,
        }
        const res = await axiosInstance.post('/todo/create', payload);
        setRefetch(prev => !prev);
        setLoading(false);
        setOpenModal(false);
        methods.reset();
    }



    const handleClick = () => {
        setOpenModal(!openModal);
    }

    const renderForm = (
        <div className="mx-auto w-[600px] bg-white rounded-lg">
            <div className='w-full flex items-center justify-between bg-gray-800 rounded-t-lg px-4'>
                <h1 className="w-auto text-white text-xl font-medium px-1 py-2">Create Plan</h1>
                <RxCross2 onClick={() => setOpenModal(false)} className="text-md text-white cursor-pointer" />
            </div>
            {loading ? (
                <Loader loading={loading} />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-col items-center gap-2 px-12 py-6">
                        <div class="mb-4 w-full">
                            <label for="title" class="block text-gray-500 font-medium mb-2">Title</label>
                            <input type="text" id="name" name="title" {...register('title', {
                                required: {
                                    value: true,
                                    message: "this field is required"
                                }, minLength: {
                                    value: 3,
                                    message: "minimum 3 characters needed"
                                }
                            })}
                                class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400 placeholder:text-sm placeholder:text-gray-400" placeholder='Enter the title of the plan' />
                            {methods?.formState?.errors?.title && <small className='text-xs text-red-500'>{methods?.formState?.errors?.title?.message}</small>}
                        </div>

                        <div class="mb-4 w-full">
                            <label for="description" class="block text-gray-500 font-medium mb-2">Description</label>
                            <textarea id="message" name="description" {...register('description', {
                                required: {
                                    value: true,
                                    message: "this field is required"
                                }, minLength: {
                                    value: 3,
                                    message: "minimum 3 characters needed"
                                }
                            })}
                                class="border border-gray-400 p-2 w-full placeholder:text-sm placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-blue-400" rows="5" placeholder='Describe about it'></textarea>
                            {methods?.formState?.errors?.description && <small className='text-xs text-red-500'>{methods?.formState?.errors?.description?.message}</small>}
                        </div>
                        <div class="flex justify-end w-full">
                            <button type="submit" class="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none">Submit</button>
                        </div>
                    </div >
                </form>
            )}
        </div >
    );


    return (
        <>
            {<SlideInModel open={openModal} setOpen={setOpenModal} >
                {renderForm}
            </SlideInModel>}
            <div className="fixed bottom-4 right-1 lg:right-4 z-10">
                <p onClick={handleClick} className=" w-auto text-center px-4 py-2 text-white transition-all rounded-full flex items-center gap-2 shadow-md sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-b dark:shadow-blue-900 shadow-blue-200 hover:shadow-2xl hover:shadow-blue-400 hover:-tranneutral-y-px cursor-pointer">
                    <MdOutlineCreateNewFolder className='text-2xl' />

                    <span>Create Plan</span>
                </p>
            </div>
        </>
    );
}

export default StickyPlusButton;
