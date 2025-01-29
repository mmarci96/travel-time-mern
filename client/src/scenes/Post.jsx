import { useParams } from 'react-router-dom';
import PostDetails from '../components/posts/PostDetails.jsx';
import CommentList from '../components/comments/CommentList.jsx';
import useAuthContext from '../hooks/useAuthContext.js';
import LoginAlert from '../components/common/LoginAlert.jsx';

const Post = () => {
    const { postId } = useParams();
    const { isAuthenticated } = useAuthContext();

    return (
        isAuthenticated ?
        <div className='flex flex-wrap justify-center m-auto min-h-[80vh]'>
            <PostDetails postId={postId} />
            <CommentList postId={postId} />
        </div> : <LoginAlert />
    );
};

export default Post;
