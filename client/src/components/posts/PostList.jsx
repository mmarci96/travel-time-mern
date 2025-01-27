import useAuthRequest from '../../hooks/useAuthRequest.js';
import { useContext, useEffect, useState } from 'react';
import PostCard from './PostCard.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import LoginAlert from '../common/LoginAlert.jsx';
import LoadAnimation from '../common/LoadAnimation.jsx';
import Button from '../common/Button.jsx';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [filters, setFilters] = useState(null)
    const { user } = useContext(AuthContext);

    const { loading, error, sendRequest } = useAuthRequest();
    useEffect(() => {
        sendRequest(`/api/posts/${filters ? filters : ''}`, 'GET').then((data) =>
            data ? setPosts(data.posts) : setPosts([]),
        );
    }, [filters]);

    return (
        <div>
            {user ? (
                loading ? (
                    <LoadAnimation />
                ) : (
                    <div>
                    <Button
                        children={"Show following"}
                        color='green'
                        onClick={() => setFilters('following')}
                    />
                    <ul>
                        {posts?.length > 0 &&
                            posts.map((post) => (
                                <li key={post.id}>
                                    <PostCard post={post} />
                                </li>
                            ))}
                    </ul>
                    </div>
                )
            ) : (
                <LoginAlert />
            )}
        </div>
    );
};

export default PostList;
