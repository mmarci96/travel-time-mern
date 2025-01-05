
import { useState } from 'react';
import axios from 'axios';

const useImageUploader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);

    const handleFileInputChange = (e) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const uploadImage = async () => {
        if (!image) {
            setError('No image selected');
            return null;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('image-file', image);

        try {
            const res = await axios.post('/api/media/img-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data.filepath;
        } catch (err) {
            setError('Upload failed');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, uploadImage, handleFileInputChange };
};

export default useImageUploader;

