import { useParams } from 'react-router-dom';
import PostForm from '../components/posts/PostForm';
import useAuthContext from '../hooks/useAuthContext';
import LoginAlert from '../components/common/LoginAlert';

const PostEditor = () => {
    const { postId } = useParams();
    const { isAuthenticated } = useAuthContext();
    return isAuthenticated ? <PostForm postId={postId} /> : <LoginAlert />;
};

export default PostEditor;
