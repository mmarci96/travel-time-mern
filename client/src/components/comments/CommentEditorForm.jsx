
import { useState } from "react";
import useAuthRequest from "../../hooks/useAuthRequest";
import { FaTimes, FaCheck } from "react-icons/fa";

const CommentEditorForm = ({ commentId, content, onEdit, onDeleteCount }) => {
    const [formData, setFormData] = useState({
        comment_id: commentId,
        content: content,
    });
    const { sendRequest } = useAuthRequest();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await sendRequest('/api/comments', 'PATCH', formData);
        if (data) {
            onDeleteCount((prev) => prev + 1);
            onEdit(false);
        }
    };

    return (
        <form
            className="flex flex-row m-2 w-full items-center bg-white bg-opacity-70 rounded-lg ring-1 ring-slate-200 p-4"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={formData.content}
                name="content"
                onChange={handleChange}
                className="flex-grow px-2 py-1 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Edit your comment..."
            />
                <button
                    type="submit"
                    className="p-2 m-1 bg-green-400 text-gray-600 rounded-full hover:bg-gray-300 transition-all"
                >
                    <FaCheck/>

                </button>
                <button
                    type="button"
                    onClick={() => onEdit(false)}
                    className="p-2 m-1 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-all"
                >
                    <FaTimes />
                </button>
        </form>
    );
};

export default CommentEditorForm;

