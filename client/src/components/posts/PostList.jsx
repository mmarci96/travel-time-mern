import useAuthRequest from '../../hooks/useAuthRequest.js';
import { useContext, useEffect, useState } from 'react';
import PostCard from './PostCard.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import LoginAlert from '../common/LoginAlert.jsx';
import LoadAnimation from '../common/LoadAnimation.jsx';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    const { loading, error, sendRequest } = useAuthRequest();
    useEffect(() => {
        sendRequest('/api/posts', 'GET').then((data) =>
            data ? setPosts(data.posts) : setPosts([]),
        );
    }, []);

    return (
        <div>
            {user ? (
                loading ? (
                    <LoadAnimation />
                ) : (
                    <ul>
                        {posts?.length > 0 &&
                            posts.map((post) => (
                                <li key={post._id}>
                                    <PostCard post={post} />
                                </li>
                            ))}
                    </ul>
                )
            ) : (
                <LoginAlert />
            )}
        </div>
    );
};

export default PostList;
