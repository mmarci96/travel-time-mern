import { useEffect, useState } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest.js';
import PostCard from './PostCard.jsx';

const PostDetails = ({ postId }) => {
  const [postData, setPostData] = useState(null);
  const { sendRequest } = useAuthRequest(`/api/posts/${postId}`, 'GET');
  useEffect(() => {
    sendRequest().then((data) => (data ? setPostData(data) : null));
  }, []);
  return <div>{postData ? <PostCard post={postData} /> : <>Loading...</>}</div>;
};

export default PostDetails;
