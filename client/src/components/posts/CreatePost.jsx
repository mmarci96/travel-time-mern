import useImageUploader from '../../hooks/useImageUploader.js';
import useAuthRequest from '../../hooks/useAuthRequest.js';
import { useState } from 'react';
import FormField from '../common/FormField.jsx';
import Button from '../common/Button.jsx';

const CreatePost = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        location: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const { uploadImage, handleFileInputChange } = useImageUploader();
    const { sendRequest } = useAuthRequest();
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const imageData = await uploadImage();
        console.log(imageData)
        if (!imageData) {
            setError('Error uploading image, something unexpected has happenned!');
            setLoading(false);
            return;
        }
        formData.image_url = imageData.imageUrl;
        console.log(formData);
        const res = sendRequest('/api/posts', 'POST', formData);
        if (!res) {
            setError('Error creating post');
            setLoading(false);
            return;
        }
        setLoading(false);
        console.log("Post created successfully!")
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col mx-4 border-2 border-gray-200"
            >
                <FormField
                    label="Title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <FormField
                    label="Description"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <FormField
                    label="Location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <FormField
                    label="Image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                />
                <Button type="submit">
                    {loading ? 'Uploading...' : 'Create Post'}
                </Button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default CreatePost;
