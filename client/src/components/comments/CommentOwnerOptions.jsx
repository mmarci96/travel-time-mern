import { useState } from 'react';
import {
    FaTrashAlt,
    FaEdit,
    FaExclamationTriangle,
    FaEllipsisV,
} from 'react-icons/fa';
import OptionsPopup from '../common/OptionsPopup';
import useAuthRequest from '../../hooks/useAuthRequest';


const CommentOwnerOptions = ({ 
    commentId, onDeleteCount = () => {} 
}) => {
    const [toggleOptions, setToggleOptions] = useState(false);
    const { sendRequest } = useAuthRequest();

    const handleToggle = () => {
        setToggleOptions(!toggleOptions);
    };

    const handleDelete = async () => {
        const deletePost = await sendRequest(`/api/comments/${commentId}`, 'DELETE');
        if (deletePost) {
            onDeleteCount((prev) => prev + 1);
        }
    };

    const handleEdit = () => {
        //TODO make a popup imput field to edit or switch out the component
    };

    const handleReport = () => {
        console.log('I dont have money for mods anyway lol');
    };

    const options = [
        {
            onClick: handleDelete,
            icon: <FaTrashAlt size={18} className="text-red-600 mx-2 my-1" />,
            text: 'Delete comment',
        },
        {
            onClick: handleEdit,
            icon: <FaEdit size={18} className="text-slate-600 mx-2 my-1" />,
            text: 'Edit comment',
        },
        {
            onClick: handleReport,
            icon: (
                <FaExclamationTriangle
                    size={18}
                    className="text-red-600 mx-2 my-1"
                />
            ),
            text: 'Report',
        },
    ];

    return (
        <div className="relative">
            <button onClick={handleToggle}>
                <FaEllipsisV size={28} className="text-slate-600" />
            </button>
            {toggleOptions && <OptionsPopup options={options} />}
        </div>
    );


}

export default CommentOwnerOptions
