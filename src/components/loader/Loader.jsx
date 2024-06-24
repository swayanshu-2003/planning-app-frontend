import React from 'react';
import { ClockLoader } from 'react-spinners';

const Loader = ({ loading }) => {
    return (
        <>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="p-5 bg-transparent">
                        <ClockLoader color="#36d7b7" size={50} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Loader;
