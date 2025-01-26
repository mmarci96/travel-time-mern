import useAuthRequest from '../../hooks/useAuthRequest.js';
import { useContext, useEffect, useState } from 'react';
import PostCard from './PostCard.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import LoginAlert from '../common/LoginAlert.jsx';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const { user, logout } = useContext(AuthContext);

    const { loading, error, sendRequest } = useAuthRequest();
    useEffect(() => {
        sendRequest('/api/posts', 'GET').then((data) =>
            data ? setPosts(data.posts) : setPosts([]),
        );
    }, []);

    return (
        <div>
            {user ? (
                <ul>
                    PostList
                    {posts?.length > 0 &&
                        posts.map((post) => (
                            <li key={post._id}>
                                <PostCard post={post} />
                            </li>
                        ))}
                </ul>
            ) : (
                <LoginAlert />
            )}
        </div>
    );
};

export default PostList;
