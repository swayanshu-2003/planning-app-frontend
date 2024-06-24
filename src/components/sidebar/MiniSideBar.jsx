import moment from 'moment'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../../utils/axiosInstance';

const MiniSideBar = ({ details, refetch, setRefetch }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        const res = await axiosInstance.post(`/todo/comment/${details?.uuid}`, data);
        // console.log(res)
        if (res?.data?.message) {
            setRefetch();
            setLoading(false);
        }
    }

    return (
        <div className=" bg-white rounded-lg border p-2 my-4 mx-6 mt-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full px-3 my-2">

                    <textarea
                        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-300 placeholder:text-sm focus:outline-none focus:bg-white"
                        name="content" {...register('content', {
                            required: {
                                value: true,
                                message: "this field is required"
                            }, minLength: {
                                value: 3,
                                message: "minimum 3 characters needed"
                            }
                        })} placeholder='Type Your Comment'></textarea>
                    {formState.errors?.content && <small className='text-red-500 text-xs'>{formState.errors?.content?.message}</small>}
                </div>

                <div className="w-full flex justify-end px-3">
                    <input type='submit' className={`px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 ${loading ? 'cursor-wait bg-gray-300 text-gray-600' : 'cursor-pointer'}`} value={loading ? 'submitting... ' : `Post Comment`} />
                </div>
            </form>
            <h3 className="font-bold text-lg w-full border-b ">Discussions</h3>
            {details?.comments?.length > 0 &&
                details?.comments?.map((comment, index) =>
                    <div key={index} className="flex flex-col">
                        <div className="border rounded-md px-3 py-2 ml-3 my-3">
                            <div className="flex items-center justify-between w-full ">
                                <div className="w-max flex gap-3 items-start ">
                                    <img src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1716163200&semt=ais_user" className="object-cover w-8 h-8 rounded-full border-2 border-emerald-400  shadow-emerald-400" />
                                    <h3 className="font-semibold text-xs capitalize">
                                        {`${comment?.author?.firstName} ${comment?.author?.lastName}`}
                                    </h3>
                                </div>
                                <p className="text-gray-500 text-xs ">
                                    {moment(comment?.createdAt).format('MM-DD-YYYY')}</p>
                            </div>
                            <p className="text-gray-600 -mt-3 text-sm ml-11">
                                {comment?.content}
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default MiniSideBar