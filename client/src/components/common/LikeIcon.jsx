import { FaHeart, FaRegHeart } from 'react-icons/fa';

const LikeIcon = ({ likedByUser, onLike }) => {
    return likedByUser ? (
        <FaHeart
            size={32}
            color="red"
            onClick={() => onLike('DELETE')}
            className="mt-2 ml-1 cursor-pointer hover:scale-[1.1] duration-300 ease-in hover:opacity-[80%]"
        />
    ) : (
        <FaRegHeart
            size={32}
            color="red"
            onClick={() => onLike('POST')}
            className="mt-2 ml-1 text-red-600 cursor-pointer hover:scale-[1.1] duration-300 ease-in hover:animate-bounce"
        />
    );
};

export default LikeIcon;
