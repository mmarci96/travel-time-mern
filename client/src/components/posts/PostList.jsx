import React, { useState, useEffect } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest.js';
import useAuthContext from '../../hooks/useAuthContext.js';
import PostCard from './PostCard.jsx';
import LoginAlert from '../common/LoginAlert.jsx';
import Button from '../common/Button.jsx';
import FormField from '../common/FormField.jsx';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(8);
    const [sort, setSort] = useState('created_at');
    const [asc, setAsc] = useState(false);
    const [filters, setFilters] = useState(null);
    const [showControls, setShowControls] = useState(true);
    const { token } = useAuthContext();

    const { sendRequest } = useAuthRequest();

    useEffect(() => {
        let url = `/api/posts?page=${1}&limit=${limit}&search=${search}&sort=${sort}&asc=${asc}`;
        if (filters) {
            url = '/api/posts/following';
        }
        sendRequest(url, 'GET').then((data) =>
            data ? setPosts(data.posts) : setPosts([]),
        );
    }, [filters, limit, sort, asc, search]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const toggleSortOrder = () => {
        setAsc(!asc);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handleNextPage = () => setLimit((prev) => prev + 5);
    const toggleControls = () => setShowControls(!showControls);

    return (
        <div className="flex flex-col items-center">
            {token ? (
                showControls ? (
                    <div>
                        <div className="search-bar flex w-full justify-around relative">
                            <FormField
                                type="text"
                                placeholder="Search posts..."
                                value={search}
                                onChange={handleSearchChange}
                                className={
                                    'w-[94vw] p-2 m-2 rounded-xl mx-4 px-4'
                                }
                            />
                            <button
                                onClick={() => setSearch('')}
                                className="absolute p-1 px-2 bg-cyan-400 hover:bg-cyan-600 right-[4vw] top-5 rounded-lg"
                            >
                                Clear
                            </button>
                        </div>

                        <div className="controls flex w-[100vw] justify-evenly">
                            <select
                                className="p-2 my-auto rounded-md ml-6"
                                value={sort}
                                onChange={handleSortChange}
                            >
                                <option value="created_at">
                                    Sort by Created At
                                </option>
                                <option value="title">Sort by Title</option>
                                <option value="location">
                                    Sort by Location
                                </option>
                            </select>
                            <Button
                                onClick={toggleSortOrder}
                                children={
                                    asc ? 'Sort Descending' : 'Sort Ascending'
                                }
                            />
                            <button
                                onClick={() =>
                                    setFilters((prev) =>
                                        prev === null ? 'following' : null,
                                    )
                                }
                                className="p-1 px-2 bg-cyan-400 hover:bg-cyan-600 transition duration-300 ease-in-out my-auto rounded-lg"
                            >
                                {filters ? 'Show All' : 'Show Following'}
                            </button>

                            <button
                                onClick={toggleControls}
                                className="p-1 px-2 bg-cyan-400 hover:bg-cyan-600 transition duration-300 ease-in-out ml-auto mr-[4vw] my-auto rounded-lg"
                            >
                                Hide controls
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={toggleControls}
                        className="p-1 px-2 bg-cyan-400 hover:bg-cyan-600 transition duration-300 ease-in-out mx-auto mt-4 rounded-lg"
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
                            <PostCard post={post} />
                        </li>
                    ))
                ) : (
                    <p>No posts found</p>
                )}
            </ul>

            <div className="pagination-controls">
                <Button onClick={handleNextPage} children="More" />
            </div>
        </div>
    );
};

export default PostList;
