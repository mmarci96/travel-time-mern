import LoginAlert from '../components/common/LoginAlert';
import PostList from '../components/posts/PostList';
import useAuthContext from '../hooks/useAuthContext';

const Feed = () => {
    const { isAuthenticated } = useAuthContext();
    return <div>{isAuthenticated ? <PostList /> : <LoginAlert />}</div>;
};

export default Feed;
