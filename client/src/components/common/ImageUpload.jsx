import { useState } from 'react';
import axios from 'axios';
import Button from './Button'; // Import the reusable Button component
import FormField from './FormField'; // Import the reusable FormField component

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
          'Content-Type': 'multipart/form-data', // Fixed content type to match the correct one
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
        {/* Use FormField for file input */}
        <FormField
          label="Choose an image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {/* Use Button for submitting the form */}
        <Button type="submit" color="green" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Image'}
        </Button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ImageUpload;
