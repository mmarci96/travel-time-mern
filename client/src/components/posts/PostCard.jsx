import { Link } from 'react-router-dom';
import ImageWithPlaceholder from '../common/ImageWithPlaceholder';
import LikeIcon from '../common/LikeIcon.jsx';
import { useEffect, useState } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest.js';
import LoadAnimation from '../common/LoadAnimation.jsx';
import PostOwnerOptions from './PostOwnerOptions.jsx';
import useAuthContext from '../../hooks/useAuthContext.js';
import AnimatedComponent from '../common/AnimatedComponent.jsx';

const PostCard = ({ post, onDeleteCount }) => {
    const [likedByUser, setLikedByUser] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const { sendRequest } = useAuthRequest();
    const { currentUserId } = useAuthContext();
    const handleLike = async (method) => {
        const postId = post.id;
        const data = await sendRequest('/api/likes', method, { postId });
        if (!data) {
            return;
        }
        if (method === 'DELETE') {
            post.likes.filter((like) => like !== currentUserId);
            setLikedByUser(false);
            setLikeCount((prev) => prev - 1);
        }
        if (method === 'POST') {
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
        <AnimatedComponent
            children={
                <div className="my-4 p-1 ring-1 rounded-xl max-h-[640px] h-[80vh] shadow-slate-400 shadow-md min-w-[320px] w-[60vw] max-w-[480px] mx-auto">
                    <Link to={`/post/${post.id}`}>
                        <ImageWithPlaceholder
                            alt={post.title}
                            image_url={post.image_url}
                        />
                    </Link>
                    <span className="flex flex-col">
                        <h3 className="post-title text-lg px-2  mb-1 max-h-8 overflow-hidden text-ellipsis">

                            {post.title}
                        </h3>
                    </span>
                    {post.author_id ? (
                        <span className="flex items-start justify-between">
                            <div className="flex items-center">
                                <LikeIcon
                                    onLike={handleLike}
                                    likedByUser={likedByUser}
                                />
                                <p className="mt-2 ml-2 text-xl italic">
                                    {likeCount}
                                </p>
                                <h4 className="text-lg italic mt-2 cursor-pointer hover:bg-gray-200 mx-4 rounded-xl">
                                    <Link to={`/profile/${post.author_id}`}>
                                        By: {post.author_name}
                                    </Link>
                                </h4>
                                <h3 className="text-lg mt-2  italic">
                                    {new Date(post?.created_at).toDateString()}
                                </h3>
                            </div>
                            {post.author_id === currentUserId && (
                                <div className="ml-auto">
                                    <PostOwnerOptions
                                        postId={post.id}
                                        onDeleteCount={onDeleteCount}
                                    />
                                </div>
                            )}
                        </span>
                    ) : (
                        <LoadAnimation />
                    )}
                </div>
            }
        />
    );
};

export default PostCard;
