import { Link } from 'react-router-dom';
import ImageWithPlaceholder from '../common/ImageWithPlaceholder';

const PostCard = ({ post }) => {
    return (
        <div className="m-4 p-1 border-2 rounded-xl shadow-slate-400 shadow-md min-w-[340px] max-w-[62vh]  mx-auto">
            <Link to={`/post/${post._id}`}>
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
                <span className="flex mb-2">
                    <img
                        src={post.author_id}
                        alt={'avatar'}
                        className="w-14 rounded-full shadow-md shadow-slate-700 ml-2 content-center"
                    ></img>

                    <h4 className="text-lg italic mt-2 cursor-pointer hover:bg-gray-200 p-2 px-4 mx-4 rounded-xl">
                        <Link to={`/profile/${post.author_id}`}>
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
