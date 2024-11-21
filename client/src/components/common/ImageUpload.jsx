import { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import FormField from './FormField';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('No file selected!');
      return;
    }
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
      alert('Image uploaded successfully!');
      console.log(res.data);
    } catch (err) {
      setError('Image upload failed!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <form onSubmit={handleSubmit}>
        <FormField
          label="Choose an image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button type="submit" color="green" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Image'}
        </Button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ImageUpload;
