import CreatePost from '../components/posts/CreatePost.jsx';
import useAuthContext from '../hooks/useAuthContext.js';
import LoginAlert from '../components/common/LoginAlert.jsx';

const Create = () => {
    const { token } = useAuthContext();
    return token ? <CreatePost /> : <LoginAlert />;
};

export default Create;
