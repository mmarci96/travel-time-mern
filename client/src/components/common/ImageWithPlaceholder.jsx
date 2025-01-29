import React, { useState } from 'react';
import LoadAnimation from './LoadAnimation';

const ImageWithPlaceholder = ({ alt, image_url }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative w-full h-[64vh] hover:ring-2 hover:ring-slate-400 overflow-hidden rounded-xl ease-in duration-300 ring-1 ring-slate-200 hover:shadow-lg ">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
                    <LoadAnimation />
                </div>
            )}

            <img
                loading="lazy"
                alt={alt}
                src={image_url}
                className={`mx-auto hover:shadow-slate-900  ease-in duration-200 rounded-lg shadow-md shadow-black mb-4
                object-cover w-full h-full  ${
                    isLoading ? 'invisible' : 'visible'
                }`}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
};

export default ImageWithPlaceholder;
