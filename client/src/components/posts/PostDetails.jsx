import { useEffect, useState } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest.js';
import PostCard from './PostCard.jsx';

const PostDetails = ({ postId }) => {
    const [postData, setPostData] = useState(null);
    const { sendRequest } = useAuthRequest();
    useEffect(() => {
        sendRequest(`/api/posts/${postId}`, 'GET').then((data) =>
            data ? setPostData(data) : null,
        );
    }, []);
    return (
        <div>{postData ? <PostCard post={postData} /> : <>Loading...</>}</div>
    );
};

export default PostDetails;
