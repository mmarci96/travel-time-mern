import { useParams } from 'react-router-dom';
import PostDetails from '../components/posts/PostDetails.jsx';
import CommentList from '../components/comments/CommentList.jsx';
import CreateComment from '../components/comments/CreateComment.jsx';
import { useState } from 'react';

const Post = () => {
    const { postId } = useParams();
    const [comment, setComment] = useState(null);

    return (
        <div>
            <PostDetails postId={postId} />
            <CommentList postId={postId} refresh={comment} />
            <CreateComment postId={postId} onComment={setComment} />
        </div>
    );
};

export default Post;
