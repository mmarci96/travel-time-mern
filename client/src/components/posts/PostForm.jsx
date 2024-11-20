import FormField from '../common/FormField';
import Button from '../common/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from '../common/Popup';
import Accepted from '../common/Accepted';

const PostForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    image_url: '',
    author_id: '673cac7ad548ec71fee5899c',
  });
  const [isAccepted, setIsAccepted] = useState(false);
  const handleFileChange = (event) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image-file', image);
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/media/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      setError('Image upload failed!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { filename } = await uploadImage();

      formData.image_url = filename;

      console.log(formData);
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        setError('Post creation failed!');
        return;
      }
      console.log(res);
      setIsAccepted(true);
      
    } catch (err) {
      setError('Post creation failed!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      CreatePost
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
          onChange={handleFileChange}
        />
        <Button type="submit">
          {loading ? 'Uploading...' : 'Create Post'}
        </Button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {isAccepted && (
        <Popup>
          <Accepted>
            <p className="mt-2">Post created successfully!</p>
            <Button
              color="green"
              onClick={() => navigate('/feed')}
              className="mt-4"
            >
              Back
            </Button>
          </Accepted>
        </Popup>
      )}
    </div>
  );
};

export default PostForm;
