import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { IoGlobeOutline } from 'react-icons/io5'
import { MdOutlineAttachEmail } from 'react-icons/md'

const Footer = () => {
    return (
        <div className="mt-16 w-full flex items-center justify-center dark:bg-gray-900">


            <div
                className="relative w-full max-w-2xl my-8 md:my-12 flex flex-col items-start space-y-2 sm:flex-row sm:space-y-0 sm:space-x- px-4 py-8 border-2 border-dashed border-gray-400 dark:border-gray-400 shadow-lg rounded-lg">

                <span className="absolute text-xs font-medium top-0 left-0 rounded-br-lg rounded-tl-lg px-2 py-1 bg-primary-100 dark:bg-gray-900 dark:text-gray-300 border-gray-400 dark:border-gray-400 border-b-2 border-r-2 border-dashed ">
                    Designed and Developed by
                </span>
                <div className="w-full flex flex-col md:flex-row items-start ">

                    <div className="w-full md:w-1/5 flex justify-center sm:justify-start sm:w-auto">
                        <img className="object-cover w-24 h-24 mt-3 mr-3 rounded-full" src="https://avatars.githubusercontent.com/u/62717967?v=4" />
                    </div>

                    <div className="w-full md:w-4/5  sm:w-auto flex flex-col items-center sm:items-start justify-center  mt-2">

                        <p className="font-display mb-2 text-2xl font-semibold dark:text-gray-200" itemprop="author">
                            Swayanshu Panda
                        </p>

                        <div className="mb-4 md:text-xs text-gray-400 text-justify">
                            <p>A newly skilled full stack developer with extensive experience in React, Next.js, Node.js, databases. Adept at building robust, scalable web applications, leveraging modern frameworks and cloud infrastructure to deliver high-performance solutions. Proficient in both front-end and back-end development, with a strong focus on optimizing user experiences and ensuring seamless integration across platforms.</p>
                        </div>

                        <div className="flex gap-6 mt-2">

                            <a title="github url" href="https://github.com/swayanshu-2003" target="_blank"
                                rel="noopener noreferrer">

                                <FaGithub className='text-2xl text-white' />

                            </a>

                            <a title="website url" href="https://www.linkedin.com/in/swayanshupanda/" target="_blank" rel="noopener noreferrer">

                                <FaLinkedin className='text-2xl text-white' />

                            </a>
                            <a title="website url" href="https://swayanshu-2003.github.io/portfolio" target="_blank" rel="noopener noreferrer">

                                <IoGlobeOutline className='text-2xl text-white' />

                            </a>
                            <a title="website url" href="https://swayanshu-2003.github.io/portfolio" target="_blank" rel="noopener noreferrer">

                                <MdOutlineAttachEmail className='text-2xl text-white' />

                            </a>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer