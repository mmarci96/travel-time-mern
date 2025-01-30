import { useEffect, useState } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest.js';
import CommentCard from './CommentCard.jsx';
import CreateComment from './CreateComment.jsx';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState(null);
    const [commentCounter, setCommandCounter] = useState(0);
    const { sendRequest } = useAuthRequest();

    useEffect(() => {
        const fetchComments = async (postId) => {
            const commentsData = await sendRequest(
                `/api/comments/${postId}`,
                'GET',
            );
            if (commentsData) {
                setComments(commentsData);
                commentCounter === 0 && setCommandCounter(commentsData.length);
            }
        };

        if (!comments || commentCounter !== comments.length) {
            fetchComments(postId);
        }
    }, [commentCounter]);

    return (
        <div className="flex flex-col ring-1 rounded-lg p-1 shadow-slate-400 shadow-md my-4 items-center mx-auto w-[64vw] min-w-[360px] max-w-[480px] max-h-[640px] ">
            <ul className="flex flex-col items-center overflow-y-auto h-[64vh] w-full ">
                {comments ?
                    comments.map((comment) => (
                        <li
                            key={comment.id}
                            className="min-w-[312px] w-[58vw] max-w-[472px]"
                        >
                            <CommentCard
                                comment={comment}
                                onDeleteCount={setCommandCounter}
                            />
                        </li>
                    )) : <p className='italic text-slate-600 m-4 mr-auto'> Nobody has commented on this post yet...</p>
                }
            </ul>

            <CreateComment postId={postId} onCreateCount={setCommandCounter} />
        </div>
    );
};

export default CommentList;
