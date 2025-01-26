import React, { useState } from 'react';
import LoadAnimation from './LoadAnimation';

const ImageWithPlaceholder = ({ alt, image_url }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative">
            {/* Show placeholder while loading */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
                    <LoadAnimation />
                </div>
            )}

            {/* Image */}
            <img
                loading="lazy"
                alt={alt}
                src={image_url}
                className={`hover:shadow-lg mx-auto hover:shadow-slate-900 ease-in duration-200 rounded-lg shadow-md shadow-black mb-4
                min-w-[320px] min-h-[360px] max-h-[80vh] max-w-[92vw] ${
                    isLoading ? 'invisible' : 'visible'
                }`}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
};

export default ImageWithPlaceholder;
