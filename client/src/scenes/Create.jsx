import useAuthContext from '../hooks/useAuthContext.js';
import LoginAlert from '../components/common/LoginAlert.jsx';
import PostForm from '../components/posts/PostForm.jsx';

const Create = () => {
    const { token } = useAuthContext();
    return token ? <PostForm /> : <LoginAlert />;
};

export default Create;
