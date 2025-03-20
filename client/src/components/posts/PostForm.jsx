import UniversalForm from '../common/UniversalForm';
import useImageUploader from '../../hooks/useImageUploader';
import useAuthRequest from '../../hooks/useAuthRequest';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostForm = ({ postId }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        location: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { uploadImage, handleFileInputChange } = useImageUploader();
    const { sendRequest } = useAuthRequest();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const imageData = await uploadImage();
            if (!imageData) {
                setError('Error uploading image!');
                setLoading(false);
                return;
            }
            formData.image_url = imageData.imageUrl;
            const payload = {
                ...formData,
                image_url: imageData ? imageData.imageUrl : formData.image_url,
            };

            let response;
            if (postId) {
                payload['image_url'] = imageUrl;
                response = await sendRequest(
                    `/api/posts/${postId}`,
                    'PATCH',
                    payload,
                );
            } else {
                const location = await sendRequest(`/api/locations/cityName/${formData.location}`, "GET");

                response = await sendRequest('/api/posts', 'POST', { ...formData, location_id:location.location.city_id });
                const id = response.id;

                id && navigate(`/post/${id}`);
            }

            if (!response || response.error) {
                setError(
                    postId ? 'Error updating post' : 'Error creating post',
                );
            } else {
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (postId) {
            const fetchPostById = async () => {
                try {
                    const response = await sendRequest(
                        `/api/posts/${postId}`,
                        'GET',
                    );
                    if (response) {
                        const { title, description, image_url, location } =
                            response;
                        setImageUrl(image_url);
                        setFormData({
                            title,
                            description,
                            image_url: '',
                            location,
                        });
                    }
                } catch (err) {
                    console.error(err);
                    setError('Error fetching post details.');
                }
            };
            fetchPostById();
        }
    }, []);

    return (
        <div>
            {postId && (
                <div className="text-xl mt-2 -mb-4 mx-auto w-screen flex flex-col items-center font-extrabold ">
                    Editing post
                </div>
            )}

            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Post"
                    className="w-[320px] h-[240px] mt-4 -mb-4 rounded-lg shadow-md mx-auto"
                />
            )}

            <UniversalForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onFileInputChange={handleFileInputChange}
                error={error}
                loading={loading}
            />
        </div>
    );
};

export default PostForm;
