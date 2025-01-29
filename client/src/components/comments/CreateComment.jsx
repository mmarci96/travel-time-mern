import { useState } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest.js';
import Button from '../common/Button.jsx';

const CreateComment = ({ postId, onCreateCount }) => {
    const [comment, setComment] = useState({
        content: '',
        post_id: postId,
    });
    const { sendRequest } = useAuthRequest();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await sendRequest('/api/comments/', 'POST', comment);
            if (result) {
                onCreateCount((prev) => prev - 1);
            }
        } finally {
            setComment({
                content: '',
                post_id: postId,
            });
        }
    };

    return (
        <form
            className="flex flex-row w-[60vw] min-w-[320px] max-w-[480px] items-center justify-between p-3 border-t border-gray-300 bg-white mt-2"
            onSubmit={handleSubmit}
        >
            <input
                className="flex-1 mr-2 p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="text"
                name="content"
                placeholder="Write a comment..."
                value={comment.content}
                onChange={(e) =>
                    setComment({ ...comment, content: e.target.value })
                }
            />
            <Button
                type="submit"
                variant="primary"
                className="mx-2 px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Comment
            </Button>
        </form>
    );
};

export default CreateComment;
