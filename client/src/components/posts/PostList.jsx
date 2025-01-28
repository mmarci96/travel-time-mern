import React, { useState, useEffect } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest.js';
import useAuthContext from '../../hooks/useAuthContext.js';
import LoadAnimation from '../common/LoadAnimation.jsx';
import PostCard from './PostCard.jsx';
import LoginAlert from '../common/LoginAlert.jsx';
import Button from '../common/Button.jsx';
import PostControls from './PostControls.jsx';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(8);
    const [sort, setSort] = useState('created_at');
    const [asc, setAsc] = useState(false);
    const [filters, setFilters] = useState(null);
    const [showControls, setShowControls] = useState(false);
    const [deleteCount, setDeleteCount] = useState(0);
    const { token, currentUserId } = useAuthContext();

    const { sendRequest } = useAuthRequest();

    useEffect(() => {
        let url = `/api/posts?page=${1}&limit=${limit}&search=${search}&sort=${sort}&asc=${asc}`;
        if (filters) {
            url = '/api/posts/following';
        }
        sendRequest(url, 'GET').then((data) =>
            data ? setPosts(data.posts) : setPosts([]),
        );
    }, [filters, limit, sort, asc, search, deleteCount]);

    const toggleSortOrder = () => {
        setAsc(!asc);
    };

    const handleNextPage = () => setLimit((prev) => prev + 5);
    const toggleControls = () => setShowControls(!showControls);

    return (
        <div className="flex flex-col items-center">
            {token ? (
                showControls ? (
                    <PostControls
                        search={search}
                        setSearch={setSearch}
                        sort={sort}
                        setSort={setSort}
                        asc={asc}
                        toggleSortOrder={toggleSortOrder}
                        filters={filters}
                        setFilters={setFilters}
                        toggleControls={toggleControls}
                    />
                ) : (
                    <button
                        onClick={toggleControls}
                        className="p-1 px-2 bg-cyan-500 text-white hover:bg-cyan-600 transition duration-300 ease-in-out mx-auto mt-4 rounded-xl"
                    >
                        Show controls
                    </button>
                )
            ) : (
                <LoginAlert />
            )}

            <ul>
                {posts?.length > 0 ? (
                    posts.map((post) => (
                        <li key={post.id}>
                            <PostCard
                                post={post}
                                currentUserId={currentUserId}
                                onDeleteCount={setDeleteCount}
                            />
                        </li>
                    ))
                ) : (
                    <LoadAnimation />
                )}
            </ul>

            <div className="pagination-controls">
                <Button onClick={handleNextPage} children="More" />
            </div>
        </div>
    );
};

export default PostList;
