import { useParams } from 'react-router-dom';
import PostDetails from '../components/posts/PostDetails.jsx';
import CommentList from '../components/comments/CommentList.jsx';
import CreateComment from '../components/comments/CreateComment.jsx';
import { useState } from 'react';
import useAuthContext from '../hooks/useAuthContext.js';
import LoginAlert from '../components/common/LoginAlert.jsx';

const Post = () => {
    const [comment, setComment] = useState(null);
    const { postId } = useParams();
    const { isAuthenticated } = useAuthContext();

    return (
        isAuthenticated ?
        <div>
            <PostDetails postId={postId} />
            <CommentList postId={postId} refresh={comment} />
            <CreateComment postId={postId} onComment={setComment} />
        </div> : <LoginAlert />
    );
};

export default Post;
