import { useState } from 'react';
import useAuthRequest from '../../hooks/useAuthRequest.js';
import Button from '../common/Button.jsx';

const CreateComment = ({ postId, onComment }) => {
  const [comment, setComment] = useState({
    content: '',
    post_id: postId,
  });
  const { sendRequest } = useAuthRequest('/api/comments/', 'POST', comment);
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((result) => (result ? onComment(result) : onComment(null)))
      .finally(() =>
        setComment({
          content: '',
          post_id: postId,
        }),
      );
  };
  return (
    <form
      className={
        'flex flex-row justify-around bg-slate-200 p-2 mx-auto' +
        ' my-2 w-[80%]'
      }
      onSubmit={handleSubmit}
    >
      <input
        className="p-2 w-full"
        type="text"
        name="content"
        value={comment.content}
        onChange={(e) => setComment({ ...comment, content: e.target.value })}
      />
      <Button type="submit" variant="primary">
        Comment
      </Button>
    </form>
  );
};

export default CreateComment;
