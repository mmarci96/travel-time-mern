import { Link } from 'react-router-dom';
import ImageWithPlaceholder from '../common/ImageWithPlaceholder';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest.js';

const PostCard = ({ post, currentUserId }) => {
    const [likedByUser, setLikedByUser] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const { sendRequest } = useAuthRequest();
    const handleLike = async (method) => {
        const postId = post.id;
        const data = await sendRequest('/api/likes', method, { postId });
        if (method === 'DELETE') {
            console.log('curr id', currentUserId);
            console.log(post.likes);
            post.likes.filter((like) => like !== currentUserId);
            setLikedByUser(false);
            setLikeCount((prev) => prev - 1);
        }
        if (method === 'POST') {
            console.log(data);
            setLikedByUser(true);
            setLikeCount((prev) => prev + 1);
        }
    };
    useEffect(() => {
        if (post.likes.includes(currentUserId)) {
            setLikedByUser(true);
        }
    }, [currentUserId]);

    return (
        <div className="m-4 p-1 border-2 rounded-xl shadow-slate-400 shadow-md min-w-[320px] max-w-[420px] mx-auto">
            <Link to={`/post/${post.id}`}>
                <ImageWithPlaceholder
                    alt={post.title}
                    image_url={post.image_url}
                />
            </Link>
            <span className="flex flex-col">
                <h3 className="post-title text-lg font-semibold tracking-wider px-2 mx-2 mr-auto mb-1">
                    {post.title}
                </h3>
            </span>
            {post.author_id ? (
                <span className="flex ">
                    {likedByUser ? (
                        <FaHeart
                            size={32}
                            color="red"
                            onClick={() => handleLike('DELETE')}
                            className="mt-2 ml-1 cursor-pointer hover:scale-[1.1] duration-300 ease-in hover:opacity-[80%]"
                        />
                    ) : (
                        <FaRegHeart
                            size={32}
                            color="red"
                            onClick={() => handleLike('POST')}
                            className="mt-2 ml-1 text-red-600 cursor-pointer hover:scale-[1.1] duration-300 ease-in hover:animate-bounce"
                        />
                    )}
                    <p className="mt-4 ml-1">{likeCount}</p>

                    <h4 className="text-lg italic mt-2 cursor-pointer hover:bg-gray-200 p-2 px-4 mx-4 rounded-xl">
                        <Link to={`/profile/${post.author_id._id}`}>
                            By: {post.author_name}
                        </Link>
                    </h4>
                    <h3 className="text-md m-2 p-2 mb-1 italic">
                        {new Date(post?.created_at).toDateString()}{' '}
                    </h3>
                </span>
            ) : (
                <p>looking for author .. .</p>
            )}
        </div>
    );
};

export default PostCard;
