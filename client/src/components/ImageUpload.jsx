import { useState } from 'react';
import axios from 'axios';

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
    formData.append('image', image);
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/formdata',
        },
      });
      alert('Image uploaded successfully!');
      console.log(res.data);
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ImageUpload;
