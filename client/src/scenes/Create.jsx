import useAuthContext from '../hooks/useAuthContext.js';
import LoginAlert from '../components/common/LoginAlert.jsx';
import PostForm from '../components/posts/PostForm.jsx';

const Create = () => {
    const { isAuthenticated } = useAuthContext();
    return isAuthenticated ? <PostForm /> : <LoginAlert />;
};

export default Create;
