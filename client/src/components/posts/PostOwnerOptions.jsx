
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaTrashAlt,
    FaEdit,
    FaExclamationTriangle,
    FaEllipsisV
} from 'react-icons/fa';
import OptionsPopup from '../common/OptionsPopup';
import useAuthRequest from '../../hooks/useAuthRequest';

const PostOwnerOptions = ({ onDeleteCount, postId }) => {
    const [toggleOptions, setToggleOptions] = useState(false);
    const { sendRequest } = useAuthRequest();
    const navigate = useNavigate();

    const handleToggle = () => {
        setToggleOptions(!toggleOptions);
    };

    const handleDelete = async () => {
        const deletePost = await sendRequest(`/api/posts/${postId}`, 'DELETE');
        if (deletePost) {
            onDeleteCount((prev) => prev + 1);
        }
    };

    const handleEdit = () => {
        navigate(`/post/edit/${postId}`);
    };

    const handleReport = () => {
        console.log("I dont have money for mods anyway lol")
    }

    const options = [
        {
            onClick: handleDelete,
            icon: <FaTrashAlt size={18} className="text-red-600 mx-2 my-1" />,
            text: 'Delete this post'
        },
        {
            onClick: handleEdit,
            icon: <FaEdit size={18} className="text-slate-600 mx-2 my-1" />,
            text: 'Edit Post'
        },
        {
            onClick: handleReport,
            icon: <FaExclamationTriangle size={18} className="text-red-600 mx-2 my-1" />,
            text: 'Report'
        }
    ];

    return (
        <div className="relative">
            <button onClick={handleToggle}>
                <FaEllipsisV size={28} className="text-slate-600" />
            </button>
            {toggleOptions && <OptionsPopup options={options} />}
        </div>
    );
};

export default PostOwnerOptions;

