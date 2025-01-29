import { useEffect, useState } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest.js';
import CommentCard from './CommentCard.jsx';

const CommentList = ({ postId, refresh }) => {
    const [comments, setComments] = useState(null);
    const [commentCounter, setCommandCounter] = useState(0)
    const { sendRequest } = useAuthRequest();

    useEffect(() => {
        const fetchComments = async (postId) => {
            const commentsData = await sendRequest(`/api/comments/${postId}`, 'GET')
            if (commentsData) {
                setComments(commentsData)
                commentCounter === 0 && setCommandCounter(data.length)
            }
        }
        if(commentCounter !== comments.length){
            fetchComments(postId)
        }

    }, [refresh, commentCounter]);
    return (
        <ul className="flex flex-col items-center ">
            {comments &&
                comments.length &&
                comments.map((comment) => (
                    <li key={comment.id} className="min-w-[350px] w-[60vw]">
                        <CommentCard comment={comment} onDeleteCount={setCommandCounter} />
                    </li>
                ))}
        </ul>
    );
};

export default CommentList;
