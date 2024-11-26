import { useEffect, useState } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest.js';
import CommentCard from './CommentCard.jsx';

const CommentList = ({ postId, refresh }) => {
  const [comments, setComments] = useState(null);
  const { sendRequest } = useAuthRequest(`/api/comments/${postId}`, 'GET');

  useEffect(() => {
    sendRequest().then((data) =>
      data ? setComments(data) : setComments(null),
    );
  }, [refresh]);
  return (
    <ul className="flex flex-col items-center ">
      {comments &&
        comments.length &&
        comments.map((comment) => (
          <li key={comment._id} className="min-w-[350px] w-[60vw]">
            <CommentCard comment={comment} />
          </li>
        ))}
    </ul>
  );
};

export default CommentList;
